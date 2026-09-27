import type { Metadata } from "next";
import { SEO, type SeoKey } from "@/content/seo";
import type { Course } from "@/lib/courses";

// Sahifa metadata'sini content/seo.ts dagi matndan yig'adi. Ulashish rasmi
// app/[locale]/opengraph-image.tsx da chiziladi va har sahifaga shu yerda qo'shiladi
// (sahifa o'z openGraph'ini bersa, fayl orqali berilgan rasm meros bo'lib o'tmaydi).

const SITE_URL = "https://www.techaxis.uz";
const OG_LOCALE = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" } as const;
type Loc = keyof typeof OG_LOCALE;
const NOINDEX: ReadonlySet<SeoKey> = new Set<SeoKey>(["login", "register"]);

const asLocale = (locale: string): Loc => (locale in OG_LOCALE ? (locale as Loc) : "uz");

function build(locale: Loc, path: string, title: string, description: string, noindex = false): Metadata {
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: "TechAxis" };
  return {
    title,
    description,
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "TechAxis",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export function pageMetadata(key: SeoKey, locale: string, path: string): Metadata {
  const loc = asLocale(locale);
  const { title, description } = SEO[key][loc];
  return build(loc, path, title, description, NOINDEX.has(key));
}

// Kurs matni (bazada) faqat o'zbekcha, shuning uchun sarlavha va tavsif har tilda
// kursning aniq ma'lumotlaridan (nomi, darslar soni, davomiyligi, darajasi) tuziladi.
const LEVEL: Record<Loc, Record<string, string>> = {
  uz: { "Boshlang'ich": "boshlang'ich", "O'rta": "o'rta", Yuqori: "yuqori" },
  ru: { "Boshlang'ich": "начальный", "O'rta": "средний", Yuqori: "продвинутый" },
  en: { "Boshlang'ich": "beginner", "O'rta": "intermediate", Yuqori: "advanced" },
};

function hours(duration: string, loc: Loc): string {
  const n = duration.match(/(\d+)\s*soat/)?.[1];
  if (!n) return duration;
  return loc === "ru" ? `${n} ч` : loc === "en" ? `${n} hours` : `${n} soat`;
}

export function courseMetadata(course: Course, locale: string): Metadata {
  const loc = asLocale(locale);
  const lessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const level = LEVEL[loc][course.level] ?? course.level;
  const h = hours(course.duration, loc);
  const text = {
    uz: {
      title: `${course.title} — onlayn kurs | TechAxis`,
      description: `${course.title}: ${lessons} ta dars, ${h}, ${level} daraja. TechAxis o'quv markazining onlayn kursi.`,
    },
    ru: {
      title: `${course.title} — онлайн-курс | TechAxis`,
      description: `${course.title}: уроков — ${lessons}, ${h}, уровень — ${level}. Онлайн-курс учебного центра TechAxis.`,
    },
    en: {
      title: `${course.title} — course | TechAxis`,
      description: `${course.title}: ${lessons} lessons, ${h}, ${level} level. An online course from the TechAxis training center.`,
    },
  }[loc];
  const meta = build(loc, `/courses/${course.id}`, text.title, text.description);
  // Kursning o'z rasmi umumiy ulashish rasmidan ko'ra aniqroq.
  if (course.thumbnail) {
    meta.openGraph = { ...meta.openGraph, images: [course.thumbnail] };
    meta.twitter = { ...meta.twitter, images: [course.thumbnail] };
  }
  return meta;
}
