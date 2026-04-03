import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCourseById, COURSES } from "@/lib/courses";
import Link from "next/link";
import { 
  Play, CheckCircle, ChevronRight, Users, Star, Clock, 
  BookOpen, Target, Briefcase, Zap, ShieldCheck, 
  HelpCircle, Sparkles, Layout, Database, Terminal
} from "lucide-react";

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  const course = getCourseById(params.slug);
  if (!course) return {};

  // SEO Meta for SolidWorks
  if (params.slug === "solidworks-basics") {
    return {
      title: "SolidWorks kursi: 0 dan professional darajaga | TechAxis",
      description: "SolidWorks kursi orqali 0 dan professional darajaga chiqing. Amaliy darslar, real loyiha va portfolio bilan ishga tayyor bo‘ling.",
      keywords: ["SolidWorks kursi", "CAD kurs", "SolidWorks o‘rganish", "3D modeling kurs", "uzbekistan", "online"],
      openGraph: {
        title: "SolidWorks kursi: 0 dan professional darajaga | TechAxis",
        description: "SolidWorks kursi orqali 0 dan professional darajaga chiqing. Amaliy darslar, real loyiha va portfolio bilan ishga tayyor bo‘ling.",
        images: [course.thumbnail],
      },
    };
  }

  // SEO Meta for CATIA
  if (params.slug === "catia-v5") {
    return {
      title: "CATIA V5 Professional Kursi: Aviatsiya va Avtomobilsozlik | TechAxis",
      description: "CATIA V5 dasturini noldan professional darajagacha o'rganing. Sirtli modellashtirish (Surfacing), katta yig'malar va sanoat standartlari.",
      keywords: ["CATIA kurs", "CATIA o'rganish", "Aviatsiya dizayni", "Avtomobil muhandisligi", "CATIA V5 darslari", "Uzbekistan CAD"],
      openGraph: {
        title: "CATIA V5 Professional Kursi | TechAxis",
        description: "CATIA V5 dasturini noldan professional darajagacha o'rganing. Sanoat darajasidagi muhandislik loyihalarini yarating.",
        images: [course.thumbnail],
      },
    };
  }

  return {
    title: `${course.title} | TechAxis Kurslari`,
    description: course.description,
  };
}

export default function CourseLandingPage({ params }: { params: { slug: string, locale: string } }) {
  const course = getCourseById(params.slug);
  const locale = params.locale || "uz";
  
  if (!course) {
    notFound();
  }

  const isSolidWorks = params.slug === "solidworks-basics";
  const isCatia = params.slug === "catia-v5";

  // Dinamik Content Mapping
  const content = {
    title: isCatia ? "CATIA V5 Professional" : (isSolidWorks ? "SolidWorks kursi" : course.title),
    subtitle: isCatia ? "Aviatsiya va Avtomobilsozlik darajasida loyihalash" : (isSolidWorks ? "0 dan professional darajaga" : course.subtitle),
    intro: isCatia 
      ? "CATIA V5 — aviatsiya va avtomobil sanoatida qo'llaniladigan dunyodagi eng kuchli CAD tizimidir. TechAxis bilan ushbu tizimni professional darajada egallang."
      : (isSolidWorks ? "SolidWorks dasturini o‘rganib, real loyihalarda ishlash darajasiga chiqmoqchimisiz? Biz bilan ishga tayyor CAD engineer darajasiga chiqing." : course.description),
    whyTitle: isCatia ? "Nega CATIA o‘rganish kerak?" : "Nega SolidWorks o‘rganish kerak?",
    whyDesc: isCatia 
      ? "CATIA V5 shunchaki dastur emas, bu murakkab tizimlar uchun standartdir. Airbus, Boeing, Ferrari kabi gigantlar aynan shu tizimda ishlaydi."
      : "SolidWorks — bu mexanik dizayn va mahsulot ishlab chiqishda ishlatiladigan professional CAD dastur.",
    steps: isCatia ? [
      { step: "1", title: "Muhit", points: ["Interfeys", "Workbench tushunchasi", "Part Design asoslari"] },
      { step: "2", "title": "Surface", points: ["GSD Workbench", "Murakkab yuzalar", "Shape Architecture"] },
      { step: "3", "title": "Assembly", points: ["Product design", "Katta yig'malar", "Constraints"] },
      { step: "4", "title": "Drafting", points: ["Texnik chizmalar", "Sanoat standartlari", "Annotation"] },
      { step: "5", "title": "Loyiha", points: ["Avio-detal dizayni", "Korpus modellashtirish", "Yakun"] }
    ] : [
      { step: "1", title: "Asoslar", points: ["Interfeys", "Sketch asoslari", "Oddiy 3D modellar"] },
      { step: "2", title: "Professional", points: ["Murakkab detallar", "Parametrik dizayn", "Feature modeling"] },
      { step: "3", title: "Assembly", points: ["Yig‘ma modellar", "Motion (harakat)", "Mexanik tizimlar"] },
      { step: "4", title: "Drawing", points: ["2D chizmalar", "Standartlar", "Tayyor fayllar"] },
      { step: "5", title: "Real Loyiha", points: ["Wearable dizayn", "Mexanik tizimlar", "Loyiha yakuni"] }
    ],
    pricing: isCatia ? [
      { name: "Starter", price: "$30", desc: "Asoslar", features: ["Interfeys", "Video darslar", "Topshiriqlar", "Sertifikat"], cta: "Boshlash", best: false },
      { name: "Pro", price: "$120", desc: "Surface & Assembly", features: ["Toliq kurs", "GSD Surfacing", "Katta yig'malar", "Portfolio", "Professional sertifikat"], cta: "Tanlash", best: true },
      { name: "Mentor", price: "$300", desc: "Expert daraja", features: ["Professional + Bonus", "1:1 Mentorlik", "Live darslar", "Ishga tavsiya", "Career help"], cta: "Bog'lanish", best: false }
    ] : [
      { name: "Starter", price: "$20", desc: "Boshlovchilar uchun", features: ["Asosiy kurs", "Video darslar", "Amaliy topshiriqlar", "Telegram guruh", "Sertifikat"], cta: "Boshlash", best: false },
      { name: "Pro", price: "$80", desc: "To'liq muvaffaqiyat", features: ["Asosiy + Pro kurs", "Real loyiha dizayni", "Portfolio tayyorlash", "Texnik ko'mak", "Premium sertifikat"], cta: "Tanlash", best: true },
      { name: "Mentor", price: "$200", desc: "Shaxsiy o'sish", features: ["Barcha Pro imkoniyatlar", "1:1 Mentorlik", "Shaxsiy yordam", "Ishga tavsiya berish", "Shaxsiy karera plani"], cta: "Suhbatga yozilish", best: false }
    ],
    faq: isCatia ? [
      { q: "CATIA juda murakkab tuyuladi. Uni o'rgansa bo'ladimi?", a: "Ha, biz kursni bosqichma-bosqich eng sodda uslubda tayyorlaganmiz. Hech qanday tajribasiz ham boshlash mumkin." },
      { q: "Surtu modellashtirish (Surfacing) o'rgatiladimi?", a: "Albatta, CATIA'ning eng kuchli tomoni GSD (Surfacing) bo'lib, kursimizda bu bo'limga alohida e'tibor qaratiladi." },
      { q: "Kompyuter talabi qanday?", a: "CATIA V5 o'rta darajadagi zamonaviy kompyuterlarda yaxshi ishlaydi. 8GB+ RAM tavsiya etiladi." },
      { q: "Ishga kirishda CATIA'ning o'rni qanday?", a: "O'zbekistondagi avtomobilsozlik (UzAuto) va xalqaro aviatsiya kompaniyalari mutaxassislardan aynan CATIA bilishni talab qiladi." }
    ] : [
      { q: "Qancha vaqtda o‘rganaman?", a: "Odatda 2–4 oy ichida yaxshi darajaga chiqish mumkin, kurs tizimi shunga moslangan." },
      { q: "Ingliz tili kerakmi?", a: "Yo‘q, kurs to'liq o‘zbek tilida sodda tushuntiriladi. Dasturiy terminlar ham batafsil o'rgatiladi." },
      { q: "Noutbukim oddiy bo‘lsa ishlaydimi?", a: "Ha, SolidWorks'ning o'rta versiyalari uchun oddiy noutbuk yetarli bo‘ladi." },
      { q: "Kursdan keyin ish topsam bo‘ladimi?", a: "Ha, biz kurs davomida siz bilan real loyiha asosida portfolio yaratamiz, bu esa ish topishda asosiy rol o'ynaydi." }
    ]
  };

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
                <Sparkles className="w-4 h-4" /> Professional CAD Ta'limi
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                {content.title}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{content.subtitle}</span>
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                {content.intro}
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
                <Link href={`/${locale}/register`} className="flex-1 sm:flex-none">
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-5 px-10 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/25 hover:-translate-y-1">
                    Ro‘yxatdan o‘tish <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href={`/${locale}/courses/${course.id}`} className="flex-1 sm:flex-none">
                   <button className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold py-5 px-10 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all">
                     Bepul darsni ko‘rish
                   </button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-[2.5rem] blur-3xl transform rotate-6 scale-95 transition-transform group-hover:rotate-3"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-3 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                 <img src={course.thumbnail} alt={`${content.title} kurs`} className="w-full h-full object-cover rounded-[2rem]" />
                 <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                       <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-20 font-sans">
        
        {/* H2: Nega CATIA/SolidWorks? */}
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
                      <div className="font-bold text-lg">Product PLM</div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <Terminal className="w-8 h-8 text-purple-400" />
                      <div className="font-bold text-lg">Engineering</div>
                   </div>
                   <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-40 flex flex-col justify-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                      <div className="font-bold text-lg">Standards</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">{content.whyTitle}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {content.whyDesc}
            </p>
            <div className="space-y-4 pt-4">
               {[
                 isCatia ? "Aviatsiya va Kosmik sanoatda standart" : "Zavod va ishlab chiqarishda yuqori daromad",
                 isCatia ? "Avtomobilsozlikda yetakchi uskunalar" : "Xalqaro muhandislik kompaniyalarida ishlash",
                 isCatia ? "UzAuto va xalqaro gigantlarda talabgir" : "Freelancing platformalarda loyihalar olish"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">✓</div>
                    <span className="text-slate-300 font-semibold">{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* H2: Bu kurs kimlar uchun? */}
        <section className="text-center space-y-12 bg-slate-900/30 border border-slate-800 p-12 rounded-[3rem]">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Bu kurs kimlar uchun?</h2>
            <p className="text-slate-400">Kasbiy tajribangizni oshirib, yuqori darajalarga chiqmoqchi bo'lsangiz.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Sparkles, title: "0 dan boshlovchilar", desc: "Sanoat dizaynini endi boshlaganlar" },
               { icon: BookOpen, title: "Muhandislar", desc: "Tajribasini oshirmoqchi bo‘lganlar" },
               { icon: Target, title: "Kasb almashuvchilar", desc: "Yuqori daromadli sohaga o‘tmoqchi bo‘lganlar" },
               { icon: Briefcase, title: "Karyerachi", desc: "Zavod va korxonalarda martaba qilmoqchi bo‘lganlar" }
             ].map((item, i) => (
               <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all group">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                     <item.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* H2: Kurs dasturi (Step-by-step) */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Kurs dasturi (Step-by-step)</h2>
            <p className="text-slate-400">Professional o'quv rejasiga asoslangan bosqichlar</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-4 relative">
             <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-0"></div>
             
             {content.steps.map((item, i) => (
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
                 {[
                   isCatia ? "CATIA V5 da professional ishlay olasiz" : "SolidWorks’da mustaqil ishlay olasiz",
                   isCatia ? "Murakkab Surface (yuyza) dizayni sirlari" : "Real loyiha asosida portfolio yaratasiz",
                   isCatia ? "Sanoat chizmalarini chizish tajribasi" : "Ish topish uchun tayyor skilllarga ega bo‘lasiz",
                   isCatia ? "Katta assambleyalar bilan ishlash malakasi" : "Freelance ish boshlash imkoniyati"
                 ].map((item, i) => (
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
                   { t: "Xalqaro daraja", d: isCatia ? "Aviatsiya va Avto o'quv dasturlari" : "Tushunarli va bosqichma-bosqich o‘qitish" },
                   { t: "Real amaliyot", d: "Nazariya kam, amaliy loyihalar ko'p" },
                   { t: "Ishga yo'naltirilgan", d: "Sanoat talab qiladigan eng so'nggi skilllar" }
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
            <h2 className="text-3xl sm:text-4xl font-black text-white">Narx va tariflar</h2>
            <p className="text-slate-400">Sizga eng mos keladigan rejani tanlang</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {content.pricing.map((plan, i) => (
               <div key={i} className={`relative p-10 rounded-[2.5rem] border ${plan.best ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-slate-950 border-slate-800'} flex flex-col`}>
                  {plan.best && <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase">Eng ommabop</div>}
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
                  <Link href={`/${locale}/register`}>
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
              <HelpCircle className="w-8 h-8 text-blue-500" /> Savollarga javoblar
            </h2>
          </div>
          <div className="grid gap-4">
             {content.faq.map((faq, i) => (
               <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl group">
                  <h4 className="text-white font-bold text-lg mb-3 flex items-center justify-between">
                    {faq.q}
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:rotate-90 transition-transform" />
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
              <p className="text-blue-100 text-lg opacity-80">TechAxis bilan xalqaro muhandislik olamiga ilk qadamingizni qo'ying.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                 <Link href={`/${locale}/register`}>
                   <button className="bg-white text-blue-700 font-black py-5 px-12 rounded-2xl text-xl hover:scale-105 transition-transform shadow-2xl">
                     Kursni boshlash
                   </button>
                 </Link>
                 <Link href={`/${locale}/free`}>
                   <button className="bg-blue-800/40 backdrop-blur-md border border-white/20 text-white font-black py-5 px-12 rounded-2xl text-xl hover:bg-blue-800/60 transition-all">
                     Bepul konsultatsiya
                   </button>
                 </Link>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
