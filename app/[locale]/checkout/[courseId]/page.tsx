"use client";

import { useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Course } from "@/lib/courses";
import { getCourseByIdAction } from "@/lib/actions/courses-actions";
import {
  ChevronLeft, CreditCard, Wallet, Banknote,
  CheckCircle2, ShieldCheck, Zap, ArrowRight,
  Info, Loader2, Upload, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { requestPaymentAction, submitPaymentProofAction, getStudentDashboardAction } from "@/lib/actions/student-actions";
import { useEffect } from "react";
import { PAYMENT_CARD } from "@/config/site";
import { pick } from "@/lib/locale-text";
import { trXato } from "@/lib/action-messages";
import { localizeCourse } from "@/lib/course-i18n";

// Tarif matnlari uch tilda; narx va nom (Starter/Pro/Mentor) hamma tilda bir xil.
// [catia-v5, boshqa kurslar] -> [starter, pro, mentor]
const PLAN_TEXT = {
  uz: {
    catia: [
      { desc: "Asoslar", features: ["Video darslar", "Topshiriqlar", "Sertifikat"] },
      { desc: "Surface & Assembly", features: ["To'liq kurs", "Portfolio", "Professional sertifikat"] },
      { desc: "1:1 Mentorlik", features: ["Live darslar", "Ishga tavsiya", "Karyera bo'yicha yordam"] },
    ],
    other: [
      { desc: "Boshlovchilar", features: ["Video darslar", "Telegram guruh", "Sertifikat"] },
      { desc: "To'liq muvaffaqiyat", features: ["Real loyiha dizayni", "Premium sertifikat"] },
      { desc: "Shaxsiy o'sish", features: ["1:1 Mentorlik", "Karyera rejasi"] },
    ],
  },
  ru: {
    catia: [
      { desc: "Основы", features: ["Видеоуроки", "Задания", "Сертификат"] },
      { desc: "Surface & Assembly", features: ["Полный курс", "Портфолио", "Профессиональный сертификат"] },
      { desc: "1:1 менторство", features: ["Живые уроки", "Рекомендация для трудоустройства", "Помощь с карьерой"] },
    ],
    other: [
      { desc: "Для начинающих", features: ["Видеоуроки", "Группа в Telegram", "Сертификат"] },
      { desc: "Полный результат", features: ["Дизайн реального проекта", "Премиум-сертификат"] },
      { desc: "Личный рост", features: ["1:1 менторство", "Карьерный план"] },
    ],
  },
  en: {
    catia: [
      { desc: "Basics", features: ["Video lessons", "Assignments", "Certificate"] },
      { desc: "Surface & Assembly", features: ["Full course", "Portfolio", "Professional certificate"] },
      { desc: "1:1 mentoring", features: ["Live lessons", "Job recommendation", "Career help"] },
    ],
    other: [
      { desc: "For beginners", features: ["Video lessons", "Telegram group", "Certificate"] },
      { desc: "Full result", features: ["Real project design", "Premium certificate"] },
      { desc: "Personal growth", features: ["1:1 mentoring", "Career plan"] },
    ],
  },
};

const T = {
  uz: {
    loading: "Yuklanmoqda...", notFound: "Kurs topilmadi", openTitle: "Bu kurs sizda ochiq",
    noRepay: (title: string) => `«${title}» kursi uchun qayta to'lash shart emas.`, toCourse: "Kursga o'tish",
    transfer: "Karta orqali o'tkazma (Humo)", visa: "Visa / Mastercard (tez kunda)",
    visaSoon: "Visa to'lovlari hozircha tayyorlanmoqda. Iltimos, karta orqali o'tkazmadan foydalaning.",
    uploadError: "Yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki rasm hajmini kichraytiring.",
    back: "Orqaga", pendingA: "Bu kurs uchun to'lovingiz tekshirilmoqda. Admin chekni tasdiqlagach, kurs", pendingLink: "kabinetingizda",
    pendingB: "ochiladi. Qayta to'lash shart emas.", choosePlan: "Tarifni tanlang", choosePlanText: (title: string) => `«${title}» kursi uchun eng mos rejani belgilang`,
    recommended: "Tavsiya", perCourse: "/kurs", payMethod: "To'lov usuli", plan: "tarifi", transferSub: "Karta raqamiga o'tkazma", fastSub: "Tezkor to'lov",
    toPayment: "To'lovga o'tish", secure: "Barcha to'lovlar xavfsiz himoyalangan",
    transferTitle: "Karta orqali o'tkazma", transferText: "To'lovni amalga oshiring va chek (screenshot) rasmini yuklang",
    cardNumber: "Karta raqami", copy: "Nusxa", amount: "To'lov miqdori:", receipt: "Chek rasmini yuklang (JPG/PNG)",
    receiptHint: "Rasmni biriktiring. To'lov tasdiqlangach kurs ochiladi.", send: "Yuborish", congrats: "Tabriklaymiz!",
    paidVisa: "To'lov muvaffaqiyatli amalga oshirildi. Kurs hoziroq faollashtirildi!",
    paidTransfer: "To'lov so'rovingiz qabul qilindi. Admin tekshiruvidan so'ng (odatda 1–2 soat) kurs ochiladi.",
    toDashboard: "Kabinetga o'tish", toHome: "Bosh sahifaga qaytish", inUzbek: "",
  },
  ru: {
    loading: "Загрузка...", notFound: "Курс не найден", openTitle: "Этот курс у вас уже открыт",
    noRepay: (title: string) => `За курс «${title}» не нужно платить повторно.`, toCourse: "Перейти к курсу",
    transfer: "Перевод на карту (Humo)", visa: "Visa / Mastercard (скоро)",
    visaSoon: "Оплата через Visa пока готовится. Пожалуйста, воспользуйтесь переводом на карту.",
    uploadError: "Не удалось загрузить файл. Попробуйте ещё раз или уменьшите размер изображения.",
    back: "Назад", pendingA: "Ваш платёж за этот курс проверяется. После того как администратор подтвердит чек, курс откроется", pendingLink: "в вашем кабинете",
    pendingB: ". Платить повторно не нужно.", choosePlan: "Выберите тариф", choosePlanText: (title: string) => `Выберите подходящий план для курса «${title}»`,
    recommended: "Рекомендуем", perCourse: "/курс", payMethod: "Способ оплаты", plan: "— тариф", transferSub: "Перевод на номер карты", fastSub: "Быстрая оплата",
    toPayment: "Перейти к оплате", secure: "Все платежи надёжно защищены",
    transferTitle: "Перевод на карту", transferText: "Выполните перевод и загрузите фото чека (скриншот)",
    cardNumber: "Номер карты", copy: "Копировать", amount: "Сумма к оплате:", receipt: "Загрузите фото чека (JPG/PNG)",
    receiptHint: "Прикрепите изображение. Курс откроется после подтверждения оплаты.", send: "Отправить", congrats: "Поздравляем!",
    paidVisa: "Оплата прошла успешно. Курс уже активирован!",
    paidTransfer: "Ваш запрос на оплату принят. Курс откроется после проверки администратором (обычно 1–2 часа).",
    toDashboard: "Перейти в кабинет", toHome: "Вернуться на главную", inUzbek: "Уроки курса проходят на узбекском языке.",
  },
  en: {
    loading: "Loading...", notFound: "Course not found", openTitle: "You already have this course",
    noRepay: (title: string) => `You do not need to pay again for «${title}».`, toCourse: "Go to the course",
    transfer: "Card transfer (Humo)", visa: "Visa / Mastercard (coming soon)",
    visaSoon: "Visa payments are not available yet. Please use a card transfer for now.",
    uploadError: "The upload failed. Please try again or use a smaller image.",
    back: "Back", pendingA: "Your payment for this course is being checked. Once the administrator approves the receipt, the course will open", pendingLink: "in your dashboard",
    pendingB: ". You do not need to pay again.", choosePlan: "Choose a plan", choosePlanText: (title: string) => `Pick the plan that suits you for «${title}»`,
    recommended: "Recommended", perCourse: "/course", payMethod: "Payment method", plan: "plan", transferSub: "Transfer to a card number", fastSub: "Fast payment",
    toPayment: "Go to payment", secure: "All payments are securely protected",
    transferTitle: "Card transfer", transferText: "Make the payment and upload a photo (screenshot) of the receipt",
    cardNumber: "Card number", copy: "Copy", amount: "Amount to pay:", receipt: "Upload the receipt photo (JPG/PNG)",
    receiptHint: "Attach the image. The course opens once the payment is confirmed.", send: "Send", congrats: "Congratulations!",
    paidVisa: "Payment successful. The course has been activated!",
    paidTransfer: "Your payment request has been received. The course will open after the administrator checks it (usually 1–2 hours).",
    toDashboard: "Go to dashboard", toHome: "Back to home", inUzbek: "The course lessons are taught in Uzbek.",
  },
};

export default function CheckoutPage({ params }: { params: Promise<{ locale: string, courseId: string }> }) {
  const { locale, courseId } = use(params);
  const t = pick(T, locale);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null | undefined>(undefined);

  const [step, setStep] = useState(1); // 1: Plan, 2: Method, 3: Process, 4: Result
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  // Kurs allaqachon ochiq bo'lsa to'lov emas, kursga havola ko'rsatiladi; to'lov
  // tekshirilayotgan bo'lsa -- ogohlantirish.
  const [enrolled, setEnrolled] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const me = await getStudentDashboardAction();
        setEnrolled(me.enrolledCourses.includes(courseId));
        setPending(me.pendingPayments.includes(courseId));
        setSessionLoading(false);
      } catch (e) {
        router.push(`/${locale}/login?callback=/${locale}/checkout/${courseId}`);
      }
    }
    checkAuth();
  }, [locale, courseId, router]);

  useEffect(() => {
    getCourseByIdAction(courseId).then((c) => setCourse(c ? localizeCourse(c, locale) : null));
  }, [courseId, locale]);

  if (sessionLoading || course === undefined) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <p className="text-slate-400 font-medium">{t.loading}</p>
    </div>
  );

  if (!course) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">{t.notFound}</div>;

  if (enrolled) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-10">
        <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
        <h1 className="text-2xl font-black text-white">{t.openTitle}</h1>
        <p className="text-slate-400">{t.noRepay(course.title)}</p>
        <Link href={`/${locale}/dashboard/${courseId}`} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">
          {t.toCourse} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );

  // KEYIN-TOLDIRING: tarif narxlari (Starter/Pro/Mentor) shu yerda qo'lda yozilgan va
  // admin paneldagi kurs narxiga bog'lanmagan. Rejadagi 16-kun (narx va tariflar)
  // ishida bitta joyga yig'iladi. Hozircha narxni o'zgartirish uchun shu ro'yxatni tahrirlang.
  const isCatia = courseId === "catia-v5";
  const planText = pick(PLAN_TEXT, locale)[isCatia ? "catia" : "other"];
  const plans = (isCatia ? [
    { id: "starter", name: "Starter", price: 30, priceUZS: "380,000" },
    { id: "pro", name: "Pro", price: 120, priceUZS: "1,520,000", color: "from-blue-500 to-cyan-500", best: true },
    { id: "mentor", name: "Mentor", price: 300, priceUZS: "3,800,000" }
  ] : [
    { id: "starter", name: "Starter", price: 20, priceUZS: "250,000" },
    { id: "pro", name: "Pro", price: 80, priceUZS: "1,010,000", color: "from-blue-500 to-indigo-500", best: true },
    { id: "mentor", name: "Mentor", price: 200, priceUZS: "2,540,000" }
  ]).map((p, i) => ({ ...p, ...planText[i] }));

  const paymentMethods = [
    { id: "transfer", name: t.transfer, icon: Banknote, color: "text-purple-400", bg: "bg-purple-400/10" },
    { id: "visa", name: t.visa, icon: CreditCard, color: "text-orange-400", bg: "bg-orange-400/10" }
  ];

  async function handlePlanSelection(plan: any) {
    setSelectedPlan(plan);
    setStep(2);
  }

  async function handlePayment() {
    if (method === "visa") {
        alert(t.visaSoon);
        return;
    }
    setLoading(true);
    try {
      const res = await requestPaymentAction(courseId, selectedPlan.name, selectedPlan.price, method!);
      if (!res.success) {
        alert(trXato(res.error, locale));
        setLoading(false);
        return;
      }
      setPaymentId(res.paymentId);
      
      // Simulyatsiya: Bir oz kutamiz
      setTimeout(() => {
        setLoading(false);
        setStep(method === "transfer" ? 3 : 4);
      }, 2000);
    } catch (e) {
      alert(trXato("Xatolik yuz berdi", locale));
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
      const res = await submitPaymentProofAction(formData);
      if (!res.success) {
        alert(trXato(res.error, locale));
        return;
      }
      setStep(4);
    } catch (e: any) {
      alert(t.uploadError);
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
             <ChevronLeft className="w-5 h-5" /> {t.back}
           </button>
           <div className="flex gap-2">
              {[1, 2, 4].map(i => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-blue-500' : 'bg-slate-800'}`} />
              ))}
           </div>
        </div>

        {pending && step < 4 && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              {t.pendingA}{" "}
              <Link href={`/${locale}/dashboard`} className="underline font-bold">{t.pendingLink}</Link>{" "}{t.pendingB}
            </p>
          </div>
        )}

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
                <h1 className="text-3xl font-black text-white">{t.choosePlan}</h1>
                <p className="text-slate-400">{t.choosePlanText(course.title)}{t.inUzbek && ` ${t.inUzbek}`}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 {plans.map((plan) => (
                   <button 
                     key={plan.id}
                     onClick={() => handlePlanSelection(plan)}
                     className={`relative p-8 rounded-3xl border text-left transition-all hover:scale-[1.02] ${plan.best ? 'bg-slate-900 border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'bg-slate-900/50 border-slate-800'}`}
                   >
                     {plan.best && <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">{t.recommended}</div>}
                     <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                          <p className="text-xs text-slate-500">{plan.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-black text-white">${plan.price}</span>
                           <span className="text-xs text-slate-500">{t.perCourse}</span>
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
                <h1 className="text-3xl font-black text-white">{t.payMethod}</h1>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-500/20">
                   {selectedPlan.name} {t.plan} — ${selectedPlan.price}
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
                           {pm.id === 'transfer' ? t.transferSub : t.fastSub}
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
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{t.toPayment} <ArrowRight className="w-5 h-5" /></>}
                 </button>
              </div>

              <div className="flex items-center gap-3 justify-center text-slate-500 text-sm">
                 <ShieldCheck className="w-4 h-4" /> {t.secure}
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
                    <h2 className="text-2xl font-black text-white">{t.transferTitle}</h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">{t.transferText}</p>
                 </div>

                 <div className="grid gap-4 max-w-sm mx-auto">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
                       <div>
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{t.cardNumber}</div>
                          <div className="text-lg font-bold text-white tracking-widest">{PAYMENT_CARD.number}</div>
                          <div className="text-xs text-slate-400 mt-1">{PAYMENT_CARD.holder}</div>
                       </div>
                       <button onClick={() => navigator.clipboard.writeText(PAYMENT_CARD.number.replace(/\s/g, ""))} className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg text-xs transition-colors">{t.copy}</button>
                    </div>
                    <div className="flex items-center justify-between px-2">
                       <span className="text-slate-400 text-sm">{t.amount}</span>
                       <span className="text-white font-black text-lg">{selectedPlan.priceUZS} UZS</span>
                    </div>
                 </div>

                  <div className="space-y-4 pt-4">
                    <label className="block text-sm font-bold text-slate-400">{t.receipt}</label>
                    <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 focus-within:border-blue-500 transition-all">
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                        className="w-full text-slate-400 file:mr-4 file:py-4 file:px-6 file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:cursor-pointer hover:file:bg-blue-500 cursor-pointer"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 italic flex items-center gap-2">
                       <Info className="w-3 h-3" /> {t.receiptHint}
                    </p>
                 </div>

                 <button 
                   disabled={!receiptFile || loading}
                   onClick={handleReceiptUpload}
                   className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl shadow-xl transition-all"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t.send}
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
                <h1 className="text-4xl font-black text-white">{t.congrats}</h1>
                {method === 'visa' ? (
                  <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                    {t.paidVisa}
                  </p>
                ) : (
                  <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                    {t.paidTransfer}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 max-w-xs mx-auto pt-8">
                 <Link href={`/${locale}/dashboard`} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
                     {t.toDashboard} <ArrowRight className="w-5 h-5" />
                   </Link>
                 <Link href={`/${locale}`} className="block text-center w-full py-4 text-slate-500 hover:text-white transition-colors font-bold">
                      {t.toHome}
                    </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
