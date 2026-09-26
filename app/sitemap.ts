import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { listPublishedPosts } from '@/lib/blog-store';
import { getCourses } from '@/lib/courses-db';

// Soatiga bir marta yangilanadi (blog va kurslar admin panelda o'zgarganda ham revalidatePath bor).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.techaxis.uz';
  const routes = ['', '/software', '/training', '/courses', '/login', '/register', '/blog', '/free', '/privacy', '/terms'];
  // Faqat faol kurslar (admin o'chirgan kurs sitemap'dan ham tushadi); baza ishlamasa statik ro'yxatga qaytadi.
  const [posts, courses] = await Promise.all([listPublishedPosts(), getCourses()]);

  const sitemaps: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Statik sahifalar
    routes.forEach((route) => {
      sitemaps.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // Dinamik Blog sahifalar (faqat nashr etilganlari)
    posts.forEach((post) => {
      sitemaps.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Dinamik Kurs Landing sahifalari
    courses.forEach((course) => {
      sitemaps.push({
        url: `${baseUrl}/${locale}/courses/${course.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  return sitemaps;
}
