// Sitemap'dagi har bir URL'ga so'rov yuborib, holat kodini chiqaradi.
//
//   node scripts/check-sitemap.mjs                        -> http://localhost:3000 (dev yoki start)
//   node scripts/check-sitemap.mjs https://www.techaxis.uz -> jonli sayt
//
// Sitemap'dagi manzillar jonli domenga qaraydi, shuning uchun har birining origin'i
// tekshirilayotgan manzil (base) bilan almashtiriladi. 200 bo'lmagan URL bo'lsa, chiqish kodi 1.

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const CONCURRENCY = 6;
const TIMEOUT_MS = 60_000;

async function getStatus(path) {
  try {
    // redirect: "manual" -> yo'naltirish (3xx) ham muammo sifatida ko'rinadi
    const res = await fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(TIMEOUT_MS) });
    return res.status;
  } catch (err) {
    return `XATO (${err.name})`;
  }
}

const sitemapRes = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(TIMEOUT_MS) }).catch(() => null);
if (!sitemapRes || !sitemapRes.ok) {
  console.error(`sitemap.xml ochilmadi: ${sitemapRes ? sitemapRes.status : "ulanib bo'lmadi"} (${base})`);
  process.exit(1);
}

const xml = await sitemapRes.text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);
if (paths.length === 0) {
  console.error("sitemap.xml ichida <loc> topilmadi");
  process.exit(1);
}

const results = new Array(paths.length);
let next = 0;
async function worker() {
  while (next < paths.length) {
    const i = next++;
    results[i] = { path: paths[i], status: await getStatus(paths[i]) };
  }
}
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, paths.length) }, worker));

const bad = results.filter((r) => r.status !== 200);
for (const r of results) {
  console.log(`${String(r.status).padEnd(12)} ${r.path}${r.status === 200 ? "" : "   <-- muammo"}`);
}
console.log(`\n${base}: ${results.length} ta URL tekshirildi, ${results.length - bad.length} tasi 200, ${bad.length} tasida muammo`);
process.exit(bad.length === 0 ? 0 : 1);
