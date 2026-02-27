import "../globals.css";
import { getDictionary } from "@/lib/dictionary";
import { Navbar } from "@/components/shared/navbar"; 
import { Footer } from '@/components/shared/footer';  

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params ichidagi locale ni string deb o'zgartirdik
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="antialiased font-display bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Navbar />
        
        <main className="min-h-screen pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}