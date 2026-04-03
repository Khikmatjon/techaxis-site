import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPostBySlug, BLOG_POSTS } from "@/lib/blog";
import Link from "next/link";
import { ChevronLeft, Calendar, BookOpen, Share2 } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | TechAxis Knowledge Hub`,
    description: post.excerpt,
    keywords: [post.category, post.title, "uzbekistan", "cad", "darslari", "oqish"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string, locale: string } }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Orqaga qaytish */}
        <Link href={`/${params.locale}/blog`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium mb-10">
           <ChevronLeft className="w-5 h-5" /> Maqolalarga qaytish
        </Link>
        
        {/* Post Header */}
        <div className="mb-10 text-center">
           <div className="inline-flex bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              {post.category}
           </div>
           
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              {post.title}
           </h1>

           <div className="flex items-center justify-center gap-6 text-slate-500 text-sm font-medium">
             <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
             <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {post.readTime} o'qish</span>
           </div>
        </div>

        {/* Thumbnail */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-800">
           <img src={post.image} alt={post.title} className="w-full h-auto object-cover aspect-video" />
        </div>

        {/* Post Content */}
        <article className="prose prose-invert prose-lg max-w-none">
           <p className="text-xl text-slate-300 leading-relaxed font-medium mb-12 border-l-4 border-blue-500 pl-6">
             {post.excerpt}
           </p>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 text-center border-dashed border-2 my-12">
             <h2 className="text-2xl font-bold text-slate-400 mb-4">
               {post.title} - To'liq matni chiqadigan qism
             </h2>
             <p className="text-slate-500">
               Bu yerda siz tomondan keladigan to'liq maqola texti va tushuntirish, rasm, yoki muammolar yechimlari joylashadi.
             </p>
           </div>
        </article>

        {/* CTA bo'limi - Internal Linking va Sotish */}
        <div className="mt-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-500/30 rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-6">
           <h3 className="text-2xl font-bold text-white">Shu mavzuni amaliy o'rganmoqchimisiz?</h3>
           <p className="text-slate-400">Bizning interaktiv kurslarimizga qo'shiling va haqiqiy loyihalarni noldan yaratishni o'rganing.</p>
           <Link href={`/${params.locale}/courses/solidworks-basics`}>
             <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all hover:shadow-lg shadow-blue-500/25">
               Kurslarni ko'rish
             </button>
           </Link>
        </div>
      </div>
    </div>
  );
}
