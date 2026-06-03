import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleId } = await params;
    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(lessons);
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
