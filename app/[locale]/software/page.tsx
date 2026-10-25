import React from 'react';
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { ArrowUpRight, CheckCircle2, Download } from 'lucide-react';
import { pick } from "@/lib/locale-text";

const T = {
  uz: {
    sw: "Sanoat standarti darajasidagi 3D CAD dasturiy ta'minoti. Mashinasozlik va muhandislik sohasida eng ko'p ishlatiladigan dasturlardan biri.",
    swF: ["3D detal va yig'ma (Part & Assembly)", "Simulation (FEA/CFD)", "PDM (ma'lumotlarni boshqarish)", "CAM bilan integratsiya"],
    catia: "Dassault Systèmes kompaniyasining professional muhandislik yechimi. Aviatsiya, avtomobilsozlik va murakkab tizimlar uchun mo'ljallangan.",
    catiaF: ["Murakkab yuzalar (Surface Design)", "Systems Engineering", "Listli metall (Sheetmetal Design)", "Kompozitlar"],
    x: "Bulutli platforma orqali jamoaviy ishlash va PLM (Mahsulot hayotiy siklini boshqarish) imkoniyatlari.",
    xF: ["Bulutda jamoaviy ishlash", "Loyihalarni boshqarish", "ENOVIA bilan integratsiya", "DELMIA Simulation"],
    h1a: "Dasturiy", h1b: "ta'minot",
    intro: "SOLIDWORKS, CATIA va 3DEXPERIENCE bo'yicha litsenziya tanlash, o'rnatish va ishlashni o'rganishda yordam beramiz.",
    buy: "Litsenziya sotib olish", trial: "Sinov versiyasi bo'yicha so'rov",
  },
  ru: {
    sw: "3D CAD-программа промышленного уровня. Одна из самых используемых программ в машиностроении и инженерии.",
    swF: ["3D-детали и сборки (Part & Assembly)", "Simulation (FEA/CFD)", "PDM (управление данными)", "Интеграция с CAM"],
    catia: "Профессиональное инженерное решение компании Dassault Systèmes. Предназначено для авиации, автомобилестроения и сложных систем.",
    catiaF: ["Сложные поверхности (Surface Design)", "Systems Engineering", "Листовой металл (Sheetmetal Design)", "Композиты"],
    x: "Командная работа через облачную платформу и возможности PLM (управление жизненным циклом изделия).",
    xF: ["Облачная совместная работа", "Управление проектами", "Интеграция с ENOVIA", "DELMIA Simulation"],
    h1a: "Программное", h1b: "обеспечение",
    intro: "Поможем выбрать лицензию SOLIDWORKS, CATIA и 3DEXPERIENCE, установить программу и научиться в ней работать.",
    buy: "Купить лицензию", trial: "Запросить пробную версию",
  },
  en: {
    sw: "Industry-standard 3D CAD software. One of the most widely used programs in mechanical engineering.",
    swF: ["3D parts and assemblies", "Simulation (FEA/CFD)", "PDM (data management)", "CAM integration"],
    catia: "A professional engineering solution from Dassault Systèmes, designed for aviation, the automotive industry and complex systems.",
    catiaF: ["Advanced Surface Design", "Systems Engineering", "Sheetmetal Design", "Composites"],
    x: "Teamwork on a cloud platform and PLM (product lifecycle management) capabilities.",
    xF: ["Cloud collaboration", "Project management", "ENOVIA integration", "DELMIA Simulation"],
    h1a: "Engineering", h1b: "software",
    intro: "We help you choose a SOLIDWORKS, CATIA or 3DEXPERIENCE license, install it and learn to work with it.",
    buy: "Buy a license", trial: "Request a trial version",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("software", locale, "/software");
}

export default async function SoftwarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = pick(T, locale);
  const dict: any = await getDictionary(locale as Locale);

  const softwareList = [
    {
      id: "solidworks",
      name: "SOLIDWORKS",
      description: t.sw,
      features: t.swF,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
      color: "from-red-500 to-red-700",
      bgLight: "bg-red-50 dark:bg-red-900/10"
    },
    {
      id: "catia",
      name: "CATIA",
      description: t.catia,
      features: t.catiaF,
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1974",
      color: "from-blue-600 to-blue-800",
      bgLight: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      id: "3dexperience",
      name: "3DEXPERIENCE",
      description: t.x,
      features: t.xF,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070",
      color: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50 dark:bg-cyan-900/10"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("software", locale), path: "/software" }])} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.h1a} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">{t.h1b}</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            {t.intro}
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {software.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-blue-500" />
                       <span className="text-slate-700 dark:text-slate-300 font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href={`/${locale}#contact`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    {t.buy}
                  </a>
                  <a href={`/${locale}#contact`} className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    {t.trial} <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${software.color} opacity-20 mix-blend-overlay z-10`}></div>
                  <Image src={software.image} alt={software.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
