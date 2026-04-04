"use server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendToTelegram(formData: FormData) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID topilmadi!");
    return { success: false, error: "Server sozlamalarida xatolik" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  // HTML format ishlatamiz (Markdown xatoliklarga moyil bo'lishi mumkin)
  const text = `
🆕 <b>Yangi so'rov (TechAxis.uz)</b>

👤 <b>Ism:</b> ${name}
📞 <b>Tel:</b> ${phone}
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

export async function handlePay(locale: string, courseId: string) {
  return { redirect: `/${locale}/checkout/${courseId}` };
}

export async function sendPaymentNotification(data: {
  userName: string;
  userEmail: string;
  courseTitle: string;
  plan: string;
  amount: number | string;
  method: string;
  status: string;
  receiptFile?: File;
}) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const methodEmoji: Record<string, string> = {
    click: "🔵",
    payme: "🟢",
    visa: "💳",
    transfer: "🏦"
  };

  const text = `
🆕 <b>Yangi To'lov So'rovi!</b>

👤 <b>O'quvchi:</b> ${data.userName}
📧 <b>Email:</b> ${data.userEmail}
📚 <b>Kurs:</b> ${data.courseTitle}
💎 <b>Tarif:</b> ${data.plan.toUpperCase()}
💰 <b>Summa:</b> ${data.amount}
🛠 <b>Usul:</b> ${methodEmoji[data.method] || "❓"} ${data.method.toUpperCase()}
🕒 <b>Holat:</b> ${data.status === "completed" ? "✅ To'langan" : "⏳ Kutilmoqda"}

${data.receiptFile ? `📎 <b>Chek:</b> Ilova qilingan rasm` : "❌ Chek yuklanmagan"}

📅 <b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ")}
  `;

  try {
    if (data.receiptFile && data.receiptFile.size > 0) {
      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("caption", text);
      formData.append("parse_mode", "HTML");
      formData.append("photo", data.receiptFile);

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData,
      });
    } else {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      });
    }
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}
