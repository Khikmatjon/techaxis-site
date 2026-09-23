import nodemailer from "nodemailer";

// Zoho Mail (info@techaxis.uz) orqali email yuborish. Kalitlar Vercel
// muhit o'zgaruvchilaridan keladi (hech qachon kodga yozilmaydi):
//   ZOHO_EMAIL         - to'liq pochta manzili (masalan info@techaxis.uz)
//   ZOHO_APP_PASSWORD  - Zoho'da yaratilgan ilova paroli (asosiy parol emas)
//   NOTIFY_EMAIL       - bildirishnomalar qayerga kelishi (bo'sh bo'lsa ZOHO_EMAIL'ning o'zi)
const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_APP_PASSWORD = process.env.ZOHO_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || ZOHO_EMAIL;

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!ZOHO_EMAIL || !ZOHO_APP_PASSWORD) return null;
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: { user: ZOHO_EMAIL, pass: ZOHO_APP_PASSWORD },
    });
  }
  return cachedTransporter;
}

// Email yuborish hech qachon asosiy amalni (to'lov, ro'yxatdan o'tish)
// to'xtatmasligi kerak -- xato bo'lsa faqat logga yoziladi.
export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email yuborilmadi: ZOHO_EMAIL yoki ZOHO_APP_PASSWORD sozlanmagan");
    return { success: false };
  }
  try {
    await transporter.sendMail({
      from: `TechAxis <${ZOHO_EMAIL}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return { success: true };
  } catch (error) {
    console.error("Email yuborishda xato:", error);
    return { success: false };
  }
}

export async function sendEnrollmentNotificationEmail(data: {
  userName: string;
  userEmail: string;
  courseTitle: string;
  plan: string;
  amount: number | string;
  method: string;
  status: string;
  receiptUrl?: string;
}) {
  if (!NOTIFY_EMAIL) return;

  const statusLabel = data.status === "completed" ? "✅ To'langan" : "⏳ Tasdiq kutilmoqda";
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color:#0084FF;">🆕 Yangi kurs yozilishi</h2>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:6px 0; color:#666;">O'quvchi</td><td style="padding:6px 0; font-weight:bold;">${data.userName}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Email</td><td style="padding:6px 0;">${data.userEmail}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Kurs</td><td style="padding:6px 0; font-weight:bold;">${data.courseTitle}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Tarif</td><td style="padding:6px 0;">${data.plan}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Summa</td><td style="padding:6px 0;">${data.amount}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Usul</td><td style="padding:6px 0;">${data.method}</td></tr>
        <tr><td style="padding:6px 0; color:#666;">Holat</td><td style="padding:6px 0;">${statusLabel}</td></tr>
      </table>
      ${data.receiptUrl ? `<p><a href="${data.receiptUrl}">Chekni ko'rish</a></p>` : ""}
      <p style="color:#999; font-size:12px; margin-top:16px;">${new Date().toLocaleString("uz-UZ")}</p>
    </div>
  `;

  await sendEmail({
    to: NOTIFY_EMAIL,
    subject: `Yangi yozilish: ${data.courseTitle} (${data.userName})`,
    html,
  });
}
