import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { BookOpen, Calendar, ArrowRight, BookMarked } from "lucide-react";

export const metadata = {
  title: "CAD Maqolalar va Baza (Blog) | TechAxis",
  description: "SolidWorks, CATIA bo'yicha muammolar yechimi, qiyosiy maqolalar, va muhandislik o'quv qo'llanmalari. Bepul o'rganishni hozir boshlang.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Beginner": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Problem-based": "bg-red-500/20 text-red-400 border-red-500/30",
  "Comparison": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Case-study": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params);
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Sarlavha */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-5">
            <BookMarked className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-5">
            Muhandislik va CAD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              Bilimlar Bazasi
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            SolidWorks va CATIA dasturlarini o'rganish sirlari, uchraydigan texnik xatolar hamda ularning tezkor yechimlari barchasi bitta joyda.
          </p>
        </div>

        {/* Blog ro'yxati */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group block h-full">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all h-full flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"; }}
                  />
                  <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md ${CATEGORY_COLORS[post.category] ?? "bg-slate-800/80 text-slate-300 border-slate-700"}`}>
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm mt-auto">
                    O'qish <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
