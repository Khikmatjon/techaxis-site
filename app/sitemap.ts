import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { listPublishedPosts } from '@/lib/blog-store';
import { COURSES } from '@/lib/courses';

// Blog yozuvlari bazadan olinadi va admin paneldan o'zgaradi, shuning uchun sitemap har so'rovda tayyorlanadi.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.techaxis.uz';
  const routes = ['', '/software', '/training', '/login', '/register', '/blog', '/free'];
  const posts = await listPublishedPosts();

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
    COURSES.forEach((course) => {
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
