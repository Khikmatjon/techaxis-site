'use client'
import { motion } from 'framer-motion'
import { Settings, Cpu, GraduationCap, PenTool } from 'lucide-react'

export function Services({ dict }: { dict: any }) {
  const services = [
    {
      title: "Mechanical Design",
      desc: "EV motor jigs, fixtures va torque test rig loyihalash.",
      icon: <Settings className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Smart Wearables",
      desc: "SYNC Smart Band kabi aqlli qurilmalar prototipi.",
      icon: <Cpu className="w-10 h-10 text-accent" />,
    },
    {
      title: "CAD Training",
      desc: "SolidWorks va CATIA bo'yicha professional kurslar.",
      icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Product Dev",
      desc: "G'oyadan DFM/DFMA va tayyor prototipgacha.",
      icon: <PenTool className="w-10 h-10 text-accent" />,
    }
  ]

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* XATO SHU YERDA EDI: </div> emas, </h2> bo'lishi kerak */}
        <h2 className="text-3xl font-bold text-center mb-12 font-display uppercase tracking-wider">
          {dict.nav.services}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <div className="mb-6">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}