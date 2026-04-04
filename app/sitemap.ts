import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { BLOG_POSTS } from '@/lib/blog';
import { COURSES } from '@/lib/courses';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.techaxis.uz';
  const routes = ['', '/software', '/training', '/login', '/register', '/blog', '/free'];
  
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

    // Dinamik Blog sahifalar
    BLOG_POSTS.forEach((post) => {
      sitemaps.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
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
