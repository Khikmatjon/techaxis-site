import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { About } from "@/components/sections/about"; // Agar About komponenti bo'lmasa, uni yaratish kerak

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION: Professional muhandislik kirish qismi */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070" 
            alt="Engineering Design" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>3DEXPERIENCE Platform Authorized Partner</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] tracking-tighter italic">
              Dizayndan tortib <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                ishlab chiqarishgacha
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              SOLIDWORKS va CATIA orqali sanoat kelajagini quring. 
              Korxonalar uchun litsenziyalash, professional o'quv kurslari va 
              yuqori aniqlikdagi muhandislik yechimlari.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
                Dasturlar va Obuna
              </button>
              <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all">
                O'quv markazi
              </button>
            </div>

            {/* Brendlar bilan ishonch bloki */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-xl font-bold text-white uppercase">SolidWorks</div>
                <div className="text-xs text-slate-500 tracking-wider">Litsenziyalash</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white uppercase">CATIA</div>
                <div className="text-xs text-slate-500 tracking-wider">Ekspertiza</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white uppercase">3DEXPERIENCE</div>
                <div className="text-xs text-slate-500 tracking-wider">Bulutli PLM</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-square rounded-[60px] overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-3xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1974" 
                alt="CAD 3D Model" 
                className="w-full h-full object-contain rounded-3xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-slate-950 p-6 rounded-3xl font-bold shadow-2xl">
                Engineering Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION: Xizmatlar bo'limi */}
      <section id="services">
        <Services dict={dict} />
      </section>

      {/* 3. ABOUT SECTION: Haqimizda (Tajriba va Maqsadlar) */}
      <section id="about">
        {/* Agar About komponentingiz bo'lmasa, uni yaratishimiz kerak */}
        <About dict={dict} />
      </section>

      {/* 4. PROJECTS SECTION: Amalga oshirilgan loyihalar (HMC, KIA va boshqalar) */}
      <section id="projects">
        <Projects dict={dict} />
      </section>

      {/* 5. CONTACT SECTION: Bog'lanish va Konsultatsiya */}
      <section id="contact">
        <Contact dict={dict} />
      </section>

    </div>
  );
}