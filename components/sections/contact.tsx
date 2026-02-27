'use client'
import { motion } from 'framer-motion'

export function Contact({ dict }: { dict: any }) {
  return (
    <section className="py-24 bg-white dark:bg-slate-950" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold font-display mb-6 uppercase tracking-tight">
              {dict.nav.contact}
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Loyiha bo'yicha savollaringiz bormi yoki hamkorlik qilmoqchimisiz? 
              Xabar qoldiring, biz siz bilan tez orada bog'lanamiz.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold">@</div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold">techaxis.group@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800"
          >
            <form className="space-y-4">
              <input type="text" placeholder="Ismingiz" className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <input type="email" placeholder="Email manzilingiz" className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <textarea placeholder="Xabaringiz..." rows={4} className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Xabarni yuborish
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}