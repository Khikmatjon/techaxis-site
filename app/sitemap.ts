import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { listPublishedPosts } from '@/lib/blog-store';
import { getCourses } from '@/lib/courses-db';
import { isTranslated } from '@/lib/seo';

// Soatiga bir marta yangilanadi (blog va kurslar admin panelda o'zgarganda ham revalidatePath bor).
export const revalidate = 3600;

const baseUrl = 'https://www.techaxis.uz';

// Qidiruvga chiqadigan statik sahifalar. /login, /register, /checkout, /dashboard,
// /admin bu yerda yo'q: ular qidiruvdan yashirilgan yoki faqat kirganlar uchun.
const ROUTES: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/courses', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/training', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/software', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/software/solidworks', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/software/catia', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/free', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/solidworks-jonli-kurs', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/privacy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
];

// Sitemap'ga faqat asosiy (canonical) manzillar kiradi -- lib/seo.ts -> alternatesFor bilan bir xil:
// - uch tilga tarjima qilingan sahifa: uch yozuv, har birida uch til muqobili va x-default (uz);
// - tarjima qilinmagan sahifa: faqat /uz (ru/en versiyasi uning nusxasi, canonical -> /uz).
function entriesFor(
  path: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>,
): MetadataRoute.Sitemap {
  if (!isTranslated(path)) return [{ url: `${baseUrl}/uz${path}`, ...extra }];
  const languages = {
    uz: `${baseUrl}/uz${path}`,
    ru: `${baseUrl}/ru${path}`,
    en: `${baseUrl}/en${path}`,
    'x-default': `${baseUrl}/uz${path}`,
  };
  return locales.map((locale) => ({ url: `${baseUrl}/${locale}${path}`, alternates: { languages }, ...extra }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Faqat faol kurslar (admin o'chirgan kurs sitemap'dan ham tushadi); baza ishlamasa statik ro'yxatga qaytadi.
  const [posts, courses] = await Promise.all([listPublishedPosts(), getCourses()]);

  // lastmod faqat haqiqiy sana bo'lsa qo'yiladi: kurs -- kurs/modul/darsning oxirgi
  // o'zgarishi, maqola -- oxirgi tahrir (bo'lmasa e'lon qilingan sana). Statik sahifalarda
  // aniq sana yo'q, shuning uchun "hozir" deb yozilmaydi (Google bunday sanaga ishonmaydi).
  return [
    ...ROUTES.flatMap(({ path, ...extra }) => entriesFor(path, extra)),
    ...courses.flatMap((course) =>
      entriesFor(`/courses/${course.id}`, {
        ...(course.updatedAt ? { lastModified: new Date(course.updatedAt) } : {}),
        changeFrequency: 'monthly',
        priority: 0.9,
      }),
    ),
    ...posts.flatMap((post) =>
      entriesFor(`/blog/${post.slug}`, {
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
    ),
  ];
}
