// Google va Yandex uchun structured data (JSON-LD, schema.org).
// Qoida: faqat saytdagi haqiqiy qiymatlar. Reyting/sharh (aggregateRating, review)
// qo'shilmaydi -- haqiqiy sharhlar yo'q.

import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONE, SITE_SOCIAL } from "@/config/site";
import type { Course } from "@/lib/courses";
import type { BlogPost } from "@/lib/blog";

const SITE_URL = "https://www.techaxis.uz";
type Loc = "uz" | "ru" | "en";
const asLoc = (l: string): Loc => (l === "ru" || l === "en" ? l : "uz");

// Tashkilot haqida -- boshqa bloklar shunga @id orqali bog'lanadi.
const ORG_ID = `${SITE_URL}/#organization`;
const ORG_REF = { "@id": ORG_ID };

export function organizationLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: "TechAxis",
    alternateName: "TechAxis Group",
    url: SITE_URL,
    // Belgi (izometrik kub) 180x180 PNG -- app/apple-icon.tsx
    logo: `${SITE_URL}/apple-icon`,
    image: `${SITE_URL}/apple-icon`,
    email: SITE_EMAIL,
    telephone: SITE_PHONE.tel,
    address: {
      "@type": "PostalAddress",
      // config/site.ts dagi manzilning birinchi qismi: "Toshkent, O'zbekiston" -> "Toshkent".
      addressLocality: SITE_ADDRESS[asLoc(locale)].split(",")[0].trim(),
      addressCountry: "UZ",
    },
    // Faqat kompaniyaning o'z sahifalari. Instagram va LinkedIn hozircha asoschining
    // shaxsiy sahifasi (config/site.ts), shuning uchun bu yerda yo'q.
    sameAs: [SITE_SOCIAL.youtube.split("?")[0]],
  };
}

// "Non ushoqlari": Bosh sahifa > Bo'lim > Sahifa. items -- bosh sahifadan keyingi qismlar.
const HOME = { uz: "Bosh sahifa", ru: "Главная", en: "Home" };
export function breadcrumbLd(locale: string, items: { name: string; path: string }[]) {
  const loc = asLoc(locale);
  const all = [{ name: HOME[loc], path: "" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}/${loc}${it.path}`,
    })),
  };
}

// Bo'lim nomlari (breadcrumb uchun), uch tilda.
export const CRUMB = {
  software: { uz: "Dasturlar", ru: "Программы", en: "Software" },
  courses: { uz: "Kurslar", ru: "Курсы", en: "Courses" },
  training: { uz: "O'quv markazi", ru: "Учебный центр", en: "Training" },
  blog: { uz: "Blog", ru: "Блог", en: "Blog" },
  free: { uz: "Bepul qo'llanma", ru: "Бесплатное руководство", en: "Free guide" },
  jonliKurs: { uz: "SOLIDWORKS jonli kursi", ru: "Живой курс SOLIDWORKS", en: "Live SOLIDWORKS course" },
  privacy: { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности", en: "Privacy Policy" },
  terms: { uz: "Foydalanish shartlari", ru: "Условия использования", en: "Terms of Use" },
} as const;
export const crumb = (key: keyof typeof CRUMB, locale: string) => CRUMB[key][asLoc(locale)];

// "24 soat" -> "PT24H" (ISO 8601). Soat topilmasa undefined.
function workload(duration: string): string | undefined {
  const h = duration.match(/(\d+)\s*soat/)?.[1];
  return h ? `PT${h}H` : undefined;
}

export function courseLd(course: Course) {
  const hours = workload(course.duration);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/uz/courses/${course.id}#course`,
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/uz/courses/${course.id}`,
    inLanguage: "uz",
    provider: { "@type": "EducationalOrganization", name: "TechAxis", url: SITE_URL, ...ORG_REF },
    ...(course.thumbnail ? { image: course.thumbnail } : {}),
    // Narx saytda ko'rsatilgan so'mdagi narx (kurs kartasi, to'lov sahifasi bilan bir xil).
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: course.priceUZS,
      priceCurrency: "UZS",
      url: `${SITE_URL}/uz/courses/${course.id}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      ...(hours ? { courseWorkload: hours } : {}),
    },
  };
}

export function blogPostingLd(post: BlogPost, locale: string) {
  const url = `${SITE_URL}/uz/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.length > 110 ? `${post.title.slice(0, 107)}...` : post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "uz",
    mainEntityOfPage: url,
    url,
    image: post.coverImage || `${SITE_URL}/${asLoc(locale)}/opengraph-image`,
    author: { "@type": "Organization", name: "TechAxis", url: SITE_URL },
    publisher: { "@type": "EducationalOrganization", name: "TechAxis", url: SITE_URL, ...ORG_REF },
  };
}
