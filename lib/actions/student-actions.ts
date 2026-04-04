"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { sendPaymentNotification } from "./send-telegram";
import { getCourseById } from "../courses";

export async function getStudentDashboardAction() {
  const session = await get_session();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { payments: true },
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function requestPaymentAction(
  courseId: string,
  plan: string,
  amount: number,
  method: string
) {
  const session = await get_session();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("User not found");

  const status = method === "visa" ? "completed" : "pending";

  // To'lov yaratish
  const payment = await prisma.payment.create({
    data: {
      courseId,
      plan,
      amount,
      method,
      status,
      userId: user.id,
    },
  });

  // Kursni ulash (visa bo'lsa darhol, boshqalarda pending)
  if (status === "completed") {
    if (!user.enrolledCourses.includes(courseId)) {
      await prisma.user.update({
        where: { id: user.id },
        data: { enrolledCourses: { push: courseId } },
      });
    }
  } else {
    if (!user.pendingPayments.includes(courseId) && !user.enrolledCourses.includes(courseId)) {
      await prisma.user.update({
        where: { id: user.id },
        data: { pendingPayments: { push: courseId } },
      });
    }
  }

  // Telegram xabarnoma
  const course = getCourseById(courseId);
  await sendPaymentNotification({
    userName: user.name,
    userEmail: user.email,
    courseTitle: course?.title || courseId,
    plan,
    amount,
    method,
    status,
  });

  return { success: true, paymentId: payment.id };
}

import { supabase } from "@/lib/supabase";

export async function submitPaymentProofAction(formData: FormData) {
  const paymentId = formData.get("paymentId") as string;
  const receiptFile = formData.get("receiptFile") as File;
  const session = await get_session();
  if (!session) throw new Error("Unauthorized");

  let receiptUrl = "";

  if (receiptFile && receiptFile.size > 0) {
    try {
      const ext = receiptFile.name.split('.').pop() || 'jpg';
      const fileName = `receipt-${paymentId}-${Date.now()}.${ext}`;
      
      const arrayBuffer = await receiptFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Supabase storagega yuklash
      const { data: uploadData, error } = await supabase.storage
        .from("receipts") // supabase dasbboarddan "receipts" nomli public bucket yaratish unutilmasin
        .upload(fileName, buffer, { contentType: receiptFile.type, upsert: true });

      if (!error && uploadData) {
        const { data: publicData } = supabase.storage.from("receipts").getPublicUrl(fileName);
        receiptUrl = publicData.publicUrl;
      } else {
        console.error("Supabase yuklash xatosi:", error);
      }
    } catch (err) {
      console.error("Faylni buferga o'tkazishda xato:", err);
    }
  }

  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { receiptUrl: receiptUrl || "Rasm joylanmadi" },
    include: { user: true },
  });

  // Telegram xabarnoma url bilan (Telegram avtomat rasmni ko'radi)
  const course = getCourseById(payment.courseId);
  await sendPaymentNotification({
    userName: payment.user.name,
    userEmail: payment.user.email,
    courseTitle: course?.title || payment.courseId,
    plan: payment.plan,
    amount: payment.amount,
    method: payment.method,
    status: payment.status,
    receiptUrl: receiptUrl || undefined,
  });

  return { success: true };
}
