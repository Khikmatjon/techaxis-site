// Telegram xabarnomalari (faqat serverda ishlaydi). Bu fayl "use server" EMAS: bu yerdagi
// funksiyalarni brauzerdan to'g'ridan-to'g'ri chaqirib bo'lmaydi -- ular faqat server
// action'lar ichidan (masalan to'lov yaratilgandan keyin) ishlatiladi.
// Kalitlar Vercel muhit o'zgaruvchilarida: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
import { escapeHtml } from "@/lib/escape-html";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const telegramConfigured = () => Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);

// HTML formatdagi xabar yuboradi. Matndagi foydalanuvchi ma'lumoti chaqiruvchi tomonda
// escapeHtml bilan tozalangan bo'lishi kerak.
export async function sendTelegramHtml(text: string): Promise<boolean> {
  if (!telegramConfigured()) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi!");
    return false;
  }
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
  });
  if (!res.ok) {
    console.error("Telegram API Error:", await res.text());
    return false;
  }
  return true;
}

export async function sendPaymentNotification(data: {
  userName: string;
  userEmail: string;
  courseTitle: string;
  plan: string;
  amount: number | string;
  method: string;
  status: string;
  receiptUrl?: string;
}) {
  if (!telegramConfigured()) return;

  const methodEmoji: Record<string, string> = { click: "🔵", payme: "🟢", visa: "💳", transfer: "🏦" };
  const e = escapeHtml;
  const text = `
🆕 <b>Yangi To'lov So'rovi!</b>

👤 <b>O'quvchi:</b> ${e(data.userName)}
📧 <b>Email:</b> ${e(data.userEmail)}
📚 <b>Kurs:</b> ${e(data.courseTitle)}
💎 <b>Tarif:</b> ${e(String(data.plan).toUpperCase())}
💰 <b>Summa:</b> ${e(data.amount)}
🛠 <b>Usul:</b> ${methodEmoji[data.method] || "❓"} ${e(String(data.method).toUpperCase())}
🕒 <b>Holat:</b> ${data.status === "completed" ? "✅ To'langan" : "⏳ Kutilmoqda"}

${data.receiptUrl ? `📎 <b>Chek:</b> <a href="${e(data.receiptUrl)}">Rasmni ko'rish</a>` : "❌ Chek yuklanmagan"}

📅 <b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ")}
  `;

  try {
    // Chek rasm bo'lsa -- rasm bilan (Telegram ochiq URL'dan o'zi yuklab oladi). PDF chek
    // sendPhoto'ga to'g'ri kelmaydi (Telegram rad etadi) -- u holda havolali oddiy xabar.
    // Rasm yuborilmasa ham xabar yo'qolmasin: zaxira sifatida oddiy xabar yuboriladi.
    const isImage = !!data.receiptUrl && /^https?:\/\/.+\.(jpe?g|png|webp)(\?.*)?$/i.test(data.receiptUrl);
    if (isImage) {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, photo: data.receiptUrl, caption: text, parse_mode: "HTML" }),
      });
      if (res.ok) return;
      console.error("Telegram sendPhoto Error:", await res.text());
    }
    await sendTelegramHtml(text);
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}
