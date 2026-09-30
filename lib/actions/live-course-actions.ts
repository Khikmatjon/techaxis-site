"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { escapeHtml } from "@/lib/escape-html";
import { sendTelegramHtml } from "@/lib/telegram";
import { DARAJALAR } from "@/content/jonli-kurs";

// Jonli kursga arizalar: /uz/solidworks-jonli-kurs formasi va admin paneldagi
// "Jonli kurs" tabi. Loyiha qoidasi: Route Handler emas, Server Actions.

// Admin paneldagi holatlar (bazada kalit, ekranda nomi).
const STATUSES = ["yangi", "boglanildi", "sinov_darsi", "tolandi", "rad_etdi"];

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user?.role !== "admin") throw new Error("Unauthorized");
}

const str = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

// Ochiq action (tizimga kirmagan odam ham chaqiradi): har maydon cheklanadi.
// Ariza ikki joyga yoziladi -- Telegram (darhol xabar) va baza (admin paneldagi ro'yxat).
// Bittasi ishlasa ham ariza yo'qolmaydi, shuning uchun muvaffaqiyat deb hisoblanadi.
export async function submitLiveApplicationAction(formData: FormData) {
  // Bot tuzog'i: odam ko'rmaydigan maydon to'ldirilgan bo'lsa -- jim qabul qilinadi, saqlanmaydi.
  if (str(formData, "website", 200)) return { success: true as const };

  const name = str(formData, "name", 100);
  const phone = str(formData, "phone", 40);
  const telegram = str(formData, "telegram", 60);
  const levelRaw = str(formData, "level", 40);
  const level = (DARAJALAR as readonly string[]).includes(levelRaw) ? levelRaw : DARAJALAR[0];
  const group = str(formData, "group", 40) || "1-guruh";

  if (name.length < 2) return { success: false as const, error: "Ismingizni kiriting" };
  if (phone.replace(/\D/g, "").length < 7) return { success: false as const, error: "Telefon raqamini to'liq kiriting" };

  const e = escapeHtml;
  const text = `
🎓 <b>Jonli kursga ariza — SOLIDWORKS (${e(group)})</b>

👤 <b>Ism:</b> ${e(name)}
📞 <b>Tel:</b> ${e(phone)}
💬 <b>Telegram:</b> ${telegram ? e(telegram) : "—"}
📊 <b>Tajriba:</b> ${e(level)}

📅 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
  `;

  const [sent, saved] = await Promise.all([
    sendTelegramHtml(text).catch((err) => {
      console.error("Jonli kurs arizasi: Telegram xatosi", err);
      return false;
    }),
    prisma.liveApplication
      .create({ data: { name, phone, telegram: telegram || null, level, group } })
      .then(() => true)
      .catch((err) => {
        console.error("Jonli kurs arizasi: bazaga yozilmadi", err);
        return false;
      }),
  ]);

  return sent || saved
    ? { success: true as const }
    : { success: false as const, error: "Ariza yuborilmadi" };
}

export async function getLiveApplicationsAction() {
  await requireAdmin();
  return prisma.liveApplication.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
}

export async function updateLiveApplicationAction(id: string, status: string, note: string) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { success: false as const, error: "Holat noto'g'ri" };
  await prisma.liveApplication.update({
    where: { id },
    data: { status, note: note.trim().slice(0, 1000) || null },
  });
  return { success: true as const };
}

export async function deleteLiveApplicationAction(id: string) {
  await requireAdmin();
  await prisma.liveApplication.delete({ where: { id } });
  return { success: true as const };
}
