"use client";

import React from 'react';
import { Settings, Cpu, GraduationCap, Cloud, Ruler, BarChart3, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const Services = ({ dict }: { dict: any }) => {
  const services = [
    {
      title: dict?.services?.software_sales || "Dasturiy Ta'minot Savdosi",
      desc: dict?.services?.software_sales_desc || "SOLIDWORKS, CATIA va 3DEXPERIENCE platformalari uchun rasmiy litsenziyalash.",
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50",
      href: "/software"
    },
    {
      title: dict?.services?.design || "Mexanik Dizayn",
      desc: dict?.services?.design_desc || "HMC/KIA standartlari bo'yicha yuqori aniqlikdagi 3D modellashtirish.",
      icon: <Ruler className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-50",
      href: "/solutions#design"
    },
    {
      title: dict?.services?.training || "Korporativ Ta'lim",
      desc: dict?.services?.training_desc || "Xalqaro standartlar bo'yicha xodimlarni o'qitish va sertifikatlash.",
      icon: <GraduationCap className="w-8 h-8 text-red-600" />,
      color: "bg-red-50",
      href: "/training"
    },
    {
      title: dict?.services?.plm || "PLM Tizimlari",
      desc: dict?.services?.plm_desc || "Mahsulot hayotiy siklini boshqarish tizimlarini joriy qilish.",
      icon: <Cloud className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-50",
      href: "/software#plm"
    },
    {
      title: dict?.services?.analysis || "Simulyatsiya va Tahlil",
      desc: dict?.services?.analysis_desc || "Mustahkamlik va termal tahlillarni raqamli tekshirish.",
      icon: <BarChart3 className="w-8 h-8 text-amber-600" />,
      color: "bg-amber-50",
      href: "/solutions#analysis"
    },
    {
      title: dict?.services?.consulting || "Texnik Konsalting",
      desc: dict?.services?.consulting_desc || "Ishlab chiqarishni raqamlashtirish bo'yicha maslahatlar.",
      icon: <Cpu className="w-8 h-8 text-cyan-600" />,
      color: "bg-cyan-50",
      href: "/solutions#consulting"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header of Services Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-cyan-500 uppercase tracking-widest mb-4">
              {dict?.services?.title || "Bizning xizmatlar"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {dict?.services?.subtitle || "Sanoat uchun kompleks muhandislik yechimlari"}
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
            {dict?.services?.description || "Biz g'oyadan tortib ishlab chiqarishgacha bo'lgan barcha bosqichlarda ko'maklashamiz."}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              href={service.href}
              key={index} 
              className="group relative p-8 md:p-10 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Subtle Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              
              <div className="relative z-10 flex-1">
                <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center ${service.color} dark:bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Action Bar */}
              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Batafsil ma'lumot</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};