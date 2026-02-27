"use client";

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = ({ dict }: { dict: any }) => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Chap tomon: Ma'lumotlar */}
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {dict?.navbar?.contact || "Contact Us"}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6 leading-tight">
                {dict?.contact?.title || "Loyihangizni birgalikda muhokama qilaylik"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                {dict?.contact?.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-blue-600 p-4 rounded-2xl text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dict?.contact?.phone_label || "Telefon"}</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">+998 91 000 00 00</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-emerald-600 p-4 rounded-2xl text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">info@techaxis.uz</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="bg-indigo-600 p-4 rounded-2xl text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dict?.contact?.address_label || "Manzil"}</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Toshkent, O'zbekiston / South Korea</p>
                </div>
              </div>
            </div>
          </div>

          {/* O'ng tomon: Kotirovka Formasi */}
          <div className="bg-slate-900 dark:bg-slate-100 p-10 rounded-[40px] shadow-2xl relative overflow-hidden border border-slate-800 dark:border-slate-200">
            <div className="relative z-10 space-y-6">
              <h4 className="text-2xl font-bold text-white dark:text-slate-900 mb-4">
                {dict?.contact?.form_title || "So'rov yuborish"}
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder={dict?.contact?.form_name} className="w-full bg-white/10 dark:bg-white border-none rounded-2xl p-4 text-white dark:text-slate-900 focus:ring-2 ring-blue-500 outline-none shadow-inner" />
                <input type="email" placeholder={dict?.contact?.form_email} className="w-full bg-white/10 dark:bg-white border-none rounded-2xl p-4 text-white dark:text-slate-900 focus:ring-2 ring-blue-500 outline-none shadow-inner" />
              </div>

              <select className="w-full bg-white/10 dark:bg-white border-none rounded-2xl p-4 text-white dark:text-slate-900 focus:ring-2 ring-blue-500 outline-none appearance-none cursor-pointer">
                <option className="text-slate-900">{dict?.contact?.service_placeholder || "Xizmat turini tanlang"}</option>
                <option className="text-slate-900">SOLIDWORKS</option>
                <option className="text-slate-900">CATIA</option>
                <option className="text-slate-900">{dict?.navbar?.training}</option>
                <option className="text-slate-900">{dict?.services?.design}</option>
              </select>

              <textarea rows={4} placeholder={dict?.contact?.form_message} className="w-full bg-white/10 dark:bg-white border-none rounded-2xl p-4 text-white dark:text-slate-900 focus:ring-2 ring-blue-500 outline-none shadow-inner resize-none"></textarea>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center space-x-3 shadow-lg shadow-blue-600/20 active:scale-95">
                <span>{dict?.contact?.send_button}</span>
                <Send size={18} />
              </button>
            </div>
            
            {/* Dekorativ fon */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
};