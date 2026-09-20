// Blog yozuvlarini saqlash va o'qish (faqat serverda ishlatiladi).
//
// Manba tanlash:
//   1) DATABASE_URL bor        -> Postgres (Prisma), "Post" jadvali. Jadval yoki baza tayyor bo'lmasa, o'qishda
//                                 ichki boshlang'ich yozuvlar (lib/blog-seed.ts) ko'rsatiladi, yozish rad etiladi.
//   2) DATABASE_URL yo'q, dev  -> .data/blog-posts.json fayli (faqat mahalliy sinov uchun; git'ga tushmaydi).
//   3) DATABASE_URL yo'q, prod -> faqat o'qish: ichki boshlang'ich yozuvlar.
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SEED_POSTS } from "@/lib/blog-seed";
import { isPostType, type BlogPost, type CleanPostInput } from "@/lib/blog";

export type StoreSource = "db" | "file" | "seed";
export interface LoadedPosts {
  posts: BlogPost[];
  source: StoreSource;
  error?: string;
}
export type SaveResult = { ok: true; post: BlogPost } | { ok: false; error: string };

const DB_TIMEOUT_MS = 4000;
const DATA_FILE = path.join(process.cwd(), ".data", "blog-posts.json");

const hasDb = () => Boolean(process.env.DATABASE_URL);
const fileStoreEnabled = () => !hasDb() && process.env.NODE_ENV !== "production";
const byDateDesc = (a: BlogPost, b: BlogPost) => b.publishedAt.localeCompare(a.publishedAt);
const seedCopy = (): BlogPost[] => SEED_POSTS.map((p) => ({ ...p }));

function withTimeout<T>(promise: Promise<T>, ms = DB_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("DB_TIMEOUT")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function describeDbError(e: unknown): string {
  const err = e as { code?: string; message?: string };
  if (err?.code === "P2021" || /does not exist/i.test(err?.message ?? "")) {
    return "Bazada `Post` jadvali yo'q. Uni yaratish uchun loyiha papkasida `npx prisma db push` ishga tushiring.";
  }
  if (err?.message === "DB_TIMEOUT") return "Baza javob bermadi (4 soniyadan ko'p). Keyinroq qayta urinib ko'ring.";
  return "Bazaga ulanib bo'lmadi.";
}

function describeWriteError(e: unknown): string {
  const code = (e as { code?: string })?.code;
  if (code === "P2002") return "Bu slug band. Boshqasini tanlang.";
  if (code === "P2025") return "Yozuv topilmadi (o'chirilgan bo'lishi mumkin).";
  return describeDbError(e);
}

function fromRow(r: Post): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    type: isPostType(r.type) ? r.type : "article",
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.coverImage,
    published: r.published,
    publishedAt: r.publishedAt.toISOString(),
  };
}

// ---- Mahalliy fayl (faqat dev) ----
async function readFileStore(): Promise<BlogPost[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code === "ENOENT") return seedCopy();
    throw e;
  }
}

async function writeFileStore(posts: BlogPost[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), "utf8");
}

// ---- O'qish ----
export async function loadPosts(): Promise<LoadedPosts> {
  if (hasDb()) {
    try {
      const rows = await withTimeout(prisma.post.findMany({ orderBy: { publishedAt: "desc" }, take: 500 }));
      return { posts: rows.map(fromRow), source: "db" };
    } catch (e) {
      console.warn("Blog: baza mavjud emas, ichki yozuvlar ko'rsatiladi:", (e as Error)?.message);
      return { posts: seedCopy().sort(byDateDesc), source: "seed", error: describeDbError(e) };
    }
  }
  if (fileStoreEnabled()) return { posts: (await readFileStore()).sort(byDateDesc), source: "file" };
  return { posts: seedCopy().sort(byDateDesc), source: "seed" };
}

export async function listPublishedPosts(): Promise<BlogPost[]> {
  const { posts } = await loadPosts();
  return posts.filter((p) => p.published).sort(byDateDesc);
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  if (hasDb()) {
    try {
      const row = await withTimeout(prisma.post.findUnique({ where: { slug } }));
      return row && row.published ? fromRow(row) : null;
    } catch (e) {
      console.warn("Blog: baza mavjud emas, ichki yozuvlar ko'rsatiladi:", (e as Error)?.message);
      return seedCopy().find((p) => p.published && p.slug === slug) ?? null;
    }
  }
  const { posts } = await loadPosts();
  return posts.find((p) => p.published && p.slug === slug) ?? null;
}

// ---- Yozish ----
export async function savePost(id: string | null, v: CleanPostInput): Promise<SaveResult> {
  if (hasDb()) {
    try {
      const data = {
        type: v.type,
        slug: v.slug,
        title: v.title,
        excerpt: v.excerpt,
        content: v.content,
        coverImage: v.coverImage,
        published: v.published,
        publishedAt: new Date(v.publishedAt),
      };
      const row = id
        ? await withTimeout(prisma.post.update({ where: { id }, data }))
        : await withTimeout(prisma.post.create({ data }));
      return { ok: true, post: fromRow(row) };
    } catch (e) {
      return { ok: false, error: describeWriteError(e) };
    }
  }

  if (fileStoreEnabled()) {
    const posts = await readFileStore();
    if (posts.some((p) => p.slug === v.slug && p.id !== id)) return { ok: false, error: "Bu slug band. Boshqasini tanlang." };
    let post: BlogPost;
    if (id) {
      const i = posts.findIndex((p) => p.id === id);
      if (i < 0) return { ok: false, error: "Yozuv topilmadi (o'chirilgan bo'lishi mumkin)." };
      post = { ...posts[i], ...v };
      posts[i] = post;
    } else {
      post = { id: randomUUID(), ...v };
      posts.push(post);
    }
    await writeFileStore(posts);
    return { ok: true, post };
  }

  return { ok: false, error: "Bu muhitda yozib bo'lmaydi: baza ulanmagan." };
}

export async function setPublished(id: string, published: boolean): Promise<SaveResult> {
  if (hasDb()) {
    try {
      const current = await withTimeout(prisma.post.findUnique({ where: { id } }));
      if (!current) return { ok: false, error: "Yozuv topilmadi (o'chirilgan bo'lishi mumkin)." };
      // Qoralama nashr qilinganda sana shu kunga o'tadi (haftalik faktlarni ketma-ket chiqarish uchun qulay).
      const data = published && !current.published ? { published, publishedAt: new Date() } : { published };
      return { ok: true, post: fromRow(await withTimeout(prisma.post.update({ where: { id }, data }))) };
    } catch (e) {
      return { ok: false, error: describeWriteError(e) };
    }
  }

  if (fileStoreEnabled()) {
    const posts = await readFileStore();
    const i = posts.findIndex((p) => p.id === id);
    if (i < 0) return { ok: false, error: "Yozuv topilmadi (o'chirilgan bo'lishi mumkin)." };
    const wasPublished = posts[i].published;
    posts[i] = { ...posts[i], published, publishedAt: published && !wasPublished ? new Date().toISOString() : posts[i].publishedAt };
    await writeFileStore(posts);
    return { ok: true, post: posts[i] };
  }

  return { ok: false, error: "Bu muhitda yozib bo'lmaydi: baza ulanmagan." };
}

export async function removePost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (hasDb()) {
    try {
      await withTimeout(prisma.post.delete({ where: { id } }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: describeWriteError(e) };
    }
  }

  if (fileStoreEnabled()) {
    const posts = await readFileStore();
    if (!posts.some((p) => p.id === id)) return { ok: false, error: "Yozuv topilmadi (o'chirilgan bo'lishi mumkin)." };
    await writeFileStore(posts.filter((p) => p.id !== id));
    return { ok: true };
  }

  return { ok: false, error: "Bu muhitda yozib bo'lmaydi: baza ulanmagan." };
}

// Boshlang'ich yozuvlarni qo'shadi (slug bo'yicha: mavjudlariga tegmaydi).
export async function seedDefaultPosts(): Promise<{ ok: true; added: number } | { ok: false; error: string }> {
  if (hasDb()) {
    try {
      const existing = await withTimeout(prisma.post.findMany({ select: { slug: true } }));
      const have = new Set(existing.map((r) => r.slug));
      const missing = SEED_POSTS.filter((p) => !have.has(p.slug));
      if (missing.length === 0) return { ok: true, added: 0 };
      await withTimeout(
        prisma.post.createMany({
          data: missing.map((p) => ({
            slug: p.slug,
            type: p.type,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            coverImage: p.coverImage,
            published: p.published,
            publishedAt: new Date(p.publishedAt),
          })),
          skipDuplicates: true,
        })
      );
      return { ok: true, added: missing.length };
    } catch (e) {
      return { ok: false, error: describeWriteError(e) };
    }
  }

  if (fileStoreEnabled()) {
    const posts = await readFileStore();
    const have = new Set(posts.map((p) => p.slug));
    const missing = seedCopy().filter((p) => !have.has(p.slug));
    if (missing.length > 0) await writeFileStore([...posts, ...missing]);
    return { ok: true, added: missing.length };
  }

  return { ok: false, error: "Bu muhitda yozib bo'lmaydi: baza ulanmagan." };
}
