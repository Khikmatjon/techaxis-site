"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, logout, refreshCurrentUser, requestCoursePayment, User } from "@/lib/auth";
import { COURSES, Course, getTotalLessons } from "@/lib/courses";
import {
  BookOpen, Lock, Play, Star, Clock, Users, ChevronRight,
  LogOut, Zap, CreditCard, CheckCircle, AlertCircle, X
} from "lucide-react";
import AuthGuard from "@/components/shared/auth-guard";

// ---- TO'LOV MODALI ----
function PaymentModal({ course, onClose, onSuccess }: { course: Course; onClose: () => void; onSuccess: () => void }) {
  const [method, setMethod] = useState<"click" | "payme" | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handlePay() {
    if (!method) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    requestCoursePayment(course.id);
    setLoading(false);
    setSent(true);
    setTimeout(() => { onClose(); onSuccess(); }, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Kursga yozilish</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {sent ? (
            <div className="text-center py-4 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="text-white font-bold text-lg">To'lov ma'lumoti yuborildi!</p>
              <p className="text-slate-400 text-sm">Admin tekshirib, kurs ochiladi</p>
            </div>
          ) : (
            <>
              <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
                <img src={course.thumbnail} alt={course.title} className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{course.title}</p>
                  <p className="text-2xl font-black text-blue-400">{course.priceUZS.toLocaleString()} UZS</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-400">To'lov usulini tanlang:</p>
                {(["click", "payme"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-semibold ${method === m ? "border-blue-500 bg-blue-500/10 text-white" : "border-slate-700 text-slate-400 hover:border-slate-600"}`}
                  >
                    <CreditCard className="w-5 h-5" />
                    {m === "click" ? "Click" : "Payme"}
                    {method === m && <CheckCircle className="w-4 h-4 text-blue-400 ml-auto" />}
                  </button>
                ))}
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-300 text-sm">
                  <strong>Demo rejim:</strong> Haqiqiy to'lov amalga oshmaydi. Admin to'lovni tasdiqlagan so'ng kurs ochiladi.
                </p>
              </div>

              <button
                onClick={handlePay}
                disabled={!method || loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "To'lov qilish →"}
              </button>
            </>
          )}
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
  const levelColors = {
    "Boshlang'ich": "bg-emerald-500/20 text-emerald-400",
    "O'rta": "bg-yellow-500/20 text-yellow-400",
    "Yuqori": "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
      {/* Rasm */}
      <div className="relative h-44 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        {isEnrolled ? (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Ochiq
          </div>
        ) : isPending ? (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Kutilmoqda
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Qulflangan
          </div>
        )}
        <div className={`absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
          {course.level}
        </div>
      </div>

      {/* Kontent */}
      <div className="p-5 space-y-3">
        <h3 className="text-white font-bold text-lg leading-snug">{course.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{course.subtitle}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> {course.rating}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.studentsCount}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {totalLessons} dars</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <img src={course.instructorAvatar} alt={course.instructor} className="w-7 h-7 rounded-full" />
          <span className="text-slate-400 text-xs">{course.instructor}</span>
        </div>

        {/* Tugma */}
        {isEnrolled ? (
          <Link href={`/${locale}/dashboard/${course.id}`}>
            <button className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Davom etish <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        ) : isPending ? (
          <button disabled className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold py-2.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" /> Admin kutilmoqda...
          </button>
        ) : (
          <button onClick={onBuy} className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-blue-500/30 text-blue-400 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            {course.priceUZS.toLocaleString()} UZS — Sotib olish
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const u = refreshCurrentUser();
    setUser(u);
  }, []);

  function handleLogout() {
    logout();
    router.push(`/${locale}/login`);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  if (!user) return null;

  const enrolledCount = user.enrolledCourses.length;
  const pendingCount = user.pendingPayments.length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm animate-fade-in">
          ✅ {toast}
        </div>
      )}

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSuccess={() => {
            const u = refreshCurrentUser();
            setUser(u);
            showToast("To'lov ma'lumoti yuborildi! Admin tekshirmoqda.");
          }}
        />
      )}

      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black text-white">Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Axis</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5">
              <img src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`} alt={user.name} className="w-6 h-6 rounded-full" />
              <span className="text-slate-300 text-sm font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Salom */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">
            Salom, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user.name.split(" ")[0]}</span>! 👋
          </h1>
          <p className="text-slate-400">O'quv kabinetingizga xush kelibsiz</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Ochiq kurslar", value: enrolledCount, icon: "✅", color: "text-emerald-400" },
            { label: "Kutilayotgan", value: pendingCount, icon: "⏳", color: "text-amber-400" },
            { label: "Jami kurslar", value: COURSES.length, icon: "📚", color: "text-blue-400" },
            { label: "Bajarildi", value: "0%", icon: "🏆", color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Kurslar */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Barcha kurslar</h2>
          <p className="text-slate-400 text-sm mt-1">Birinchi dars bepul ochiq — sinab ko'ring!</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user.enrolledCourses.includes(course.id)}
              isPending={user.pendingPayments.includes(course.id)}
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
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
