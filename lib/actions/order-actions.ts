"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { escapeHtml } from "@/lib/escape-html";
import { sendTelegramDocument, sendTelegramHtml } from "@/lib/telegram";

// Mijoz loyihasi buyurtmalari: /services sahifasidagi forma va admin paneldagi "Buyurtmalar"
// tabi. Loyiha qoidasi: Route Handler emas, Server Actions.

// Admin paneldagi holatlar (bazada kalit, ekranda nomi -- components/admin/orders-manager.tsx).
const STATUSES = ["yangi", "boglanildi", "bajarilmoqda", "topshirildi", "rad_etildi"];

// Forma tanlovlari (qiymat o'zbekcha yuboriladi -- components/services/order-form.tsx).
const TURLAR = ["Texnik chizma", "3D model", "Ishlab chiqarishga tayyorlash", "Boshqa"];

// Biriktiriladigan fayl: chizma, rasm yoki CAD fayl. Vercel so'rov hajmini ~4,5 MB bilan
// cheklaydi, shuning uchun 4 MB. Tur kengaytma bo'yicha tekshiriladi (CAD fayllarda MIME yo'q).
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const FILE_EXT = /\.(pdf|png|jpe?g|webp|dwg|dxf|step|stp|igs|iges|sldprt|sldasm|slddrw|catpart|catproduct|catdrawing|zip)$/i;

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user?.role !== "admin") throw new Error("Unauthorized");
}

const str = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

// Ochiq action (tizimga kirmagan odam ham chaqiradi): har maydon cheklanadi.
// Buyurtma ikki joyga yoziladi -- Telegram (darhol xabar, fayl bilan) va baza (admin paneldagi
// ro'yxat). Bittasi ishlasa ham buyurtma yo'qolmaydi, shuning uchun muvaffaqiyat deb hisoblanadi.
export async function submitOrderAction(formData: FormData) {
  // Bot tuzog'i: odam ko'rmaydigan maydon to'ldirilgan bo'lsa -- jim qabul qilinadi, saqlanmaydi.
  if (str(formData, "website", 200)) return { success: true as const };

  const name = str(formData, "name", 100);
  const phone = str(formData, "phone", 40);
  const telegram = str(formData, "telegram", 60);
  const needRaw = str(formData, "need", 60);
  const need = TURLAR.includes(needRaw) ? needRaw : TURLAR[TURLAR.length - 1];
  const message = str(formData, "message", 2000);
  const langRaw = str(formData, "lang", 2);
  const lang = ["uz", "ru", "en"].includes(langRaw) ? langRaw : "uz";

  if (name.length < 2) return { success: false as const, error: "Ismingizni kiriting" };
  if (phone.replace(/\D/g, "").length < 7) return { success: false as const, error: "Telefon raqamini to'liq kiriting" };

  const raw = formData.get("file");
  const file = raw instanceof File && raw.size > 0 ? raw : null;
  if (file) {
    if (file.size > MAX_FILE_BYTES) return { success: false as const, error: "Fayl hajmi 4 MB dan oshmasin" };
    if (!FILE_EXT.test(file.name)) return { success: false as const, error: "Fayl turi mos emas (PDF, rasm, DWG, DXF, STEP yoki CAD fayl yuboring)" };
  }
  // Fayl nomi: yo'l va boshqaruv belgilarisiz (Telegram va admin panelda ko'rsatiladi).
  const fileName = file ? file.name.replace(/[\\/:*?"<>|\x00-\x1f]/g, "_").slice(-120) : null;

  const e = escapeHtml;
  const text = `
🧑‍💼 <b>MIJOZ — yangi buyurtma (TechAxis.uz)</b>

👤 <b>Ism:</b> ${e(name)}
📞 <b>Tel:</b> ${e(phone)}
💬 <b>Telegram:</b> ${telegram ? e(telegram) : "—"}
🛠 <b>Nima kerak:</b> ${e(need)}
📝 <b>Loyiha:</b> ${message ? e(message) : "—"}
📎 <b>Fayl:</b> ${fileName ? e(fileName) : "yo'q"}
🌐 <b>Sayt tili:</b> ${lang.toUpperCase()}

📅 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
  `;

  const [sent, saved] = await Promise.all([
    (async () => {
      try {
        const ok = await sendTelegramHtml(text);
        // Fayl alohida hujjat sifatida: xabar ketgan bo'lsa, fayl ketmasa ham buyurtma yo'qolmaydi.
        if (ok && file && fileName) {
          const docOk = await sendTelegramDocument(file, fileName, `📎 MIJOZ fayli — ${name}`);
          if (!docOk) await sendTelegramHtml(`⚠️ <b>${e(name)}</b> buyurtmasidagi fayl (${e(fileName)}) Telegram'ga yuborilmadi — mijozdan qayta so'rang.`);
        }
        return ok;
      } catch (err) {
        console.error("Buyurtma: Telegram xatosi", err);
        return false;
      }
    })(),
    (async () => {
      try {
        await prisma.clientOrder.create({
          data: { name, phone, telegram: telegram || null, need, message: message || null, lang, fileName },
        });
        return true;
      } catch (err) {
        // Baza ishlamasa ham (yoki jadval hali yaratilmagan bo'lsa) buyurtma Telegram orqali yetadi.
        console.error("Buyurtma: bazaga yozilmadi", err);
        return false;
      }
    })(),
  ]);

  return sent || saved
    ? { success: true as const }
    : { success: false as const, error: "Buyurtma yuborilmadi" };
}

export async function getOrdersAction() {
  await requireAdmin();
  return prisma.clientOrder.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
}

export async function updateOrderAction(id: string, status: string, note: string) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { success: false as const, error: "Holat noto'g'ri" };
  await prisma.clientOrder.update({
    where: { id },
    data: { status, note: note.trim().slice(0, 1000) || null },
  });
  return { success: true as const };
}

export async function deleteOrderAction(id: string) {
  await requireAdmin();
  await prisma.clientOrder.delete({ where: { id } });
  return { success: true as const };
}
