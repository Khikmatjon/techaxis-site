"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getCourses, updateCourse, deleteCourse, createCourse, createModule, deleteModule, createLesson, deleteLesson, updateLesson } from "@/lib/admin-api";
import { logoutAction } from "@/lib/actions/auth-actions";
import { Plus, Edit2, Trash2, LogOut, Zap, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import { getStudentDashboardAction } from "@/lib/actions/student-actions";

function CMSAdmin() {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [addingModule, setAddingModule] = useState<string | null>(null);
  const [addingLesson, setAddingLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getStudentDashboardAction();
        if (user?.role !== "admin") {
          router.push(`/${locale}/login`);
        }
      } catch {
        router.push(`/${locale}/login`);
      }
    };
    checkAuth();
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Kurslarni yuklashda xato");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCourse(courseId: string, updates: any) {
    try {
      await updateCourse(courseId, updates);
      await loadCourses();
      setEditingCourse(null);
    } catch (err) {
      setError("Kurs yangilanishida xato");
    }
  }

  async function handleDeleteCourse(courseId: string) {
    if (!confirm("Kursni o'chirishni tasdiqlaysizmi?")) return;
    try {
      await deleteCourse(courseId);
      await loadCourses();
    } catch (err) {
      setError("Kurs o'chirishda xato");
    }
  }

  async function handleAddModule(courseId: string, title: string) {
    if (!title) return;
    try {
      await createModule(courseId, { title });
      await loadCourses();
      setAddingModule(null);
    } catch (err) {
      setError("Modul qo'shishda xato");
    }
  }

  async function handleDeleteModule(moduleId: string) {
    if (!confirm("Modulni o'chirishni tasdiqlaysizmi?")) return;
    try {
      await deleteModule(moduleId);
      await loadCourses();
    } catch (err) {
      setError("Modul o'chirishda xato");
    }
  }

  async function handleAddLesson(moduleId: string, title: string) {
    if (!title) return;
    try {
      await createLesson(moduleId, { title, duration: "0:00" });
      await loadCourses();
      setAddingLesson(null);
    } catch (err) {
      setError("Dars qo'shishda xato");
    }
  }

  async function handleDeleteLesson(lessonId: string) {
    if (!confirm("Darsni o'chirishni tasdiqlaysizmi?")) return;
    try {
      await deleteLesson(lessonId);
      await loadCourses();
    } catch (err) {
      setError("Dars o'chirishda xato");
    }
  }

  async function handleLogout() {
    await logoutAction();
  }

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Yuklanyapti...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black text-white">Admin CMS</span>
          </Link>
          <button onClick={handleLogout} className="text-slate-400 hover:text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400">
            {error}
          </div>
        )}

        <h1 className="text-4xl font-black text-white mb-8">
          Kurslarni <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Boshqarish</span>
        </h1>

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Course Header */}
              <div className="p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50" onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                  <p className="text-slate-400 text-sm">${course.price} | {course.modules?.length || 0} modul</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setEditingCourse(course.id); }} className="text-blue-400 hover:bg-blue-500/20 p-2 rounded-lg">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedCourse === course.id ? "rotate-180" : ""}`} />
                </div>
              </div>

              {/* Edit Form */}
              {editingCourse === course.id && (
                <CourseEditForm course={course} onSave={(updates: any) => { handleUpdateCourse(course.id, updates); }} onCancel={() => setEditingCourse(null)} />
              )}

              {/* Modules */}
              {expandedCourse === course.id && (
                <div className="border-t border-slate-800 p-6 space-y-4 bg-slate-900/50">
                  {course.modules?.map((module: any) => (
                    <div key={module.id} className="bg-slate-800/50 rounded-xl overflow-hidden">
                      <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800" onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}>
                        <div>
                          <h4 className="font-semibold text-white">{module.title}</h4>
                          <p className="text-xs text-slate-400">{module.lessons?.length || 0} dars</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(module.id); }} className="text-red-400 hover:bg-red-500/20 p-1.5 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${expandedModule === module.id ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {/* Lessons */}
                      {expandedModule === module.id && (
                        <div className="border-t border-slate-700 p-4 space-y-2 bg-slate-900/50">
                          {module.lessons?.map((lesson: any) => (
                            <LessonRow key={lesson.id} lesson={lesson} onDelete={() => handleDeleteLesson(lesson.id)} />
                          ))}
                          {addingLesson === module.id ? (
                            <AddLessonForm moduleId={module.id} onAdd={(title: string) => handleAddLesson(module.id, title)} onCancel={() => setAddingLesson(null)} />
                          ) : (
                            <button onClick={() => setAddingLesson(module.id)} className="w-full text-cyan-400 hover:bg-cyan-500/10 p-2 rounded text-sm font-bold flex items-center gap-2">
                              <Plus className="w-4 h-4" /> Dars qo'sh
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {addingModule === course.id ? (
                    <AddModuleForm courseId={course.id} onAdd={(title: string) => handleAddModule(course.id, title)} onCancel={() => setAddingModule(null)} />
                  ) : (
                    <button onClick={() => setAddingModule(course.id)} className="w-full text-blue-400 hover:bg-blue-500/10 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
                      <Plus className="w-4 h-4" /> Modul qo'sh
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseEditForm({ course, onSave, onCancel }: any) {
  const [formData, setFormData] = useState(course);

  return (
    <div className="border-t border-slate-800 p-6 bg-slate-900/50 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Sarlavha" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg" />
        <input type="number" placeholder="Narx USD" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg" />
        <input type="number" placeholder="Narx UZS" value={formData.priceUZS} onChange={(e) => setFormData({ ...formData, priceUZS: parseInt(e.target.value) })} className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg" />
        <input type="number" placeholder="Chegirma %" min="0" max="100" value={formData.discountPercent} onChange={(e) => setFormData({ ...formData, discountPercent: parseInt(e.target.value) })} className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg" />
      </div>
      <textarea placeholder="Tavsif" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg" rows={3} />
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-2">
          <X className="w-4 h-4" /> Bekor
        </button>
        <button onClick={() => onSave(formData)} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
          <Save className="w-4 h-4" /> Saqlash
        </button>
      </div>
    </div>
  );
}

function AddModuleForm({ courseId, onAdd, onCancel }: any) {
  const [title, setTitle] = useState("");
  return (
    <div className="bg-slate-800/50 rounded-xl p-3 flex gap-2">
      <input type="text" placeholder="Modul nomi..." value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded text-sm" />
      <button onClick={() => onAdd(title)} className="text-blue-400 hover:bg-blue-500/20 px-3 py-2 rounded font-bold text-sm">Qo'sh</button>
      <button onClick={onCancel} className="text-slate-400 hover:bg-slate-600 px-3 py-2 rounded text-sm">Bekor</button>
    </div>
  );
}

function AddLessonForm({ moduleId, onAdd, onCancel }: any) {
  const [title, setTitle] = useState("");
  return (
    <div className="bg-slate-700/50 rounded p-2 flex gap-2">
      <input type="text" placeholder="Dars nomi..." value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 bg-slate-600 border border-slate-500 text-white px-3 py-1 rounded text-xs" />
      <button onClick={() => onAdd(title)} className="text-cyan-400 hover:bg-cyan-500/20 px-2 py-1 rounded font-bold text-xs">Qo'sh</button>
      <button onClick={onCancel} className="text-slate-400 hover:bg-slate-600 px-2 py-1 rounded text-xs">Bekor</button>
    </div>
  );
}

function LessonRow({ lesson, onDelete }: any) {
  return (
    <div className="bg-slate-700/30 rounded p-3 flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-medium">{lesson.title}</p>
        <p className="text-xs text-slate-400">{lesson.duration}</p>
      </div>
      <button onClick={onDelete} className="text-red-400 hover:bg-red-500/20 p-1 rounded">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default CMSAdmin;
