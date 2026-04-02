"use client";

import React from 'react';

export const AnnouncementBar = ({ dict }: { dict: any }) => {
  if (!dict?.announcement) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 py-2.5 px-4 overflow-hidden">
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] animate-shine"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <p className="text-sm md:text-[13px] font-bold text-white tracking-wide text-center">
          {dict.announcement}
        </p>
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
