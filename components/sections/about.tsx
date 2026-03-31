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
                alt="Engineering Team" 
                className="w-full h-auto aspect-[4/5] object-cover"
              />
            </motion.div>
            
            {/* Glassmorphic Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 lg:-right-12 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 rounded-[32px] shadow-2xl border border-white/20 dark:border-slate-800/50 max-w-[300px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/30">
                  HMC
                </div>
                <div className="font-black text-2xl text-slate-900 dark:text-white">KIA MOTORS</div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {dict?.projects?.items?.transmission?.desc || "Raqamli egizak (Digital Twin) texnologiyasi orqali yig'ish jarayonlarini simulyatsiya qilish."}
              </p>
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
                {dict?.about?.subtitle || "Muhandislik va Innovatsiyalar Markazi"}
              </h3>
            </div>

            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <span className="text-[#0084FF] font-black">TechAxis Group</span> — {dict?.services?.description || "Biz g'oyadan tortib ishlab chiqarishgacha bo'lgan barcha bosqichlarda ko'maklashamiz."}
              </p>
              <p className="text-slate-500 dark:text-slate-500 leading-relaxed">
                Bizning markazimiz O'zbekistonda sanoat va muhandislikni raqamlashtirish bo'yicha global texnologiyalarni (SOLIDWORKS, CATIA) joriy etishga ixtisoslashgan. Biz nafaqat dasturiy ta'minot sotamiz, balki to'liq muhandislik yechimlarini taklif etamiz.
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