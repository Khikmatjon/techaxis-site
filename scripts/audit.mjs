#!/usr/bin/env node
// Saytning barcha tekshiruvlarini bitta buyruqda ishga tushiradi (37-kun):
//   npm run audit                                  -> http://localhost:3000 (npm run dev yoki npm start ishlab turgan bo'lsin)
//   npm run audit -- https://www.techaxis.uz       -> jonli sayt
//   npm run audit -- http://localhost:3300 --full  -> yiqilgan tekshiruvning to'liq chiqishini ham ko'rsatadi
// Har tekshiruv: o'tdi / yiqildi. Bittasi yiqilsa chiqish kodi 1. "Isbotsiz da'volar" skaneri
// ogohlantirish beradi (xato hisoblanmaydi): uni egasi o'qib chiqadi.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3000").replace(/\/$/, "");
const full = args.includes("--full");
const dir = dirname(fileURLToPath(import.meta.url));

// [nomi, fayl, manzil beriladimi, faqat ogohlantirishmi]
const STEPS = [
  ["Meta teglar (title, description, og, canonical, hreflang)", "check-meta.mjs", true, false],
  ["Structured data (JSON-LD)", "check-jsonld.mjs", true, false],
  ["Ichki havolalar va #anchor'lar", "check-links.mjs", true, false],
  ["Sitemap: har URL 200 qaytaradi", "check-sitemap.mjs", true, false],
  ["Uch til: kalitlar, tarjima, o'zbekcha qoldiq", "check-i18n.mjs", true, false],
  ["O'zbekcha matn sifati (kodda)", "check-uz-text.mjs", false, false],
  ["Isbotsiz da'volar (ogohlantirish)", "check-claims.mjs", true, true],
];

const results = [];
for (const [name, file, withBase, warnOnly] of STEPS) {
  process.stdout.write(`... ${name}`);
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [join(dir, file), ...(withBase ? [base] : [])], { encoding: "utf8", timeout: 10 * 60_000, maxBuffer: 20 * 1024 * 1024 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim();
  const lines = out.split(/\r?\n/).filter((l) => l.trim());
  // Skriptlarning oxirgi mazmunli qatori -- umumiy xulosa ("... 0 muammo" kabi).
  const summary = [...lines].reverse().find((l) => /muammo|xato|ogohlant|shubhali|tekshirildi|sahifa/i.test(l)) ?? lines.at(-1) ?? "(chiqish yo'q)";
  const ok = r.status === 0;
  const state = ok ? (warnOnly && /[1-9]\d* ta tekshirilishi/.test(summary) ? "OGOH" : "O'TDI") : "YIQILDI";
  results.push({ name, state, summary: summary.trim(), out, secs: ((Date.now() - t0) / 1000).toFixed(1) });
  process.stdout.write(`\r${state.padEnd(7)} ${name} (${results.at(-1).secs} s)\n`);
}

console.log("\n" + "=".repeat(72));
console.log(`TEKSHIRUV NATIJASI: ${base}`);
console.log("=".repeat(72));
for (const r of results) console.log(`${r.state.padEnd(7)} ${r.name}\n          ${r.summary}`);

const failed = results.filter((r) => r.state === "YIQILDI");
const warned = results.filter((r) => r.state === "OGOH");
for (const r of results.filter((x) => x.state === "YIQILDI" || (full && x.state === "OGOH"))) {
  console.log(`\n--- ${r.name} (to'liq chiqish) ---\n${r.out}`);
}
if (!full && warned.length) console.log("\nOgohlantirishlar tafsiloti: npm run audit -- <manzil> --full  yoki  node scripts/check-claims.mjs <manzil>");
console.log(failed.length ? `\n${failed.length} ta tekshiruv YIQILDI.` : `\nHamma tekshiruv o'tdi${warned.length ? " (ogohlantirishlar bilan)" : ""}.`);
process.exit(failed.length ? 1 : 0);
