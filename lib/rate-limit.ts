// Urinishlarni cheklash: kirish, ro'yxatdan o'tish, parolni almashtirish va ommaviy formalar.
//
// Hisob BAZADA yuritiladi ("RateLimit" jadvali): Vercel'da har so'rov alohida nusxada ishlaydi,
// shuning uchun xotiradagi hisob (oldingi variant) amalda hech narsani cheklamasdi. Bitta
// atomik so'rov (INSERT ... ON CONFLICT) bir vaqtdagi urinishlarni ham to'g'ri sanaydi.
// Kalit -- email yoki IP'ning hash'i: ular matn ko'rinishida saqlanmaydi.
//
// Baza ishlamasa (yoki jadval hali yaratilmagan bo'lsa) hisob xotiraga o'tadi: kirish va formalar
// buzilmaydi, faqat cheklov shu nusxa ichida ishlaydi. Bu fayl "use server" EMAS.
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export type Limit = { max: number; windowMs: number };

export const LIMITS = {
  loginEmail: { max: 5, windowMs: 15 * 60_000 }, // bitta email: 5 ta xato parol -- 15 daqiqa blok
  loginIp: { max: 30, windowMs: 15 * 60_000 }, // bitta IP: 30 ta xato urinish (ofis/auditoriya tarmog'i uchun yetarli)
  register: { max: 20, windowMs: 60 * 60_000 }, // bitta IP: soatiga 20 ta ro'yxatdan o'tish
  credentials: { max: 5, windowMs: 15 * 60_000 }, // email/parolni almashtirishda xato "joriy parol"
  form: { max: 5, windowMs: 10 * 60_000 }, // aloqa / buyurtma formalari: 10 daqiqada 5 ta
} as const satisfies Record<string, Limit>;

// Foydalanuvchiga ko'rsatiladigan xabar (lib/action-messages.ts ruscha/inglizchasini biladi).
export const tooMany = (ms: number) => `Juda ko'p urinish. ${Math.max(1, Math.ceil(ms / 60_000))} daqiqadan so'ng qayta urinib ko'ring.`;

export async function clientIp(): Promise<string> {
  const h = await headers();
  // Vercel mijoz yuborgan X-Forwarded-For'ni almashtiradi: birinchi qiymat haqiqiy IP.
  return h.get("x-real-ip")?.trim() || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "noma'lum";
}

export function hashKey(scope: string, value: string): string {
  return `${scope}:` + createHash("sha256").update(`${process.env.JWT_SECRET ?? ""}|${scope}|${value}`).digest("hex").slice(0, 32);
}

// --- zaxira: xotiradagi hisob (baza ishlamaganda) ---
const memory = new Map<string, { count: number; start: number }>();

function memBlockedFor(key: string, limit: Limit): number {
  const rec = memory.get(key);
  if (!rec || Date.now() - rec.start >= limit.windowMs) return 0;
  return rec.count >= limit.max ? limit.windowMs - (Date.now() - rec.start) : 0;
}

function memHit(key: string, limit: Limit) {
  const now = Date.now();
  const rec = memory.get(key);
  if (!rec || now - rec.start >= limit.windowMs) memory.set(key, { count: 1, start: now });
  else rec.count++;
  if (memory.size > 5000) memory.forEach((v, k) => { if (now - v.start > 24 * 3_600_000) memory.delete(k); });
}

// Prisma xatolari bo'sh qator bilan boshlanadi: logga oxirgi mazmunli qator (Postgres xabari) yoziladi.
const dbMsg = (err: unknown) =>
  String((err as Error)?.message ?? err).split("\n").map((s) => s.trim()).filter(Boolean).pop() ?? "noma'lum xato";

// Blok muddatidan qancha millisekund qolgan (0 -- bloklanmagan). Faqat o'qiydi.
export async function blockedFor(key: string, limit: Limit): Promise<number> {
  try {
    const rows = await prisma.$queryRaw<{ count: number; elapsed: number }[]>`
      SELECT "count", (extract(epoch from (now() - "windowStart")) * 1000)::float8 AS elapsed
      FROM "RateLimit" WHERE "key" = ${key}`;
    const row = rows[0];
    if (!row || row.elapsed >= limit.windowMs) return 0;
    return row.count >= limit.max ? Math.ceil(limit.windowMs - row.elapsed) : 0;
  } catch (err) {
    console.error("RateLimit: baza ishlamadi, xotira ishlatiladi:", dbMsg(err));
    return memBlockedFor(key, limit);
  }
}

// Bitta urinishni sanaydi (atomik). Oyna tugagan bo'lsa hisob qaytadan boshlanadi.
export async function hit(key: string, limit: Limit): Promise<void> {
  try {
    const seconds = Math.ceil(limit.windowMs / 1000);
    await prisma.$executeRaw`
      INSERT INTO "RateLimit" ("key", "count", "windowStart") VALUES (${key}, 1, now())
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE WHEN "RateLimit"."windowStart" < now() - (${seconds}::int * interval '1 second') THEN 1 ELSE "RateLimit"."count" + 1 END,
        "windowStart" = CASE WHEN "RateLimit"."windowStart" < now() - (${seconds}::int * interval '1 second') THEN now() ELSE "RateLimit"."windowStart" END`;
    // Ba'zan eski yozuvlarni tozalaymiz, jadval o'smasin.
    if (Math.random() < 0.02) await prisma.$executeRaw`DELETE FROM "RateLimit" WHERE "windowStart" < now() - interval '1 day'`;
  } catch (err) {
    console.error("RateLimit: baza ishlamadi, xotira ishlatiladi:", dbMsg(err));
    memHit(key, limit);
  }
}

export async function clearLimit(key: string): Promise<void> {
  memory.delete(key);
  try {
    await prisma.$executeRaw`DELETE FROM "RateLimit" WHERE "key" = ${key}`;
  } catch {
    /* jadval yo'q yoki baza ishlamayapti -- xotiradagi yozuv allaqachon o'chirildi */
  }
}

// Ommaviy forma uchun: IP bo'yicha. Bloklangan bo'lsa -- kutish vaqti (ms), aks holda urinishni
// sanab 0 qaytaradi. Chaqiruvchi: const wait = await formThrottle("order"); if (wait) return { error: tooMany(wait) }
export async function formThrottle(scope: string, limit: Limit = LIMITS.form): Promise<number> {
  const key = hashKey(`form-${scope}`, await clientIp());
  const wait = await blockedFor(key, limit);
  if (wait > 0) return wait;
  await hit(key, limit);
  return 0;
}
