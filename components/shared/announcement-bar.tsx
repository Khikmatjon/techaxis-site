"use client";

import React from 'react';
import Link from 'next/link';

// Yozuv matni: locales/*.json -> "announcement"; bosilganda jonli kurs sahifasiga olib boradi.
export const AnnouncementBar = ({ dict, locale }: { dict: any; locale: string }) => {
  if (!dict?.announcement) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-2.5 px-4 overflow-hidden">
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] animate-shine"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <Link href={`/${locale}/solidworks-jonli-kurs`} className="text-sm md:text-[13px] font-bold text-white tracking-wide text-center hover:underline underline-offset-4">
          {dict.announcement}
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
