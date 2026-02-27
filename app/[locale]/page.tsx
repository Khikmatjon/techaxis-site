import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact"; // Contact qo'shildi


export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section - Asosiy kirish qismi */}
      <section className="relative pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Orqa fon uchun yengil gradient effektlari */}
        <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(42,127,255,0.1)] opacity-50 blur-[80px]"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 tracking-tighter">
          {dict.hero.title}
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {dict.hero.subtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
            {dict.hero.cta}
          </button>
          <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-10 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
            {dict.nav.services}
          </button>
        </div>
      </section>

      {/* 2. Services & Projects Section */}
      <Services dict={dict} />
      <Projects dict={dict} />

      {/* 3. HAYOT Innovation Teaser */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="p-12 rounded-[40px] bg-slate-900 text-white shadow-2xl overflow-hidden relative border border-slate-800">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display italic">
              HAYOT <span className="text-blue-500 text-not-italic font-sans tracking-widest text-sm align-middle ml-2">SYNC</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
              Biz nafaqat loyihalashtiramiz, balki muhandislik kelajagini shakllantiramiz. 
              <strong> HAYOT</strong> aqlli bilaguzugi va professional muhandislik kurslarimiz bilan tanishing.
            </p>
            <div className="flex justify-center gap-4">
               <span className="px-6 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-sm font-bold uppercase tracking-widest">
                 Yaqinda taqdim etiladi
               </span>
            </div>
          </div>
          {/* Dekorativ element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-[50px]"></div>
        </div>
      </section>

      {/* 4. Contact Section - Aloqa qismi */}
      <Contact dict={dict} />
    </div>
  );
}