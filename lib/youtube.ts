// YouTube havolalari bilan ishlash. Admin panelda dars videosi uchun istalgan ko'rinishdagi
// havola yozilishi mumkin (youtube.com/watch?v=..., youtu.be/..., /embed/..., /shorts/...):
// shu yerda video ID ajratib olinadi va bitta embed manziliga keltiriladi.

// Kurs ma'lumotlari ilk yozilganda hamma darsga qo'yilgan namuna video. Bu haqiqiy dars
// emas -- saytda video yo'qdek ko'rsatiladi (bepul dars bo'limi chiqmaydi, kabinetda
// "video hali joylanmagan" yoziladi). Admin panelda haqiqiy havola qo'yilsa, o'zi ko'rinadi.
const NAMUNA_VIDEOLAR = new Set(["dQw4w9WgXcQ"]);

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\.|^m\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (u.pathname === "/watch") id = u.searchParams.get("v");
    else {
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
      if (m) id = m[1];
    }
  }
  if (!id || !ID_RE.test(id) || NAMUNA_VIDEOLAR.has(id)) return null;
  return id;
}

// youtube-nocookie: video bosilmaguncha YouTube kuzatuv cookie'lari qo'yilmaydi.
export const youtubeEmbedUrl = (id: string, autoplay = false) =>
  `https://www.youtube-nocookie.com/embed/${id}${autoplay ? "?autoplay=1" : ""}`;

export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Dars sahifasidagi video uchun manzil: YouTube havolasi embed'ga keltiriladi, namuna video
// bo'lsa null (video yo'q deb hisoblanadi), boshqa https manzil (masalan Vimeo embed) o'zgarmaydi.
export function videoEmbedSrc(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  if (id) return youtubeEmbedUrl(id);
  if (!url || !/^https:\/\//.test(url.trim())) return null;
  try {
    const host = new URL(url.trim()).hostname.replace(/^www\.|^m\./, "");
    if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") return null; // namuna yoki buzuq YouTube havola
  } catch {
    return null;
  }
  return url.trim();
}
