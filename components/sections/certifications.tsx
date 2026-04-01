"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Certifications = ({ dict }: { dict: any }) => {
  const certifications = [
    {
      title: "SOLIDWORKS Sertifikatlari",
      level: "CSWA, CSWP, CSWE",
      desc: "Xalqaro darajadagi SOLIDWORKS mutaxassisi ekanligingizni tasdiqlovchi rasmiy sertifikatlar. Bizning kurslarimiz sizni ushbu imtihonlarga 100% tayyorlaydi.",
      steps: [
        "CSWA (Asosiy) darajaga tayyorgarlik",
        "CSWP (Professional) murakkab detallar",
        "Amaliy testlar va simulyatsiyalar"
      ],
      link: "https://www.solidworks.com/certifications",
      color: "from-red-500 to-red-600",
      bgLight: "bg-red-50 dark:bg-red-900/10",
      iconColor: "text-red-600"
    },
    {
      title: "CATIA Sertifikatlari",
      level: "Part Design, Assembly",
      desc: "Dassault Systèmes tomonidan taqdim etiladigan CATIA rasmiy sertifikatlari. Sanoat va avtomobilsozlik standartlari asosida tayyorgarlik.",
      steps: [
        "V5 / 3DEXPERIENCE asoslari",
        "Yuzaki modellashtirish (Surface Design)",
        "Rasmiy imtihon strategiyalari"
      ],
      link: "https://www.3ds.com/training/certification",
      color: "from-blue-500 to-blue-700",
      bgLight: "bg-blue-50 dark:bg-blue-900/10",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <section id="certificates" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-black text-cyan-500 uppercase tracking-widest">
            Xalqaro Sertifikatlar
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Rasmiy sertifikatlarga tayyorgarlik
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            O'quv markazimiz sizni nufuzli sanoat sertifikatlarini olishga tayyorlaydi. Barcha o'quv dasturlari va talablar rasmiy manbalardan olingan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-slate-50 dark:bg-slate-900 rounded-[32px] p-8 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              {/* Background gradient blur */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cert.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity`}></div>

              <div className="relative z-10 flex gap-6 items-start">
                <div className={`w-16 h-16 ${cert.bgLight} rounded-2xl flex items-center justify-center shrink-0`}>
                  <ShieldCheck className={`w-8 h-8 ${cert.iconColor}`} />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                      {cert.level}
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                      {cert.title}
                    </h4>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {cert.desc}
                  </p>

                  <div className="pt-4 space-y-3 border-t border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-2">Tayyorgarlik bosqichlari:</p>
                    {cert.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className={`w-5 h-5 ${cert.iconColor}`} />
                        <span className="font-medium">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <a 
                      href={cert.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <span>Rasmiy ma'lumot (Veb-sayt)</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
