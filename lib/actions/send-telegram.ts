"use server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendToTelegram(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  // HTML format ishlatamiz (Markdown xatoliklarga moyil bo'lishi mumkin)
  const text = `
🆕 <b>Yangi so'rov (TechAxis.uz)</b>

👤 <b>Ism:</b> ${name}
📧 <b>Email:</b> ${email}
🛠 <b>Xizmat:</b> ${service}
📝 <b>Xabar:</b> ${message}

📅 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
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
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API Error:", errorData);
      throw new Error("Telegram API xatosi");
    }

    return { success: true };
  } catch (error) {
    console.error("Telegram error catch block:", error);
    return { success: false, error: "Xabar yuborilmadi" };
  }
}

