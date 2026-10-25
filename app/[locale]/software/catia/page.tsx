import React from 'react';
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/locale-text";

// Paket nomi va narx -- hamma tilda bir xil; matnlar pastda (T) uch tilda.
const OFFERS = [
  { name: "Engineering Excellence", price: "$4,500", recommended: false },
  { name: "Systems Engineering", price: "$6,200", recommended: true },
  { name: "Creative Design", price: "$8,900", recommended: false },
];

const T = {
  uz: {
    subtitle: "Muhandislik va dizayn paketlari",
    period: "taxminan / yil",
    cta: "Narxini so'rash",
    offers: [
      {
        desc: "Mexanik muhandislik va mahsulot dizayni uchun asosiy paket.",
        features: [
          "Advanced Part & Assembly Design",
          "Generative Shape Design (Yuzalar dizayni)",
          "Mechanism Simulation",
          "3DMaster (Annotatsiyalar va o'lchamlar)",
          "Bulutli ma'lumotlarni boshqarish",
          "Texnik qo'llab-quvvatlash",
        ],
      },
      {
        desc: "Murakkab tizimlar va mexatronik loyihalar uchun professional yechim.",
        features: [
          "Engineering Excellence paketining barcha imkoniyatlari",
          "Tizim arxitekturasini modellashtirish",
          "Dinamik tizimlar simulyatsiyasi",
          "Elektr va gidravlik tizimlarni loyihalash",
          "Talablarni boshqarish (Requirements)",
          "Texnik qo'llab-quvvatlash",
        ],
      },
      {
        desc: "Avtomobilsozlik va aerokosmik sanoat uchun Class-A yuzalar va vizualizatsiya.",
        features: [
          "Systems Engineering paketining barcha imkoniyatlari",
          "ICEM Surf Professional (Class-A surfaces)",
          "Human Builder (Ergonomika)",
          "Virtual reallik (VR) bilan ishlash",
          "Real vaqtda yuqori sifatli rendering",
          "Shaxsiy menejer",
        ],
      },
    ],
  },
  ru: {
    subtitle: "Пакеты для инженерии и дизайна",
    period: "примерно / год",
    cta: "Узнать цену",
    offers: [
      {
        desc: "Базовый пакет для машиностроения и дизайна изделий.",
        features: [
          "Advanced Part & Assembly Design",
          "Generative Shape Design (дизайн поверхностей)",
          "Mechanism Simulation",
          "3DMaster (аннотации и размеры)",
          "Облачное управление данными",
          "Техническая поддержка",
        ],
      },
      {
        desc: "Профессиональное решение для сложных систем и мехатронных проектов.",
        features: [
          "Все возможности пакета Engineering Excellence",
          "Моделирование архитектуры систем",
          "Симуляция динамических систем",
          "Проектирование электрических и гидравлических систем",
          "Управление требованиями (Requirements)",
          "Техническая поддержка",
        ],
      },
      {
        desc: "Поверхности класса A и визуализация для автомобильной и аэрокосмической отрасли.",
        features: [
          "Все возможности пакета Systems Engineering",
          "ICEM Surf Professional (поверхности класса A)",
          "Human Builder (эргономика)",
          "Работа с виртуальной реальностью (VR)",
          "Высококачественный рендеринг в реальном времени",
          "Персональный менеджер",
        ],
      },
    ],
  },
  en: {
    subtitle: "Engineering and design packages",
    period: "approx. / year",
    cta: "Request a price",
    offers: [
      {
        desc: "The core package for mechanical engineering and product design.",
        features: [
          "Advanced Part & Assembly Design",
          "Generative Shape Design (surface design)",
          "Mechanism Simulation",
          "3DMaster (annotations and dimensions)",
          "Cloud data management",
          "Technical support",
        ],
      },
      {
        desc: "A professional solution for complex systems and mechatronic projects.",
        features: [
          "Everything in Engineering Excellence",
          "Systems architecture modeling",
          "Dynamic systems simulation",
          "Electrical and fluid systems design",
          "Requirements management",
          "Technical support",
        ],
      },
      {
        desc: "Class-A surfaces and visualization for the automotive and aerospace industries.",
        features: [
          "Everything in Systems Engineering",
          "ICEM Surf Professional (Class-A surfaces)",
          "Human Builder (ergonomics)",
          "Virtual reality (VR) integration",
          "High-quality real-time rendering",
          "Personal manager",
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("catia", locale, "/software/catia");
}

export default async function CatiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = pick(T, locale);
  const catiaOffers = OFFERS.map((o, i) => ({ ...o, ...t.offers[i] }));
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
      <JsonLd data={breadcrumbLd(locale, [
        { name: crumb("software", locale), path: "/software" },
        { name: "CATIA", path: "/software/catia" },
      ])} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-[2rem] sm:text-5xl font-bold mb-4 font-display text-blue-600">CATIA V6 & 3DEXPERIENCE</h1>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase tracking-widest text-sm">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {catiaOffers.map((offer) => (
            <div key={offer.name} className={`relative p-8 rounded-[40px] bg-white dark:bg-slate-900 border-2 ${offer.recommended ? 'border-blue-600 shadow-2xl' : 'border-transparent shadow-md'}`}>
              <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">{offer.price}</span>
                <span className="text-slate-400 text-sm ml-1">{t.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {offer.features.map(f => (
                  <li key={f} className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">●</span> {f}
                  </li>
                ))}
              </ul>
              {/* So'rov bosh sahifadagi aloqa formasi orqali */}
              <a href={`/${locale}#contact`} className="block text-center w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
