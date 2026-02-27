export const locales = ['uz', 'en', 'ru'] as const; // 'ko' olib tashlandi
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'uz';

export const isLocale = (x: string): x is Locale => {
  return (locales as readonly string[]).includes(x);
};