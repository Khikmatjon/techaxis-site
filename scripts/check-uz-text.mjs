#!/usr/bin/env node
// O'zbekcha matnni tekshiradi (17-kun): saytda ko'rinadigan matnlar -- locales/uz.json,
// content/*.ts, lib/courses.ts va sahifa/komponentlardagi JSX matni (admin paneldan tashqari).
// Topadi: tutuq belgisi (') tushib qolgan so'zlar, brend yozilishi (SOLIDWORKS), o'zbekchaga xos
// bo'lmagan "Har So'z Bosh Harf" sarlavhalar, o'zbekcha matnda kirill harflari, ortiqcha bo'shliq.
// Ishlatish: node scripts/check-uz-text.mjs   (xato topilsa chiqish kodi 1)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const files = [];
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!/node_modules|\.next|admin|admin-cms/.test(p)) walk(p); }
    else if (/\.(tsx|ts|json)$/.test(f)) files.push(p);
  }
}
walk(join(ROOT, "app")); walk(join(ROOT, "components"));
files.push(join(ROOT, "locales/uz.json"), join(ROOT, "lib/courses.ts"), ...readdirSync(join(ROOT, "content")).map((f) => join(ROOT, "content", f)));

// Tutuq belgisi kerak bo'lgan keng tarqalgan o'zaklar (o', g', ma', ta' ...) -- belgisiz yozilganini qidiramiz.
const NEED_APOS = [
  "bolad", "bolgan", "bolsa", "bolib", "bolish", "boling", "ozingiz", "ozbek", "togri", "korish", "korsat", "korin", "qoshim",
  "qoshish", "ozim", "oquv", "oqitu", "oqish", "organ", "tolov", "tolan", "malumot", "talim", "qollanma", "qollab", "boglan",
  "kopro", "sorov", "soral", "ozgarish", "ozgart", "goya", "togris", "kochir",
];
const NEED_RE = new RegExp(`\\b(${NEED_APOS.join("|")})[a-z]*`, "gi");
const SAFE = /\b(organi[zk]|organization|korinth)/i; // inglizcha so'zlar
// Ataylab inglizcha qoldirilgan texnik atamalar (SOLIDWORKS/CATIA buyruq va modul nomlari) hamda
// ichki yorliqlar (Telegram xabaridagi xizmat nomi) -- "Har So'z Bosh Harf" deb hisoblanmaydi.
const TERMS = /Interference|Collision|Smart Dimensions|Geometric|Thermal|Static Structural|Bill of Materials|Change Management|Sweep|Loft|Free Resource Download/;
const problems = [];
const add = (file, line, kind, text) => problems.push({ file: relative(ROOT, file), line, kind, text: text.trim().slice(0, 140) });

for (const file of files) {
  const src = readFileSync(file, "utf8").split(/\r?\n/);
  src.forEach((raw, i) => {
    if (/^\s*(\/\/|\*|\/\*|import )/.test(raw)) return; // izoh va importlar
    // faqat matn bo'laklari: qo'shtirnoqdagi satrlar va JSX matni
    const chunks = [...raw.matchAll(/"([^"\n]{3,})"|`([^`\n]{3,})`|>([^<>{}\n]{3,})</g)].map((m) => m[1] || m[2] || m[3]);
    for (const t of chunks) {
      if (t.includes("${") || /^[\s:,.;()!?=&|-]+$/.test(t)) continue; // kod bo'laklari (shablon satrlar)
      if (/^\s*\)|&&|\|\|/.test(t)) continue; // ikki qo'shtirnoq orasiga tushgan kod: `) && !x.includes(`
      if (/^[\w./@#:?=&%-]+$/.test(t) || /className|https?:|\.(png|jpg|svg)|^[a-z-]+(\s[a-z-]+)*$/.test(t) && !/\s/.test(t)) continue;
      if (/[a-z]/i.test(t) && /\b(bg|text|px|py|rounded|flex|grid|border|hover:|dark:|w-|h-)\S*/.test(t) && !/[.!?]$/.test(t) && t.split(" ").every((w) => /^[a-z0-9:/\[\]().%#-]+$/i.test(w))) continue; // tailwind klasslari
      for (const m of t.matchAll(NEED_RE)) if (!SAFE.test(m[0])) add(file, i + 1, "tutuq belgisi?", `${m[0]}  ←  ${t}`);
      if (/\bSolid[Ww]orks\b|\bSolidworks\b/.test(t) && !/@|youtube|t\.me/.test(t)) add(file, i + 1, "brend: SOLIDWORKS", t);
      // huquqiy matnlar, SEO fayli va ro'yxatdan o'tish sahifasida ruscha tarjima ham bor -- u yerda kirill harfi normal
      if (/[а-яё]/i.test(t) && !/seo\.ts|foydalanish-shartlari|maxfiylik-siyosati|register[\\/]page/.test(file)) add(file, i + 1, "kirill harfi", t);
      if (/ {2,}\S/.test(t.trim()) || /\s[,.!?:;]/.test(t)) add(file, i + 1, "bo'shliq/tinish", t);
      const words = t.trim().split(/\s+/).filter((w) => /^[A-Za-zʻ'’-]+$/.test(w) && w.length > 2);
      if (words.length >= 3 && words.every((w) => /^[A-Z]/.test(w)) && !/^[A-Z0-9 &/().-]+$/.test(t) && /[a-z]/.test(t)
          && !TERMS.test(t) && !/seo\.ts/.test(file) // seo.ts'da inglizcha sarlavhalar ham bor
          && !/SOLIDWORKS|CATIA|3DEXPERIENCE|Dassault|Systèmes|Associate|Professional|Design|Standard|Premium|Students/.test(t))
        add(file, i + 1, "Har So'z Bosh Harf", t);
    }
  });
}

const byKind = problems.reduce((m, p) => ((m[p.kind] ??= []).push(p), m), {});
for (const [k, list] of Object.entries(byKind)) {
  console.log(`\n== ${k} (${list.length})`);
  for (const p of list) console.log(`  ${p.file}:${p.line}  ${p.text}`);
}
console.log(`\nJami: ${problems.length} ta shubhali joy (${files.length} fayl).`);
process.exit(problems.length ? 1 : 0);
