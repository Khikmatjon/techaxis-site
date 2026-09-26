// ============================================================================
//  SAYT SOZLAMALARI — aloqa, yuridik va to'lov ma'lumotlari (yagona joy)
//
//  Header, footer, bog'lanish bo'limi, /privacy, /terms, to'lov sahifasi va
//  kabinet shu fayldan o'qiydi. Biror ma'lumot o'zgarsa, faqat shu faylni
//  tahrirlash kifoya — hamma joyda o'zi yangilanadi.
//
//  Keyin to'ldirilishi kerak bo'lgan joylar "KEYIN-TOLDIRING" bilan belgilangan.
//  Butun loyihada shu so'zni qidirsangiz, hammasini topasiz.
// ============================================================================

// Telefon: "display" — saytda ko'rinadigan ko'rinishi, "tel" — qo'ng'iroq uchun (bo'sh joysiz).
export const SITE_PHONE = {
  display: "+82 10 4564 0903", // Janubiy Koreya
  tel: "+821045640903",
} as const;

export const SITE_EMAIL = "info@techaxis.uz";

export const SITE_ADDRESS = {
  uz: "Toshkent, O'zbekiston",
  ru: "Ташкент, Узбекистан",
  en: "Tashkent, Uzbekistan",
} as const;

// KEYIN-TOLDIRING: yuridik shaxs rasmiylashgach nomini yozing, masalan:
//   export const LEGAL_ENTITY: string | null = "\"TechAxis Group\" MChJ";
// null bo'lsa /privacy va /terms sahifalarida "ma'lumotlar tez orada qo'shiladi" chiqadi.
export const LEGAL_ENTITY: string | null = null;

// Ijtimoiy tarmoqlar (footer'dagi belgilar).
// KEYIN-TOLDIRING: instagram, linkedin hozircha asoschining shaxsiy sahifalari —
// kompaniya sahifalari ochilgach shu yerdagi havolalarni almashtiring.
export const SITE_SOCIAL = {
  telegramBot: "https://t.me/techaxisinfobot",
  youtube: "https://youtube.com/@techaxis_academy?si=Xrhh9iFOkFJQu7EI",
  instagram: "https://instagram.com/hikmatjon.m",
  linkedin: "https://linkedin.com/in/melikuziev-khikmatjon",
} as const;

// To'lov uchun karta (to'lov sahifasida va o'quvchi kabinetida ko'rsatiladi).
// KEYIN-TOLDIRING: raqamni TEKSHIRING — "...1111 1111" namuna raqamga o'xshaydi.
// O'quvchilar pulni aynan shu kartaga o'tkazadi.
export const PAYMENT_CARD = {
  number: "9860 4545 1111 1111", // bo'sh joylar bilan yozing, nusxalashda o'zi olib tashlanadi
  holder: "Meliqo'ziyev Xikmatjon",
} as const;
