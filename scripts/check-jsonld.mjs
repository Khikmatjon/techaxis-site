// Sahifalardagi structured data (JSON-LD) ni tekshiradi:
// - har <script type="application/ld+json"> to'g'ri JSON bo'lsin;
// - Google talab qiladigan maydonlar bo'lsin (Course, BreadcrumbList, BlogPosting,
//   EducationalOrganization);
// - reyting/sharh (aggregateRating, review) bo'lmasin -- haqiqiy sharhlar yo'q;
// - kurs narxi (offers.price) kurslar ro'yxatida ko'rsatilgan narx bilan bir xil bo'lsin.
//
//   node scripts/check-jsonld.mjs                        -> http://localhost:3000
//   node scripts/check-jsonld.mjs https://www.techaxis.uz -> jonli sayt

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const COURSES = ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"];
const PAGES = [
  ["/uz", ["EducationalOrganization"]],
  ["/uz/software", ["BreadcrumbList"]],
  ["/ru/software/solidworks", ["BreadcrumbList"]],
  ["/en/software/catia", ["BreadcrumbList"]],
  ["/uz/training", ["BreadcrumbList"]],
  ["/uz/courses", ["BreadcrumbList"]],
  ...COURSES.map((c) => [`/uz/courses/${c}`, ["Course", "BreadcrumbList"]]),
  ["/uz/blog", ["BreadcrumbList"]],
  ["/uz/free", ["BreadcrumbList"]],
  ["/ru/privacy", ["BreadcrumbList"]],
  ["/en/terms", ["BreadcrumbList"]],
];

const problems = [];
const get = async (p) => (await fetch(base + p, { signal: AbortSignal.timeout(60_000) })).text();

function blocks(html, path) {
  const out = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const v = JSON.parse(m[1]);
      out.push(...(Array.isArray(v) ? v : [v]));
    } catch {
      problems.push(`${path}: JSON o'qilmadi`);
    }
  }
  return out;
}

const need = (path, obj, keys) => {
  for (const k of keys) {
    const v = k.split(".").reduce((o, x) => (o == null ? o : o[x]), obj);
    if (v === undefined || v === null || v === "") problems.push(`${path}: ${obj["@type"]}.${k} yo'q`);
  }
};

function validate(path, b) {
  if (JSON.stringify(b).match(/aggregateRating|"review"/)) problems.push(`${path}: reyting/sharh bor`);
  switch (b["@type"]) {
    case "EducationalOrganization":
      need(path, b, ["name", "url"]);
      break;
    case "Course":
      need(path, b, ["name", "description", "provider.name", "offers.price", "offers.priceCurrency", "offers.category", "hasCourseInstance.courseMode"]);
      if (!b.hasCourseInstance?.courseWorkload && !b.hasCourseInstance?.courseSchedule)
        problems.push(`${path}: CourseInstance.courseWorkload/courseSchedule yo'q`);
      break;
    case "BreadcrumbList":
      if (!b.itemListElement?.length) problems.push(`${path}: BreadcrumbList bo'sh`);
      b.itemListElement?.forEach((it, i) => {
        if (it.position !== i + 1 || !it.name || !it.item) problems.push(`${path}: breadcrumb ${i + 1}-element noto'g'ri`);
      });
      break;
    case "BlogPosting":
      need(path, b, ["headline", "datePublished", "author.name", "image"]);
      if (b.headline?.length > 110) problems.push(`${path}: headline ${b.headline.length} belgi (>110)`);
      if (Number.isNaN(Date.parse(b.datePublished))) problems.push(`${path}: datePublished sana emas`);
      break;
  }
}

// Kurslar ro'yxatidagi narxlar (kartada "1 200 000 UZS" kabi) -- JSON-LD narxi bilan solishtirish uchun.
const listHtml = await get("/uz/courses");
// React raqam va matn orasiga <!-- --> qo'yadi: "1,260,000<!-- --> UZS".
const shownPrices = new Set(
  [...listHtml.matchAll(/>([\d,\s ]+)(?:<!-- -->)?\s*UZS</g)].map((m) => Number(m[1].replace(/\D/g, ""))),
);
if (!shownPrices.size) problems.push("/uz/courses: kurs narxlari topilmadi (sahifa tuzilishi o'zgarganmi?)");

for (const [path, types] of PAGES) {
  const bs = blocks(await get(path), path);
  const found = bs.map((b) => b["@type"]);
  for (const t of types) if (!found.includes(t)) problems.push(`${path}: ${t} yo'q`);
  for (const b of bs) {
    validate(path, b);
    if (b["@type"] === "Course" && !shownPrices.has(Number(b.offers?.price)))
      problems.push(`${path}: Course narxi ${b.offers?.price} kurslar ro'yxatidagi narxlarda yo'q (${[...shownPrices].join(", ")})`);
  }
}

// Blog maqolalari -- sitemap'dan olinadi.
const sitemap = await get("/sitemap.xml");
const posts = [...sitemap.matchAll(/<loc>[^<]*(\/uz\/blog\/[^<]+)<\/loc>/g)].map((m) => m[1]);
for (const p of posts) {
  const bs = blocks(await get(p), p);
  if (!bs.some((b) => b["@type"] === "BlogPosting")) problems.push(`${p}: BlogPosting yo'q`);
  bs.forEach((b) => validate(p, b));
}

console.log(`${base}: ${PAGES.length + posts.length} sahifa, ${problems.length} muammo`);
for (const pr of problems) console.log("  - " + pr);
process.exitCode = problems.length ? 1 : 0;
