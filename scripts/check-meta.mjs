// Har bir ommaviy sahifaning <title>, meta description, robots va og:/twitter:
// teglarini tekshiradi:
// - title 60, description 155 belgidan oshmasin, bo'sh bo'lmasin;
// - bir xil title yoki description ikki sahifada takrorlanmasin (tilni hisobga olib);
// - /login, /register, /checkout "noindex" bo'lsin;
// - har sahifada og:image va twitter:card = summary_large_image bo'lsin;
// - canonical sahifaning o'z manzili bo'lsin, hreflang uz/ru/en/x-default to'g'ri bo'lsin.
//
//   node scripts/check-meta.mjs                        -> http://localhost:3000
//   node scripts/check-meta.mjs https://www.techaxis.uz -> jonli sayt

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const LOCALES = ["uz", "ru", "en"];
const PAGES = [
  "", "/software", "/software/solidworks", "/software/catia", "/training", "/courses",
  "/courses/solidworks-basics", "/courses/catia-v5", "/courses/3d-modeling", "/courses/plm-systems",
  "/blog", "/free", "/privacy", "/terms", "/login", "/register", "/checkout/catia-v5",
];
const SITE = "https://www.techaxis.uz";
const NOINDEX = new Set(["/login", "/register", "/checkout/catia-v5"]);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function meta(html, attr, key) {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, "i");
  const re2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`, "i");
  const m = html.match(re) || html.match(re2);
  return m ? decode(m[1]) : null;
}

const rows = [];
const problems = [];
for (const loc of LOCALES) {
  for (const p of PAGES) {
    const path = `/${loc}${p}`;
    const res = await fetch(base + path, { signal: AbortSignal.timeout(60_000) });
    const html = await res.text();
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const desc = meta(html, "name", "description") ?? "";
    const robots = meta(html, "name", "robots") ?? "";
    const ogImage = meta(html, "property", "og:image");
    const card = meta(html, "name", "twitter:card");
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
    const hreflang = Object.fromEntries(
      [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"/gi)].map((m) => [m[1], m[2]]),
    );
    rows.push({ loc, p, path, title, desc });

    if (res.status !== 200) problems.push(`${path}: HTTP ${res.status}`);
    if (!title) problems.push(`${path}: title yo'q`);
    if (title.length > 60) problems.push(`${path}: title ${title.length} belgi (>60)`);
    if (!desc) problems.push(`${path}: description yo'q`);
    if (desc.length > 155) problems.push(`${path}: description ${desc.length} belgi (>155)`);
    if (NOINDEX.has(p) && !/noindex/.test(robots)) problems.push(`${path}: noindex yo'q`);
    if (!NOINDEX.has(p) && /noindex/.test(robots)) problems.push(`${path}: noindex bo'lmasligi kerak`);
    if (!ogImage) problems.push(`${path}: og:image yo'q`);
    if (card !== "summary_large_image") problems.push(`${path}: twitter:card = ${card}`);
    if (canonical !== SITE + path) problems.push(`${path}: canonical = ${canonical}`);
    const want = { uz: `${SITE}/uz${p}`, ru: `${SITE}/ru${p}`, en: `${SITE}/en${p}`, "x-default": `${SITE}/uz${p}` };
    for (const [lang, url] of Object.entries(want)) {
      if (hreflang[lang] !== url) problems.push(`${path}: hreflang ${lang} = ${hreflang[lang]}`);
    }
  }
}

for (const field of ["title", "desc"]) {
  const seen = new Map();
  for (const r of rows) {
    const key = r[field];
    if (!key) continue;
    if (seen.has(key)) problems.push(`takror ${field}: ${seen.get(key)} va ${r.path} -> "${key.slice(0, 50)}"`);
    else seen.set(key, r.path);
  }
}

if (process.argv.includes("--list")) {
  for (const r of rows) console.log(`${r.path.padEnd(30)} ${r.title}\n${"".padEnd(31)}${r.desc}`);
}
console.log(`${base}: ${rows.length} sahifa, ${problems.length} muammo`);
for (const pr of problems) console.log("  - " + pr);
process.exitCode = problems.length ? 1 : 0;
