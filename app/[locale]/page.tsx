import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { About } from "@/components/sections/about";
import { CoursesPreview } from "@/components/sections/courses-preview";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* L: MATN QISMI */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-sm font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>{dict?.hero?.badge || "O'zbekistondagi 1-raqamli Markaz"}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              {dict?.hero?.title?.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                {dict?.hero?.title?.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              {dict?.hero?.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#0084FF] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center">
                {dict?.hero?.cta_primary || "Xizmatlar bilan tanishish"}
              </button>
              <button className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-bold transition-all shadow-sm w-full sm:w-auto text-center">
                {dict?.hero?.cta_secondary || "Bepul konsultatsiya"}
              </button>
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/100?img=33" alt="Client 1" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/100?img=47" alt="Client 2" />
                <img className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/100?img=12" alt="Client 3" />
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-bold">50+</span> {dict?.hero?.trust_text}
              </div>
            </div>
          </div>

          {/* R: RASM & 3D MODEL PHO QISMI */}
          <div className="relative mt-12 lg:mt-0">
            {/* Orqa fonga abstrakt soyalar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-100 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl opacity-50 z-0"></div>
            
            <div className="relative z-10 w-full aspect-square rounded-[40px] overflow-hidden bg-slate-100 dark:bg-slate-800 border-8 border-white dark:border-slate-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
                alt="Industrial CAD Design" 
                className="w-full h-full object-cover"
              />
              {/* O'ylab topilgan interfeys elementi (Hovered badge) */}
              <div className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-inner">
                   SW
                </div>
                <div>
                   <div className="text-sm font-black text-slate-900 dark:text-white">SOLIDWORKS</div>
                   <div className="text-xs font-semibold text-emerald-500">{dict?.hero?.expert_badge}</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. COURSES PREVIEW - NEW SEO SECTION */}
      <CoursesPreview dict={dict} locale={locale} />

      {/* 3. OTHER SECTIONS */}
      <section id="services">
        <Services dict={dict} />
      </section>

      <section id="about">
        <About dict={dict} />
      </section>

      <section id="projects">
        <Projects dict={dict} />
      </section>

      <section id="contact">
        <Contact dict={dict} />
      </section>

    </div>
  );
}