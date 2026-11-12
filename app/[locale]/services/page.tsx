import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Ruler, Settings, Cloud, BarChart3, Cpu, ArrowRight, CheckCircle2, Clock, UserCheck, HelpCircle } from "lucide-react";
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
    whoTitle: "Mijoz loyihalari kimlar uchun",
    who: [
      { t: "Korxona va ustaxonalar", d: "Detal yoki yig'ma uchun texnik chizma yoki 3D model kerak bo'lganda." },
      { t: "Startaplar va ixtirochilar", d: "G'oya yoki eskizni 3D modelga va ishlab chiqarish chizmasiga aylantirish." },
      { t: "Qog'oz chizmasi borlar", d: "Eski yoki qo'lda chizilgan chizmadan 3D model va yangi elektron chizma tayyorlash." },
    ],
    faqTitle: "Ko'p so'raladigan savollar",
    faq: [
      { q: "Buyurtma berish uchun nima kerak?", a: "Chizma, eskiz, rasm yoki namuna hamda asosiy talablar: o'lchamlar, material, miqdor va muddat. Hammasi tayyor bo'lmasa ham yozing — yetishmagan joylarini birga aniqlaymiz." },
      { q: "Narx va muddat qanday belgilanadi?", a: "Loyiha hajmi va murakkabligiga qarab. Buyurtmangizni ko'rib chiqib, ish boshlanishidan oldin aniq narx va muddatni aytamiz." },
      { q: "To'lov qanday amalga oshiriladi?", a: "To'lov tartibini ish boshlanishidan oldin siz bilan kelishib olamiz." },
      { q: "Tayyor ish qaysi formatda beriladi?", a: "SOLIDWORKS yoki CATIA fayllari, STEP formatidagi 3D model va PDF chizma. Kerakli formatni buyurtma berishda kelishamiz." },
      { q: "Topshirilgan ishga o'zgartirish kiritsa bo'ladimi?", a: "Topshirishdan oldin natijani sizga ko'rsatamiz va kelishilgan vazifa doirasidagi tuzatishlarni kiritamiz. Vazifaga yangi talab qo'shilsa, uni alohida kelishamiz." },
      { q: "Chizma va fayllarim maxfiy qoladimi?", a: "Ha. Siz yuborgan fayllar faqat buyurtmangizni bajarish uchun ishlatiladi. Ruxsatingizsiz ular boshqalarga berilmaydi va saytda ko'rsatilmaydi." },
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
    whoTitle: "Для кого проекты",
    who: [
      { t: "Предприятия и мастерские", d: "Когда для детали или сборки нужен технический чертёж или 3D-модель." },
      { t: "Стартапы и изобретатели", d: "Превращаем идею или эскиз в 3D-модель и производственный чертёж." },
      { t: "Те, у кого чертежи на бумаге", d: "Делаем 3D-модель и новый электронный чертёж по старому или нарисованному от руки чертежу." },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Что нужно, чтобы оформить заказ?", a: "Чертёж, эскиз, фото или образец и основные требования: размеры, материал, количество и сроки. Пишите, даже если готово не всё — недостающее уточним вместе." },
      { q: "Как определяются стоимость и сроки?", a: "В зависимости от объёма и сложности проекта. Мы изучим ваш заказ и назовём точную стоимость и сроки до начала работы." },
      { q: "Как проходит оплата?", a: "Порядок оплаты согласуем с вами до начала работы." },
      { q: "В каком формате сдаётся работа?", a: "Файлы SOLIDWORKS или CATIA, 3D-модель в формате STEP и чертёж в PDF. Нужный формат согласуем при оформлении заказа." },
      { q: "Можно ли внести изменения в готовую работу?", a: "Перед сдачей мы показываем вам результат и вносим правки в рамках согласованной задачи. Если появляются новые требования, согласуем их отдельно." },
      { q: "Останутся ли мои чертежи и файлы конфиденциальными?", a: "Да. Присланные вами файлы используются только для выполнения вашего заказа. Без вашего разрешения они не передаются другим и не показываются на сайте." },
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
    whoTitle: "Who client projects are for",
    who: [
      { t: "Companies and workshops", d: "When a part or assembly needs a technical drawing or a 3D model." },
      { t: "Startups and inventors", d: "Turning an idea or sketch into a 3D model and a manufacturing drawing." },
      { t: "Those with paper drawings", d: "A 3D model and a new digital drawing from an old or hand-drawn one." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What do I need to place an order?", a: "A drawing, sketch, photo or sample and the main requirements: dimensions, material, quantity and deadline. Write to us even if not everything is ready — we will clarify the rest together." },
      { q: "How are the price and timeline set?", a: "They depend on the size and complexity of the project. We review your order and give you the exact price and timeline before work starts." },
      { q: "How does payment work?", a: "We agree on the payment terms with you before work starts." },
      { q: "What format is the finished work delivered in?", a: "SOLIDWORKS or CATIA files, a 3D model in STEP format and a PDF drawing. We agree on the format you need when you place the order." },
      { q: "Can changes be made to the finished work?", a: "Before delivery we show you the result and make corrections within the agreed task. If new requirements appear, we agree on them separately." },
      { q: "Will my drawings and files stay confidential?", a: "Yes. The files you send are used only to complete your order. Without your permission they are not shared with others or shown on the site." },
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

        {/* Mijoz loyihalari kimlar uchun */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.whoTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.who.map((w) => (
              <div key={w.t} className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
                <UserCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-500" />
                <div className="font-bold text-slate-900 dark:text-white">{w.t}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{w.d}</p>
              </div>
            ))}
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

        {/* Savol-javoblar */}
        <section className="space-y-8 max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faq.map((item) => (
              <div key={item.q} className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-start gap-3 font-bold text-slate-900 dark:text-white">
                  <HelpCircle className="w-5 h-5 text-blue-700 dark:text-blue-500 shrink-0 mt-0.5" /> {item.q}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 pl-8">{item.a}</p>
              </div>
            ))}
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

      </div>
    </div>
  );
}
