"use client";

import { useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import { 
  ChevronLeft, CreditCard, Wallet, Banknote, 
  CheckCircle2, ShieldCheck, Zap, ArrowRight,
  Info, Loader2, Upload, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { requestPaymentAction, submitPaymentProofAction, getStudentDashboardAction } from "@/lib/actions/student-actions";
import { useEffect } from "react";

export default function CheckoutPage({ params }: { params: Promise<{ locale: string, courseId: string }> }) {
  const { locale, courseId } = use(params);
  const router = useRouter();
  const course = getCourseById(courseId);

  const [step, setStep] = useState(1); // 1: Plan, 2: Method, 3: Process, 4: Result
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await getStudentDashboardAction();
        setSessionLoading(false);
      } catch (e) {
        router.push(`/${locale}/login?callback=/${locale}/checkout/${courseId}`);
      }
    }
    checkAuth();
  }, [locale, courseId, router]);

  if (sessionLoading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <p className="text-slate-400 font-medium">Yuklanmoqda...</p>
    </div>
  );

  if (!course) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Kurs topilmadi</div>;

  // Kursga qarab narxlar (Demo uchun landingdagilar bilan moslashtiramiz)
  const isCatia = courseId === "catia-v5";
  const plans = isCatia ? [
    { id: "starter", name: "Starter", price: 30, priceUZS: "380,000", desc: "Asoslar", features: ["Video darslar", "Topshiriqlar", "Sertifikat"] },
    { id: "pro", name: "Pro", price: 120, priceUZS: "1,520,000", desc: "Surface & Assembly", color: "from-blue-500 to-cyan-500", features: ["To'liq kurs", "Portfolio", "Professional sertifikat"], best: true },
    { id: "mentor", name: "Mentor", price: 300, priceUZS: "3,800,000", desc: "1:1 Mentorlik", features: ["Live darslar", "Ishga tavsiya", "Career help"] }
  ] : [
    { id: "starter", name: "Starter", price: 20, priceUZS: "250,000", desc: "Boshlovchilar", features: ["Video darslar", "Telegram guruh", "Sertifikat"] },
    { id: "pro", name: "Pro", price: 80, priceUZS: "1,010,000", desc: "To'liq muvaffaqiyat", color: "from-blue-500 to-indigo-500", features: ["Real loyiha dizayni", "Premium sertifikat"], best: true },
    { id: "mentor", name: "Mentor", price: 200, priceUZS: "2,540,000", desc: "Shaxsiy o'sish", features: ["1:1 Mentorlik", "Karyera rejasi"] }
  ];

  const paymentMethods = [
    { id: "transfer", name: "Karta orqali o'tkazma (Humo)", icon: Banknote, color: "text-purple-400", bg: "bg-purple-400/10" },
    { id: "visa", name: "Visa / Mastercard (Tez kunda)", icon: CreditCard, color: "text-orange-400", bg: "bg-orange-400/10" }
  ];

  async function handlePlanSelection(plan: any) {
    setSelectedPlan(plan);
    setStep(2);
  }

  async function handlePayment() {
    if (method === "visa") {
        alert("Visa to'lovlari ayni damda tayyorlanmoqda! Iltimos hozircha Karta orqali o'tkazmadan foydalaning.");
        return;
    }
    setLoading(true);
    try {
      const res = await requestPaymentAction(courseId, selectedPlan.name, selectedPlan.price, method!);
      setPaymentId(res.paymentId || "");
      
      // Simulyatsiya: Bir oz kutamiz
      setTimeout(() => {
        setLoading(false);
        setStep(method === "transfer" ? 3 : 4);
      }, 2000);
    } catch (e) {
      alert("Xatolik yuz berdi");
      setLoading(false);
    }
  }

  async function handleReceiptUpload() {
    if (!receiptFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("paymentId", paymentId!);
      formData.append("receiptFile", receiptFile);
      await submitPaymentProofAction(formData);
      setStep(4);
    } catch (e: any) {
      alert("Yuklashda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring yoki rasm hajmini kichraytiring.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
           <button 
             onClick={() => step > 1 && step < 4 ? setStep(step - 1) : router.back()} 
             className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
           >
             <ChevronLeft className="w-5 h-5" /> Orqaga
           </button>
           <div className="flex gap-2">
              {[1, 2, 4].map(i => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-blue-500' : 'bg-slate-800'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: PLAN SELECTION */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-black text-white">Ta'rifni tanlang</h1>
                <p className="text-slate-400">"{course.title}" kursi uchun eng mos rejani belgilang</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 {plans.map((plan) => (
                   <button 
                     key={plan.id}
                     onClick={() => handlePlanSelection(plan)}
                     className={`relative p-8 rounded-3xl border text-left transition-all hover:scale-[1.02] ${plan.best ? 'bg-slate-900 border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'bg-slate-900/50 border-slate-800'}`}
                   >
                     {plan.best && <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Tavsiya</div>}
                     <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                          <p className="text-xs text-slate-500">{plan.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-black text-white">${plan.price}</span>
                           <span className="text-xs text-slate-500">/kurs</span>
                        </div>
                        <div className="text-xs font-bold text-blue-400">~ {plan.priceUZS} UZS</div>
                        <div className="space-y-2 pt-4 border-t border-slate-800">
                           {plan.features.map((f: string) => (
                             <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                               <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {f}
                             </div>
                           ))}
                        </div>
                     </div>
                   </button>
                 ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-black text-white">To'lov usuli</h1>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-500/20">
                   {selectedPlan.name} Plan — ${selectedPlan.price}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                 {paymentMethods.map((pm) => (
                   <button 
                     key={pm.id}
                     onClick={() => setMethod(pm.id)}
                     className={`flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${method === pm.id ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/20' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                   >
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === pm.id ? 'bg-white/20' : pm.bg}`}>
                        <pm.icon className={`w-6 h-6 ${method === pm.id ? 'text-white' : pm.color}`} />
                     </div>
                     <div>
                        <div className={`font-bold ${method === pm.id ? 'text-white' : 'text-white'}`}>{pm.name}</div>
                        <div className={`text-xs ${method === pm.id ? 'text-blue-100' : 'text-slate-500'}`}>
                           {pm.id === 'transfer' ? 'Karta raqamiga o\'tkazma' : 'Tezkor to\'lov'}
                        </div>
                     </div>
                   </button>
                 ))}
              </div>

              <div className="pt-8">
                 <button 
                   disabled={!method || loading}
                   onClick={handlePayment}
                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>To'lovga o'tish <ArrowRight className="w-5 h-5" /></>}
                 </button>
              </div>

              <div className="flex items-center gap-3 justify-center text-slate-500 text-sm">
                 <ShieldCheck className="w-4 h-4" /> Barcha to'lovlar xavfsiz himoyalangan
              </div>
            </motion.div>
          )}

          {/* STEP 3: MANUAL TRANSFER PROOF */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 space-y-8">
                 <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
                       <Banknote className="w-10 h-10 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Karta orqali o'tkazma</h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">To'lovni amalga oshiring va chek (screenshot) rasmini yuklang</p>
                 </div>

                 <div className="grid gap-4 max-w-sm mx-auto">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                       <div>
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Karta raqami</div>
                          <div className="text-lg font-bold text-white tracking-widest">9860 4545 1111 1111</div>
                          <div className="text-xs text-slate-400 mt-1">Meliqo'ziyev Xikmatjon</div>
                       </div>
                       <button onClick={() => navigator.clipboard.writeText("9860454511111111")} className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg text-xs transition-colors">Nusxa</button>
                    </div>
                    <div className="flex items-center justify-between px-2">
                       <span className="text-slate-400 text-sm">To'lov miqdori:</span>
                       <span className="text-white font-black text-lg">{selectedPlan.priceUZS} UZS</span>
                    </div>
                 </div>

                  <div className="space-y-4 pt-4">
                    <label className="block text-sm font-bold text-slate-400">Chek rasmini yuklang (JPG/PNG)</label>
                    <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 focus-within:border-blue-500 transition-all">
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                        className="w-full text-slate-400 file:mr-4 file:py-4 file:px-6 file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:cursor-pointer hover:file:bg-blue-500 cursor-pointer"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 italic flex items-center gap-2">
                       <Info className="w-3 h-3" /> Rasmni biriktiring. To'lov tasdiqlangach maqullanadi.
                    </p>
                 </div>

                 <button 
                   disabled={!receiptFile || loading}
                   onClick={handleReceiptUpload}
                   className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl transition-all"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Yuborish"}
                 </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-10"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40">
                   <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white">Tabriklaymiz!</h1>
                {method === 'visa' ? (
                  <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                    To'lov muvaffaqiyatli amalga oshirildi. Kurs hoziroq faollashtirildi!
                  </p>
                ) : (
                  <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                    To'lov so'rovingiz qabul qilindi. Admin tekshiruvidan so'ng (odatda 1-2 soat) kurs ochiladi.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 max-w-xs mx-auto pt-8">
                 <Link href={`/${locale}/dashboard`}>
                   <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
                     Dashboardga o'tish <ArrowRight className="w-5 h-5" />
                   </button>
                 </Link>
                 <Link href={`/${locale}`}>
                    <button className="w-full py-4 text-slate-500 hover:text-white transition-colors font-bold">
                      Asosiy sahifaga qaytish
                    </button>
                 </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
