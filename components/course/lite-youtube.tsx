"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/youtube";

// YouTube videosi: avval faqat rasm va "Play" tugmasi (sahifa tez ochilsin, YouTube skriptlari
// yuklanmasin), bosilganda o'sha joyda video ochiladi.
export function LiteYouTube({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        src={youtubeEmbedUrl(id, true)}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" onClick={() => setPlay(true)} aria-label={`${playLabel}: ${title}`} className="group absolute inset-0 w-full h-full">
      <Image src={youtubeThumbnail(id)} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      <span className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-20 h-20 rounded-full bg-red-600 group-hover:bg-red-500 group-hover:scale-110 transition-all shadow-2xl flex items-center justify-center">
          <Play className="w-9 h-9 text-white translate-x-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
