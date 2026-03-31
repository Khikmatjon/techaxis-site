"use server";

const TELEGRAM_BOT_TOKEN = "8431645365:AAH2xXl5UAFvRZrBK703LP3haR7G8KTut5Q";
const TELEGRAM_CHAT_ID = "1011043209";

export async function sendToTelegram(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  const text = `
🆕 **Yangi so'rov (TechAxis.uz)**

👤 **Ism:** ${name}
📧 **Email:** ${email}
🛠 **Xizmat:** ${service}
📝 **Xabar:** ${message}

📅 **Vaqt:** ${new Date().toLocaleString('uz-UZ')}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      throw new Error("Telegramga yuborishda xatolik yuz berdi");
    }

    return { success: true };
  } catch (error) {
    console.error("Telegram error:", error);
    return { success: false, error: "Xabar yuborilmadi" };
  }
}
