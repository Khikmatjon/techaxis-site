"use client";

import React from 'react';
import { Settings, Cpu, GraduationCap, Cloud, Ruler, BarChart3 } from 'lucide-react';

export const Services = ({ dict }: { dict: any }) => {
  const services = [
    {
      title: dict?.services?.software_sales || "Dasturiy Ta'minot Savdosi",
      desc: dict?.services?.software_sales_desc || "SOLIDWORKS, CATIA va 3DEXPERIENCE...",
      icon: <Settings className="w-10 h-10 text-blue-600" />,
      tag: "Licensing"
    },
    {
      title: dict?.services?.design || "Mexanik Dizayn",
      desc: dict?.services?.design_desc || "HMC/KIA standartlari bo'yicha...",
      icon: <Ruler className="w-10 h-10 text-emerald-600" />,
      tag: "Engineering"
    },
    {
      title: dict?.services?.training || "Korporativ Ta'lim",
      desc: dict?.services?.training_desc || "Xalqaro standartlar bo'yicha...",
      icon: <GraduationCap className="w-10 h-10 text-red-600" />,
      tag: "Training"
    },
    {
      title: dict?.services?.plm || "PLM Tizimlari",
      desc: dict?.services?.plm_desc || "3DEXPERIENCE platformasi orqali...",
      icon: <Cloud className="w-10 h-10 text-indigo-600" />,
      tag: "Cloud"
    },
    {
      title: dict?.services?.analysis || "Simulyatsiya",
      desc: dict?.services?.analysis_desc || "Mustahkamlik va termal tahlillar...",
      icon: <BarChart3 className="w-10 h-10 text-amber-600" />,
      tag: "Analysis"
    },
    {
      title: dict?.services?.consulting || "Konsalting",
      desc: dict?.services?.consulting_desc || "Ishlab chiqarishni raqamlashtirish...",
      icon: <Cpu className="w-10 h-10 text-slate-600" />,
      tag: "Consulting"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
              {dict?.services?.title}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
              {dict?.services?.subtitle}
            </h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm italic text-sm leading-relaxed">
            {dict?.services?.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-8 p-4 bg-white dark:bg-slate-800 w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                {service.tag}
              </span>
              <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                {service.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};