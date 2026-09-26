// next/image uchun loader (next.config.ts -> images.loaderFile).
// Unsplash rasmlari o'z CDN'ida kerakli o'lchamga keltiriladi (w, q) va brauzer
// qo'llasa WebP/AVIF beriladi (auto=format) -- Vercel'ning rasm limiti sarflanmaydi.
// Boshqa manzildagi rasmlar o'zgarishsiz qaytariladi.
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  return src;
}
