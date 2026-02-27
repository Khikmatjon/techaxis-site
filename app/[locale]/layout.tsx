import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { Navbar } from "@/components/shared/navbar"; // Navbar qo'shildi
import { Footer } from '@/components/shared/footer';  // Footer qo'shildi

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="antialiased font-display bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        {/* Saytning tepa qismi */}
        <Navbar />
        
        {/* Asosiy kontent - Navbar ostida qolib ketmasligi uchun pt-20 qo'shdik */}
        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* Saytning pastki qismi */}
        <Footer />
      </body>
    </html>
  );
}