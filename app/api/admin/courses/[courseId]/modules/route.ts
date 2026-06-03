import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await params;
    const modules = await prisma.module.findMany({
      where: { courseId },
      include: { lessons: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(modules);
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
