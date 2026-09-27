import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Manzillar til prefiksi bilan boshlanadi (/uz/admin), shuning uchun /*/ ... ko'rinishida.
      // /checkout bu yerda yo'q: u noindex, Google buni ko'rishi uchun sahifani ochishi kerak.
      disallow: ['/api/', '/*/admin', '/*/dashboard'],
    },
    sitemap: 'https://www.techaxis.uz/sitemap.xml',
  };
}
