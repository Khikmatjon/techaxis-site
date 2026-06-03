"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { COURSES } from "@/lib/courses";

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
