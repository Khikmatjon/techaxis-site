import React from 'react';

const catiaOffers = [
  {
    name: "Engineering Excellence",
    price: "$4,500",
    period: "taxminan / yil",
    desc: "Mexanik muhandislik va mahsulot dizayni uchun asosiy paket.",
    features: [
      "Advanced Part & Assembly Design",
      "Generative Shape Design (Yuzalar dizayni)",
      "Mechanism Simulation",
      "3DMaster (Annotatsiyalar va o'lchamlar)",
      "Bulutli ma'lumotlarni boshqarish",
      "Texnik qo'llab-quvvatlash"
    ],
    color: "blue"
  },
  {
    name: "Systems Engineering",
    price: "$6,200",
    period: "taxminan / yil",
    desc: "Murakkab tizimlar va mexatronik loyihalar uchun professional yechim.",
    features: [
      "Engineering Excellence barcha imkoniyatlari",
      "Systems Architecture Modeling",
      "Dynamic Systems Simulation",
      "Electrical & Fluid Systems Design",
      "Requirement Management",
      "Expert Technical Support"
    ],
    color: "blue",
    recommended: true
  },
  {
    name: "Creative Design",
    price: "$8,900",
    period: "taxminan / yil",
    desc: "Avtomobilsozlik va aerokosmik sanoat uchun Class-A yuzalar va vizualizatsiya.",
    features: [
      "Systems Engineering barcha imkoniyatlari",
      "ICEM Surf Professional (Class-A surfaces)",
      "Human Builder (Ergonomika)",
      "Virtual Reality Integration",
      "High-End Real-time Rendering",
      "Dedicated Account Manager"
    ],
    color: "blue"
  }
];

export default function CatiaPage() {
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 font-display text-blue-600">CATIA V6 & 3DEXPERIENCE</h1>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase tracking-widest text-sm">Engineering & Creative Excellence</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {catiaOffers.map((offer) => (
            <div key={offer.name} className={`relative p-8 rounded-[40px] bg-white dark:bg-slate-900 border-2 ${offer.recommended ? 'border-blue-600 shadow-2xl' : 'border-transparent shadow-md'}`}>
              <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">{offer.price}</span>
                <span className="text-slate-400 text-sm ml-1">{offer.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {offer.features.map(f => (
                  <li key={f} className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">●</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                Kotirovka So'rash
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}