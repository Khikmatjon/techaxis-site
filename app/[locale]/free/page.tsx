"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Send, FileDown, CheckCircle, Zap } from "lucide-react";
import { sendToTelegram } from "@/lib/actions/send-telegram";
import { pick } from "@/lib/locale-text";

const T = {
  uz: {
    badge: "Bepul yuklab olish",
    h1a: "3D modellashtirishni o'rganish uchun ilk", h1b: "qadamlar qo'llanmasi",
    intro: "3D modellashtirishni endi boshlayotganlar uchun bepul qo'llanma: qaysi dasturdan boshlash va birinchi qadamlarni qanday qo'yish kerak.",
    items: ["SOLIDWORKS va CATIA asosiy farqlari", "3D modellashtirishni o'rganishdagi ilk qadamlar"],
    formTitle: "Qo'llanmani olish", formIntro: "Email yoki telefon raqamingizni kiriting, materialni sizga yuboramiz.",
    sentTitle: "So'rov yuborildi!", sentText: "Mutaxassislarimiz tez orada materialni siz qoldirgan email yoki telefon raqamiga yuboradi. Bunga qadar maqolalarimizni o'qib turing.",
    toBlog: "Blogga o'tish", name: "Ismingiz", namePh: "Alisher...", contact: "Telefon yoki email", submit: "Qo'llanmani yuboring",
  },
  ru: {
    badge: "Бесплатно",
    h1a: "Первые шаги в 3D-моделировании:", h1b: "руководство для начинающих",
    intro: "Бесплатное руководство для тех, кто только начинает изучать 3D-моделирование: с какой программы начать и как сделать первые шаги.",
    items: ["Основные различия SOLIDWORKS и CATIA", "Первые шаги в изучении 3D-моделирования"],
    formTitle: "Получить руководство", formIntro: "Укажите email или номер телефона, и мы отправим вам материал.",
    sentTitle: "Запрос отправлен!", sentText: "Наши специалисты скоро отправят материал на указанный вами email или номер телефона. А пока почитайте наши статьи.",
    toBlog: "Перейти в блог", name: "Ваше имя", namePh: "Алишер...", contact: "Телефон или email", submit: "Получить руководство",
  },
  en: {
    badge: "Free download",
    h1a: "First steps in 3D modeling:", h1b: "a beginner's guide",
    intro: "A free guide for those just starting to learn 3D modeling: which software to start with and how to take the first steps.",
    items: ["Key differences between SOLIDWORKS and CATIA", "First steps in learning 3D modeling"],
    formTitle: "Get the guide", formIntro: "Enter your email or phone number and we will send you the material.",
    sentTitle: "Request sent!", sentText: "Our specialists will soon send the material to the email or phone number you provided. In the meantime, read our articles.",
    toBlog: "Go to the blog", name: "Your name", namePh: "Alex...", contact: "Phone or email", submit: "Send me the guide",
  },
};

export default function FreeResourcesPage() {
  // Client sahifada params Promise bo'ladi -- tilni useParams'dan olamiz.
  const locale = String(useParams()?.locale ?? "uz");
  const t = pick(T, locale);
  const [form, setForm] = useState({ name: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    // Telegramga yuborish (qo'llanma so'rovi)
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.contact); // Kontakt sifatida email/telefon ketaveradi
    formData.append("phone", "Ko'rsatilmadi");
    formData.append("service", "Free Resource Download");
    // Xabar admin uchun (o'zbekcha); sayt tili alohida yuboriladi -- javobni shu tilda yozish uchun.
    formData.append("message", "🎁 BEPUL MATERIAL SO'ROVI (PDF yoki 3D model qidirmoqda)");
    formData.append("lang", locale);
    
    await sendToTelegram(formData);
    
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          
          {/* Chap: Ma'lumot va Taklif qismi */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <FileDown className="w-4 h-4" /> {t.badge}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              {t.h1a} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">{t.h1b}</span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              {t.intro}
            </p>

            {/* KEYIN-TOLDIRING: qo'llanma (o'zbekcha PDF) tayyor bo'lgach, bu ro'yxatni uning
                haqiqiy bo'limlariga moslang. Qo'llanmada bo'lmagan narsani va'da qilmang. */}
            <ul className="space-y-4 pt-4">
               {t.items.map((item, i) => (
                 <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                 </li>
               ))}
            </ul>
          </div>

          {/* O'ng: Form qismi */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{t.formTitle}</h2>
                  <p className="text-slate-400 text-sm">
                    {t.formIntro}
                  </p>
                </div>

                {sent ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-white">{t.sentTitle}</h3>
                    <p className="text-slate-400 text-sm">
                      {t.sentText}
                    </p>
                    <Link href={`/${locale}/blog`} className="inline-block mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors">
                        {t.toBlog}
                      </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="free-name" className="text-sm font-semibold text-slate-300 block mb-1.5">{t.name}</label>
                      <input
                  id="free-name"
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.namePh}
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="free-contact" className="text-sm font-semibold text-slate-300 block mb-1.5">{t.contact}</label>
                      <input
                  id="free-contact"
                        required
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="+998 90 123 45 67"
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>{t.submit} <Send className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
