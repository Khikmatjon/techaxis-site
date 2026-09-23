"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { sendEmail } from "@/lib/email";

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

// Admin o'quvchiga saytdan to'g'ridan-to'g'ri email yozadi (Zoho Mail orqali).
export async function sendEmailToUserAction(userId: string, subject: string, message: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") throw new Error("Unauthorized");

  if (!subject?.trim() || !message?.trim()) {
    return { success: false, error: "Mavzu va xabar matni to'ldirilishi shart" };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
      <p>Assalomu alaykum, ${user.name}!</p>
      <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
      <p style="color:#999; font-size:12px; margin-top:24px;">TechAxis Group</p>
    </div>
  `;

  const result = await sendEmail({ to: user.email, subject, html });
  if (!result.success) {
    return { success: false, error: "Email yuborilmadi. Server sozlamalarini tekshiring (ZOHO_EMAIL / ZOHO_APP_PASSWORD)." };
  }
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
