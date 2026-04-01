import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/shared/navbar"; // Default import, qavssiz!
import { Footer } from '@/components/shared/footer';  
import { ThemeProvider } from "@/components/theme-provider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased font-display bg-white dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar dict={dict} />
          {/* pt-20 qo'shildi, Hero Navbar tagida qolmasligi uchun */}
          <main className="min-h-screen pt-20"> 
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}