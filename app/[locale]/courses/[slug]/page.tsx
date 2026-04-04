import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCourseById, COURSES } from "@/lib/courses";
import Link from "next/link";
import { 
  Play, CheckCircle, ChevronRight, Users, Star, Clock, 
  HelpCircle, Sparkles, Layout, Database, Terminal, ShieldCheck,
  Zap, Target, Briefcase, BookOpen, Layers
} from "lucide-react";

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseById(slug);
  if (!course) return {};

  return {
    title: `${course.title} | TechAxis Kurslari`,
    description: course.description,
    openGraph: {
      title: `${course.title} | TechAxis Kurslari`,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}

export default async function CourseLandingPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale: paramLocale } = await params;
  const course = getCourseById(slug);
  const locale = paramLocale || "uz";
  
  if (!course) {
    notFound();
  }

  // Barcha marketing copywriting matnlari course.marketing ichidan avtomatik keladi!
  const { marketing } = course;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      
      {/* 🚀 HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> Professional Muhandislik Ta'limi
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                {course.title}: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl sm:text-4xl lg:text-5xl">{course.subtitle}</span>
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                 <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 px-5 py-3 rounded-2xl">
                    <Users className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-bold">{course.studentsCount}+</div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold">O'quvchilar</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 px-5 py-3 rounded-2xl">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-white font-bold">{course.rating}</div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Reyting</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 px-5 py-3 rounded-2xl">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-white font-bold">{course.duration}</div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Davomiyligi</div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={`/${locale}/checkout/${course.id}`} className="flex-1 sm:flex-none">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-5 px-10 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/25 hover:-translate-y-1">
                    Ro‘yxatdan o‘tish <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-[2.5rem] blur-3xl transform rotate-6 scale-95 transition-transform group-hover:rotate-3"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-3 rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center">
                 <img src={course.thumbnail} alt={`${course.title} kurs`} className="w-full h-auto object-cover rounded-[2rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-20 font-sans">
        
        {/* H2: Nega AYNAN SHU DASTUR? (Marketing Benefits) */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <Layout className="w-8 h-8 text-cyan-400" />
                      <div className="font-bold text-lg">Industrial Design</div>
                   </div>
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <Database className="w-8 h-8 text-blue-400" />
                      <div className="font-bold text-lg">Engineering Base</div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <Terminal className="w-8 h-8 text-purple-400" />
                      <div className="font-bold text-lg">Pro Simulation</div>
                   </div>
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                      <div className="font-bold text-lg">Global Standards</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">{marketing.whyTitle}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {marketing.whyDesc}
            </p>
            <div className="space-y-4 pt-4">
               {marketing.benefits.map((item, i) => (
                 <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 shrink-0 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 font-bold">✓</div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* H2: CAPABILITIES (Ushbu dastur orqali nimalar qila olasiz) */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">{marketing.capabilitiesTitle}</h2>
            <p className="text-slate-400">Marketingdan haqiqatgacha bo'lgan barcha imkoniyatlar</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {marketing.capabilities.map((item, i) => (
               <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all group">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Layers className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* H2: Kurs dasturi (SYLLABUS Step-by-step) */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{marketing.stepsTitle}</h2>
            <p className="text-slate-400">Professional o'quv rejasiga asoslangan bosqichlar ("Oddiy detaldan — murakkab loyihagacha")</p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-4 relative">
             <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-0"></div>
             
             {marketing.steps.map((item, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20 ring-4 ring-slate-950">
                    {item.step}
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full h-full flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{item.title}</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                       {item.points.map((p, j) => (
                         <li key={j}>• {p}</li>
                       ))}
                    </ul>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* H2: Natija va Nega TechAxis */}
        <div className="grid lg:grid-cols-2 gap-8">
           <section className="bg-blue-600 rounded-[3rem] p-10 lg:p-14 text-white space-y-8">
              <h2 className="text-3xl font-black">Kurs natijasida nima olasiz?</h2>
              <ul className="space-y-6">
                 {marketing.outcomes.map((item, i) => (
                   <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
                      <span className="text-lg font-medium text-blue-50">{item}</span>
                   </li>
                 ))}
              </ul>
           </section>
           
           <section className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 lg:p-14 space-y-8">
              <h2 className="text-3xl font-black text-white">Nima uchun TechAxis?</h2>
              <div className="grid gap-6">
                 {[
                   { t: "Xalqaro daraja", d: "Loyihalar mahalliy emas, butunjahon standartlariga aoslanadi." },
                   { t: "Real amaliyot", d: "Nazariya juda kam, asosan muhandislik masalalari ustida ishlanadi." },
                   { t: "Ishga yo'naltirilgan", d: "Kursni tugatib siz tayyor Kasb va Karyera egasiga aylanasiz." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20">
                         <Zap className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{item.t}</h4>
                        <p className="text-slate-400 text-sm">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* H2: Narx va tariflar */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Jozibali Tariflar</h2>
            <p className="text-slate-400">Sizga eng mos keladigan rejani tanlang va karyerangizni yangi bosqichga olib chiqing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {marketing.pricing.map((plan, i) => (
               <div key={i} className={`relative p-10 rounded-[2.5rem] border ${plan.best ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-slate-950 border-slate-800'} flex flex-col`}>
                  {plan.best && <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase">Eng optimali</div>}
                  <div className="mb-8">
                     <h3 className="text-slate-400 font-bold mb-2 uppercase tracking-wide">{plan.name}</h3>
                     <div className="text-5xl font-black text-white mb-2">{plan.price}</div>
                     <p className="text-slate-500 text-sm">{plan.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                     {plan.features.map((f, j) => (
                       <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> {f}
                       </li>
                     ))}
                  </ul>
                  <Link href={`/${locale}/checkout/${course.id}`}>
                    <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.best ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                      {plan.cta}
                    </button>
                  </Link>
               </div>
             ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black text-white flex items-center justify-center gap-3 uppercase">
              <HelpCircle className="w-8 h-8 text-blue-500" /> Eng ko'p so'raladigan savollar
            </h2>
          </div>
          <div className="grid gap-4">
             {marketing.faq.map((faq, i) => (
               <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl group transition-all hover:bg-slate-900">
                  <h4 className="text-white font-bold text-lg mb-3 flex items-center justify-between">
                    {faq.q}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
               </div>
             ))}
          </div>
        </section>

        {/* 🧩 FINAL CTA */}
        <section className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3.5rem] p-12 lg:p-20 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Hoziroq boshlang va professionalga aylaning</h2>
              <p className="text-blue-100 text-lg opacity-80">TechAxis bilan xalqaro muhandislik olamiga ilk qadamingizni qat'iy qo'ying va xalqaro bozorda mutaxassis sifatida qadrlaning.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                 <Link href={`/${locale}/checkout/${course.id}`}>
                   <button className="bg-white text-blue-700 font-black py-5 px-12 rounded-2xl text-xl hover:scale-105 transition-transform shadow-2xl">
                     Ro'yxatdan o'tish
                   </button>
                 </Link>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
