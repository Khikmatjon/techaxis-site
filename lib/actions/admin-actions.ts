"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";

export async function getAdminUsersAction() {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  const users = await prisma.user.findMany({
    where: { role: "student" },
    include: { payments: true },
    orderBy: { createdAt: "desc" },
  });

  return users;
}

export async function assignCourseAction(userId: string, courseId: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const updates: any = {};

  // Kursni ochish
  if (!user.enrolledCourses.includes(courseId)) {
    updates.enrolledCourses = [...user.enrolledCourses, courseId];
  }

  // Pending dan olib tashlash
  if (user.pendingPayments.includes(courseId)) {
    updates.pendingPayments = user.pendingPayments.filter((paymentId: string) => paymentId !== courseId);
  }

  if (Object.keys(updates).length > 0) {
    await prisma.user.update({ where: { id: userId }, data: updates });
  }

  // To'lov holatini yangilash
  await prisma.payment.updateMany({
    where: { userId, courseId, status: "pending" },
    data: { status: "completed" },
  });

  import("next/cache").then(mod => mod.revalidatePath("/", "layout")); // Revalidate the whole layout
  return { success: true };
}
