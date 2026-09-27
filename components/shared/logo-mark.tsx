// TechAxis belgisi -- izometrik kub (3D model ramzi). Egasi tanlagan (2026-09-27).
// Uch yuzi uch rangda (moviy, ko'k, binafsha), qirralar uchrashgan nuqta yorug'.
// Belgida oq chiziqlar bor, shuning uchun u doim to'q plitkada turadi (.brand-mark).
// Xuddi shu shakl: app/icon.svg (favicon), app/apple-icon.tsx, app/[locale]/opengraph-image.tsx.
import { useId } from "react";

export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" strokeLinejoin="round">
      <defs>
        <linearGradient id={`${id}o`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path d="M16 4 26.4 10 16 16 5.6 10Z" fill="#22d3ee" fillOpacity=".35" />
      <path d="M5.6 10 16 16v12L5.6 22Z" fill="#60a5fa" fillOpacity=".25" />
      <path d="M26.4 10 16 16v12l10.4-6Z" fill="#a78bfa" fillOpacity=".2" />
      <path d="M16 4 26.4 10v12L16 28 5.6 22V10Z" stroke={`url(#${id}o)`} strokeWidth="2" />
      <path d="M5.6 10 16 16l10.4-6M16 16v12" stroke="#e2e8f0" strokeOpacity=".75" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="1.9" fill="#22d3ee" />
    </svg>
  );
}
