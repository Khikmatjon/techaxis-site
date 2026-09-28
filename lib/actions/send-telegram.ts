"use server";

// Saytdagi formalar (bosh sahifadagi "Bog'lanish", /free) dan kelgan so'rovni Telegram'ga
// yuboradi. Bu -- ommaviy action (tizimga kirmagan odam ham chaqiradi), shuning uchun
// har bir maydon uzunligi cheklanadi va HTML sifatida tozalanadi.
// To'lov xabarnomalari bu yerda EMAS: lib/telegram.ts (tashqaridan chaqirib bo'lmaydi).

import { escapeHtml } from "@/lib/escape-html";
import { sendTelegramHtml, telegramConfigured } from "@/lib/telegram";

const LIMITS = { name: 100, email: 150, phone: 40, service: 100, message: 2000 } as const;

function field(formData: FormData, key: keyof typeof LIMITS): string {
  return String(formData.get(key) ?? "").trim().slice(0, LIMITS[key]);
}

export async function sendToTelegram(formData: FormData) {
  if (!telegramConfigured()) {
    return { success: false, error: "Server sozlamalarida xatolik" };
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const service = field(formData, "service");
  const message = field(formData, "message");

  if (!name || (!email && !phone)) {
    return { success: false, error: "Ism va aloqa ma'lumotini kiriting" };
  }

  const e = escapeHtml;
  const text = `
🆕 <b>Yangi so'rov (TechAxis.uz)</b>

👤 <b>Ism:</b> ${e(name)}
📞 <b>Tel:</b> ${e(phone)}
📧 <b>Email:</b> ${e(email)}
🛠 <b>Xizmat:</b> ${e(service)}
📝 <b>Xabar:</b> ${e(message)}

📅 <b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ")}
  `;

  try {
    const ok = await sendTelegramHtml(text);
    return ok ? { success: true } : { success: false, error: "Xabar yuborilmadi" };
  } catch (error) {
    console.error("Telegram error catch block:", error);
    return { success: false, error: "Xabar yuborilmadi" };
  }
}
