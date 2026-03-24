import React from 'react';

const swOffers = [
  {
    name: "Standard",
    price: "$2,820",
    period: "yil / 1 foydalanuvchi",
    desc: "Sanoat standarti darajasidagi detallar, yig'malar va chizmalar imkoniyatlari.",
    features: [
      "Bulutga asoslangan, bir nechta qurilmalarda ishlash",
      "Real vaqt rejimida hamkorlik va ko'rib chiqish vositalari",
      "Xavfsiz bulutli fayl va versiyalarni boshqarish (PDM)",
      "Ishlab chiqarishga tayyor texnik hujjatlar",
      "Additiv ishlab chiqarish va NC dasturlash",
      "Bulutdan tezkor o'rnatish va doimiy yangilanishlar",
      "Texnik qo'llab-quvvatlash"
    ],
    color: "blue",
    cta: "Standard Sotib Olish"
  },
  {
    name: "Professional",
    price: "$3,456",
    period: "yil / 1 foydalanuvchi",
    desc: "Standard imkoniyatlariga qo'shimcha ravishda dizayn samaradorligini oshirish.",
    features: [
      "Standard ichidagi barcha imkoniyatlar",
      "Aqlli CAD kutubxonasi (komponentlar va mahkamlagichlar)",
      "Fotorealistik renderlash (Visualize)",
      "Avtomatlashtirilgan bardoshlik (tolerance) tahlili",
      "Avtomatik xarajatlarni hisoblash (Costing)",
      "CAD standartlarini tekshirish",
      "Texnik qo'llab-quvvatlash"
    ],
    color: "red",
    recommended: true,
    cta: "Professional Sotib Olish"
  },
  {
    name: "Premium",
    price: "$4,716",
    period: "yil / 1 foydalanuvchi",
    desc: "Professional darajaga qo'shimcha ravishda ilg'or simulyatsiya va muhandislik vositalari.",
    features: [
      "Professional ichidagi barcha imkoniyatlar",
      "Elektr kabellari va simlar bog'lamlarini loyihalash",
      "Quvurlar va truboprovodlarni loyihalash (Routing)",
      "Chiziqli statik tahlil (FEA)",
      "Vaqtga asoslangan harakat tahlili (Motion)",
      "Murakkab yuzalarni tekislikka yoyish (Surface Flattening)",
      "Texnik qo'llab-quvvatlash"
    ],
    color: "indigo",
    cta: "Premium Sotib Olish"
  }
];

export default function SolidworksPage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 font-display">SOLIDWORKS Design</h1>
          <p className="text-slate-500 max-w-2xl mx-auto italic">15 kunlik pulni qaytarish kafolati</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {swOffers.map((offer) => (
            <div key={offer.name} className={`relative p-8 rounded-[40px] border-2 ${offer.recommended ? 'border-red-500 shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-slate-800'} bg-white dark:bg-slate-900`}>
              {offer.recommended && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-1 rounded-full text-sm font-bold uppercase">Tavsiya etiladi</span>}
              <h3 className="text-3xl font-bold mb-2">{offer.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{offer.price}</span>
                <span className="text-slate-500 text-sm ml-2">{offer.period}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">{offer.desc}</p>
              <ul className="space-y-4 mb-10">
                {offer.features.map(f => (
                  <li key={f} className="flex items-start text-sm font-medium">
                    <span className="text-emerald-500 mr-2">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${offer.recommended ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}>
                {offer.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}