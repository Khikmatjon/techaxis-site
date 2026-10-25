"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Course, getTotalLessons } from "@/lib/courses";
import {
  BookOpen, Lock, Play, Clock, ChevronRight, Zap, CheckCircle, AlertCircle, X
} from "lucide-react";
import { getStudentDashboardAction } from "@/lib/actions/student-actions";
import { getCoursesAction } from "@/lib/actions/courses-actions";
import { logoutAction } from "@/lib/actions/auth-actions";
import { UserDB } from "@/lib/users-db";
import { Avatar } from "@/components/shared/avatar";
import { PAYMENT_CARD } from "@/config/site";
import { pick, formatNumber } from "@/lib/locale-text";
import { localizeCourse, levelLabel } from "@/lib/course-i18n";

const T = {
  uz: {
    enrollTitle: "Kursga yozilish", payMethod: "To'lov usuli:",
    payText: (card: string) => ` ${card} karta raqamiga o'tkazma amalga oshiriladi. Chek yuklash orqali to'lovingiz tasdiqlanadi.`,
    toPayment: "To'lovga o'tish →", open: "Ochiq", pending: "Kutilmoqda", locked: "Qulflangan", lessons: "dars",
    continue: "Davom etish", waitAdmin: "Admin kutilmoqda...", buy: "Sotib olish",
    loadError: "Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, administratorga murojaat qiling yoki sahifani yangilang.",
    error: "Xatolik!", retry: "Qayta urinish", signOut: "Tizimdan chiqish", loading: "Yuklanmoqda...",
    loadingText: "Kabinet tayyorlanmoqda, iltimos kuting", logout: "Chiqish", hello: "Salom",
    welcome: "O'quv kabinetingizga xush kelibsiz", inUzbek: "",
    stats: ["Ochiq kurslar", "Kutilayotgan", "Jami kurslar", "Bajarildi"],
    allCourses: "Barcha kurslar", firstFree: "Birinchi dars bepul ochiq — sinab ko'ring!",
  },
  ru: {
    enrollTitle: "Запись на курс", payMethod: "Способ оплаты:",
    payText: (card: string) => ` перевод на карту ${card}. Оплата подтверждается после загрузки чека.`,
    toPayment: "Перейти к оплате →", open: "Открыт", pending: "Ожидает", locked: "Закрыт", lessons: "уроков",
    continue: "Продолжить", waitAdmin: "Ожидает подтверждения...", buy: "Купить",
    loadError: "Не удалось загрузить данные. Обновите страницу или обратитесь к администратору.",
    error: "Ошибка!", retry: "Повторить", signOut: "Выйти из аккаунта", loading: "Загрузка...",
    loadingText: "Готовим ваш кабинет, подождите", logout: "Выход", hello: "Здравствуйте",
    welcome: "Добро пожаловать в ваш учебный кабинет", inUzbek: "Уроки на узбекском языке.",
    stats: ["Открытые курсы", "Ожидают", "Всего курсов", "Выполнено"],
    allCourses: "Все курсы", firstFree: "Первый урок открыт бесплатно — попробуйте!",
  },
  en: {
    enrollTitle: "Course enrollment", payMethod: "Payment method:",
    payText: (card: string) => ` bank transfer to card ${card}. Your payment is confirmed after you upload the receipt.`,
    toPayment: "Go to payment →", open: "Open", pending: "Pending", locked: "Locked", lessons: "lessons",
    continue: "Continue", waitAdmin: "Awaiting approval...", buy: "Buy",
    loadError: "Could not load your data. Please refresh the page or contact the administrator.",
    error: "Error!", retry: "Try again", signOut: "Sign out", loading: "Loading...",
    loadingText: "Preparing your dashboard, please wait", logout: "Log out", hello: "Hello",
    welcome: "Welcome to your learning dashboard", inUzbek: "Lessons are taught in Uzbek.",
    stats: ["Open courses", "Pending", "Total courses", "Completed"],
    allCourses: "All courses", firstFree: "The first lesson is free — give it a try!",
  },
};

// ---- TO'LOV MODALI ----
function PaymentModal({ course, locale, router, onClose }: { 
  course: Course; 
  locale: string;
  router: any;
  onClose: () => void; 
}) {
  const t = pick(T, locale);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.enrollTitle}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex items-center gap-3">
            <Image src={course.thumbnail} alt={course.title} width={56} height={56} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <p className="text-slate-900 dark:text-white font-semibold text-sm">{course.title}</p>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-400">{formatNumber(course.priceUZS, locale)} UZS</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>{t.payMethod}</strong>{t.payText(PAYMENT_CARD.number)}
            </p>
          </div>

          <button
            onClick={() => router.push(`/${locale}/checkout/${course.id}`)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {t.toPayment}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- KURS KARTOCHKASI ----
function CourseCard({ course, isEnrolled, isPending, locale, onBuy }: {
  course: Course; isEnrolled: boolean; isPending: boolean; locale: string; onBuy: () => void;
}) {
  const totalLessons = getTotalLessons(course);
  const t = pick(T, locale);
  const levelColors = {
    "Boshlang'ich": "bg-emerald-500/20 text-emerald-800 dark:text-emerald-400",
    "O'rta": "bg-yellow-500/20 text-yellow-800 dark:text-yellow-400",
    "Yuqori": "bg-red-500/20 text-red-800 dark:text-red-400",
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
      {/* Rasm */}
      <div className="relative h-44 overflow-hidden">
        <Image src={course.thumbnail} alt={course.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 dark:from-slate-900/80 to-transparent" />
        {isEnrolled ? (
          <div className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> {t.open}
          </div>
        ) : isPending ? (
          <div className="absolute top-3 right-3 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {t.pending}
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> {t.locked}
          </div>
        )}
        <div className={`absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
          {levelLabel(course.level, locale)}
        </div>
      </div>

      {/* Kontent */}
      <div className="p-5 space-y-3">
        <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-snug">{course.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{course.subtitle}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {totalLessons} {t.lessons}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <Avatar name={course.instructor} className="w-7 h-7 rounded-full text-[10px]" />
          <span className="text-slate-600 dark:text-slate-400 text-xs">{course.instructor}</span>
        </div>

        {/* Tugma */}
        {isEnrolled ? (
          <Link href={`/${locale}/dashboard/${course.id}`} className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> {t.continue} <ChevronRight className="w-4 h-4" />
            </Link>
        ) : isPending ? (
          <button disabled className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 font-bold py-2.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" /> {t.waitAdmin}
          </button>
        ) : (
          <button onClick={onBuy} className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-blue-500/30 text-blue-700 dark:text-blue-400 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            {formatNumber(course.priceUZS, locale)} UZS — {t.buy}
          </button>
        )}
      </div>
    </div>
  );
}

// ---- ASOSIY DASHBOARD ----
function DashboardContent() {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const t = pick(T, locale);
  const router = useRouter();
  const [user, setUser] = useState<UserDB | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toast, setToast] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setErrorMsg(null);
      const [dbUser, allCourses] = await Promise.all([getStudentDashboardAction(), getCoursesAction()]);
      setUser(dbUser);
      setCourses(allCourses.map((c) => localizeCourse(c, locale)));
    } catch (e: any) {
      console.error("DASHBOARD_ERROR:", e.message);
      // Agar foydalanuvchi topilmasa (baza reset bo'lgan bo'lsa) login'ga qaytarish
      if (e.message?.includes("User not found") || e.message?.includes("Unauthorized")) {
        router.push(`/${locale}/login?error=session_lost`);
      } else {
        setErrorMsg(t.loadError);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogout() {
    await logoutAction();
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
          <AlertCircle className="w-8 h-8 text-red-700 dark:text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.error}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">{errorMsg}</p>
        <button 
          onClick={loadData}
          className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
        >
          {t.retry}
        </button>
        <button 
          onClick={handleLogout}
          className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
        >
          {t.signOut}
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-6 p-4">
        <div className="relative">
           <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
           <Zap className="absolute inset-0 m-auto w-6 h-6 text-blue-700 dark:text-blue-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.loading}</h2>
           <p className="text-slate-500 text-sm">{t.loadingText}</p>
        </div>
      </div>
    );
  }

  const enrolledCount = user.enrolledCourses?.length || 0;
  const pendingCount = user.pendingPayments?.length || 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm animate-fade-in">
          ✅ {toast}
        </div>
      )}

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          locale={locale}
          router={router}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Alohida sarlavha qatori yo'q: saytning menyusida Kabinetim, Sozlamalar va Chiqish bor. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Salom */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
            {t.hello}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user.name.split(" ")[0]}</span>! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">{t.welcome}{t.inUzbek && ` ${t.inUzbek}`}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: t.stats[0], value: enrolledCount, icon: "✅", color: "text-emerald-700 dark:text-emerald-400" },
            { label: t.stats[1], value: pendingCount, icon: "⏳", color: "text-amber-800 dark:text-amber-400" },
            { label: t.stats[2], value: courses.length, icon: "📚", color: "text-blue-700 dark:text-blue-400" },
            { label: t.stats[3], value: "0%", icon: "🏆", color: "text-purple-700 dark:text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Kurslar */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.allCourses}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{t.firstFree}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user.enrolledCourses?.includes(course.id) || user.role === "admin"}
              isPending={user.pendingPayments?.includes(course.id) || false}
              locale={locale}
              onBuy={() => setSelectedCourse(course)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
