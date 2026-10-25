// Sahifa ichidagi matnni joriy tilga tanlash. Har sahifa o'z matnini uch tilda saqlaydi:
//   const T = { uz: {...}, ru: {...}, en: {...} };   const t = pick(T, locale);
// Noma'lum til kelsa o'zbekcha (sayt asosiy tili) olinadi.
export type Loc = "uz" | "ru" | "en";

export const asLoc = (locale: string | undefined | null): Loc => (locale === "ru" || locale === "en" ? locale : "uz");

export const pick = <T>(text: Record<Loc, T>, locale: string | undefined | null): T => text[asLoc(locale)];

// Raqamni tilga mos ajratib yozish: 1 260 000 (uz/ru) yoki 1,260,000 (en).
export const formatNumber = (n: number, locale: string | undefined | null): string =>
  n.toLocaleString(asLoc(locale) === "en" ? "en-US" : "ru-RU").replace(/ | /g, " ");
