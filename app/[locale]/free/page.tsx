"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, FileDown, CheckCircle, Zap } from "lucide-react";
import { sendToTelegram } from "@/lib/actions/send-telegram";

export default function FreeResourcesPage({ params }: { params: { locale: string } }) {
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
    formData.append("message", "🎁 BEPUL MATERIAL SO'ROVI (PDF Yoki 3D Model axtarmoqda)");
    
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
              <FileDown className="w-4 h-4" /> Bepul Yuklab Olish (Lead Magnet)
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              3D Modellashtirishni o'rganish uchun ilk <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Qadamlar Qo'llanmasi</span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              Dunyodagi eng qimmat injenerlar ro'yxatiga kirish uchun sirlar tayyorladik. Bu qollanma yordamida qanday qilib qiyosiy xatolardan qochish va to'g'ri tizim orqali rivojlanishni o'rganasiz.
            </p>

            <ul className="space-y-4 pt-4">
               {[
                 "SolidWorks va CATIA asosiy farqlari",
                 "Tez ish topish uchun kerak bo'ladigan eng muhim Asoslar",
                 "CAD daromadini oshirish sirlari",
                 "Eksklyuziv bepul 3D modellar arxivi"
               ].map((item, i) => (
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
                  <h2 className="text-2xl font-bold text-white mb-2">Qo'llanmani Olish</h2>
                  <p className="text-slate-400 text-sm">
                    Mail yoki Telefon raqamingizni kiriting, materialni senga yuboramiz.
                  </p>
                </div>

                {sent ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-white">So'rov yuborildi!</h3>
                    <p className="text-slate-400 text-sm">
                      Mutaxassislarimiz tez orada materialni siz belgilagan havola ustida taqdim etadi. Bunga qadar maqolalarimizni o'qib turing.
                    </p>
                    <Link href={`/${params.locale}/blog`}>
                      <button className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors">
                        Blogga o'tish
                      </button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-300 block mb-1.5">Ismingiz</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alisher..."
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-300 block mb-1.5">Telefon yoki Email</label>
                      <input
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
                        <>Qo'llanmani Yuboring <Send className="w-5 h-5" /></>
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
