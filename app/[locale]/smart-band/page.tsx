'use client'
import { motion } from 'framer-motion'
import { Heart, Activity, Zap, ShieldCheck, ArrowLeft, Users, Clock, Brain } from 'lucide-react'
import Link from 'next/link'

export default function SmartBandPage() {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Real-vaqtda HR monitoring",
      desc: "Yurak urish tezligini yuqori aniqlikdagi sensorlar yordamida uzluksiz kuzatish."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Stress tahlili",
      desc: "Tana harorati va puls o'zgaruvchanligi (HRV) orqali stress darajasini aniqlash."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Uyqu sifati nazorati",
      desc: "Chuqur va yengil uyqu fazalarini tahlil qilish va tavsiyalar berish."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "FEA asoslangan dizayn",
      desc: "Bilak ergonomikasiga mos, 3D modellashtirilgan va chidamlilikka test qilingan korpus."
    }
  ];

  const targetAudience = [
    { name: "Sportchilar", context: "Intensiv mashg'ulot paytidagi tana holati nazorati uchun." },
    { name: "Muhandislar", context: "Uzoq vaqt diqqatni jamlash va aqliy charchoqni boshqarish uchun." },
    { name: "Keksalar", context: "Sog'liqni masofaviy monitoring qilish va ogohlantirish tizimi uchun." },
    { name: "Surunkali kasallar", context: "Doimiy hayotiy ko'rsatkichlarni arxivlash va shifokorga yuborish uchun." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-10 pb-22">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigatsiya */}
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Bosh sahifaga qaytish
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="px-0 py-0 text-slate-900 red:text-blue-400 text-sm font-bold uppercase tracking-[0.3em] border-b-2 border-blue-600 pb-1">
              Innovation by TechAxis
            </span>
            <h1 className="px-0 py-0 text-slate-900 red:text-blue-400 text-sm font-bold uppercase tracking-[0.3em] border-b-2 border-blue-600 pb-1">
              HAYOT <span className="text-blue-900 ">Band</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed mb-8">
              Bu shunchaki bilaguzuk emas, bu sizning shaxsiy salomatlik muhandisingiz. 
              Biz zamonaviy mikrosxemalar va ergonomik 3D dizaynni birlashtirdik.
            </p>
            <div className="flex gap-4">
               <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-2xl font-bold text-blue-600">98%</p>
                  <p className="text-xs text-slate-400 uppercase">Aniqlik darajasi</p>
               </div>
               <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-2xl font-bold text-blue-600">7 kun</p>
                  <p className="text-xs text-slate-400 uppercase">Batareya quvvati</p>
               </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[50px] aspect-square flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
          >
            3D RENDER SPACE
          </motion.div>
        </div>

        {/* Funksiyalar */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Asosiy Funksiyalar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kimlar uchun? */}
        <div className="p-12 bg-slate-900 rounded-[60px] text-white overflow-hidden relative">
          <h2 className="text-3xl font-bold mb-12 text-center relative z-10">Kimlar uchun mo'ljallangan?</h2>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {targetAudience.map((t, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t.name}</h4>
                  <p className="text-slate-400 text-sm">{t.context}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
        </div>
      </div>
    </div>
  )
}