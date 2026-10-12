import { asLoc } from "@/lib/locale-text";

// Server action'lar (lib/actions/*) xato xabarini o'zbekcha qaytaradi. Saytda ko'rsatishdan
// oldin shu yerda joriy tilga o'giriladi: trXato(res.error, locale).
// Action'ga yangi xabar qo'shsangiz, tarjimasini ham shu yerga yozing (admin paneldagi
// xabarlar o'zbekcha qoladi -- admin panel faqat o'zbek tilida).
const XATOLAR: Record<string, { ru: string; en: string }> = {
  // Kirish, ro'yxatdan o'tish, sozlamalar
  "Iltimos, barcha maydonlarni to'ldiring": { ru: "Пожалуйста, заполните все поля", en: "Please fill in all fields" },
  "Barcha maydonlarni to'ldiring": { ru: "Заполните все поля", en: "Fill in all fields" },
  "Email yoki parol noto'g'ri": { ru: "Неверный email или пароль", en: "Incorrect email or password" },
  "Ro'yxatdan o'tish uchun maxfiylik siyosati va foydalanish shartlariga rozilik bildiring": {
    ru: "Чтобы зарегистрироваться, примите политику конфиденциальности и условия использования",
    en: "To sign up, please accept the privacy policy and terms of use",
  },
  "Email noto'g'ri kiritilgan": { ru: "Email указан неверно", en: "The email address is invalid" },
  "Ismni to'g'ri kiriting": { ru: "Введите имя правильно", en: "Please enter a valid name" },
  "Bu email bilan allaqachon ro'yxatdan o'tilgan": { ru: "Этот email уже зарегистрирован", en: "This email is already registered" },
  "Ro'yxatdan o'tishda kutilmagan xatolik yuz berdi": { ru: "При регистрации произошла непредвиденная ошибка", en: "An unexpected error occurred during sign-up" },
  "Tizimga kirishda kutilmagan xatolik yuz berdi": { ru: "При входе произошла непредвиденная ошибка", en: "An unexpected error occurred while signing in" },
  "Joriy parol noto'g'ri": { ru: "Текущий пароль неверный", en: "The current password is incorrect" },
  "Ushbu email allaqachon band qilingan": { ru: "Этот email уже занят", en: "This email is already taken" },
  "Iltimos, tizimga qayta kiring": { ru: "Пожалуйста, войдите снова", en: "Please sign in again" },
  "Sessiya yaroqsiz": { ru: "Сессия недействительна, войдите снова", en: "Your session is invalid, please sign in again" },
  "Server sozlamalarida xatolik": { ru: "Ошибка в настройках сервера", en: "Server configuration error" },
  "Xatolik yuz berdi": { ru: "Произошла ошибка", en: "Something went wrong" },
  // Formalar (aloqa, jonli kurs, bepul qo'llanma)
  "Ismingizni kiriting": { ru: "Введите ваше имя", en: "Please enter your name" },
  "Telefon raqamini to'liq kiriting": { ru: "Введите номер телефона полностью", en: "Please enter the full phone number" },
  "Ariza yuborilmadi": { ru: "Заявка не отправлена", en: "The application was not sent" },
  "Ism va aloqa ma'lumotini kiriting": { ru: "Укажите имя и контактные данные", en: "Please enter your name and contact details" },
  "Xabar yuborilmadi": { ru: "Сообщение не отправлено", en: "The message was not sent" },
  // Kursga yozilish va to'lov
  "Avval saytga kiring": { ru: "Сначала войдите на сайт", en: "Please sign in first" },
  "Bu to'lov usuli hozircha mavjud emas": { ru: "Этот способ оплаты пока недоступен", en: "This payment method is not available yet" },
  "Tarif noto'g'ri": { ru: "Неверный тариф", en: "Invalid plan" },
  "Summa noto'g'ri": { ru: "Неверная сумма", en: "Invalid amount" },
  "Kurs topilmadi": { ru: "Курс не найден", en: "Course not found" },
  "Bu kurs sizda allaqachon ochiq": { ru: "Этот курс у вас уже открыт", en: "You already have access to this course" },
  "To'lov topilmadi": { ru: "Платёж не найден", en: "Payment not found" },
  "Chek rasm (JPG, PNG, WEBP) yoki PDF bo'lishi kerak": {
    ru: "Чек должен быть изображением (JPG, PNG, WEBP) или PDF",
    en: "The receipt must be an image (JPG, PNG, WEBP) or a PDF",
  },
  "Chek hajmi 5 MB dan oshmasin": { ru: "Размер чека не должен превышать 5 МБ", en: "The receipt must not exceed 5 MB" },
};

// Ichida raqam bor xabarlar
const NAMUNALAR: { re: RegExp; ru: (n: string) => string; en: (n: string) => string }[] = [
  {
    re: /^Yangi parol kamida (\d+) ta belgidan iborat bo'lsin$/,
    ru: (n) => `Новый пароль должен содержать не менее ${n} символов`,
    en: (n) => `The new password must be at least ${n} characters long`,
  },
  {
    re: /^Parol kamida (\d+) ta belgidan iborat bo'lsin$/,
    ru: (n) => `Пароль должен содержать не менее ${n} символов`,
    en: (n) => `The password must be at least ${n} characters long`,
  },
  {
    re: /^Juda ko'p urinish\. (\d+) daqiqadan so'ng qayta urinib ko'ring\.$/,
    ru: (n) => `Слишком много попыток. Попробуйте снова через ${n} мин.`,
    en: (n) => `Too many attempts. Try again in ${n} min.`,
  },
];

export function trXato(message: string | undefined | null, locale: string): string {
  const msg = message ?? "";
  const loc = asLoc(locale);
  if (loc === "uz" || !msg) return msg;
  const exact = XATOLAR[msg];
  if (exact) return exact[loc];
  for (const n of NAMUNALAR) {
    const m = msg.match(n.re);
    if (m) return n[loc](m[1]);
  }
  return loc === "ru" ? "Произошла ошибка. Попробуйте ещё раз." : "Something went wrong. Please try again.";
}
