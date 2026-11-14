// Isbotsiz da'volar skaneri (37-kun, "Yakuniy o'qish"): sahifalardagi ko'rinadigan matndan
// tekshirilishi kerak bo'lgan iboralarni (1-raqamli, sertifikatlangan, rasmiy, mijoz brendlari,
// foizlar, kafolat) topib, qaysi sahifada va qanday kontekstda ekanini ro'yxat qiladi.
// Bu XATO EMAS: ogohlantirish. Har topilmani egasi o'qib, isbotlanadimi-yo'qmi hal qiladi.
//
//   node scripts/check-claims.mjs                         -> http://localhost:3000
//   node scripts/check-claims.mjs https://www.techaxis.uz -> jonli sayt
//   node scripts/check-claims.mjs <manzil> --strict       -> topilma bo'lsa chiqish kodi 1
const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "http://localhost:3000").replace(/\/$/, "");
const strict = args.includes("--strict");

// [belgi, ibora (regex), izoh]
const PATTERNS = [
  ["1-raqamli / eng yaxshi", /\b1[- ]?raqamli|\bbirinchi raqam|№\s?1\b|\bnumber one\b|\b#1\b|\bnumber 1\b|номер\s?1\b|лучш(ий|ая|ее|ие) в\b|\bthe best\b/i, "Isbotlanmagan eng yuqori daraja"],
  ["sertifikatlangan / rasmiy", /sertifikatlangan(?! (kart|video|drayver|ish stansiya))|rasmiy (hamkor|vakil|distribyutor|diler)|authori[sz]ed (partner|reseller)|official (partner|reseller)|официальн(ый|ая|ое) (партн|представ|дилер)|сертифицированн(?!ые (карт|видеокарт|драйвер)|ых рабочих)/i, "Maqom/hamkorlik da'vosi: hujjat bormi?"],
  ["mijoz / brend nomlari", /\b(Airbus|Boeing|BMW|Tesla|Toyota|Mercedes|Audi|Volkswagen|KIA|Hyundai|HMC|Chevrolet|UzAuto|Siemens|Bosch|Samsung|Apple|Google)\b/, "Ruxsatsiz mijoz/brend nomi"],
  ["TechAxis sertifikati / ishga tavsiya", /(premium|professional|asosiy|basic|премиум|профессиональный|базовый)[- ]?(sertifikat|certificate|сертификат)|certificate of excellence|sertifikat olishga haqli|eligible for a certificate|получить сертификат|ishga tavsiya|ish izlash|karyera (konsult|bo'yicha|reja)|career (help|plan|consult)|job (search|recommend)|по поиску работы|поиск(у)? работы|карьерн|карьерой|для трудоустройства/i, "TechAxis o'zi bermaydigan sertifikat/ish va'dasi (DS imtihon sertifikatlari bundan mustasno)"],
  ["foiz va raqamli da'vo", /\b\d{2,3}\s?%/, "Statistika: manbasi bormi?"],
  ["kafolat va'dasi", /kafolat|guarante|гарант/i, "Kafolat/ish bilan ta'minlash va'dasi"],
  ["ish topish / daromad", /ish bilan ta'minla|ish topish|ishga joylash|trudoustro|get a job|job placement|гарантирован\w* трудоустро|daromad|income/i, "Natija va'dasi"],
  ["soni / yillar / o'quvchilar", /\b\d{2,}\+?\s?(yillik|yil tajriba|years|лет|o'quvchi|talaba|students|студент|mijoz|clients|клиент|loyiha|projects|проект)\b/i, "Raqam: haqiqiy hisobmi?"],
];

const get = async (url) => {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000) });
    return r.ok ? await r.text() : null;
  } catch {
    return null;
  }
};
const text = (html) =>
  html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|#x27|#39|quot|nbsp);/g, (m) => ({ "&amp;": "&", "&#x27;": "'", "&#39;": "'", "&quot;": '"', "&nbsp;": " " })[m])
    .replace(/\s+/g, " ")
    .trim();

const sitemap = await get(`${base}/sitemap.xml`);
if (!sitemap) {
  console.error(`sitemap.xml olinmadi: ${base}`);
  process.exit(1);
}
const paths = new Set();
for (const m of sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)) {
  const p = m[1];
  paths.add(p);
  // Sitemap faqat bir tilni berishi mumkin: uch tildagi shu sahifa ham ko'riladi.
  const swap = p.match(/^\/(uz|ru|en)(\/.*)?$/);
  if (swap) for (const l of ["uz", "ru", "en"]) paths.add(`/${l}${swap[2] ?? ""}`);
}

const found = new Map(); // belgi -> [{ path, snippet }]
let pages = 0;
for (const p of [...paths].sort()) {
  const html = await get(base + p);
  if (!html) continue;
  pages++;
  const t = text(html);
  for (const [label, re] of PATTERNS) {
    // Blog maqolalari rasmiy manbalar bilan tasdiqlangan faktlar ("sertifikatlangan ish stansiyalari" kabi):
    // maqom da'vosi bo'yicha faqat qolgan sahifalar tekshiriladi.
    if (label === "sertifikatlangan / rasmiy" && p.includes("/blog/")) continue;
    const g =new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const m of t.matchAll(g)) {
      const s = Math.max(0, m.index - 50);
      const snippet = "…" + t.slice(s, m.index + m[0].length + 60).trim() + "…";
      if (!found.has(label)) found.set(label, []);
      found.get(label).push({ path: p, snippet });
    }
  }
}

let total = 0;
for (const [label, , note] of PATTERNS) {
  const list = found.get(label) ?? [];
  if (!list.length) continue;
  // Bir xil iboraning uch tildagi takrori bilan to'ldirmaslik uchun sahifa bo'yicha guruhlaymiz.
  const byPath = new Map();
  for (const x of list) if (!byPath.has(x.path)) byPath.set(x.path, x);
  console.log(`\n[${label}] ${byPath.size} sahifa. ${note}`);
  for (const x of [...byPath.values()].slice(0, 12)) console.log(`  ${x.path}  ${x.snippet}`);
  if (byPath.size > 12) console.log(`  ... yana ${byPath.size - 12} ta sahifa`);
  total += byPath.size;
}
console.log(`\n${base}: ${pages} sahifa o'qildi, ${total} ta tekshirilishi kerak bo'lgan joy (ogohlantirish).`);
process.exitCode = strict && total ? 1 : 0;
