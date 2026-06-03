import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { COURSES } from "@/lib/courses";

export async function GET() {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try to fetch from database first (with timeout)
    try {
      const dbPromise = prisma.course.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 5000)
      );
      const courses = await Promise.race([dbPromise, timeoutPromise]) as any[];
      if (courses && courses.length > 0) {
        return NextResponse.json(courses);
      }
    } catch (dbError) {
      console.warn("DB unavailable, using fallback:", dbError);
    }

    // Fallback: return hardcoded courses with normalized fields
    const fallbackCourses = COURSES.map((c: any) => ({
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
      createdAt: new Date(),
    }));

    return NextResponse.json(fallbackCourses);
  } catch (error) {
    console.error("GET /api/admin/courses error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await get_session();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, subtitle, description, price, priceUZS, thumbnail, instructor, instructorAvatar, level, duration, tags } = body;

    if (!title || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        subtitle: subtitle || "",
        description: description || "",
        price,
        priceUZS: priceUZS || price * 12700,
        thumbnail: thumbnail || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        instructor: instructor || "TechAxis",
        instructorAvatar: instructorAvatar || "https://i.pravatar.cc/100?img=1",
        level: level || "Boshlang'ich",
        duration: duration || "0 soat",
        tags: tags || [],
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/courses error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
