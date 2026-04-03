import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { BookOpen, Calendar, ArrowRight, BookMarked } from "lucide-react";

export const metadata = {
  title: "CAD Maqolalar va Baza (Blog) | TechAxis",
  description: "SolidWorks, CATIA bo'yicha muammolar yechimi, qiyosiy maqolalar, va muhandislik o'quv qo'llanmalari. Bepul o'rganishni hozir boshlang.",
};

export default function BlogIndexPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Asos qismi */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BookMarked className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Muhandislik va CAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Biliimlar Bazasi</span>
          </h1>
          <p className="text-slate-400 text-lg">
            SolidWorks va CATIA dasturlarini o'rganish sirlari, uchraydigan texnik xatolar hamda ularning tezkor yechimlari barchasi bitta joyda.
          </p>
        </div>

        {/* Blog ro'yxati */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/${params.locale}/blog/${post.slug}`}>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 h-full flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mt-auto">
                    O'qishni davom etish <ArrowRight className="w-4 h-4" />
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
