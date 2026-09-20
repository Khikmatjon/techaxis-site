// Blog yozuvlari: umumiy turlar, yordamchi funksiyalar va tekshiruv.
// Bu fayl server ham, brauzer ham ishlatadigan sof kod (Prisma yoki fs import qilinmaydi).

export const POST_TYPES = ["fact", "article", "news", "work"] as const;
export type PostType = (typeof POST_TYPES)[number];

export const POST_TYPE_META: Record<PostType, { label: string; plural: string; badge: string; gradient: string }> = {
  fact: {
    label: "Fakt",
    plural: "Faktlar",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-500/30 via-cyan-500/20 to-slate-900",
  },
  article: {
    label: "Maqola",
    plural: "Maqolalar",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    gradient: "from-blue-600/30 via-indigo-500/20 to-slate-900",
  },
  news: {
    label: "Yangilik",
    plural: "Yangiliklar",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    gradient: "from-amber-500/30 via-orange-500/20 to-slate-900",
  },
  work: {
    label: "Ishimiz",
    plural: "Ishlarimiz",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    gradient: "from-purple-600/30 via-fuchsia-500/20 to-slate-900",
  },
};

export interface BlogPost {
  id: string;
  slug: string;
  type: PostType;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string; // ISO sana-vaqt (UTC)
}

export const POST_LIMITS = {
  title: 160,
  excerpt: 400,
  content: 60000,
  cover: 500,
  slugMin: 3,
  slugMax: 90,
} as const;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

export function isPostType(value: unknown): value is PostType {
  return typeof value === "string" && (POST_TYPES as readonly string[]).includes(value);
}

// "SOLIDWORKS uchun qancha RAM kerak?" -> "solidworks-uchun-qancha-ram-kerak"
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʻʼ`´‘’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, POST_LIMITS.slugMax)
    .replace(/-+$/g, "");
}

export function readMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

// UTC bo'yicha, shunda server va brauzerda bir xil chiqadi: "20 sentabr 2026"
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function todayDateInput(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface CleanPostInput {
  type: PostType;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string;
}

export type ValidationResult = { ok: true; value: CleanPostInput } | { ok: false; error: string };

const text = (v: unknown) => (typeof v === "string" ? v : "");

function parseDate(v: unknown): string | null {
  const s = text(v).trim();
  if (!s) return new Date().toISOString();
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T00:00:00.000Z` : s;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

// Server (asosiy tekshiruv) ham, tahrirlash oynasi (tezkor xabar uchun) ham shu funksiyadan foydalanadi.
export function validatePostInput(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Ma'lumot noto'g'ri." };
  const r = raw as Record<string, unknown>;

  if (!isPostType(r.type)) return { ok: false, error: "Yozuv turini tanlang." };

  const title = text(r.title).trim();
  if (!title) return { ok: false, error: "Sarlavha kiriting." };
  if (title.length > POST_LIMITS.title) return { ok: false, error: `Sarlavha ${POST_LIMITS.title} belgidan oshmasin.` };

  const slug = text(r.slug).trim().toLowerCase() || slugify(title);
  if (slug.length < POST_LIMITS.slugMin || slug.length > POST_LIMITS.slugMax || !SLUG_RE.test(slug)) {
    return {
      ok: false,
      error: "Slug faqat lotin harflari, raqamlar va chiziqchadan iborat bo'lsin (masalan: solidworks-fakt-1).",
    };
  }

  const excerpt = text(r.excerpt).trim();
  if (!excerpt) return { ok: false, error: "Qisqa tavsif kiriting." };
  if (excerpt.length > POST_LIMITS.excerpt) return { ok: false, error: `Qisqa tavsif ${POST_LIMITS.excerpt} belgidan oshmasin.` };

  const content = text(r.content).replace(/\r\n?/g, "\n").trim();
  if (!content) return { ok: false, error: "Matn kiriting." };
  if (content.length > POST_LIMITS.content) return { ok: false, error: `Matn ${POST_LIMITS.content} belgidan oshmasin.` };

  const cover = text(r.coverImage).trim();
  if (cover) {
    if (cover.length > POST_LIMITS.cover) return { ok: false, error: "Muqova rasm manzili juda uzun." };
    if (!/^https?:\/\//i.test(cover) && !/^\/(?!\/)/.test(cover)) {
      return { ok: false, error: "Muqova rasm manzili http:// yoki https:// bilan (yoki / bilan) boshlansin." };
    }
  }

  const publishedAt = parseDate(r.publishedAt);
  if (!publishedAt) return { ok: false, error: "Sana noto'g'ri." };

  return {
    ok: true,
    value: {
      type: r.type,
      title,
      slug,
      excerpt,
      content,
      coverImage: cover || null,
      published: r.published === true,
      publishedAt,
    },
  };
}
