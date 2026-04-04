import { Metadata } from "next";
import Link from "next/link";
import { Play, Star, Users, ArrowRight, BookOpen, Clock, Layers } from "lucide-react";
import { COURSES } from "@/lib/courses";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict?.navbar?.courses ? `${dict.navbar.courses} | TechAxis` : "Barcha Kurslar | TechAxis",
    description: "Sanoat standartlari asosida tayyorlangan professional muhandislik kurslari ro'yxati.",
  };
}

export default async function CoursesCatalog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      
      {/* 🚀 HEADER SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
             <Layers className="w-4 h-4" /> {dict?.navbar?.training || "To'liq Ta'lim"}
           </div>
           
           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
             Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Kurslar Katalogi</span>
           </h1>
           
           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
             O'zingizga mos bo'lgan xalqaro muhandislik dasturini tanlang va yirik korporatsiyalarda ishlash baxtiga muyassar bo'ling!
           </p>
        </div>
      </section>

      {/* 🧩 KURS ROYXATI KONTENTI */}
      <section className="py-20 lg:py-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COURSES.map((course) => (
                <div key={course.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2 flex flex-col">
                  {/* RASM */}
                  <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Link href={`/${locale}/courses/${course.id}`}>
                         <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-white" />
                         </div>
                       </Link>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] items-center flex font-black uppercase text-blue-600 dark:text-cyan-400 shadow-md">
                      {course.level}
                    </div>
                  </div>

                  {/* KONTENT */}
                  <div className="p-8 flex flex-col flex-1 space-y-5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> {course.rating}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-500" /> {course.studentsCount} {locale === 'uz' ? "o'quvchi" : "students"}</span>
                    </div>

                    <div>
                      <Link href={`/${locale}/courses/${course.id}`}>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors leading-tight mb-2">
                          {course.title}
                        </h3>
                      </Link>
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                       <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-emerald-500" /> {course.duration}</span>
                       <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg"><BookOpen className="w-4 h-4 text-purple-500" /> {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} {locale === 'uz' ? 'dars' : 'lessons'}</span>
                    </div>

                    <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{locale === 'uz' ? 'Kurs narxi' : 'Course price'}</div>
                        <div className="text-[1.3rem] font-black text-slate-900 dark:text-white">{course.priceUZS.toLocaleString()} UZS</div>
                      </div>
                      <Link href={`/${locale}/courses/${course.id}`}>
                        <button className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-slate-900 dark:text-white p-3.5 rounded-2xl transition-all shadow-sm group-hover:-translate-x-1">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

    </div>
  );
}
