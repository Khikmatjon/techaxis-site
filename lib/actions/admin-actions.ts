"use server";

import { get_session } from "@/lib/session";
import { getUsers, saveUsers, UserDB } from "@/lib/users-db";

export async function getAdminUsersAction() {
  const session = await get_session();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  // Filter students
  const users = getUsers().filter((u) => u.role === "student");
  return users;
}

export async function assignCourseAction(userId: string, courseId: string) {
  const session = await get_session();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    user.pendingPayments = user.pendingPayments.filter(id => id !== courseId);
    
    // To'lov holatini yangilash
    const payment = user.payments?.find(p => p.courseId === courseId && p.status === "pending");
    if (payment) {
      payment.status = "completed";
    }

    saveUsers(users);
  }

  return { success: true };
}
