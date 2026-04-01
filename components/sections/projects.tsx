"use client";

import React from 'react';
import { Lightbulb, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = ({ dict }: { dict: any }) => {
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
             Muhandislik yechimlari bo'yicha loyihalarimiz sahifasi tez kunda yangilanadi. Hozirda asosiy e'tibor ta'lim va professional treninglarga qaratilgan.
          </p>
        </div>

        {/* Empty State / Training CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl p-12 lg:p-24 text-center"
        >
            <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-3xl -z-0"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100 dark:border-slate-700">
                 <Lightbulb className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                Loyihalar portfelni yangilanmoqda...
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Biz ayni paytda eng yaxshi muhandislik amaliyotlarimiz va sanoat loyihalarimizni portfolioga kiritish ustida ishlayapmiz. Ungacha, siz <strong>O'quv markazimizning kurslari va treninglari</strong> bilan tanishishingiz mumkin.
              </p>
              
              <div className="pt-4 flex justify-center">
                <a 
                  href="#services" 
                  className="group flex items-center gap-3 bg-[#0084FF] hover:bg-blue-600 text-white px-8 py-5 rounded-full font-black transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
                >
                  Treninglarga o'tish
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};