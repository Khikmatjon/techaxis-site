import { ImageResponse } from "next/og";

// Havola Telegram, Facebook, X va boshqalarda ulashilganda chiqadigan rasm (1200x630).
// Haqiqiy logo tayyor bo'lgach, shu yerdagi "TA" belgisini logo rasmi bilan almashtiring.
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
          background: "linear-gradient(135deg, #020617 0%, #0f172a 55%, #0c4a6e 100%)",
          color: "white",
          fontFamily: sora ? "Sora" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              fontWeight: 800,
            }}
          >
            TA
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
            <span>Tech</span>
            <span style={{ color: "#38bdf8" }}>Axis</span>
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
