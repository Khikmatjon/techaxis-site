import { prisma } from "@/lib/prisma";
import {
  COURSES as STATIC_COURSES,
  type Course,
  type Module,
  type Lesson,
  type MarketingData,
} from "@/lib/courses";

// Kurslarni sayt uchun BAZADAN o'qiydi (admin "Kurslar mazmuni" tabida
// tahrirlagani -- narx, daraja, instruktor, modul/darslar -- shu yerdan
// keladi va saytda darhol ko'rinadi).
//
// Marketing matni (kurs sahifasidagi "Nega bu kurs", syllabus bosqichlari,
// narxlash jadvali, FAQ) hali admin panelda tahrirlanmaydi -- CourseManager
// formasida bunday maydon yo'q -- shuning uchun hozircha eski statik
// fayldan (id bo'yicha) olinadi. Kurs bazada bor-u, mos statik yozuv
// bo'lmasa (masalan admin yangi kurs qo'shsa), bo'sh/umumiy marketing
// bilan almashtiriladi -- sahifa baribir ishlaydi, faqat o'sha qismlar
// bo'sh chiqadi.
const MARKETING_BY_ID = new Map(STATIC_COURSES.map((c) => [c.id, c.marketing]));

const EMPTY_MARKETING: MarketingData = {
  whyTitle: "",
  whyDesc: "",
  benefits: [],
  capabilitiesTitle: "",
  capabilities: [],
  stepsTitle: "",
  steps: [],
  outcomes: [],
  pricing: [],
  faq: [],
};

type DbCourse = Awaited<ReturnType<typeof fetchCourse>>;

function fetchCourse(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: { modules: { orderBy: { createdAt: "asc" }, include: { lessons: { orderBy: { createdAt: "asc" } } } } },
  });
}

function toCourse(row: NonNullable<DbCourse>): Course {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    price: row.price,
    priceUZS: row.priceUZS,
    thumbnail: row.thumbnail,
    instructor: row.instructor,
    instructorAvatar: row.instructorAvatar,
    level: row.level as Course["level"],
    duration: row.duration,
    studentsCount: row.studentsCount,
    rating: row.rating,
    tags: row.tags,
    marketing: MARKETING_BY_ID.get(row.id) ?? EMPTY_MARKETING,
    modules: row.modules.map(
      (m): Module => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map(
          (l): Lesson => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            videoUrl: l.videoUrl ?? undefined,
            pdfUrl: l.pdfUrl ?? undefined,
            text: l.text ?? undefined,
            images: l.images,
            isFree: l.isFree,
          })
        ),
      })
    ),
  };
}

// Baza vaqtincha ishlamasa (masalan ulanish uzilishi), sayt butunlay
// qulab tushmasligi uchun oxirgi ma'lum -- statik -- ro'yxatga tushadi
// (o'qish uchun, admin tahriri o'sha payt ko'rinmaydi, lekin sayt ishlayveradi).
export async function getCourses(): Promise<Course[]> {
  try {
    const rows = await prisma.course.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      include: { modules: { orderBy: { createdAt: "asc" }, include: { lessons: { orderBy: { createdAt: "asc" } } } } },
    });
    return rows.map(toCourse);
  } catch (err) {
    console.error("getCourses: DB unavailable, falling back to static courses", err);
    return STATIC_COURSES;
  }
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  try {
    const row = await fetchCourse(id);
    if (!row) return undefined;
    return toCourse(row);
  } catch (err) {
    console.error("getCourseById: DB unavailable, falling back to static courses", err);
    return STATIC_COURSES.find((c) => c.id === id);
  }
}

export async function getLessonById(
  courseId: string,
  lessonId: string
): Promise<{ lesson: Lesson; course: Course } | undefined> {
  const course = await getCourseById(courseId);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course };
  }
  return undefined;
}

// Sof funksiyalar -- DB kerak emas, Course obyektining o'zi ustida ishlaydi.
export { getTotalLessons, getFirstLesson } from "@/lib/courses";
export type { Course, Module, Lesson } from "@/lib/courses";
