import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/shared/navbar"; // Default import, qavssiz!
import { Footer } from '@/components/shared/footer';  

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
    <html lang={locale}>
      <body className="antialiased font-display bg-white dark:bg-slate-950">
        <Navbar dict={dict} />
        {/* pt-20 qo'shildi, Hero Navbar tagida qolmasligi uchun */}
        <main className="min-h-screen pt-20"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}