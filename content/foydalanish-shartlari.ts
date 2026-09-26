// ============================================================================
//  FOYDALANISH SHARTLARI — sahifa matni
//  Saytdagi sahifa: techaxis.uz/uz/terms  (ru va en versiyalari ham shu faylda)
//
//  Qanday o'zgartiriladi:
//   - Faqat qo'shtirnoq "..." ichidagi matnni o'zgartiring.
//   - Matn ichida " belgisini ishlatmang (kerak bo'lsa « » ishlating).
//   - Yangi bo'lim qo'shish: { sarlavha: "...", matn: "..." }, qatorini nusxalab,
//     kerakli joyga qo'ying.
//   - Matnni o'zgartirsangiz, "yangilangan" sanasini ham yangilang.
// ============================================================================
import type { HuquqiyHujjat } from "@/components/legal/legal-page";

export const FOYDALANISH_SHARTLARI: HuquqiyHujjat = {
  uz: {
    sarlavha: "Foydalanish shartlari",
    yangilangan: "Oxirgi yangilanish: 2026-yil 26-sentabr",
    kirish: "Saytdan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.",
    bolimlar: [
      { sarlavha: "Hisob", matn: "Ro'yxatdan o'tishda haqiqiy ismingiz va emailingizni kiriting. Parolingizni boshqalarga bermang." },
      { sarlavha: "Kurslar va to'lov", matn: "Kurs narxlari saytda ko'rsatilgan. To'lov karta orqali o'tkaziladi, tekshirilgach kurs ochiladi (odatda 1–2 soat ichida)." },
      // KEYIN-TOLDIRING: pulni qaytarish shartlari hali belgilanmagan (uchala tilda ham).
      { sarlavha: "Pulni qaytarish", matn: "Pulni qaytarish shartlari tez orada qo'shiladi. Savollar bo'lsa, bizga yozing." },
      { sarlavha: "Kurs materiallari", matn: "Kurs videolari va materiallarini ko'chirish yoki boshqalarga tarqatish mumkin emas." },
    ],
  },

  ru: {
    sarlavha: "Условия использования",
    yangilangan: "Последнее обновление: 26 сентября 2026 г.",
    kirish: "Пользуясь сайтом, вы соглашаетесь со следующими условиями.",
    bolimlar: [
      { sarlavha: "Аккаунт", matn: "При регистрации указывайте настоящее имя и email. Не передавайте свой пароль другим." },
      { sarlavha: "Курсы и оплата", matn: "Цены курсов указаны на сайте. Оплата производится переводом на карту, после проверки курс открывается (обычно в течение 1–2 часов)." },
      { sarlavha: "Возврат средств", matn: "Условия возврата будут добавлены в ближайшее время. Если есть вопросы, напишите нам." },
      { sarlavha: "Материалы курсов", matn: "Видео и материалы курсов нельзя копировать или распространять." },
    ],
  },

  en: {
    sarlavha: "Terms of Use",
    yangilangan: "Last updated: September 26, 2026",
    kirish: "By using the site, you agree to the following terms.",
    bolimlar: [
      { sarlavha: "Account", matn: "Use your real name and email when you register. Don't share your password with others." },
      { sarlavha: "Courses and payment", matn: "Course prices are shown on the site. Payment is made by card transfer; once it's checked, the course is unlocked (usually within 1–2 hours)." },
      { sarlavha: "Refunds", matn: "Refund terms will be added soon. If you have questions, please write to us." },
      { sarlavha: "Course materials", matn: "Course videos and materials may not be copied or shared." },
    ],
  },
};
