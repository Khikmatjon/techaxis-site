import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPostingLd, breadcrumbLd, crumb } from "@/lib/structured-data";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronLeft, Clock } from "lucide-react";
import { getPublishedPost } from "@/lib/blog-store";
import { POST_TYPE_META, formatPostDate, postTypeName, readMinutes } from "@/lib/blog";
import { localizePost } from "@/lib/blog-i18n";
import { pick } from "@/lib/locale-text";
import { PostContent } from "@/components/blog/post-content";
import { PostImage } from "@/components/blog/post-image";
import { alternatesFor } from "@/lib/seo";

// Yozuvlar bazadan o'qiladi. Sahifa birinchi so'rovda quriladi va keshga tushadi; admin panelda
// saqlanganda darhol (revalidatePath), aks holda soatiga bir marta yangilanadi.
export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

// Next.js 16 da params — Promise. Sinxron params.slug undefined beradi va hamma maqola 404 bo'lib qoladi.
type BlogPostPageProps = { params: Promise<{ slug: string; locale: string }> };

const T = {
  uz: {
    back: "Yozuvlarga qaytish",
    minutes: "daqiqa o'qish",
    ctaTitle: "Shu mavzuni amaliy o'rganmoqchimisiz?",
    ctaText: "Bizning interaktiv kurslarimizga qo'shiling va haqiqiy loyihalarni noldan yaratishni o'rganing.",
    ctaButton: "Kurslarni ko'rish",
    uzOnly: "",
  },
  ru: {
    back: "Назад к публикациям",
    minutes: "мин чтения",
    ctaTitle: "Хотите изучить эту тему на практике?",
    ctaText: "Присоединяйтесь к нашим курсам и научитесь создавать реальные проекты с нуля. Курсы проходят на узбекском языке.",
    ctaButton: "Смотреть курсы",
    uzOnly: "Эта публикация пока доступна только на узбекском языке.",
  },
  en: {
    back: "Back to posts",
    minutes: "min read",
    ctaTitle: "Want to learn this topic in practice?",
    ctaText: "Join our courses and learn to build real projects from scratch. Courses are taught in Uzbek.",
    ctaButton: "Browse courses",
    uzOnly: "This post is currently available in Uzbek only.",
  },
};

// Maqolaning ru/en tarjimasi bormi (uz sahifa uchun ham: hreflang shunga qarab qo'yiladi).
const hasTranslation = (post: Parameters<typeof localizePost>[0]) => localizePost(post, "ru").translated;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const found = await getPublishedPost(slug);
  if (!found) return {};
  const post = localizePost(found, locale);

  // Muqova bo'lmasa, saytning umumiy ulashish kartasi (app/[locale]/opengraph-image.tsx).
  const image = post.coverImage || `/${locale}/opengraph-image`;
  const alternates = alternatesFor(locale, `/blog/${slug}`, hasTranslation(found));
  return {
    title: `${post.title} | TechAxis`,
    description: post.excerpt,
    alternates,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: alternates.canonical as string,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [image] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const found = await getPublishedPost(slug);

  if (!found) {
    notFound();
  }

  const post = localizePost(found, locale);
  const meta = POST_TYPE_META[post.type];
  const TEXT = pick(T, locale);

  return (
    <div className="dark min-h-screen bg-slate-950 pt-24 pb-16">
      <JsonLd data={[
        blogPostingLd(post, post.translated ? locale : "uz"),
        breadcrumbLd(locale, [
          { name: crumb("blog", locale), path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Orqaga qaytish */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium mb-10"
        >
          <ChevronLeft className="w-5 h-5" /> {TEXT.back}
        </Link>

        {/* Sarlavha */}
        <header className="mb-10">
          <span className={`inline-flex text-xs font-bold px-4 py-1.5 rounded-full border mb-6 uppercase tracking-widest ${meta.badge}`}>
            {postTypeName(post.type, locale).label}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formatPostDate(post.publishedAt, locale)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {readMinutes(post.content)} {TEXT.minutes}
            </span>
          </div>
        </header>

        {/* Muqova rasm (ixtiyoriy) */}
        {post.coverImage && (
          <div className="rounded-3xl overflow-hidden mb-10 border border-slate-800">
            <PostImage
              eager
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover aspect-video"
              fallback={<></>}
            />
          </div>
        )}

        {!post.translated && TEXT.uzOnly && (
          <p className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-medium text-amber-700 dark:text-amber-300">
            {TEXT.uzOnly}
          </p>
        )}

        {/* Matn */}
        <article lang={post.translated ? locale : "uz"}>
          <p className="text-xl text-slate-200 leading-relaxed font-medium mb-10 border-l-4 border-blue-500 pl-6">
            {post.excerpt}
          </p>
          <PostContent content={post.content} className="text-lg" />
        </article>

        {/* Kurslarga yo'naltirish */}
        <div className="mt-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-500/30 rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-6">
          <h3 className="text-2xl font-bold text-white">{TEXT.ctaTitle}</h3>
          <p className="text-slate-400">{TEXT.ctaText}</p>
          <Link
            href={`/${locale}/courses`}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all hover:shadow-lg shadow-blue-500/25"
          >
            {TEXT.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
