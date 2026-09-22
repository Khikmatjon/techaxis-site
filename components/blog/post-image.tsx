"use client";

import { useCallback, useState, type ReactNode } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800";

// Server komponentdan onError berib bo'lmaydi (React xatosi -> 500), shuning uchun rasm zaxirasi shu yerda.
// `fallback` berilsa, rasm ochilmaganda o'sha ko'rsatiladi (masalan, rangli sarlavha bloki), aks holda zaxira rasm.
export const PostImage = ({
  src,
  alt,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
}) => {
  const [failed, setFailed] = useState(false);

  // Rasm React "hydrate" bo'lguncha yuklanmay qolishi mumkin: onError o'shanda hali ulanmagan bo'ladi.
  const checkAlreadyFailed = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed && fallback) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image ga o'tkazish 7-kunda
    <img
      ref={checkAlreadyFailed}
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
