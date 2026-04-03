"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { COURSES, getCourseById, getTotalLessons } from "@/lib/courses";
import {
  Users, BookOpen, CheckCircle, Clock, LogOut, Zap,
  Shield, UserCheck, ChevronRight, Search, X, Award, AlertTriangle
} from "lucide-react";
import { getAdminUsersAction, assignCourseAction } from "@/lib/actions/admin-actions";
import { logoutAction } from "@/lib/actions/auth-actions";
import { UserDB } from "@/lib/users-db";

// ---- FOYDALANUVCHI KARTOCHKASI ----
function UserRow({ user, onAssign }: { user: UserDB; onAssign: (userId: string, courseId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleAssign(courseId: string) {
    setAssigning(courseId);
    await onAssign(user.id, courseId);
    setAssigning(null);
    setSuccess(courseId);
    setTimeout(() => setSuccess(null), 2000);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all">
      <div
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <img
          src={`https://i.pravatar.cc/100?u=${user.email}`}
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-slate-700 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm truncate">{user.name}</p>
            {user.pendingPayments && user.pendingPayments.length > 0 && (
              <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <AlertTriangle className="w-3 h-3" /> {user.pendingPayments.length} kutilmoqda
              </span>
            )}
          </div>
          <p className="text-slate-500 text-xs truncate">{user.email}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex gap-1">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {user.enrolledCourses ? user.enrolledCourses.length : 0}
            </span>
          </div>
          <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${open ? "rotate-90" : ""}`} />
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-800 p-4 space-y-3 bg-slate-900/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kurslarni boshqarish</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {COURSES.map((course) => {
              const enrolled = user.enrolledCourses?.includes(course.id);
              const pending = user.pendingPayments?.includes(course.id);
              // Yangi payments arrayidan ushbu kurs uchun ma'lumot qidiramiz
              const paymentDetail = user.payments?.find(p => p.courseId === course.id && p.status === "pending");
              const isSuccess = success === course.id;

              return (
                <div
                  key={course.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    enrolled
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : pending
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-slate-800/50 border-slate-700/50"
                  }`}
                >
                  <img src={course.thumbnail} alt={course.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{course.title}</p>
                    {paymentDetail && (
                      <div className="flex flex-wrap gap-1 mt-1">
                         <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">{paymentDetail.plan}</span>
                         <span className="text-[9px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-bold uppercase">{paymentDetail.method}</span>
                      </div>
                    )}
                  </div>
                  {enrolled ? (
                    <span className="text-emerald-400 shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  ) : isSuccess ? (
                    <span className="text-emerald-400 text-xs font-bold shrink-0">✅ Berildi</span>
                  ) : (
                    <div className="flex flex-col gap-1 items-end">
                      {paymentDetail?.receiptUrl && (
                        <a 
                          href={paymentDetail.receiptUrl} 
                          target="_blank" 
                          className="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
                        >
                          Chekni ko'rish
                        </a>
                      )}
                      <button
                        onClick={() => handleAssign(course.id)}
                        disabled={assigning === course.id}
                        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                          pending
                            ? "bg-amber-500/30 hover:bg-amber-500/50 text-amber-300 border border-amber-500/30"
                            : "bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {assigning === course.id ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : pending ? (
                          <><UserCheck className="w-3.5 h-3.5" /> Tasdiqlash</>
                        ) : (
                          <><Award className="w-3.5 h-3.5" /> Berish</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- ASOSIY ADMIN PANEL ----
function AdminContent() {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [users, setUsers] = useState<UserDB[]>([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
       const res = await fetch('/api/auth/session');
       const sessionData = await res.json();
       if (sessionData.user) setAdmin(sessionData.user);

       const allStudents = await getAdminUsersAction();
       setUsers(allStudents);
    } catch(e) {
       console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function handleAssign(userId: string, courseId: string) {
    try {
       await assignCourseAction(userId, courseId);
       await loadData(); // refresh the view
    } catch(e) {
       console.error("Failed to assign course", e);
    }
  }

  async function handleLogout() {
    await logoutAction();
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Umumiy statistika
  const totalEnrolled = users.reduce((s, u) => s + u.enrolledCourses.length, 0);
  const totalPending = users.reduce((s, u) => s + u.pendingPayments.length, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black text-white">
                Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Axis</span>
              </span>
            </Link>
            <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-500/30">
              <Shield className="w-3.5 h-3.5" />
              Admin Panel
            </div>
          </div>

          <div className="flex items-center gap-3">
            {admin && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5">
                <img
                  src={`https://i.pravatar.cc/100?u=${admin.email}`}
                  alt={admin.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-slate-300 text-sm font-medium">{admin.name}</span>
              </div>
            )}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sarlavha */}
        <div>
          <h1 className="text-3xl font-black text-white mb-1">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Paneli</span>
          </h1>
          <p className="text-slate-400">O'quvchilarga kurslarni biriktirish va to'lovlarni tasdiqlash</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Jami o'quvchilar", value: users.length, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { label: "Berilgan kurslar", value: totalEnrolled, icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "Kutilayotgan", value: totalPending, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            { label: "Jami kurslar", value: COURSES.length, icon: Award, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
          ].map((s) => (
            <div key={s.label} className={`border rounded-xl p-4 ${s.bg}`}>
              <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Kutilayotgan to'lovlar */}
        {totalPending > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
              <AlertTriangle className="w-5 h-5" />
              {totalPending} ta to'lov tasdiqlash kutmoqda
            </div>
            <p className="text-slate-400 text-sm">
              Quyidagi foydalanuvchilarni oching → kerakli kursning "Tasdiqlash" tugmasini bosing
            </p>
          </div>
        )}

        {/* Qidiruv + O'quvchilar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white">O'quvchilar ({filtered.length})</h2>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Hech qanday o'quvchi topilmadi</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((u) => (
                <UserRow key={u.id} user={u} onAssign={handleAssign} />
              ))}
            </div>
          )}
        </div>

        {/* Kurslar jadvali */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Kurslar statistikasi</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {COURSES.map((course) => {
              const enrolledCount = users.filter((u) => u.enrolledCourses.includes(course.id)).length;
              const pendingCount = users.filter((u) => u.pendingPayments.includes(course.id)).length;
              return (
                <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                  <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{course.title}</p>
                    <p className="text-slate-500 text-xs">{course.priceUZS.toLocaleString()} UZS</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs text-emerald-400 font-bold">{enrolledCount} ochiq</span>
                    {pendingCount > 0 && (
                      <span className="text-xs text-amber-400 font-bold">{pendingCount} kutmoqda</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return <AdminContent />;
}
