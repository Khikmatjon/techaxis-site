"use client";

import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = ({ dict }: { dict: any }) => {
  const projects = [
    {
      title: dict?.projects?.items?.tmed?.title || "TMED P1/P2 Telemetry System",
      client: "Hyundai Motor Company (HMC)",
      desc: dict?.projects?.items?.tmed?.desc || "Gibrid avtomobil kuch qurilmalari uchun real vaqt rejimida haroratni monitoring qiluvchi tizim.",
      tags: ["IoT", "Powertrain", "CATIA"],
      image: "https://images.unsplash.com/photo-1597766354181-4228c2e6f494?auto=format&fit=crop&q=80&w=2070",
    },
    {
      title: dict?.projects?.items?.motor?.title || "Motor Component 3D Design",
      client: "LG Magna e-Powertrain",
      desc: dict?.projects?.items?.motor?.desc || "Elektr dvigatel qismlarini yuqori aniqlikda modellashtirish va ishlab chiqarishni optimallashtirish.",
      tags: ["3D Design", "SolidWorks", "Simulations"],
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1974",
    },
    {
      title: dict?.projects?.items?.transmission?.title || "Automotive Transmission Assembly",
      client: "KIA Motors",
      desc: dict?.projects?.items?.transmission?.desc || "Transmissiya bloklarini yig'ish jarayonini raqamli egizak (Digital Twin) texnologiyasi orqali simulyatsiya qilish.",
      tags: ["Simulation", "Assembly", "Digital Twin"],
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070",
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header of Projects Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-cyan-500 uppercase tracking-widest mb-4">
              {dict?.projects?.title || "Muvaffaqiyat hikoyalari"}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {dict?.projects?.subtitle || "Amalga oshirilgan yirik loyihalar"}
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
            {dict?.projects?.description || "Janubiy Koreyaning yetakchi avtomobil va texnologiya kompaniyalari uchun ishlab chiqilgan muhandislik yechimlari."}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image with Hover Effect */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Floating Badge Label */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20 dark:border-slate-800/50 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {project.client}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Hover overlay button link */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 flex flex-col items-center">
          <p className="text-slate-500 font-medium mb-8 text-center italic">
            {dict?.projects?.more_projects || "Va yana 10 dan ortiq sanoat loyihalari muvaffaqiyatli topshirilgan"}
          </p>
          <button className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-full font-black transition-all shadow-xl hover:shadow-2xl active:scale-95">
            <span>{dict?.projects?.view_all || "Barcha loyihalar"}</span>
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};