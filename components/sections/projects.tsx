"use client";

import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export const Projects = ({ dict }: { dict: any }) => {
  const projects = [
    {
      title: "TMED P1/P2 Telemetry System",
      client: "Hyundai Motor Company (HMC)",
      desc: "Gibrid avtomobil kuch qurilmalari (Powertrain) uchun real vaqt rejimida haroratni monitoring qiluvchi telemetriya tizimini ishlab chiqish va o'rnatish.",
      tags: ["IoT", "Data Logging", "CATIA"],
      image: "https://images.unsplash.com/photo-1597766354181-4228c2e6f494?q=80&w=2070",
    },
    {
      title: "Motor Component 3D Design",
      client: "LG Magna e-Powertrain",
      desc: "Elektr dvigatel qismlarini yuqori aniqlikda modellashtirish va ishlab chiqarishga tayyorlash jarayonlarini optimallashtirish.",
      tags: ["3D Design", "SolidWorks", "Manufacturing"],
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1974",
    },
    {
      title: "Automotive Transmission Assembly",
      client: "KIA Motors",
      desc: "Transmissiya bloklarini yig'ish jarayonini raqamli egizak (Digital Twin) texnologiyasi orqali simulyatsiya qilish.",
      tags: ["Digital Twin", "Simulation", "Assembly"],
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070",
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Sarlavha */}
        <div className="mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Muvaffaqiyat hikoyalari</h2>
          <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6">
            Amalga oshirilgan yirik loyihalar
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Janubiy Koreyaning yetakchi avtomobil va texnologiya kompaniyalari uchun ishlab chiqilgan muhandislik yechimlari.
          </p>
        </div>

        {/* Loyihalar ro'yxati */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
            >
              {/* Rasm qismi */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <ExternalLink className="text-white w-12 h-12" />
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Matn qismi */}
              <div className="p-8 flex-grow">
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-widest">{project.client}</div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                  {project.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                  {project.desc}
                </p>

                {/* Taglar */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-6 italic">Va yana 10 dan ortiq sanoat loyihalari...</p>
          <button className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
            <span>To'liq portfolioni ko'rish</span>
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};