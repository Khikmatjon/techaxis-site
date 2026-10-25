"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Yozuv matni: locales/*.json -> "announcement" (e'lon), "announcement_short" (telefon uchun
// qisqasi) va "announcement_cta" (tugma yozuvi). Butun qator bitta havola: bosilganda jonli
// kurs sahifasiga olib boradi. Admin panelda ko'rinmaydi (globals.css -> "admin-shell").
type AnnouncementDict = { announcement?: string; announcement_short?: string; announcement_cta?: string };

export const AnnouncementBar = ({ dict, locale }: { dict: AnnouncementDict; locale: string }) => {
  if (!dict?.announcement) return null;

  return (
    <div className="announcement-bar relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-2.5 px-4 overflow-hidden">
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] animate-shine"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <Link href={`/${locale}/solidworks-jonli-kurs`} className="group flex items-center justify-center gap-2 text-[13px] font-bold text-white tracking-wide text-center">
          {/* Telefonda qisqa matn (2 qatordan oshmasin), kattaroq ekranda to'liq matn */}
          <span className="sm:hidden group-hover:underline underline-offset-4">{dict.announcement_short ?? dict.announcement}</span>
          <span className="hidden sm:inline group-hover:underline underline-offset-4">{dict.announcement}</span>
          {dict.announcement_cta && (
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white/20 p-1 sm:px-3 sm:py-0.5 transition-colors group-hover:bg-white/30">
              <span className="hidden sm:inline">{dict.announcement_cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          )}
        </Link>
      </div>

      <style jsx>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
