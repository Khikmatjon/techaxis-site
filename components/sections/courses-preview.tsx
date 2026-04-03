"use client";

import React from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/courses';
import { Star, Users, ArrowRight, Zap, Play } from 'lucide-react';

export const CoursesPreview = ({ dict, locale }: { dict: any, locale: string }) => {
  return (
    <section id="courses" className="py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
            <Zap className="w-4 h-4" /> {dict?.navbar?.training || "Ta'lim"}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Muhandislik Kurslari</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Sanoat standartlari asosida tayyorlangan, amaliy loyihalarga boy o'quv dasturlarimiz bilan tanishing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.slice(0, 3).map((course) => (
            <div key={course.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                      <Play className="w-6 h-6 fill-white" />
                   </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 dark:text-cyan-400 shadow-lg">
                  {course.level}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> {course.rating}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-500" /> {course.studentsCount} o'quvchi</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed flex-1">
                  {course.description}
                </p>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{locale === 'uz' ? 'Kurs narxi' : 'Course price'}</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{course.priceUZS.toLocaleString()} UZS</div>
                  </div>
                  <Link href={`/${locale}/courses/${course.id}`}>
                    <button className="bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-white p-3 rounded-2xl transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Link href={`/${locale}/dashboard`}>
                <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all">
                    Barcha kurslarni ko'rish <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
        </div>
      </div>
    </section>
  );
};
