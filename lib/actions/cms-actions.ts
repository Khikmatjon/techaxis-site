"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { locales } from "@/lib/i18n";
import { COURSES } from "@/lib/courses";

// Admin bu yerda o'zgartirsa, ommaviy kurs sahifalari (bosh sahifa, katalog,
// alohida kurs) darhol yangi ma'lumotni ko'rsatishi uchun keshni yangilaydi.
function refreshPublicCoursePages(courseId?: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/courses`);
    revalidatePath(`/${locale}/training`);
    if (courseId) revalidatePath(`/${locale}/courses/${courseId}`);
  }
}

// Server Actions for the Admin CMS read path.
// We use Server Actions (not Route Handlers) because the /api/admin/* route
// handlers never reach the serverless function on production (requests hang
// client-side with no log entry). Server Actions use the page's POST transport,
// which is confirmed working.

function fallbackCourses() {
  return COURSES.map((c: any) => ({
    id: c.id,
    title: c.title,
    subtitle: c.subtitle || "",
    description: c.description || "",
    price: c.price || 0,
    priceUZS: c.priceUZS || 0,
    discountPercent: c.marketing?.discountPercent || 0,
    thumbnail: c.thumbnail || "",
    instructor: c.instructor || "TechAxis",
    level: c.level || "Boshlang'ich",
    duration: c.duration || "",
    tags: c.tags || [],
    isActive: true,
  }));
}

export async function getAdminCoursesAction() {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  try {
    const dbPromise = prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000));
    const courses = (await Promise.race([dbPromise, timeout])) as any[];
    if (courses && courses.length > 0) return courses;
  } catch (e) {
    console.warn("CMS courses DB unavailable, using fallback");
  }

  return fallbackCourses();
}

export async function getAdminModulesAction(courseId: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  try {
    const dbPromise = prisma.module.findMany({
      where: { courseId },
      orderBy: { createdAt: "asc" },
    });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000));
    const modules = (await Promise.race([dbPromise, timeout])) as any[];
    if (modules && modules.length > 0) return modules;
  } catch (e) {
    console.warn("CMS modules DB unavailable, using fallback");
  }

  const course = COURSES.find((c) => c.id === courseId);
  return (course?.modules || []).map((m: any) => ({
    id: m.id,
    title: m.title,
    courseId,
  }));
}

export async function getAdminLessonsAction(moduleId: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  try {
    const dbPromise = prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { createdAt: "asc" },
    });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000));
    const lessons = (await Promise.race([dbPromise, timeout])) as any[];
    if (lessons && lessons.length > 0) return lessons;
  } catch (e) {
    console.warn("CMS lessons DB unavailable, using fallback");
  }

  for (const course of COURSES) {
    const module = course.modules.find((m: any) => m.id === moduleId);
    if (module) {
      return (module.lessons || []).map((l: any) => ({
        id: l.id,
        title: l.title,
        duration: l.duration || "0:00",
        videoUrl: l.videoUrl || null,
        pdfUrl: l.pdfUrl || null,
        text: l.text || null,
        images: l.images || [],
        isFree: l.isFree || false,
        moduleId,
      }));
    }
  }
  return [];
}

// ---------------------------------------------------------------------------
// WRITE actions. These persist to the DB. They require the Course/Module/Lesson
// tables to exist and be seeded (done via `prisma db push` + lib/seed-courses).
// ---------------------------------------------------------------------------

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");
}

function toInt(v: any, fallback = 0) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function updateCourseAction(id: string, data: any) {
  await requireAdmin();
  const clean = {
    title: data.title,
    subtitle: data.subtitle ?? undefined,
    description: data.description ?? undefined,
    price: toInt(data.price),
    priceUZS: toInt(data.priceUZS),
    discountPercent: toInt(data.discountPercent),
  };
  const course = await prisma.course.update({ where: { id }, data: clean });
  refreshPublicCoursePages(id);
  return course;
}

export async function deleteCourseAction(id: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id } });
  refreshPublicCoursePages(id);
  return { success: true };
}

export async function createModuleAction(courseId: string, title: string) {
  await requireAdmin();
  if (!title) throw new Error("Title required");
  const mod = await prisma.module.create({ data: { courseId, title } });
  refreshPublicCoursePages(courseId);
  return mod;
}

export async function updateModuleAction(id: string, data: any) {
  await requireAdmin();
  const mod = await prisma.module.update({ where: { id }, data: { title: data.title } });
  refreshPublicCoursePages(mod.courseId);
  return mod;
}

export async function deleteModuleAction(id: string) {
  await requireAdmin();
  const mod = await prisma.module.delete({ where: { id } });
  refreshPublicCoursePages(mod.courseId);
  return { success: true };
}

export async function createLessonAction(moduleId: string, data: any) {
  await requireAdmin();
  if (!data?.title) throw new Error("Title required");
  const lesson = await prisma.lesson.create({
    data: {
      moduleId,
      title: data.title,
      duration: data.duration || "0:00",
      videoUrl: data.videoUrl || null,
      pdfUrl: data.pdfUrl || null,
      text: data.text || null,
      images: data.images || [],
      isFree: !!data.isFree,
    },
    include: { module: true },
  });
  refreshPublicCoursePages(lesson.module.courseId);
  return lesson;
}

export async function updateLessonAction(id: string, data: any) {
  await requireAdmin();
  const clean = {
    title: data.title,
    duration: data.duration,
    videoUrl: data.videoUrl ?? null,
    pdfUrl: data.pdfUrl ?? null,
    text: data.text ?? null,
    isFree: !!data.isFree,
  };
  const lesson = await prisma.lesson.update({ where: { id }, data: clean, include: { module: true } });
  refreshPublicCoursePages(lesson.module.courseId);
  return lesson;
}

export async function deleteLessonAction(id: string) {
  await requireAdmin();
  const lesson = await prisma.lesson.delete({ where: { id }, include: { module: true } });
  refreshPublicCoursePages(lesson.module.courseId);
  return { success: true };
}
