import React from 'react';
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { Certifications } from "@/components/sections/certifications";

const courses = [
  {
    title: "SOLIDWORKS Essential",
    duration: "4 hafta",
    level: "Boshlang'ich",
    price: "$200",
    topics: ["Sketching", "Part Modeling", "Assembly", "Drawings"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
  },
  {
    title: "CATIA Surface Expert",
    duration: "6 hafta",
    level: "Professional",
    price: "$450",
    topics: ["Generative Shape Design", "Class-A Surfaces", "Real-time Rendering"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070"
  },
  {
    title: "3DEXPERIENCE Admin",
    duration: "3 hafta",
    level: "Ekspert",
    price: "$350",
    topics: ["Cloud Setup", "Data Management", "PLM Workflow"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070"
  }
];

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale as Locale);

  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 font-display">Professional Muhandislik Kurslari</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Xalqaro standartlar asosida SOLIDWORKS va CATIA dasturlarini o'rganing. 
              Bizning kurslarimiz sizni CSWA, CSWP va CATIA V6 sertifikatlariga tayyorlaydi.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-blue-600/10 text-blue-600 rounded-2xl font-bold border border-blue-600/20">
               Authorized Training
             </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {courses.map((course) => (
            <div key={course.title} className="group rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-2xl transition-all">
              <div className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{course.level}</span>
                  <span className="text-sm text-slate-500">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <ul className="space-y-2 mb-8">
                  {course.topics.map(t => (
                    <li key={t} className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-2xl font-bold">{course.price}</span>
                  <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm">
                    Ro'yxatdan o'tish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B2B / University Section */}
        <div className="bg-blue-600 rounded-[50px] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Universitetlar va Korxonalar uchun</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Biz ta'lim muassasalari va zavodlar uchun maxsus o'quv dasturlarini taqdim etamiz. 
                Guruh bo'lib o'qish, litsenziyalarni o'rnatish va xalqaro imtihonlarni tashkil qilishda yordam beramiz.
              </p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition-colors">
                Hamkorlik taklifini yuklab olish (PDF)
              </button>
            </div>
            <div className="hidden lg:block">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm text-blue-100">Bitiruvchilar</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <div className="text-3xl font-bold mb-2">12+</div>
                    <div className="text-sm text-blue-100">Hamkor OTMlar</div>
                  </div>
               </div>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-5 rounded-full" />
        </div>
      </div>

      {/* Certifications Preparation Section */}
      <div className="mt-20">
        <Certifications dict={dict} />
      </div>

    </div>
  );
}