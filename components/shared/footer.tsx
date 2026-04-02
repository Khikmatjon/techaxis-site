"use client";

import React from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = ({ dict }: { dict: any }) => {
  const currentYear = new Date().getFullYear();
  const f = dict?.footer;

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kompaniya haqida */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display tracking-tighter">
              TechAxis<span className="text-blue-500">Group</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {dict?.hero?.subtitle}
            </p>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@techaxis_academy?si=Xrhh9iFOkFJQu7EI" target="_blank" className="p-3 bg-white/5 rounded-xl hover:bg-red-600 transition-all text-white">
                <Youtube size={20} />
              </a>
              <a href="https://instagram.com/hikmatjon.m" target="_blank" className="p-3 bg-white/5 rounded-xl hover:bg-pink-600 transition-all text-white">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/in/melikuziev-khikmatjon" target="_blank" className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigatsiya */}
          <div>
            <h4 className="text-lg font-bold mb-6">{f?.nav_title || "Navigatsiya"}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">{f?.services || "Xizmatlar"}</Link></li>
              <li><Link href="#about" className="hover:text-blue-400 transition-colors">{f?.about || "Biz haqimizda"}</Link></li>
              <li><Link href="#projects" className="hover:text-blue-400 transition-colors">{f?.projects || "Loyihalar"}</Link></li>
              <li><Link href="/software/solidworks" className="hover:text-blue-400 transition-colors">SOLIDWORKS</Link></li>
              <li><Link href="/software/catia" className="hover:text-blue-400 transition-colors">CATIA</Link></li>
            </ul>
          </div>

          {/* Bo'limlar */}
          <div>
            <h4 className="text-lg font-bold mb-6">{f?.resources_title || "Resurslar"}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="/training" className="hover:text-blue-400 transition-colors">{f?.training_center || "O'quv markazi"}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{f?.support || "Texnik qo'llab-quvvatlash"}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{f?.docs || "Hujjatlar"}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{f?.privacy || "Maxfiylik siyosati"}</Link></li>
            </ul>
          </div>

          {/* Kontaktlar */}
          <div>
            <h4 className="text-lg font-bold mb-6">{f?.contact_title || "Kontakt"}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-500" />
                <span>+998 90 000 00 00</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-500" />
                <span>info@techaxis.uz</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-500" />
                <span className="text-xs">{f?.location || "Toshkent, O'zbekiston / Janubiy Koreya"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki qism */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© {currentYear} TechAxis Group. {f?.rights || "Barcha huquqlar himoyalangan."}</p>
          <p>{f?.slogan || "Muhandislikda yetakchilik sari"}</p>
        </div>
      </div>
    </footer>
  );
};