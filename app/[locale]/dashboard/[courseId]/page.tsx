"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCourseById, Course, Module, getTotalLessons } from "@/lib/courses";
import {
  Play, Lock, FileText, Image, ChevronLeft, Clock, BookOpen,
  Star, Users, CheckCircle, LogOut, Zap
} from "lucide-react";
import { getStudentDashboardAction } from "@/lib/actions/student-actions";
import { logoutAction } from "@/lib/actions/auth-actions";
import { UserDB } from "@/lib/users-db";


function CourseContent({ courseId }: { courseId: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const router = useRouter();
  const [user, setUser] = useState<UserDB | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const loadData = async () => {
    try {
      const dbUser = await getStudentDashboardAction();
      setUser(dbUser);
    } catch (e) {
      console.error(e);
      router.push(`/${locale}/login`);
    }
  };

  useEffect(() => {
    loadData();
    const c = getCourseById(courseId);
    if (!c) { router.push(`/${locale}/dashboard`); return; }
    setCourse(c);
    // Birinchi modulni ochiq qoldir
    if (c.modules.length > 0) setOpenModules(new Set([c.modules[0].id]));
  }, [courseId, locale, router]);

  async function handleLogout() {
    await logoutAction();
  }

  function toggleModule(id: string) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  if (!user || !course) return null;

  const isEnrolled = user.enrolledCourses?.includes(course.id) || user.role === "admin";
  const totalLessons = getTotalLessons(course);
  const totalDone = 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/dashboard`} className="text-slate-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-black text-white hidden sm:block">Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Axis</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5">
              <img src={`https://i.pravatar.cc/100?u=${user.email}`} alt={user.name} className="w-6 h-6 rounded-full" />
              <span className="text-slate-300 text-sm font-medium">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors text-sm">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Chap: Kurs info + Modullar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Kurs header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <div className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${
                    isEnrolled ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {isEnrolled ? "✅ Ochiq" : "🔒 Qulflangan"}
                  </div>
                  <h1 className="text-2xl font-black text-white">{course.title}</h1>
                  <p className="text-slate-300 text-sm mt-1">{course.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400" /> {course.rating} reyting</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-400" /> {course.studentsCount} o'quvchi</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-purple-400" /> {totalLessons} dars</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> {course.duration}</span>
                </div>
              </div>
            </div>

            {/* Modullar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white">Kurs dasturi</h2>
                <p className="text-slate-400 text-sm">{course.modules.length} modul • {totalLessons} dars</p>
              </div>

              <div className="divide-y divide-slate-800">
                {course.modules.map((mod: Module, mi: number) => (
                  <div key={mod.id}>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xs font-bold">{mi + 1}</div>
                        <div>
                          <div className="text-white font-semibold text-sm">{mod.title}</div>
                          <div className="text-slate-500 text-xs">{mod.lessons.length} dars</div>
                        </div>
                      </div>
                      <ChevronLeft className={`w-4 h-4 text-slate-500 transition-transform ${openModules.has(mod.id) ? "-rotate-90" : ""}`} />
                    </button>

                    {openModules.has(mod.id) && (
                      <div className="border-t border-slate-800/50">
                        {mod.lessons.map((lesson, li) => {
                           const canAccess = isEnrolled || lesson.isFree;
                          return (
                            <div key={lesson.id} className={`flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/30 transition-colors ${!canAccess ? "opacity-60" : ""}`}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-800 text-xs font-bold text-slate-400">
                                {mi + 1}.{li + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-300 text-sm font-medium truncate">{lesson.title}</span>
                                  {lesson.isFree && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold shrink-0">Bepul</span>}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}</span>
                                  {lesson.videoUrl && <span className="flex items-center gap-1"><Play className="w-3 h-3" />Video</span>}
                                  {lesson.pdfUrl && <span className="flex items-center gap-1"><FileText className="w-3 h-3" />PDF</span>}
                                  {lesson.images && lesson.images.length > 0 && <span className="flex items-center gap-1"><Image className="w-3 h-3" />Rasm</span>}
                                </div>
                              </div>
                              {canAccess ? (
                                <Link href={`/${locale}/dashboard/${course.id}/${lesson.id}`}>
                                  <button className="shrink-0 w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center transition-colors">
                                    <Play className="w-3.5 h-3.5 text-blue-400" />
                                  </button>
                                </Link>
                              ) : (
                                <div className="shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* O'ng: Instruktur + Taglar */}
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">O'qituvchi</h3>
              <div className="flex items-center gap-3">
                <img src={course.instructorAvatar} alt={course.instructor} className="w-12 h-12 rounded-full border-2 border-slate-700" />
                <div>
                  <div className="text-white font-semibold">{course.instructor}</div>
                  <div className="text-slate-400 text-sm">TechAxis Muallifi</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Yo'nalishlar</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span key={tag} className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg">{tag}</span>
                ))}
              </div>
            </div>

            {!isEnrolled && (
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-5">
                <div className="text-3xl font-black text-white mb-1">{course.priceUZS.toLocaleString()} UZS</div>
                <div className="text-slate-400 text-sm mb-4">yoki ${course.price}</div>
                <Link href={`/${locale}/dashboard`}>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all">
                    Sotib olish →
                  </button>
                </Link>
              </div>
            )}

            {isEnrolled && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                <p className="text-emerald-400 font-bold">Siz bu kursga yozilgansiz!</p>
                <p className="text-slate-400 text-sm mt-1">Barcha darslarga kirish imkoniyatingiz bor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  return <CourseContent courseId={courseId} />;
}
