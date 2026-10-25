import type { Course } from "@/lib/courses";
import { KURS_IBORALAR, KURS_MARKETING } from "@/content/kurslar-tarjima";
import { asLoc } from "@/lib/locale-text";

// Bazadagi o'zbekcha kurs matnini (nom, tavsif, daraja, modul va dars nomlari) joriy tilga
// o'giradi -- tarjimalar content/kurslar-tarjima.ts da. Tarjima topilmasa o'zbekchasi qoladi
// (scripts/check-i18n.mjs buni ko'rsatadi). Dars matni va videosi o'zbekcha qoladi.
export function trKurs(text: string, locale: string): string {
  const loc = asLoc(locale);
  if (loc === "uz") return text;
  return KURS_IBORALAR[text]?.[loc] ?? text;
}

// Daraja nomi ("Boshlang'ich" -> "Начальный"). course.level o'zi o'zgarmaydi: u kalit
// sifatida ham ishlatiladi (SEO tavsifi, filtrlar).
export const levelLabel = (level: string, locale: string) => trKurs(level, locale);

export function localizeCourse(course: Course, locale: string): Course {
  const loc = asLoc(locale);
  if (loc === "uz") return course;
  const tr = (s: string) => KURS_IBORALAR[s]?.[loc] ?? s;
  return {
    ...course,
    title: tr(course.title),
    subtitle: tr(course.subtitle),
    description: tr(course.description),
    duration: tr(course.duration),
    tags: course.tags.map(tr),
    marketing: KURS_MARKETING[course.id]?.[loc] ?? course.marketing,
    modules: course.modules.map((m) => ({
      ...m,
      title: tr(m.title),
      lessons: m.lessons.map((l) => ({ ...l, title: tr(l.title) })),
    })),
  };
}
