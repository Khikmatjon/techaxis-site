// Saytdagi aloqa va yuridik ma'lumotlar uchun yagona manba. Header, footer,
// contact bo'limi va /privacy, /terms sahifalari shu yerdan o'qiydi --
// o'zgartirish kerak bo'lsa, faqat shu faylni tahrirlash kifoya.
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

// Yuridik shaxs hali rasmiylashtirilmagan (2026-09-26 holatiga). Rasmiylashgach
// shu yerni to'ldiring -- /privacy va /terms sahifalari avtomatik yangilanadi.
export const LEGAL_ENTITY: string | null = null;

// Rasmiy kompaniya ijtimoiy tarmoq sahifalari hali ochilmagan (2026-09-26).
// Footer'dagi havolalar hozircha loyiha asoschisining shaxsiy sahifalariga
// ulangan -- alohida masala, bu yerga tegishli emas.
export const SITE_SOCIAL = {
  telegramBot: "https://t.me/techaxisinfobot",
} as const;
