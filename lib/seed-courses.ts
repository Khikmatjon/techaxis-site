import { prisma } from "@/lib/prisma";
import { COURSES as STATIC_COURSES } from "@/lib/courses";

export async function seedCourses() {
  try {
    for (const course of STATIC_COURSES) {
      const existing = await prisma.course.findUnique({
        where: { id: course.id },
      });

      if (!existing) {
        const created = await prisma.course.create({
          data: {
            id: course.id,
            title: course.title,
            subtitle: course.subtitle,
            description: course.description,
            price: course.price,
            priceUZS: course.priceUZS,
            thumbnail: course.thumbnail,
            instructor: course.instructor,
            instructorAvatar: course.instructorAvatar,
            level: course.level,
            duration: course.duration,
            studentsCount: course.studentsCount,
            rating: course.rating,
            tags: course.tags,
          },
        });

        for (const module of course.modules) {
          const moduleCreated = await prisma.module.create({
            data: {
              id: module.id,
              courseId: created.id,
              title: module.title,
            },
          });

          for (const lesson of module.lessons) {
            await prisma.lesson.create({
              data: {
                id: lesson.id,
                moduleId: moduleCreated.id,
                title: lesson.title,
                duration: lesson.duration,
                videoUrl: lesson.videoUrl,
                pdfUrl: lesson.pdfUrl,
                text: lesson.text,
                images: lesson.images || [],
                isFree: lesson.isFree,
              },
            });
          }
        }

        console.log(`✓ Course seeded: ${course.title}`);
      }
    }

    console.log("✓ All courses seeded successfully!");
  } catch (error) {
    console.error("Error seeding courses:", error);
    throw error;
  }
}
