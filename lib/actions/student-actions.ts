"use server";

import { get_session } from "@/lib/session";
import { getUsers, saveUsers } from "@/lib/users-db";
import { sendPaymentNotification } from "./send-telegram";
import { getCourseById } from "../courses";

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

export async function requestPaymentAction(courseId: string, plan: string, amount: number, method: string) {
  const session = await get_session();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const users = getUsers();
  const user = users.find((u) => u.id === session.user.id);
  
  if (!user) {
    throw new Error("User not found");
  }

  // To'lov ob'ektini yaratish
  const newPayment = {
    id: `pay-${Date.now()}`,
    courseId,
    plan,
    amount,
    method: method as any,
    status: (method === "visa" ? "completed" : "pending") as "completed" | "pending", 
    createdAt: new Date().toISOString()
  };

  if (!user.payments) user.payments = [];
  user.payments.push(newPayment);

  // Agar to'lov yakunlangan bo'lsa (simulyatsiya)
  if (newPayment.status === "completed") {
    if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
    }
  } else {
    // Agar kutilayotgan bo'lsa
    if (!user.pendingPayments.includes(courseId) && !user.enrolledCourses.includes(courseId)) {
        user.pendingPayments.push(courseId);
    }
  }

  saveUsers(users);

  // Telegram bildirishnomasi
  const course = getCourseById(courseId);
  await sendPaymentNotification({
    userName: user.name,
    userEmail: user.email,
    courseTitle: course?.title || courseId,
    plan,
    amount,
    method,
    status: newPayment.status
  });

  return { success: true, paymentId: newPayment.id };
}

export async function submitPaymentProofAction(paymentId: string, receiptUrl: string) {
  const session = await get_session();
  if (!session) throw new Error("Unauthorized");

  const users = getUsers();
  const user = users.find((u) => u.id === session.user.id);
  if (!user) throw new Error("User not found");

  const payment = user.payments?.find(p => p.id === paymentId);
  if (payment) {
    payment.receiptUrl = receiptUrl;
    saveUsers(users);

    // Telegram bildirishnomasi (Chek yuklanganda)
    const course = getCourseById(payment.courseId);
    await sendPaymentNotification({
        userName: user.name,
        userEmail: user.email,
        courseTitle: course?.title || payment.courseId,
        plan: payment.plan,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        receiptUrl: receiptUrl
    });

    return { success: true };
  }

  return { success: false };
}
