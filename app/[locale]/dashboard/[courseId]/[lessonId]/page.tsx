"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Course, Lesson, Module, getTotalLessons } from "@/lib/courses";
import { getLessonByIdAction } from "@/lib/actions/courses-actions";
import {
  ChevronLeft, ChevronRight, Play, FileText, Image as ImageIcon,
  Lock, BookOpen, CheckCircle, LogOut, Zap, Clock, Download,
  ChevronDown, ChevronUp
} from "lucide-react";
import { getStudentDashboardAction } from "@/lib/actions/student-actions";
import { logoutAction } from "@/lib/actions/auth-actions";
import { pick } from "@/lib/locale-text";
import { localizeCourse } from "@/lib/course-i18n";
import { UserDB } from "@/lib/users-db";


const T = {
  uz: {
    text: "Matn", images: "Rasmlar", lessons: "dars", prev: "Oldingi dars", next: "Keyingi dars", free: "Bepul", open: "Ochiq",
    lockedTitle: "Bu dars qulflangan", lockedText: "Bu darsni ko'rish uchun kursni sotib olishingiz kerak.", buyCourse: "Kursni sotib olish →",
    lessonText: "Dars matni", pdfText: "Dars materiallari PDF formatida tayyorlangan", pdfDownload: "PDF yuklab olish",
    lessonImages: "Dars rasmlari", image: "Rasm", done: "Tugallandi ✓", markDone: "Dars tugadi ✓", nextLesson: "KEYINGI DARS",
    nextBtn: "Keyingisi", locked: "Qulflangan", inUzbek: "",
  },
  ru: {
    text: "Текст", images: "Изображения", lessons: "уроков", prev: "Предыдущий урок", next: "Следующий урок", free: "Бесплатно", open: "Открыт",
    lockedTitle: "Этот урок закрыт", lockedText: "Чтобы посмотреть этот урок, нужно купить курс.", buyCourse: "Купить курс →",
    lessonText: "Текст урока", pdfText: "Материалы урока в формате PDF", pdfDownload: "Скачать PDF",
    lessonImages: "Изображения урока", image: "Изображение", done: "Пройден ✓", markDone: "Урок пройден ✓", nextLesson: "СЛЕДУЮЩИЙ УРОК",
    nextBtn: "Далее", locked: "Закрыт", inUzbek: "Урок проводится на узбекском языке.",
  },
  en: {
    text: "Text", images: "Images", lessons: "lessons", prev: "Previous lesson", next: "Next lesson", free: "Free", open: "Open",
    lockedTitle: "This lesson is locked", lockedText: "To watch this lesson, you need to buy the course.", buyCourse: "Buy the course →",
    lessonText: "Lesson text", pdfText: "Lesson materials in PDF format", pdfDownload: "Download PDF",
    lessonImages: "Lesson images", image: "Image", done: "Completed ✓", markDone: "Mark as done ✓", nextLesson: "NEXT LESSON",
    nextBtn: "Next", locked: "Locked", inUzbek: "This lesson is taught in Uzbek.",
  },
};

function LessonContent({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const t = pick(T, locale);
  const router = useRouter();
  const [user, setUser] = useState<UserDB | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"video" | "text" | "pdf" | "images">("video");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

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

    getLessonByIdAction(courseId, lessonId).then((result) => {
      if (!result) { router.push(`/${locale}/dashboard`); return; }
      // Kurs va dars nomlari joriy tilda; dars matni va videosi o'zbekcha qoladi
      const localized = localizeCourse(result.course, locale);
      const localizedLesson = localized.modules.flatMap((m) => m.lessons).find((l) => l.id === result.lesson.id);
      setLesson(localizedLesson ? { ...result.lesson, title: localizedLesson.title } : result.lesson);
      setCourse(localized);

      if (result.lesson.videoUrl) setActiveTab("video");
      else if (result.lesson.text) setActiveTab("text");
      else if (result.lesson.pdfUrl) setActiveTab("pdf");
      else if (result.lesson.images?.length) setActiveTab("images");
    });
  }, [courseId, lessonId, locale, router]);

  useEffect(() => {
    if (!user) return;
    const key = `techaxis_progress_${user.id}_${courseId}`;
    try {
      const stored = localStorage.getItem(key);
      setCompletedLessons(stored ? JSON.parse(stored) : []);
    } catch {
      setCompletedLessons([]);
    }
  }, [user, courseId]);

  function markLessonDone() {
    if (!user || !lesson) return;
    const key = `techaxis_progress_${user.id}_${courseId}`;
    if (completedLessons.includes(lesson.id)) return;
    const updated = [...completedLessons, lesson.id];
    setCompletedLessons(updated);
    try { localStorage.setItem(key, JSON.stringify(updated)); } catch { /* ignore */ }
  }

  if (!user || !course || !lesson) return null;

  const isEnrolled = user.enrolledCourses?.includes(course.id) || user.role === "admin";
  const canAccess = isEnrolled || lesson.isFree;
  const isDone = completedLessons.includes(lesson.id);

  const allLessons = course.modules.flatMap((m: Module) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const nextCanAccess = nextLesson && (isEnrolled || nextLesson.isFree);
  const totalLessons = allLessons.length;
  const totalDone = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  async function handleLogout() {
    await logoutAction();
  }

  const tabs = [
    { key: "video" as const, label: "Video", icon: Play, show: !!lesson.videoUrl },
    { key: "text" as const, label: t.text, icon: BookOpen, show: !!lesson.text },
    { key: "pdf" as const, label: "PDF", icon: FileText, show: !!lesson.pdfUrl },
    { key: "images" as const, label: t.images, icon: ImageIcon, show: !!(lesson.images && lesson.images.length > 0) },
  ].filter((t) => t.show);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={`/${locale}/dashboard/${courseId}`} className="text-slate-400 hover:text-white transition-colors shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
            </Link>
            <div className="min-w-0 hidden sm:block">
              <p className="text-xs text-slate-500 truncate">{course.title}</p>
              <p className="text-sm font-semibold text-white truncate">{lesson.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Progress */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-slate-400 text-xs font-mono">{totalDone}/{totalLessons} {t.lessons}</span>
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            {/* Nav */}
            <div className="flex items-center gap-1">
              <Link href={prevLesson ? `/${locale}/dashboard/${courseId}/${prevLesson.id}` : "#"}>
                <button disabled={!prevLesson} aria-label={t.prev} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
              <span className="text-slate-500 text-xs font-mono px-2">
                {currentIndex + 1}/{allLessons.length}
              </span>
              <Link href={nextLesson && nextCanAccess ? `/${locale}/dashboard/${courseId}/${nextLesson.id}` : "#"}>
                <button disabled={!nextLesson || !nextCanAccess} aria-label={t.next} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </Link>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Kontent */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Dars sarlavhasi */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {lesson.isFree && (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold">{t.free}</span>
              )}
              {canAccess && (
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t.open}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{lesson.title}</h1>
            {t.inUzbek && <p className="text-sm text-amber-400 mt-1">{t.inUzbek}</p>}
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{lesson.duration}</span>
              {tabs.map((t) => (
                <span key={t.key} className="flex items-center gap-1">
                  <t.icon className="w-4 h-4" />{t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Asosiy kontent */}
        {!canAccess ? (
          // Qulflangan
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-white">{t.lockedTitle}</h2>
            <p className="text-slate-400 max-w-sm mx-auto">
              {t.lockedText}
            </p>
            <Link href={`/${locale}/dashboard`} className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all">
                {t.buyCourse}
              </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Tablar */}
            {tabs.length > 1 && (
              <div className="flex gap-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === tab.key
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Video */}
            {activeTab === "video" && lesson.videoUrl && (
              <div className="space-y-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={lesson.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={lesson.title}
                    />
                  </div>
                </div>
                {lesson.text && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400" /> {t.lessonText}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm">{lesson.text}</p>
                  </div>
                )}
              </div>
            )}

            {/* Matn (to'g'ridan-to'g'ri tab) */}
            {activeTab === "text" && lesson.text && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" /> {t.lessonText}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed text-base">{lesson.text}</p>
                </div>
              </div>
            )}

            {/* PDF */}
            {activeTab === "pdf" && lesson.pdfUrl && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{lesson.title} — PDF</h3>
                <p className="text-slate-400 text-sm">{t.pdfText}</p>
                <a href={lesson.pdfUrl} download className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-bold px-6 py-3 rounded-xl transition-all">
                  <Download className="w-4 h-4" /> {t.pdfDownload}
                </a>
              </div>
            )}

            {/* Rasmlar */}
            {activeTab === "images" && lesson.images && lesson.images.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-400" /> {t.lessonImages}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {lesson.images.map((img, i) => (
                     <img key={i} src={img} alt={`${t.image} ${i + 1}`} loading="lazy" decoding="async" className="w-full rounded-xl border border-slate-700 object-cover" />
                  ))}
                </div>
              </div>
            )}

            {/* Dars tugadi tugmasi */}
            <div className="flex justify-center pt-2">
              <button
                onClick={markLessonDone}
                disabled={isDone}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-base transition-all ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {isDone ? t.done : t.markDone}
              </button>
            </div>

            {/* Keyingi dars */}
            {nextLesson && (
              <div className={`border rounded-2xl p-5 flex items-center justify-between gap-4 ${nextCanAccess ? "bg-slate-900 border-slate-800" : "bg-slate-900/50 border-slate-800/50 opacity-60"}`}>
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">{t.nextLesson}</p>
                  <p className="text-white font-bold">{nextLesson.title}</p>
                  <p className="text-slate-400 text-sm flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />{nextLesson.duration}
                  </p>
                </div>
                {nextCanAccess ? (
                  <Link href={`/${locale}/dashboard/${courseId}/${nextLesson.id}`} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0">
                      {t.nextBtn} <ChevronRight className="w-4 h-4" />
                    </Link>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500 shrink-0">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">{t.locked}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;
  return <LessonContent courseId={courseId} lessonId={lessonId} />;
}
