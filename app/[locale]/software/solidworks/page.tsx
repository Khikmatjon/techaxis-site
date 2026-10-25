import React from 'react';
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/locale-text";

// Paket nomi, narx va rang -- hamma tilda bir xil; matnlar pastda (T) uch tilda.
const OFFERS = [
  { name: "Standard", price: "$2,820", color: "blue", recommended: false },
  { name: "Professional", price: "$3,456", color: "red", recommended: true },
  { name: "Premium", price: "$4,716", color: "indigo", recommended: false },
];

const T = {
  uz: {
    period: "yil / 1 foydalanuvchi",
    recommended: "Tavsiya etiladi",
    buy: (name: string) => `${name} sotib olish`,
    offers: [
      {
        desc: "Sanoat standarti darajasidagi detallar, yig'malar va chizmalar imkoniyatlari.",
        features: [
          "Bulutga asoslangan, bir nechta qurilmalarda ishlash",
          "Real vaqt rejimida hamkorlik va ko'rib chiqish vositalari",
          "Xavfsiz bulutli fayl va versiyalarni boshqarish (PDM)",
          "Ishlab chiqarishga tayyor texnik hujjatlar",
          "Additiv ishlab chiqarish va NC dasturlash",
          "Bulutdan tezkor o'rnatish va doimiy yangilanishlar",
          "Texnik qo'llab-quvvatlash",
        ],
      },
      {
        desc: "Standard imkoniyatlariga qo'shimcha ravishda dizayn samaradorligini oshirish.",
        features: [
          "Standard ichidagi barcha imkoniyatlar",
          "Aqlli CAD kutubxonasi (komponentlar va mahkamlagichlar)",
          "Fotorealistik renderlash (Visualize)",
          "Avtomatlashtirilgan bardoshlik (tolerance) tahlili",
          "Avtomatik xarajatlarni hisoblash (Costing)",
          "CAD standartlarini tekshirish",
          "Texnik qo'llab-quvvatlash",
        ],
      },
      {
        desc: "Professional darajaga qo'shimcha ravishda ilg'or simulyatsiya va muhandislik vositalari.",
        features: [
          "Professional ichidagi barcha imkoniyatlar",
          "Elektr kabellari va simlar bog'lamlarini loyihalash",
          "Quvurlar va quvur tarmoqlarini loyihalash (Routing)",
          "Chiziqli statik tahlil (FEA)",
          "Vaqtga asoslangan harakat tahlili (Motion)",
          "Murakkab yuzalarni tekislikka yoyish (Surface Flattening)",
          "Texnik qo'llab-quvvatlash",
        ],
      },
    ],
  },
  ru: {
    period: "год / 1 пользователь",
    recommended: "Рекомендуем",
    buy: (name: string) => `Купить ${name}`,
    offers: [
      {
        desc: "Детали, сборки и чертежи на уровне промышленного стандарта.",
        features: [
          "Работа в облаке на нескольких устройствах",
          "Инструменты совместной работы и просмотра в реальном времени",
          "Безопасное облачное управление файлами и версиями (PDM)",
          "Готовая к производству техническая документация",
          "Аддитивное производство и программирование ЧПУ (NC)",
          "Быстрая установка из облака и постоянные обновления",
          "Техническая поддержка",
        ],
      },
      {
        desc: "Всё из Standard плюс инструменты для более эффективного проектирования.",
        features: [
          "Все возможности Standard",
          "Умная CAD-библиотека (компоненты и крепёж)",
          "Фотореалистичный рендеринг (Visualize)",
          "Автоматический анализ допусков (tolerance)",
          "Автоматический расчёт стоимости (Costing)",
          "Проверка на соответствие CAD-стандартам",
          "Техническая поддержка",
        ],
      },
      {
        desc: "Всё из Professional плюс продвинутые инструменты симуляции и инженерии.",
        features: [
          "Все возможности Professional",
          "Проектирование электрических кабелей и жгутов",
          "Проектирование труб и трубопроводов (Routing)",
          "Линейный статический анализ (FEA)",
          "Анализ движения во времени (Motion)",
          "Развёртка сложных поверхностей на плоскость (Surface Flattening)",
          "Техническая поддержка",
        ],
      },
    ],
  },
  en: {
    period: "year / 1 user",
    recommended: "Recommended",
    buy: (name: string) => `Buy ${name}`,
    offers: [
      {
        desc: "Industry-standard capabilities for parts, assemblies and drawings.",
        features: [
          "Cloud-based, works on multiple devices",
          "Real-time collaboration and review tools",
          "Secure cloud file and version management (PDM)",
          "Manufacturing-ready technical documentation",
          "Additive manufacturing and NC programming",
          "Fast installation from the cloud and continuous updates",
          "Technical support",
        ],
      },
      {
        desc: "Everything in Standard plus tools for more efficient design.",
        features: [
          "Everything in Standard",
          "Smart CAD library (components and fasteners)",
          "Photorealistic rendering (Visualize)",
          "Automated tolerance analysis",
          "Automatic cost estimation (Costing)",
          "CAD standards checking",
          "Technical support",
        ],
      },
      {
        desc: "Everything in Professional plus advanced simulation and engineering tools.",
        features: [
          "Everything in Professional",
          "Electrical cable and wire harness design",
          "Pipe and tubing design (Routing)",
          "Linear static analysis (FEA)",
          "Time-based motion analysis (Motion)",
          "Flattening complex surfaces (Surface Flattening)",
          "Technical support",
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("solidworks", locale, "/software/solidworks");
}

export default async function SolidworksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = pick(T, locale);
  const swOffers = OFFERS.map((o, i) => ({ ...o, ...t.offers[i] }));
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-950">
      <JsonLd data={breadcrumbLd(locale, [
        { name: crumb("software", locale), path: "/software" },
        { name: "SOLIDWORKS", path: "/software/solidworks" },
      ])} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-display">SOLIDWORKS Design</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {swOffers.map((offer) => (
            <div key={offer.name} className={`relative p-8 rounded-[40px] border-2 ${offer.recommended ? 'border-red-500 shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-slate-800'} bg-white dark:bg-slate-900`}>
              {offer.recommended && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-1 rounded-full text-sm font-bold uppercase">{t.recommended}</span>}
              <h3 className="text-3xl font-bold mb-2">{offer.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{offer.price}</span>
                <span className="text-slate-500 text-sm ml-2">{t.period}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">{offer.desc}</p>
              <ul className="space-y-4 mb-10">
                {offer.features.map(f => (
                  <li key={f} className="flex items-start text-sm font-medium">
                    <span className="text-emerald-500 mr-2">✓</span> {f}
                  </li>
                ))}
              </ul>
              {/* Onlayn sotuv yo'q -- so'rov bosh sahifadagi aloqa formasi orqali */}
              <a href={`/${locale}#contact`} className={`block text-center w-full py-4 rounded-2xl font-bold transition-all ${offer.recommended ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}>
                {t.buy(offer.name)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
