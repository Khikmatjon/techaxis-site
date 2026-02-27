'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function Projects({ dict }: { dict: any }) {
  const myProjects = [
    { title: dict.projects.tmed.title, client: "HMC / LG Magna", desc: dict.projects.tmed.desc, tags: ["Powertrain"], link: null },
    { title: dict.projects.torque.title, client: "KIA / Hyundai", desc: dict.projects.torque.desc, tags: ["SolidWorks"], link: null },
    { title: dict.projects.smart.title, client: "Startup Project", desc: dict.projects.smart.desc, tags: ["HAYOT"], link: "/smart-band" }
  ]

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold uppercase mb-12">{dict.projects.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {myProjects.map((p, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-100 hover:border-blue-500 transition-all flex flex-col h-full">
              <span className="text-[10px] font-bold text-blue-600 uppercase mb-2">{p.client}</span>
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-slate-500 text-sm mb-8 flex-1">{p.desc}</p>
              {p.link ? (
                <Link href={`/uz${p.link}`} className="inline-block py-3 px-6 bg-blue-600 text-white rounded-xl text-center font-bold hover:bg-blue-700 transition-all">
                  Batafsil ko'rish
                </Link>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => <span key={tag} className="text-[10px] bg-white dark:bg-slate-800 px-3 py-1 rounded-full border">{tag}</span>)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}