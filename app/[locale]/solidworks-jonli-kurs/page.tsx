import type { Metadata } from "next";
import { CalendarDays, Video, Wallet, Users, Clock, Layers, BadgeCheck, CheckCircle2, ArrowRight, Target, UserCheck, HelpCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import { JONLI_KURS } from "@/content/jonli-kurs";
import { jonliKursMatn } from "@/content/jonli-kurs-tarjima";
import { LiveCourseSignupForm } from "@/components/live-course/signup-form";
import { pick } from "@/lib/locale-text";

// Matn va narx/sana: content/jonli-kurs.ts (o'zbekcha) va content/jonli-kurs-tarjima.ts (ru/en).
// Darslar o'zbek tilida o'tadi -- ru/en matnda bu ochiq yozilgan.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("jonliKurs", locale, "/solidworks-jonli-kurs");
}

const T = {
  uz: {
    start: "Boshlanish", format: "Format", schedule: "Jadval", duration: "Davomiyligi", seats: "Guruhda joy", price: "Narx",
    live: (p: string | null) => (p ? `Jonli onlayn (${p})` : "Jonli onlayn"),
    seatsValue: (n: number) => `${n} ta`,
    priceValue: (p: string) => `${p} — birinchi darsdan keyin`,
    freeFirst: "Birinchi dars bepul",
    h1a: "SOLIDWORKS", h1b: "jonli onlayn kursi",
    teacherLine: (name: string) => `Darslarni ${name} (CSWA, CSWP) o'zi olib boradi. Birinchi dars bepul — yoqsa, keyin to'laysiz.`,
    reserve: "Joy band qilish",
    who: "Bu kurs kimlar uchun",
    how: "Darslar qanday o'tadi", howIntro: "Har bir darsning maqsadi bitta: siz uni o'zingiz qila oladigan bo'lib chiqasiz.",
    teacher: "O'qituvchi", teacherText: "Dassault Systèmes'ning rasmiy SOLIDWORKS sertifikatlariga ega. Kursda dasturni noldan, amaliy misollar orqali o'rgataman.",
    verify: "Sertifikatlarni tekshirish",
    program: "SOLIDWORKS darslari: to'liq dastur", programIntro: "Har darsda yangi mavzu va amaliyot, har hafta oxirida imtihon uslubidagi mini-test.",
    results: "Kurs oxirida", startHow: "Qanday boshlanadi", step: (n: number) => `${n}-qadam`,
    steps: [
      { title: "Ariza qoldirasiz", text: "Pastdagi formani to'ldirasiz — siz bilan bog'lanamiz." },
      { title: "Dasturni o'rnatamiz", text: "SOLIDWORKS talaba litsenziyasini rasmiy yo'l bilan olishni ko'rsataman." },
      { title: "Birinchi dars — bepul", text: "Darsga qatnashasiz va format sizga mos kelishini o'zingiz ko'rasiz." },
      { title: "Yoqsa — to'lov", text: "Birinchi darsdan keyin to'laysiz va guruh bilan davom etasiz." },
    ],
    licBefore: "Darslarda faqat rasmiy litsenziyali SOLIDWORKS ishlatiladi. Talabalar uchun", licAfter: "rasmiy va bepul (faqat Windows).",
    faq: "Ko'p so'raladigan savollar",
    signup: "Kursga yozilish", signupIntro: "Hozir hech narsa to'lamaysiz — faqat joy band qilasiz.",
  },
  ru: {
    start: "Старт", format: "Формат", schedule: "Расписание", duration: "Длительность", seats: "Мест в группе", price: "Стоимость",
    live: (p: string | null) => (p ? `Живой онлайн (${p})` : "Живой онлайн"),
    seatsValue: (n: number) => `${n}`,
    priceValue: (p: string) => `${p} — после первого урока`,
    freeFirst: "Первый урок бесплатно",
    h1a: "Живой онлайн-курс", h1b: "SOLIDWORKS",
    teacherLine: (name: string) => `Все уроки лично ведёт ${name} (CSWA, CSWP). Первый урок бесплатный — если понравится, оплачиваете дальше.`,
    reserve: "Забронировать место",
    who: "Для кого этот курс",
    how: "Как проходят уроки", howIntro: "У каждого урока одна цель: после него вы сможете сделать это сами.",
    teacher: "Преподаватель", teacherText: "Имеет официальные сертификаты SOLIDWORKS от Dassault Systèmes. На курсе обучаю программе с нуля на практических примерах.",
    verify: "Проверить сертификаты",
    program: "Уроки SOLIDWORKS: полная программа", programIntro: "На каждом уроке новая тема и практика, в конце каждой недели — мини-тест в формате экзамена.",
    results: "По окончании курса", startHow: "Как начать", step: (n: number) => `Шаг ${n}`,
    steps: [
      { title: "Оставляете заявку", text: "Заполните форму ниже — мы свяжемся с вами." },
      { title: "Устанавливаем программу", text: "Покажу, как официально получить студенческую лицензию SOLIDWORKS." },
      { title: "Первый урок — бесплатно", text: "Приходите на урок и сами решаете, подходит ли вам формат." },
      { title: "Понравилось — оплата", text: "Оплачиваете после первого урока и продолжаете с группой." },
    ],
    licBefore: "На уроках используется только официально лицензированный SOLIDWORKS. Для студентов", licAfter: "— официальная и бесплатная версия (только Windows).",
    faq: "Частые вопросы",
    signup: "Записаться на курс", signupIntro: "Сейчас вы ничего не платите — только бронируете место.",
  },
  en: {
    start: "Start", format: "Format", schedule: "Schedule", duration: "Duration", seats: "Seats in the group", price: "Price",
    live: (p: string | null) => (p ? `Live online (${p})` : "Live online"),
    seatsValue: (n: number) => `${n}`,
    priceValue: (p: string) => `${p}, paid after the first lesson`,
    freeFirst: "First lesson free",
    h1a: "SOLIDWORKS", h1b: "live online course",
    teacherLine: (name: string) => `${name} (CSWA, CSWP) teaches every lesson personally. The first lesson is free — if you like it, you pay afterwards.`,
    reserve: "Reserve a seat",
    who: "Who this course is for",
    how: "How the lessons work", howIntro: "Every lesson has one goal: by the end of it you can do it yourself.",
    teacher: "Instructor", teacherText: "Holds official SOLIDWORKS certifications from Dassault Systèmes. In the course I teach the software from scratch with practical examples.",
    verify: "Verify certificates",
    program: "SOLIDWORKS lessons: full program", programIntro: "A new topic and practice in every lesson, an exam-style mini-test at the end of every week.",
    results: "By the end of the course", startHow: "How to start", step: (n: number) => `Step ${n}`,
    steps: [
      { title: "Leave an application", text: "Fill in the form below and we will contact you." },
      { title: "We install the software", text: "I will show you how to get the SOLIDWORKS student license the official way." },
      { title: "First lesson — free", text: "Join the lesson and see for yourself whether the format suits you." },
      { title: "Like it — then pay", text: "You pay after the first lesson and continue with the group." },
    ],
    licBefore: "Only officially licensed SOLIDWORKS is used in the lessons. For students,", licAfter: "is official and free (Windows only).",
    faq: "Frequently asked questions",
    signup: "Sign up for the course", signupIntro: "You pay nothing now — you only reserve a seat.",
  },
};

export default async function LiveCoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const K = jonliKursMatn(locale);
  const t = pick(T, locale);

  const facts = [
    { icon: CalendarDays, label: t.start, value: K.boshlanish },
    { icon: Video, label: t.format, value: t.live(K.platforma) },
    { icon: Clock, label: t.schedule, value: K.jadval },
    { icon: Layers, label: t.duration, value: K.davomiylik },
    { icon: Users, label: t.seats, value: K.joylar != null ? t.seatsValue(K.joylar) : null },
    { icon: Wallet, label: t.price, value: K.narx ? t.priceValue(K.narx) : null },
  ].filter((f): f is typeof f & { value: string } => Boolean(f.value));

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950">
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("jonliKurs", locale), path: "/solidworks-jonli-kurs" }])} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">
            {[K.boshlanish, t.freeFirst].filter(Boolean).join(" · ")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {t.h1a} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">{t.h1b}</span>
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{K.taklif}</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.teacherLine(K.oqituvchi.ism)}
          </p>
          <a href="#yozilish" className="inline-flex items-center gap-2 bg-[#006FD6] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-colors">
            {t.reserve} <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* Asosiy ma'lumotlar */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map((f) => (
            <div key={f.label} className="flex items-start gap-4 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
              <f.icon className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">{f.label}</div>
                <div className="font-bold text-slate-900 dark:text-white mt-1">{f.value}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Kimlar uchun */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.who}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {K.kimlarUchun.map((k) => (
              <div key={k.nomi} className="rounded-3xl border border-slate-100 dark:border-slate-800 p-6">
                <UserCheck className="w-6 h-6 text-cyan-500 mb-3" />
                <div className="font-bold text-slate-900 dark:text-white">{k.nomi}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{k.izoh}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Darslar qanday o'tadi */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.how}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.howIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {K.darsFormati.map((d, i) => (
              <div key={d.nomi} className="flex gap-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6">
                <span className="w-9 h-9 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black flex items-center justify-center">{i + 1}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{d.nomi}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{d.izoh}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* O'qituvchi */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.teacher}</h2>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{K.oqituvchi.ism}</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.teacherText}
            </p>
            {K.oqituvchi.tekshirishHavolasi && (
              <a href={K.oqituvchi.tekshirishHavolasi} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 dark:text-blue-400 font-bold underline">
                {t.verify}
              </a>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {K.oqituvchi.sertifikatlar.map((s) => (
              <div key={s.nomi} className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
                <BadgeCheck className="w-8 h-8 text-emerald-500 mb-3" />
                <div className="text-2xl font-black text-slate-900 dark:text-white">{s.nomi}</div>
                <div className="text-sm text-slate-500 mt-1">{s.toliq}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dastur: 16 dars, 4 hafta */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.program}</h2>
            <p className="text-slate-600 dark:text-slate-400">{K.davomiylik}. {t.programIntro}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {K.dastur.map((w, wi) => (
              <div key={w.hafta} className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">{w.hafta}</div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">{w.nomi}</h3>
                </div>
                <ol className="space-y-3">
                  {w.darslar.map((d, di) => (
                    <li key={d.mavzu} className="flex gap-3">
                      <span className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center">{wi * 4 + di + 1}</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{d.mavzu}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{d.tafsilot}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Kurs oxirida */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.results}</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {K.natijalar.map((n) => (
              <li key={n} className="flex items-start gap-3 rounded-3xl border border-slate-100 dark:border-slate-800 p-5">
                <Target className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Qanday ishlaydi */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t.startHow}</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6">
                <div className="text-sm font-black text-blue-700 dark:text-blue-400 mb-2">{t.step(i + 1)}</div>
                <div className="font-bold text-slate-900 dark:text-white">{s.title}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>
              {t.licBefore}{" "}
              <a href="https://www.solidworks.com/product/students" target="_blank" rel="noopener noreferrer" className="underline">SOLIDWORKS Design Standard for Students</a>{" "}
              {t.licAfter}
            </span>
          </p>
        </section>

        {/* Ko'p so'raladigan savollar */}
        <section className="space-y-6 max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">{t.faq}</h2>
          <div className="space-y-3">
            {K.savollar.map((s) => (
              <div key={s.q} className="rounded-3xl border border-slate-100 dark:border-slate-800 p-6">
                <div className="flex items-start gap-3 font-bold text-slate-900 dark:text-white">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> {s.q}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 pl-8">{s.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ariza */}
        <section id="yozilish" className="scroll-mt-28 max-w-xl mx-auto w-full">
          <div className="rounded-[40px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.signup}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.signupIntro}</p>
            </div>
            {/* Guruh nomi saytda ko'rinmaydi -- faqat admin paneldagi arizada turadi */}
            <LiveCourseSignupForm group={JONLI_KURS.guruh} locale={locale} />
          </div>
        </section>

      </div>
    </div>
  );
}
