import React from 'react';
import Link from 'next/link';
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { getCourses, getTotalLessons } from "@/lib/courses-db";
import { Certifications } from "@/components/sections/certifications";

// Bazadan o'qiladi: soatiga bir marta yangilanadi, admin panelda saqlanganda esa darhol
// (revalidatePath). Oraliqda sahifa CDN keshidan tez beriladi.
export const revalidate = 3600;

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale as Locale);
  const courses = await getCourses();

  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 font-display">Professional Muhandislik Kurslari</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              SOLIDWORKS va CATIA dasturlarini noldan, amaliy loyihalar orqali o'rganing.
            </p>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {courses.map((course) => {
            const totalLessons = getTotalLessons(course);
            return (
            <Link key={course.id} href={`/${locale}/courses/${course.id}`} className="group block">
              <div className="rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{course.level}</span>
                    <span className="text-sm text-slate-500">{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{course.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 line-clamp-2">{course.subtitle}</p>
                  <ul className="space-y-1.5 mb-6">
                    {course.tags.slice(0, 3).map(t => (
                      <li key={t} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-blue-500 rounded-full shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-slate-800 mt-auto">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">${course.price}</span>
                      <span className="text-xs text-slate-500 ml-1">{totalLessons} dars</span>
                    </div>
                    <span className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs group-hover:bg-blue-600 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors">
                      Ko'rish →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* B2B / University Section */}
        <div className="bg-blue-600 rounded-[50px] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div>
              <h2 className="text-4xl font-bold mb-6">Universitetlar va Korxonalar uchun</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Biz ta'lim muassasalari va zavodlar uchun maxsus o'quv dasturlarini taqdim etamiz. 
                Guruh bo'lib o'qish va dasturlarni o'rnatishda yordam beramiz.
              </p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition-colors">
                Hamkorlik taklifini yuklab olish (PDF)
              </button>
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