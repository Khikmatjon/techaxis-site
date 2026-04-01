import React from 'react';
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

export default async function SoftwarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict: any = await getDictionary(locale as Locale);

  const softwareList = [
    {
      id: "solidworks",
      name: "SOLIDWORKS",
      description: "Sanoat standarti darajasidagi 3D CAD dasturiy ta'minoti. Mashinasozlik va injiniring sohasida eng ko'p ishlatiladigan dasturlardan biri.",
      features: ["3D Part & Assembly", "Simulation (FEA/CFD)", "PDM (Data Management)", "CAM Integration"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
      color: "from-red-500 to-red-700",
      bgLight: "bg-red-50 dark:bg-red-900/10"
    },
    {
      id: "catia",
      name: "CATIA",
      description: "Dassault Systèmes kompaniyasining eng ilg'or muhandislik yechimi. Aviatsiya, avtomobilsozlik va murakkab tizimlar uchun mo'ljallangan.",
      features: ["Advanced Surface Design", "Systems Engineering", "Sheetmetal Design", "Composites"],
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1974",
      color: "from-blue-600 to-blue-800",
      bgLight: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      id: "3dexperience",
      name: "3DEXPERIENCE",
      description: "Bulutli platforma orqali jamoaviy ishlash va PLM (Mahsulot hayotiy siklini boshqarish) imkoniyatlari.",
      features: ["Cloud Collaboration", "Project Management", "ENOVIA Integration", "DELMIA Simulation"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070",
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 dark:bg-cyan-900/10"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Rasmiy Dasturiy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Ta'minotlar</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            TechAxis Group - O'zbekistonda SOLIDWORKS va Dassault Systèmes mahsulotlarining ishonchli hamkori. Biz litsenziyalar, texnik yordam va joriy qilish hizmatlarini taklif etamiz.
          </p>
        </div>

        {/* Software Cards */}
        <div className="space-y-16">
          {softwareList.map((software, i) => (
            <div 
              key={software.id} 
              id={software.id}
              className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center bg-slate-50 dark:bg-slate-900/50 p-8 lg:p-12 rounded-[40px] border border-slate-100 dark:border-slate-800`}
            >
              <div className="flex-1 w-full space-y-8">
                <div>
                   <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{software.name}</h2>
                   <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                     {software.description}
                   </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {software.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-blue-500" />
                       <span className="text-slate-700 dark:text-slate-300 font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href={`/${locale}#contact`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    Litsenziya sotib olish
                  </a>
                  <button className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    Trial versiya <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${software.color} opacity-20 mix-blend-overlay z-10`}></div>
                  <img src={software.image} alt={software.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
