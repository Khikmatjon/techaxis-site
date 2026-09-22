import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookMarked, Calendar, Clock, Lightbulb } from "lucide-react";
import { listPublishedPosts } from "@/lib/blog-store";
import { POST_TYPES, POST_TYPE_META, formatPostDate, isPostType, readMinutes, type BlogPost } from "@/lib/blog";
import { PostImage } from "@/components/blog/post-image";

// Yozuvlar bazadan o'qiladi va admin paneldan o'zgaradi, shuning uchun sahifa har so'rovda tayyorlanadi.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog: faktlar, maqolalar va yangiliklar | TechAxis",
  description:
    "SOLIDWORKS, CATIA va 3DEXPERIENCE haqida haftalik faktlar, maqolalar, yangiliklar va bizning ishlarimiz.",
};

const TEXT = {
  heading1: "Muhandislik va CAD",
  heading2: "Bilimlar Bazasi",
  intro:
    "SOLIDWORKS, CATIA va 3DEXPERIENCE haqida haftalik faktlar, maqolalar, yangiliklar va bizning ishlarimiz. Ma'lumotlar rasmiy manbalarga tayanadi.",
  all: "Hammasi",
  weeklyFact: "Haftalik fakt",
  more: "Batafsil",
  read: "O'qish",
  minutes: "daqiqa",
  emptyAll: "Yozuvlar tez orada chiqadi.",
  emptyType: "Bu turdagi yozuvlar hali yo'q.",
};

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  const meta = POST_TYPE_META[post.type];
  const header = (
    <div className={`h-full w-full bg-gradient-to-br ${meta.gradient} flex items-end p-5`}>
      <span className="text-3xl font-black text-white/25 leading-none">{meta.label}</span>
    </div>
  );

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all h-full flex flex-col">
        <div className="relative h-44 overflow-hidden">
          {post.coverImage ? (
            <PostImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              fallback={header}
            />
          ) : (
            header
          )}
          <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md ${meta.badge}`}>
            {meta.label}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {formatPostDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {readMinutes(post.content)} {TEXT.minutes}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {post.title}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm mt-auto">
            {TEXT.read} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type } = await searchParams;

  const all = await listPublishedPosts();
  const active = isPostType(type) ? type : null;
  const visible = active ? all.filter((p) => p.type === active) : all;
  // "Haftalik fakt": eng so'nggi nashr etilgan fakt (filtrsiz ko'rinishda alohida katta blok)
  const featured = active ? null : all.find((p) => p.type === "fact") ?? null;
  const grid = featured ? visible.filter((p) => p.id !== featured.id) : visible;
  const counts = Object.fromEntries(POST_TYPES.map((t) => [t, all.filter((p) => p.type === t).length])) as Record<
    (typeof POST_TYPES)[number],
    number
  >;

  const chipBase = "px-4 py-2 rounded-full text-sm font-bold border transition-colors";
  const chipOn = "bg-blue-600 text-white border-blue-600";
  const chipOff =
    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500/50";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-5">
            <BookMarked className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-5">
            {TEXT.heading1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">{TEXT.heading2}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{TEXT.intro}</p>
        </div>

        {/* Tur bo'yicha filtr */}
        {all.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <Link href={`/${locale}/blog`} className={`${chipBase} ${active ? chipOff : chipOn}`}>
              {TEXT.all} ({all.length})
            </Link>
            {POST_TYPES.filter((t) => counts[t] > 0).map((t) => (
              <Link
                key={t}
                href={`/${locale}/blog?type=${t}`}
                className={`${chipBase} ${active === t ? chipOn : chipOff}`}
              >
                {POST_TYPE_META[t].plural} ({counts[t]})
              </Link>
            ))}
          </div>
        )}

        {/* Haftalik fakt */}
        {featured && (
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className="group block mb-10 rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent p-8 sm:p-10 hover:border-emerald-500/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
              <Lightbulb className="w-4 h-4" /> {TEXT.weeklyFact}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 leading-snug">{featured.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mb-5">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              {TEXT.more} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        )}

        {/* Yozuvlar ro'yxati */}
        {grid.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grid.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          !featured && (
            <p className="text-center text-slate-500 dark:text-slate-400">{all.length === 0 ? TEXT.emptyAll : TEXT.emptyType}</p>
          )
        )}
      </div>
    </div>
  );
}
