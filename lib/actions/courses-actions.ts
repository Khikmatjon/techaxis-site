"use server";

// Kurslarni sayt uchun o'qish (ommaviy -- kurslar kataloги ochiq ma'lumot,
// admin tekshiruvi kerak emas, xuddi narx ko'rsatilgan sahifaga kirish kabi).
// "use client" komponentlar Prisma'ni to'g'ridan-to'g'ri chaqira olmaydi,
// shuning uchun bu ingichka wrapper orqali chaqirishadi.

import { getCourses, getCourseById, getLessonById } from "@/lib/courses-db";

export async function getCoursesAction() {
  return getCourses();
}

export async function getCourseByIdAction(id: string) {
  return getCourseById(id);
}

export async function getLessonByIdAction(courseId: string, lessonId: string) {
  return getLessonById(courseId, lessonId);
}
