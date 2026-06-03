import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { COURSES } from "@/lib/courses";

export async function GET(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleId } = await params;

    try {
      const dbPromise = prisma.lesson.findMany({
        where: { moduleId },
        orderBy: { createdAt: "asc" },
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 5000)
      );
      const lessons = await Promise.race([dbPromise, timeoutPromise]) as any[];
      if (lessons && lessons.length > 0) {
        return NextResponse.json(lessons);
      }
    } catch (dbError) {
      console.warn("DB unavailable for lessons, using fallback");
    }

    // Fallback
    for (const course of COURSES) {
      const module = course.modules.find((m: any) => m.id === moduleId);
      if (module) {
        const fallbackLessons = (module.lessons || []).map((l: any) => ({
          id: l.id,
          title: l.title,
          duration: l.duration || "0:00",
          videoUrl: l.videoUrl || null,
          pdfUrl: l.pdfUrl || null,
          text: l.text || null,
          images: l.images || [],
          isFree: l.isFree || false,
          moduleId,
          createdAt: new Date(),
        }));
        return NextResponse.json(fallbackLessons);
      }
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error("GET lessons error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleId } = await params;
    const body = await req.json();
    const { title, duration } = body;

    if (!title) {
      return NextResponse.json({ error: "Title required" }, { status: 400 });
    }

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        duration: duration || "00:00",
        videoUrl: body.videoUrl || null,
        pdfUrl: body.pdfUrl || null,
        text: body.text || null,
        images: body.images || [],
        isFree: body.isFree || false,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("POST lesson error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
