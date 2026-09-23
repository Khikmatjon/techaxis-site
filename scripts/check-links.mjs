// Header, footer va asosiy sahifalardagi barcha ICHKI havolalarni tekshiradi:
// - /yol ko'rinishidagi havolalar HTTP holatini,
// - #anchor (yoki /yol#anchor) ko'rinishidagi havolalar nishon sahifada
//   shu id bilan element bor-yo'qligini tekshiradi.
// Tashqi (http/https boshqa domen), mailto: va tel: havolalar o'tkazib yuboriladi.
//
//   node scripts/check-links.mjs                        -> http://localhost:3000 (dev yoki start)
//   node scripts/check-links.mjs https://www.techaxis.uz -> jonli sayt

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const TIMEOUT_MS = 60_000;

// Havolalar shu sahifalarda qidiriladi (navbar/footer har sahifada bir xil,
// shu sababli bittasini ko'rib chiqish yetarli, lekin bosh sahifadagi barcha
// bo'lim ichidagi havolalarni ham qamrab olish uchun bir nechta sahifa olinadi).
const SEED_PAGES = ["/uz", "/uz/courses", "/uz/software", "/uz/training", "/uz/blog", "/uz/free"];

async function fetchText(path) {
  const res = await fetch(base + path, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  return { status: res.status, text: res.ok ? await res.text() : "" };
}

function extractHrefs(html) {
  return [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
}

function isInternal(href) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (/^https?:\/\//.test(href)) {
    try {
      return new URL(href).origin === new URL(base).origin;
    } catch {
      return false;
    }
  }
  return href.startsWith("/") || href.startsWith("#");
}

function toPathAndHash(href, currentPath) {
  let path = href;
  if (/^https?:\/\//.test(href)) path = new URL(href).pathname + new URL(href).hash;
  const hashIndex = path.indexOf("#");
  if (hashIndex === -1) return { pathname: path, hash: null };
  const pathname = hashIndex === 0 ? currentPath : path.slice(0, hashIndex);
  const hash = path.slice(hashIndex + 1);
  return { pathname, hash };
}

const pageCache = new Map(); // pathname -> { status, text }
async function getPage(pathname) {
  if (!pageCache.has(pathname)) {
    pageCache.set(pathname, await fetchText(pathname).catch((err) => ({ status: `XATO (${err.name})`, text: "" })));
  }
  return pageCache.get(pathname);
}

const problems = [];
const checked = new Set(); // `${sourcePage} -> ${href}` dublikatlarni oldini olish uchun
let totalLinks = 0;

for (const seed of SEED_PAGES) {
  const { status, text } = await getPage(seed);
  if (status !== 200) {
    problems.push({ source: seed, href: seed, reason: `sahifaning o'zi ${status} qaytardi` });
    continue;
  }
  const hrefs = [...new Set(extractHrefs(text).filter(isInternal))];

  for (const href of hrefs) {
    const key = `${seed} -> ${href}`;
    if (checked.has(key)) continue;
    checked.add(key);
    totalLinks++;

    const { pathname, hash } = toPathAndHash(href, seed);
    const target = await getPage(pathname);

    if (target.status !== 200) {
      problems.push({ source: seed, href, reason: `${pathname} sahifasi ${target.status} qaytardi` });
      continue;
    }
    if (hash) {
      const hasAnchor = new RegExp(`id="${hash}"`).test(target.text);
      if (!hasAnchor) {
        problems.push({ source: seed, href, reason: `#${hash} anchor ${pathname} sahifasida topilmadi` });
      }
    }
  }
}

console.log(`${base}: ${SEED_PAGES.length} ta manba sahifa, ${totalLinks} ta ichki havola tekshirildi\n`);
if (problems.length === 0) {
  console.log("Muammo topilmadi.");
} else {
  for (const p of problems) {
    console.log(`XATO  ${p.source} ichidagi "${p.href}"  ->  ${p.reason}`);
  }
  console.log(`\n${problems.length} ta muammo topildi.`);
}
process.exit(problems.length === 0 ? 0 : 1);
