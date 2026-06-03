import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { COURSES } from "@/lib/courses";

export async function GET(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await params;

    try {
      const dbPromise = prisma.module.findMany({
        where: { courseId },
        orderBy: { createdAt: "asc" },
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 5000)
      );
      const modules = await Promise.race([dbPromise, timeoutPromise]) as any[];
      if (modules && modules.length > 0) {
        return NextResponse.json(modules);
      }
    } catch (dbError) {
      console.warn("DB unavailable for modules, using fallback");
    }

    // Fallback
    const course = COURSES.find((c) => c.id === courseId);
    const fallbackModules = (course?.modules || []).map((m: any) => ({
      id: m.id,
      title: m.title,
      courseId,
      createdAt: new Date(),
    }));
    return NextResponse.json(fallbackModules);
  } catch (error) {
    console.error("GET modules error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await params;
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title required" }, { status: 400 });
    }

    const module = await prisma.module.create({
      data: {
        courseId,
        title,
      },
      include: { lessons: true },
    });

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("POST modules error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
