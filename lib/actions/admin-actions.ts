"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";

import { unstable_noStore as noStore } from "next/cache";

export async function getAdminUsersAction() {
  noStore();
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

  import("next/cache").then(mod => mod.revalidatePath("/", "layout"));
  return { success: true };
}

export async function rejectCourseAction(userId: string, courseId: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  if (user.pendingPayments.includes(courseId)) {
    await prisma.user.update({
      where: { id: userId },
      data: { pendingPayments: user.pendingPayments.filter((id: string) => id !== courseId) },
    });
  }

  await prisma.payment.updateMany({
    where: { userId, courseId, status: "pending" },
    data: { status: "failed" },
  });

  import("next/cache").then(mod => mod.revalidatePath("/", "layout"));
  return { success: true };
}

export async function getAdminStatsAction() {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  const [totalUsers, totalPayments, pendingPayments, revenueResult] = await Promise.all([
    prisma.user.count({ where: { role: "student" } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: "pending" } }),
    prisma.payment.aggregate({ where: { status: "completed" }, _sum: { amount: true } }),
  ]);

  return {
    totalUsers,
    totalPayments,
    pendingPayments,
    totalRevenue: revenueResult._sum.amount ?? 0,
  };
}
