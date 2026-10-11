import type { Metadata } from "next";
import { CalendarDays, Video, Wallet, Users, Clock, Layers, BadgeCheck, CheckCircle2, ArrowRight, Target, UserCheck, HelpCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import { JONLI_KURS as K } from "@/content/jonli-kurs";
import { LiveCourseSignupForm } from "@/components/live-course/signup-form";

// Matn va narx/sana: content/jonli-kurs.ts. Sahifa faqat o'zbekcha (darslar ham o'zbek tilida).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("jonliKurs", locale, "/solidworks-jonli-kurs");
}

const STEPS = [
  { title: "Ariza qoldirasiz", text: "Pastdagi formani to'ldirasiz — siz bilan bog'lanamiz." },
  { title: "Dasturni o'rnatamiz", text: "SOLIDWORKS talaba litsenziyasini rasmiy yo'l bilan olishni ko'rsataman." },
  { title: "Birinchi dars — bepul", text: "Darsga qatnashasiz va format sizga mos kelishini o'zingiz ko'rasiz." },
  { title: "Yoqsa — to'lov", text: "Birinchi darsdan keyin to'laysiz va guruh bilan davom etasiz." },
];

export default async function LiveCoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const facts = [
    { icon: CalendarDays, label: "Boshlanish", value: K.boshlanish },
    { icon: Video, label: "Format", value: K.platforma ? `Jonli onlayn (${K.platforma})` : "Jonli onlayn" },
    { icon: Clock, label: "Jadval", value: K.jadval },
    { icon: Layers, label: "Davomiyligi", value: K.davomiylik },
    { icon: Users, label: "Guruhda joy", value: K.joylar != null ? `${K.joylar} ta` : null },
    { icon: Wallet, label: "Narx", value: K.narx ? `${K.narx} — birinchi darsdan keyin` : null },
  ].filter((f): f is typeof f & { value: string } => Boolean(f.value));

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950">
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("jonliKurs", locale), path: "/solidworks-jonli-kurs" }])} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-600 dark:text-blue-400">
            {K.guruh} · {K.boshlanish} · Birinchi dars bepul
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            SOLIDWORKS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">jonli onlayn kursi</span>
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{K.taklif}</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Darslarni {K.oqituvchi.ism} (CSWA, CSWP) o&apos;zi olib boradi. Birinchi dars bepul — yoqsa, keyin to&apos;laysiz.
          </p>
          <a href="#yozilish" className="inline-flex items-center gap-2 bg-[#0084FF] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-colors">
            Joy band qilish <ArrowRight className="w-5 h-5" />
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Bu kurs kimlar uchun</h2>
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
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Darslar qanday o&apos;tadi</h2>
            <p className="text-slate-600 dark:text-slate-400">Har bir darsning maqsadi bitta: siz uni o&apos;zingiz qila oladigan bo&apos;lib chiqasiz.</p>
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
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">O&apos;qituvchi</h2>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{K.oqituvchi.ism}</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dassault Systèmes&apos;ning rasmiy SOLIDWORKS sertifikatlariga ega. Kursda dasturni noldan,
              amaliy misollar orqali o&apos;rgataman.
            </p>
            {K.oqituvchi.tekshirishHavolasi && (
              <a href={K.oqituvchi.tekshirishHavolasi} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 dark:text-blue-400 font-bold underline">
                Sertifikatlarni tekshirish
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
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">SOLIDWORKS darslari: to&apos;liq dastur</h2>
            <p className="text-slate-600 dark:text-slate-400">{K.davomiylik}. Har darsda yangi mavzu va amaliyot, har hafta oxirida imtihon uslubidagi mini-test.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {K.dastur.map((w, wi) => (
              <div key={w.hafta} className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-500">{w.hafta}</div>
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Kurs oxirida</h2>
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Qanday boshlanadi</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6">
                <div className="text-sm font-black text-blue-500 mb-2">{i + 1}-qadam</div>
                <div className="font-bold text-slate-900 dark:text-white">{s.title}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>
              Darslarda faqat rasmiy litsenziyali SOLIDWORKS ishlatiladi. Talabalar uchun{" "}
              <a href="https://www.solidworks.com/product/students" target="_blank" rel="noopener noreferrer" className="underline">SOLIDWORKS Design Standard for Students</a>{" "}
              rasmiy va bepul (faqat Windows).
            </span>
          </p>
        </section>

        {/* Ko'p so'raladigan savollar */}
        <section className="space-y-6 max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">Ko&apos;p so&apos;raladigan savollar</h2>
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
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{K.guruh}ga yozilish</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Hozir hech narsa to&apos;lamaysiz — faqat joy band qilasiz.</p>
            </div>
            <LiveCourseSignupForm group={K.guruh} />
          </div>
        </section>

      </div>
    </div>
  );
}
