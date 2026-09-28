"use server";

// Kurslarni "use client" sahifalar (kabinet, to'lov) uchun o'qish. Prisma'ni
// brauzerdan to'g'ridan-to'g'ri chaqirib bo'lmaydi, shuning uchun shu action'lar orqali.
//
// Pullik dars mazmuni (video, PDF, matn, rasmlar) FAQAT shu kursga yozilgan o'quvchi
// yoki adminga yuboriladi. Qolganlarga pullik dars faqat nomi va davomiyligi bilan
// boradi. Tekshiruv serverda: brauzerdagi "qulf" belgisi himoya emas -- action'ni
// har kim to'g'ridan-to'g'ri chaqira oladi.

import { getCourses, getCourseById, getLessonById } from "@/lib/courses-db";
import { get_session } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import type { Course, Lesson } from "@/lib/courses";

type Access = { admin: boolean; enrolled: Set<string> };

async function currentAccess(): Promise<Access> {
  const session = await get_session();
  if (!session?.user) return { admin: false, enrolled: new Set() };
  if (session.user.role === "admin") return { admin: true, enrolled: new Set() };
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { enrolledCourses: true },
    });
    return { admin: false, enrolled: new Set(user?.enrolledCourses ?? []) };
  } catch {
    // Baza vaqtincha ishlamasa -- xavfsiz tomonga: pullik mazmun berilmaydi.
    return { admin: false, enrolled: new Set() };
  }
}

const canOpen = (access: Access, courseId: string) => access.admin || access.enrolled.has(courseId);

// Pullik darsdan mazmunni olib tashlaydi: nomi, davomiyligi va "bepulmi" belgisi qoladi.
function locked(lesson: Lesson): Lesson {
  return { id: lesson.id, title: lesson.title, duration: lesson.duration, isFree: lesson.isFree };
}

function protect(course: Course, access: Access): Course {
  if (canOpen(access, course.id)) return course;
  return {
    ...course,
    modules: course.modules.map((m) => ({
      ...m,
      lessons: m.lessons.map((l) => (l.isFree ? l : locked(l))),
    })),
  };
}

export async function getCoursesAction() {
  const [courses, access] = await Promise.all([getCourses(), currentAccess()]);
  return courses.map((c) => protect(c, access));
}

export async function getCourseByIdAction(id: string) {
  const [course, access] = await Promise.all([getCourseById(id), currentAccess()]);
  return course ? protect(course, access) : course;
}

export async function getLessonByIdAction(courseId: string, lessonId: string) {
  const [result, access] = await Promise.all([getLessonById(courseId, lessonId), currentAccess()]);
  if (!result) return result;
  const open = canOpen(access, result.course.id) || result.lesson.isFree;
  return {
    lesson: open ? result.lesson : locked(result.lesson),
    course: protect(result.course, access),
  };
}
