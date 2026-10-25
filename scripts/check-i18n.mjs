#!/usr/bin/env node
// Uch tilni solishtiradi (18-kun): locales/uz.json, ru.json, en.json va content/seo.ts.
// Topadi:
//   XATO  -- ru/en'da yetishmayotgan yoki ortiqcha kalit, bo'sh qiymat, kodda ishlatilgan lekin
//            JSON'da yo'q kalit (u holda /ru va /en sahifada o'zbekcha zaxira matn chiqadi),
//            ru/en matnida o'zbekcha so'zlar, ru matnida birorta kirill harfi yo'qligi.
//   OGOH  -- uz bilan aynan bir xil qiymat (tarjima qilinmagan bo'lishi mumkin), ruscha
//            "Har Слово С Большой Буквы" uslubi, {o'zgaruvchi} nomlari mos emasligi.
// Sayt manzili berilsa, /ru va /en sahifalarida qancha o'zbekcha matn qolganini ham ko'rsatadi.
// Ishlatish: node scripts/check-i18n.mjs [http://localhost:3300]   (XATO bo'lsa chiqish kodi 1)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const LOCALES = ["uz", "ru", "en"];
const errors = [];
const warns = [];
const err = (where, msg) => errors.push(`${where}  ${msg}`);
const warn = (where, msg) => warns.push(`${where}  ${msg}`);

const flat = (obj, pre = "") =>
  Object.entries(obj).flatMap(([k, v]) => (v && typeof v === "object" ? flat(v, `${pre}${k}.`) : [[`${pre}${k}`, v]]));
const dicts = Object.fromEntries(
  LOCALES.map((l) => [l, new Map(flat(JSON.parse(readFileSync(join(ROOT, "locales", `${l}.json`), "utf8"))))]),
);

// O'zbekcha matn belgilari: o'/g' harflari yoki keng tarqalgan o'zbekcha so'zlar
const UZ = /\b[a-z]*[og]['ʻ’][a-z]+|\b(va|uchun|bilan|yoki|haqida|bo'yicha|kurs(lar)?ni|darslar?|sahifa|biz|sizning)\b/i;
const CYR = /[а-яё]/i;
// Tarjima qilinmaydigan qiymatlar: brendlar, qisqartmalar, Email, belgilar
const SAME_OK = /^(Email|E-mail|Telegram( Bot)?|Blog|PLM|CAD|SOLIDWORKS|CATIA|3DEXPERIENCE|TechAxis[\w ]*|[A-Z0-9 &./+-]+)$/;
const vars = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

function checkText(where, locale, text, uzText) {
  if (typeof text !== "string" || !text.trim()) return err(where, "bo'sh qiymat");
  if (locale === "uz") return;
  const words = text.split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w));
  if (locale === "ru" && !CYR.test(text) && !SAME_OK.test(text.trim()) && words.length >= 2)
    err(where, `ruscha emas (kirill harfi yo'q): ${text}`);
  if (locale === "en" && CYR.test(text)) err(where, `inglizcha matnda kirill harfi: ${text}`);
  const latin = locale === "ru" ? text.replace(/[^\x00-\x7F'ʻ’]+/g, " ") : text;
  const m = latin.match(UZ);
  if (m) err(where, `o'zbekcha so'z ("${m[0]}"): ${text}`);
  if (uzText !== undefined && text.trim() === String(uzText).trim() && !SAME_OK.test(text.trim()) && words.length >= 1)
    warn(where, `uz bilan bir xil (tarjima qilinmaganmi?): ${text}`);
  if (uzText !== undefined && vars(text) !== vars(uzText)) warn(where, `{o'zgaruvchi}lar mos emas: uz "${uzText}" / ${locale} "${text}"`);
  if (locale === "ru") {
    const caps = text.split(/\s+/).slice(1).filter((w) => /^[А-ЯЁ][а-яё]{2,}/.test(w));
    if (caps.length >= 1 && text.split(/\s+/).length <= 5 && !/[.!?:,/]\s/.test(text)) // vergul/"/" -- joy nomlari ro'yxati
      warn(where, `ruscha sarlavhada bosh harf ("${caps[0]}"): ${text}`);
  }
}

// 1) locales/*.json: kalitlar to'plami va qiymatlar
for (const l of ["ru", "en"]) {
  for (const k of dicts.uz.keys()) if (!dicts[l].has(k)) err(`locales/${l}.json`, `kalit yo'q: ${k}`);
  for (const k of dicts[l].keys()) if (!dicts.uz.has(k)) err(`locales/${l}.json`, `ortiqcha kalit (uz'da yo'q): ${k}`);
}
for (const l of LOCALES) for (const [k, v] of dicts[l]) checkText(`locales/${l}.json ${k}`, l, v, l === "uz" ? undefined : dicts.uz.get(k));

// 2) Kodda ishlatilgan kalitlar: dict?.a?.b va `const f = dict?.footer` -> f?.b
const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!/node_modules|\.next/.test(p)) walk(p); }
    else if (/\.tsx?$/.test(f)) files.push(p);
  }
})(join(ROOT, "app"));
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f)) files.push(p);
  }
})(join(ROOT, "components"));
const used = new Map(); // kalit -> birinchi uchragan joy
for (const file of files) {
  const src = readFileSync(file, "utf8");
  const where = relative(ROOT, file);
  for (const m of src.matchAll(/\bdict\??\.([a-z_]+)((?:\??\.[a-z_0-9]+)*)/g)) {
    const parts = [m[1], ...m[2].split(/\??\./).filter(Boolean)].filter((p) => !/^(split|replace|map|length)$/.test(p));
    if (parts.length) used.set(parts.join("."), used.get(parts.join(".")) ?? where);
  }
  for (const a of src.matchAll(/const (\w+) = dict\??\.([a-z_]+);/g))
    for (const m of src.matchAll(new RegExp(`\\b${a[1]}\\??\\.([a-z_0-9]+)`, "g"))) used.set(`${a[2]}.${m[1]}`, used.get(`${a[2]}.${m[1]}`) ?? where);
}
for (const [k, where] of used) {
  const isGroup = [...dicts.uz.keys()].some((x) => x.startsWith(`${k}.`));
  for (const l of LOCALES) if (!isGroup && !dicts[l].has(k)) err(`${where}`, `kodda dict.${k} bor, locales/${l}.json'da yo'q`);
}
// Hech qayerda ishlatilmagan kalitlar (guruh butunligicha uzatilsa, masalan labels={dict.legal}, `.kalit` bo'yicha qidiriladi)
const allSrc = files.map((f) => readFileSync(f, "utf8")).join("\n");
const unused = [...dicts.uz.keys()].filter((k) => !used.has(k) && !new RegExp(`\\.${k.split(".").pop()}\\b`).test(allSrc.replace(/dict\??\.[\w?.]+/g, "")));

// 3) content/seo.ts: har sahifada uz/ru/en title + description
const { SEO } = await import(pathToFileURL(join(ROOT, "content", "seo.ts")).href);
for (const [page, entry] of Object.entries(SEO)) {
  for (const l of LOCALES) {
    for (const f of ["title", "description"]) {
      const v = entry?.[l]?.[f];
      if (v === undefined) { if (f === "title" || entry?.uz?.description !== undefined) err(`content/seo.ts ${page}.${l}`, `${f} yo'q`); continue; }
      checkText(`content/seo.ts ${page}.${l}.${f}`, l, v, l === "uz" ? undefined : entry?.uz?.[f]);
    }
  }
}

// 4) (ixtiyoriy) Jonli sahifalar: /ru va /en'da o'zbekcha qolgan matn. Manzil berilsa, sitemap'dagi
// barcha sahifalar (kurslar, maqolalar) + kirish/ro'yxatdan o'tish tekshiriladi. Tarjima qilingan
// sahifada (canonical = o'zi) birorta o'zbekcha bo'lak qolsa -- XATO. Tarjimasi yo'q maqola
// (canonical -> /uz, "faqat o'zbek tilida" yozuvi bilan) -- OGOH.
const BASE = process.argv[2]?.replace(/\/$/, "");
const pageReport = [];
// Tarjima qilinmaydigan atoqli otlar (o'qituvchi ismi)
const NOMLAR = /Hikmatjon Meliqo'ziyev/g;
if (BASE) {
  const paths = new Set(["", "/software", "/software/solidworks", "/software/catia", "/training", "/courses", "/blog", "/free", "/solidworks-jonli-kurs", "/privacy", "/terms", "/login", "/register"]);
  const sm = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text()).catch(() => "");
  for (const m of sm.matchAll(/<loc>https?:\/\/[^/]+\/uz([^<]*)<\/loc>/g)) paths.add(m[1]);
  // Sahifaning ko'rinadigan matni: bo'laklar + alt/aria-label/placeholder/title atributlari (skript va stilsiz)
  const segments = async (url) => {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status !== 200) return { status: res.status };
    const html = await res.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(/^https?:\/\/[^/]+/, "") ?? "-";
    const body = (html.match(/<body[\s\S]*<\/body>/)?.[0] ?? html).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<template[\s\S]*?<\/template>/g, " ");
    const clean = (s) => s.replace(/&#x27;|&apos;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
    const attrs = [...body.matchAll(/\s(?:alt|aria-label|placeholder|title)="([^"]*)"/g)].map((m) => m[1]);
    const segs = [...body.split(/<[^>]+>/), ...attrs].map(clean).filter((s) => /\p{L}{3,}/u.test(s));
    return { status: 200, canonical, segs };
  };
  const isUz = (s, l) => {
    const t = s.replace(NOMLAR, "");
    // ruscha matnda faqat lotin bo'laklarini tekshiramiz (kirill so'zlari o'zbekcha emas)
    return UZ.test(l === "ru" ? t.replace(/[^\x00-\x7F'ʻ’]+/g, " ") : t) && !(l === "ru" && CYR.test(t) && !/\b[a-z]*[og]['ʻ’][a-z]+/i.test(t));
  };
  let checked = 0;
  for (const l of ["ru", "en"]) {
    for (const p of [...paths].sort()) {
      const page = await segments(`${BASE}/${l}${p}`);
      checked++;
      if (page.status !== 200) { err(`/${l}${p}`, `HTTP ${page.status}`); continue; }
      if (page.canonical !== `/${l}${p}`) {
        if (p.startsWith("/blog/")) warn(`/${l}${p}`, "maqola tarjimasi yo'q (o'zbekcha ko'rsatiladi, canonical -> /uz) -- content/blog-tarjima.ts");
        else err(`/${l}${p}`, `tarjima qilinmagan: canonical ${page.canonical}`);
        continue;
      }
      const left = [...new Set(page.segs.filter((s) => isUz(s, l)))];
      for (const s of left) err(`/${l}${p}`, `o'zbekcha matn qolgan: ${s.slice(0, 110)}`);
      pageReport.push([`/${l}${p}`, left.length ? `${left.length} ta o'zbekcha bo'lak` : "ok"]);
    }
  }
  pageReport.push(["", `jami ${checked} sahifa tekshirildi`]);
}

if (errors.length) { console.log(`\n== XATO (${errors.length})`); errors.forEach((e) => console.log("  " + e)); }
if (warns.length) { console.log(`\n== OGOHLANTIRISH (${warns.length})`); warns.forEach((w) => console.log("  " + w)); }
if (unused.length) console.log(`\n== MA'LUMOT: saytda ishlatilmagan kalitlar (${unused.length}) -- o'chirsa bo'ladi\n  ${unused.join(", ")}`);
if (pageReport.length) {
  console.log(`\n== /ru va /en sahifalari (${BASE})`);
  for (const [path, note] of pageReport) console.log(`  ${path.padEnd(28)} ${note}`);
}
console.log(`\nKalitlar: uz ${dicts.uz.size}, ru ${dicts.ru.size}, en ${dicts.en.size}; kodda ishlatilgan ${used.size}; seo.ts sahifalari ${Object.keys(SEO).length}.`);
console.log(`Jami: ${errors.length} xato, ${warns.length} ogohlantirish.`);
process.exit(errors.length ? 1 : 0);
