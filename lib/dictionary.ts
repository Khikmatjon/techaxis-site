import type { Locale } from './i18n'

const dictionaries = {
  uz: () => import('../locales/uz.json').then((module) => module.default),
  en: () => import('../locales/en.json').then((module) => module.default),
  ru: () => import('../locales/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.uz()
}