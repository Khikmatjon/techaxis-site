"use client";

import React from 'react';
import { ShieldCheck, Users, Award } from 'lucide-react';

export const About = ({ dict }: { dict: any }) => {
  // Statistikani lug'atga bog'laymiz
  const stats = [
    { 
      label: dict.about.exp_label || "Loyiha tajribasi", 
      value: "10+", 
      icon: <Award className="text-blue-500" /> 
    },
    { 
      label: dict.about.partners_label || "Hamkor korxonalar", 
      value: "15+", 
      icon: <Users className="text-emerald-500" /> 
    },
    { 
      label: "Sanoat standartlari", 
      value: "100%", 
      icon: <ShieldCheck className="text-red-500" /> 
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Chap tomon: Vizual va Tajriba */}
          <div className="relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1974" 
                alt="Engineering Team" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Tajriba badji - HMC/KIA o'zgarmaydi, tavsif o'zgaradi */}
            <div className="absolute -bottom-10 -right-10 z-20 bg-blue-600 text-white p-8 rounded-[32px] shadow-2xl max-w-[280px]">
              <div className="text-4xl font-bold mb-2">HMC / KIA</div>
              <p className="text-sm text-blue-100 font-medium">
                {dict.projects.items.tmed.desc}
              </p>
            </div>

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          {/* O'ng tomon: Matnli ma'lumot */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {dict.navbar.about}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                {dict.about.subtitle}
              </h3>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>TechAxis Group</strong> — {dict.services.description}
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* Statistika */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {stat.icon}
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button className="flex items-center space-x-3 text-blue-600 font-bold group">
                <span>{dict.projects.view_all}</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};