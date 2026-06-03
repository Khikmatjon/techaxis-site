import { prisma } from "@/lib/prisma";

export async function getCoursesFromDB() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        modules: {
          include: { lessons: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses from DB:", error);
    return [];
  }
}

export async function getCourseByIdFromDB(id: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: { lessons: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    return course;
  } catch (error) {
    console.error("Error fetching course from DB:", error);
    return null;
  }
}

export async function getTotalLessonsFromDB(course: any): Promise<number> {
  return course.modules?.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0) || 0;
}

export async function getFirstLessonFromDB(course: any): Promise<any> {
  return course.modules?.[0]?.lessons?.[0];
}
