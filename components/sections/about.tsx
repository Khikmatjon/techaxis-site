"use client";

import React from 'react';
import { ShieldCheck, Users, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = ({ dict }: { dict: any }) => {
  const stats = [
    { 
      label: dict?.about?.exp_label || "Loyiha tajribasi", 
      value: "10+", 
      icon: <Award className="w-5 h-5 text-blue-500" /> 
    },
    { 
      label: dict?.about?.partners_label || "Hamkor korxonalar", 
      value: "15+", 
      icon: <Users className="w-5 h-5 text-emerald-500" /> 
    },
    { 
      label: "Sanoat standartlari", 
      value: "100%", 
      icon: <ShieldCheck className="w-5 h-5 text-red-500" /> 
    },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[120px] -z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* L: VIZUAL QISM */}
          <div className="relative">
            {/* Asosiy rasm ramkasi */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[48px] overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070" 
                alt="Engineering Training" 
                className="w-full h-auto aspect-[4/5] object-cover"
              />
            </motion.div>

            {/* Decorative dots/shapes */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl -z-0"></div>
          </div>

          {/* R: MATNLI MA'LUMOT */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-sm font-black text-cyan-500 uppercase tracking-widest">
                {dict?.navbar?.about || "Kompaniya haqida"}
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {dict?.about?.subtitle || "Muhandislik va Tajriba Markazi"}
              </h3>
            </div>

            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <span className="text-[#0084FF] font-black">TechAxis Group</span> — zamonaviy texnologiyalarni o'rganish va amaliyotga joriy etishga ixtisoslashgan.
              </p>
              <p className="text-slate-500 dark:text-slate-500 leading-relaxed">
                Asosiy e'tibor ta'lim markaziga, jumladan SOLIDWORKS, CATIA va boshqa injiniring dasturlarini 0 dan professional darajagacha o'rgatishga qaratilgan.
              </p>
            </div>

            {/* Statistika - Modern Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      {stat.icon}
                    </div>
                    <span className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-none">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="group flex items-center gap-3 bg-[#0084FF] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl active:scale-95">
                <span>{dict?.projects?.view_all || "Barcha loyihalar"}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};