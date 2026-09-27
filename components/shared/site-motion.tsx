"use client";

// Sayt bo'ylab harakat (ko'rinishi app/globals.css -> "SAYT DIZAYNI" bo'limida):
// - aylantirish: <html data-scroll="down|up"> va data-scrolled -- pastga aylantirganda
//   menyu yashirinadi, yuqoriga aylantirganda qaytadi; --scroll-progress -- tepadagi chiziq;
// - bosish: bosilgan joyda neon to'lqin (.click-fx).
// "Kamroq harakat" sozlamasi yoqilgan qurilmada bosish effekti chiqmaydi.

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const html = document.documentElement;
    let lastY = window.scrollY;
    // Yengil ish (ikki atribut va bitta CSS o'zgaruvchi) -- to'g'ridan-to'g'ri scroll hodisasida.
    const onScroll = () => {
      const y = window.scrollY;
      const max = html.scrollHeight - window.innerHeight;
      if (Math.abs(y - lastY) > 4) {
        const dir = y > lastY ? "down" : "up";
        if (html.dataset.scroll !== dir) html.dataset.scroll = dir;
        lastY = y;
      }
      const scrolled = y > 80 ? "true" : "false";
      if (html.dataset.scrolled !== scrolled) html.dataset.scrolled = scrolled;
      html.style.setProperty("--scroll-progress", (max > 0 ? Math.min(1, y / max) : 0).toFixed(4));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || reduce.matches) return;
      const fx = document.createElement("span");
      fx.className = "click-fx";
      fx.style.left = `${e.clientX}px`;
      fx.style.top = `${e.clientY}px`;
      document.body.appendChild(fx);
      fx.addEventListener("animationend", () => fx.remove(), { once: true });
      setTimeout(() => fx.remove(), 1500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
