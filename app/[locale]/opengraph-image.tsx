import { ImageResponse } from "next/og";

// Havola Telegram, Facebook, X va boshqalarda ulashilganda chiqadigan rasm (1200x630).
// Belgi: izometrik kub (components/shared/logo-mark.tsx bilan bir xil shakl).
// Matn lotincha: rasm shriftida kirill harflari yo'q, shuning uchun uch tilda bir xil.

export const alt = "TechAxis — SOLIDWORKS, CATIA, 3DEXPERIENCE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Rasm build paytida bir marta chiziladi (har so'rovda emas).
export const dynamic = "force-static";

// Sayt shrifti Sora (qalin). Build paytida Google Fonts'dan olinadi; olib bo'lmasa
// standart shrift bilan chiziladi -- build to'xtab qolmaydi.
async function loadSora(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Sora:wght@700").then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const sora = await loadSora();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #182232 0%, #1f2b3d 55%, #164e63 100%)",
          color: "white",
          fontFamily: sora ? "Sora" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 124,
              height: 124,
              borderRadius: 30,
              background: "#111a28",
              border: "2px solid rgba(34, 211, 238, 0.55)",
              boxShadow: "0 0 36px rgba(34, 211, 238, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="92" height="92" viewBox="0 0 32 32" fill="none" strokeLinejoin="round">
              <defs>
                <linearGradient id="o" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <path d="M16 4 26.4 10 16 16 5.6 10Z" fill="#22d3ee" fillOpacity=".35" />
              <path d="M5.6 10 16 16v12L5.6 22Z" fill="#60a5fa" fillOpacity=".25" />
              <path d="M26.4 10 16 16v12l10.4-6Z" fill="#a78bfa" fillOpacity=".2" />
              <path d="M16 4 26.4 10v12L16 28 5.6 22V10Z" stroke="url(#o)" strokeWidth="2" />
              <path d="M5.6 10 16 16l10.4-6M16 16v12" stroke="#e2e8f0" strokeOpacity=".75" strokeWidth="1.4" />
              <circle cx="16" cy="16" r="1.9" fill="#22d3ee" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
            <span>Tech</span>
            <span style={{ color: "#60a5fa" }}>Axis</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 50, fontWeight: 700, color: "#e2e8f0" }}>
            SOLIDWORKS · CATIA · 3DEXPERIENCE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, color: "#94a3b8" }}>
            <div style={{ width: 48, height: 6, borderRadius: 3, background: "#22d3ee" }} />
            techaxis.uz
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: sora ? [{ name: "Sora", data: sora, weight: 700, style: "normal" }] : [] },
  );
}
