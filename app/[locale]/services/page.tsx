import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Ruler, Settings, Cloud, BarChart3, Cpu, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/locale-text";
import { OrderForm } from "@/components/services/order-form";

// Xizmatlar (26-kun, egasining qarori 2026-11-10): ikki asosiy yo'nalish -- o'quv kurslari va
// mijoz loyihalari (chizma, 3D model, ishlab chiqarish; "tayyorlanmoqda", buyurtma hozirdan
// qabul qilinadi -- egasining Telegram'iga "MIJOZ" deb keladi). Qolgan 4 xizmat -- "Tez orada".
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("services", locale, "/services");
}

const T = {
  uz: {
    h1: "Xizmatlar",
    intro: "Hozir ikki yo'nalishda ishlaymiz: SOLIDWORKS va CATIA bo'yicha o'quv kurslari hamda mijozlar uchun muhandislik loyihalari.",
    coursesTitle: "O'quv kurslari",
    coursesText: "Noldan boshlab, amaliy loyihalar orqali o'rganiladigan onlayn video kurslar.",
    coursesItems: ["SOLIDWORKS Asoslari", "CATIA V5 Professional", "SOLIDWORKS Simulation (FEA)", "PLM tizimlar (3DEXPERIENCE)"],
    coursesCta: "Kurslarni ko'rish",
    projectsTitle: "Mijoz loyihalari",
    preparing: "Tayyorlanmoqda",
    projectsText: "Xizmat to'liq ishga tushirilmoqda. Buyurtmalarni hozirdan qabul qilamiz.",
    projectsItems: ["Texnik chizmalar", "3D modellar (detal va yig'ma)", "Ishlab chiqarishga tayyorlash"],
    projectsCta: "Buyurtma berish",
    howTitle: "Mijoz loyihasi qanday bajariladi",
    steps: [
      { t: "Chizma yoki g'oya", d: "Chizma, eskiz, rasm yoki namunani yuborasiz, vazifani birga aniqlaymiz." },
      { t: "3D model", d: "Detal yoki yig'mani SOLIDWORKS yoki CATIA'da modellashtiramiz." },
      { t: "Ishlab chiqarishga tayyorlash", d: "Texnik chizmalar: o'lchamlar, dopusklar va kerakli izohlar." },
      { t: "Topshirish", d: "Tayyor fayllarni kelishilgan formatda topshiramiz." },
    ],
    priceTitle: "Muddat va narx",
    priceText: "Loyiha hajmiga qarab belgilanadi: buyurtmangizni ko'rib chiqib, aniq muddat va narxni aytamiz.",
    soonTitle: "Tez orada",
    soon: "Tez orada",
    soonItems: [
      { t: "Dastur litsenziyasi bo'yicha maslahat", d: "SOLIDWORKS, CATIA va 3DEXPERIENCE litsenziyasini tanlash bo'yicha maslahat." },
      { t: "PLM tizimlari", d: "Mahsulot hayotiy siklini boshqarish tizimlarini joriy qilish." },
      { t: "Simulyatsiya va tahlil", d: "Mustahkamlik va termal tahlil." },
      { t: "Texnik konsalting", d: "Ishlab chiqarishni raqamlashtirish bo'yicha maslahatlar." },
    ],
    orderTitle: "Buyurtma berish",
    orderText: "Qisqacha yozib qoldiring — siz bilan bog'lanamiz.",
  },
  ru: {
    h1: "Услуги",
    intro: "Сейчас мы работаем в двух направлениях: учебные курсы по SOLIDWORKS и CATIA и инженерные проекты для клиентов.",
    coursesTitle: "Учебные курсы",
    coursesText: "Онлайн-видеокурсы с нуля на практических проектах. Уроки на узбекском языке.",
    coursesItems: ["Основы SOLIDWORKS", "CATIA V5 Professional", "SOLIDWORKS Simulation (FEA)", "PLM-системы (3DEXPERIENCE)"],
    coursesCta: "Смотреть курсы",
    projectsTitle: "Проекты для клиентов",
    preparing: "Готовится",
    projectsText: "Услуга запускается в полном объёме. Заказы принимаем уже сейчас.",
    projectsItems: ["Технические чертежи", "3D-модели (детали и сборки)", "Подготовка к производству"],
    projectsCta: "Оформить заказ",
    howTitle: "Как выполняется проект",
    steps: [
      { t: "Чертёж или идея", d: "Вы присылаете чертёж, эскиз, фото или образец, и мы вместе уточняем задачу." },
      { t: "3D-модель", d: "Моделируем деталь или сборку в SOLIDWORKS или CATIA." },
      { t: "Подготовка к производству", d: "Технические чертежи: размеры, допуски и нужные пояснения." },
      { t: "Сдача", d: "Передаём готовые файлы в согласованном формате." },
    ],
    priceTitle: "Сроки и стоимость",
    priceText: "Зависят от объёма проекта: изучим ваш заказ и назовём точные сроки и стоимость.",
    soonTitle: "Скоро",
    soon: "Скоро",
    soonItems: [
      { t: "Консультации по лицензиям", d: "Помощь в выборе лицензии SOLIDWORKS, CATIA и 3DEXPERIENCE." },
      { t: "PLM-системы", d: "Внедрение систем управления жизненным циклом изделия." },
      { t: "Симуляция и анализ", d: "Анализ прочности и тепловой анализ." },
      { t: "Технический консалтинг", d: "Консультации по цифровизации производства." },
    ],
    orderTitle: "Оформить заказ",
    orderText: "Коротко опишите задачу — мы свяжемся с вами.",
  },
  en: {
    h1: "Services",
    intro: "We currently work in two areas: SOLIDWORKS and CATIA training courses and engineering projects for clients.",
    coursesTitle: "Training courses",
    coursesText: "Online video courses from scratch through hands-on projects. Lessons are taught in Uzbek.",
    coursesItems: ["SOLIDWORKS Fundamentals", "CATIA V5 Professional", "SOLIDWORKS Simulation (FEA)", "PLM Systems (3DEXPERIENCE)"],
    coursesCta: "Browse courses",
    projectsTitle: "Client projects",
    preparing: "In preparation",
    projectsText: "The service is being fully launched. We are already taking orders.",
    projectsItems: ["Technical drawings", "3D models (parts and assemblies)", "Preparation for manufacturing"],
    projectsCta: "Place an order",
    howTitle: "How a client project works",
    steps: [
      { t: "Drawing or idea", d: "You send a drawing, sketch, photo or sample, and we define the task together." },
      { t: "3D model", d: "We model the part or assembly in SOLIDWORKS or CATIA." },
      { t: "Preparation for manufacturing", d: "Technical drawings: dimensions, tolerances and the notes needed." },
      { t: "Delivery", d: "We hand over the finished files in the agreed format." },
    ],
    priceTitle: "Timeline and price",
    priceText: "They depend on the size of the project: we review your order and give you the exact timeline and price.",
    soonTitle: "Coming soon",
    soon: "Coming soon",
    soonItems: [
      { t: "Software license advice", d: "Help choosing a SOLIDWORKS, CATIA or 3DEXPERIENCE license." },
      { t: "PLM systems", d: "Implementing product lifecycle management systems." },
      { t: "Simulation and analysis", d: "Strength and thermal analysis." },
      { t: "Technical consulting", d: "Advice on digitalizing production." },
    ],
    orderTitle: "Place an order",
    orderText: "Briefly describe the task and we will contact you.",
  },
};

const SOON_ICONS = [Settings, Cloud, BarChart3, Cpu];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = pick(T, locale);

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950">
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("services", locale), path: "/services" }])} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Sarlavha */}
        <section className="max-w-3xl space-y-5">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">{t.h1}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{t.intro}</p>
        </section>

        {/* Ikki asosiy yo'nalish */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.coursesTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.coursesText}</p>
            <ul className="space-y-2 flex-1">
              {t.coursesItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/courses`} className="inline-flex items-center gap-2 self-start rounded-full bg-[#006FD6] hover:bg-blue-700 px-6 py-3 font-bold text-white transition-colors">
              {t.coursesCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <Ruler className="w-7 h-7 text-emerald-600" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                <Clock className="w-3.5 h-3.5" /> {t.preparing}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.projectsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.projectsText}</p>
            <ul className="space-y-2 flex-1">
              {t.projectsItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
            <a href="#buyurtma" className="inline-flex items-center gap-2 self-start rounded-full bg-[#006FD6] hover:bg-blue-700 px-6 py-3 font-bold text-white transition-colors">
              {t.projectsCta} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Mijoz loyihasi jarayoni */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.howTitle}</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.steps.map((s, i) => (
              <li key={s.t} className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black flex items-center justify-center">{i + 1}</span>
                <div className="font-bold text-slate-900 dark:text-white">{s.t}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6">
            <div className="font-bold text-slate-900 dark:text-white mb-1">{t.priceTitle}</div>
            <p className="text-slate-600 dark:text-slate-400">{t.priceText}</p>
          </div>
        </section>

        {/* Tez orada */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.soonTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.soonItems.map((s, i) => {
              const Icon = SOON_ICONS[i];
              return (
                <div key={s.t} className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Icon className="w-6 h-6 text-slate-500" />
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">{t.soon}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">{s.t}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{s.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Buyurtma formasi */}
        <section id="buyurtma" className="scroll-mt-28 max-w-2xl mx-auto w-full">
          <div className="rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.orderTitle}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t.orderText}</p>
            </div>
            <OrderForm locale={locale} />
          </div>
        </section>

      </div>
    </div>
  );
}
