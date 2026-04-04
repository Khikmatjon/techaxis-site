import { Metadata } from 'next';
import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/shared/navbar"; // Default import, qavssiz!
import { Footer } from '@/components/shared/footer';  
import { ThemeProvider } from "@/components/theme-provider";
import { AnnouncementBar } from '@/components/shared/announcement-bar';
import { Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    metadataBase: new URL('https://www.techaxis.uz'),
    title: dict.seo.title,
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      type: 'website',
      locale: locale,
      url: `https://www.techaxis.uz/${locale}`,
      siteName: 'TechAxis Group',
    }
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
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased font-display bg-white dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnnouncementBar dict={dict} />
          <Navbar dict={dict} />
          {/* pt-20 qo'shildi, Hero Navbar tagida qolmasligi uchun */}
          <main className="min-h-screen"> 
            {children}
          </main>
          <Footer dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}