"use server";

import { get_session } from "@/lib/session";
import { getUsers, saveUsers } from "@/lib/users-db";

export async function getStudentDashboardAction() {
  const session = await get_session();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const users = getUsers();
  const user = users.find((u) => u.id === session.user.id);
  
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function requestPaymentAction(courseId: string) {
  const session = await get_session();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const users = getUsers();
  const user = users.find((u) => u.id === session.user.id);
  
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.pendingPayments.includes(courseId) && !user.enrolledCourses.includes(courseId)) {
    user.pendingPayments.push(courseId);
    saveUsers(users);
  }

  return { success: true };
}
