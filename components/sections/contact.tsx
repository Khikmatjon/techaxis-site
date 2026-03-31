"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendToTelegram } from '@/lib/actions/send-telegram';

export const Contact = ({ dict }: { dict: any }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendToTelegram(formData);
    
    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      label: dict?.contact?.phone_label || "Telefon",
      value: "+998 90 000 00 00",
      color: "bg-blue-50"
    },
    {
      icon: <Mail className="w-6 h-6 text-emerald-600" />,
      label: "Email",
      value: "info@techaxis.uz",
      color: "bg-emerald-50",
      href: "mailto:info@techaxis.uz"
    },
    {
      icon: <MessageSquareText className="w-6 h-6 text-cyan-600" />,
      label: "Telegram Bot",
      value: "TechAxis info",
      color: "bg-cyan-50",
      href: "https://t.me/techaxisinfobot"
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      label: dict?.contact?.address_label || "Manzil",
      value: "Toshkent, Uzbekistan",
      color: "bg-indigo-50"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* L: CONTACT INFO */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-black text-cyan-500 uppercase tracking-widest">
                {dict?.navbar?.contact || "Bog'lanish"}
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                {dict?.contact?.title || "Loyihangizni birgalikda muhokama qilaylik"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                {dict?.contact?.description || "Biz bilan bog'laning va muhandislik masalalari bo'yicha bepul konsultatsiya oling."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactOptions.map((item, index) => {
                const CardWrapper: any = item.href ? 'a' : 'div';
                return (
                  <CardWrapper 
                    key={index} 
                    href={item.href}
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noopener noreferrer" : undefined}
                    className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 block cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${item.color} dark:bg-opacity-10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                  </CardWrapper>
                );
              })}
            </div>
          </div>

          {/* R: QUOTE FORM */}
          <div className="relative">
            {/* Background Blur */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-[48px] blur-3xl -z-0"></div>
            
            <div className="relative z-10 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                    {dict?.contact?.form_title || "So'rov yuborish"}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Tez orada bizning mutaxassislar siz bilan bog'lanadi.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder={dict?.contact?.form_name || "Ismingiz"} 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 ring-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium" 
                  />
                  <input 
                    name="email"
                    required
                    type="email" 
                    placeholder={dict?.contact?.form_email || "Email"} 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 ring-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium" 
                  />
                </div>

                <select 
                  name="service"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 ring-blue-500 outline-none appearance-none cursor-pointer font-medium"
                >
                  <option value="SOLIDWORKS">SOLIDWORKS</option>
                  <option value="CATIA">CATIA</option>
                  <option value="Training">{dict?.navbar?.training || "O'quv kursi"}</option>
                  <option value="Design">{dict?.services?.design || "Muhandislik xizmati"}</option>
                </select>

                <textarea 
                  name="message"
                  required
                  rows={4} 
                  placeholder={dict?.contact?.form_message || "Loyihangiz haqida yozing..."} 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 ring-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium resize-none shadow-inner"
                ></textarea>

                <button 
                  disabled={status === "loading" || status === "success"}
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95 ${
                    status === "success" 
                      ? "bg-emerald-500 text-white" 
                      : "bg-[#0084FF] hover:bg-blue-600 text-white shadow-blue-500/20"
                  }`}
                >
                  {status === "loading" ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : status === "success" ? (
                    <>
                      <span>Yuborildi!</span>
                      <CheckCircle2 size={22} />
                    </>
                  ) : (
                    <>
                      <span>{dict?.contact?.send_button || "Xabar yuborish"}</span>
                      <Send size={18} className="rotate-45" />
                    </>
                  )}
                </button>
                
                {status === "error" && (
                  <p className="text-center text-red-500 text-sm font-bold animate-pulse">
                    Xatolik yuz berdi. Iltimos, qaytadan urining.
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};