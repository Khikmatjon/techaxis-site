import { Metadata } from 'next';
import { Sora } from 'next/font/google';
import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/shared/navbar"; // Default import, qavssiz!
import { Footer } from '@/components/shared/footer';  
import { ThemeProvider } from "@/components/theme-provider";
import { AnnouncementBar } from '@/components/shared/announcement-bar';
import { Locale, locales } from '@/lib/i18n';
import { defaultMetadata } from '@/lib/seo';
import { SEARCH_VERIFICATION } from '@/config/site';

// Shrift build paytida yuklab olinib saytning o'zidan beriladi: Google'ga alohida
// so'rov yo'q va sahifa chizilishi shriftni kutib to'xtab qolmaydi.
const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
});

// Uch til oldindan ma'lum: sahifalar build paytida tayyorlanadi va CDN keshidan
// beriladi (har so'rovda qaytadan qurilmaydi). Bazadan o'qiydigan sahifalar o'zida
// `revalidate` bilan vaqti-vaqti bilan, admin panelda saqlanganda esa darhol yangilanadi.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  // Sahifa o'z metadata'sini bermasa, bosh sahifa matni ishlatiladi (content/seo.ts).
  return {
    metadataBase: new URL('https://www.techaxis.uz'),
    keywords: dict.seo.keywords,
    ...defaultMetadata(locale),
    // Search Console / Yandex Webmaster tasdiqlash (config/site.ts).
    verification: {
      ...(SEARCH_VERIFICATION.google ? { google: SEARCH_VERIFICATION.google } : {}),
      ...(SEARCH_VERIFICATION.yandex ? { yandex: SEARCH_VERIFICATION.yandex } : {}),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={sora.variable} suppressHydrationWarning>
      <body className="antialiased font-display bg-white dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnnouncementBar dict={dict} />
          <Navbar dict={dict} locale={locale} />
          {/* pt-20 qo'shildi, Hero Navbar tagida qolmasligi uchun */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer dict={dict} locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}