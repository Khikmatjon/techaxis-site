"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { sendPaymentNotification } from "@/lib/telegram";
import { sendEnrollmentNotificationEmail } from "../email";
import { getCourseById } from "../courses-db";
import { USER_PUBLIC_SELECT } from "../user-select";

// Hozircha yagona to'lov usuli -- karta orqali o'tkazma (chek yuklanadi, admin tasdiqlaydi).
const ALLOWED_METHODS = ["transfer"];
const RECEIPT_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;

export async function getStudentDashboardAction() {
  const session = await get_session();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: USER_PUBLIC_SELECT, // parol xeshisiz
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
  // Xatolar `throw` bilan emas, `{ success: false, error }` bilan qaytariladi: production'da
  // Next.js server action'dan otilgan xato matnini brauzerga bermaydi, o'quvchi faqat
  // "Xatolik yuz berdi" ni ko'radi va nima qilishni bilmaydi.
  const fail = (error: string) => ({ success: false as const, error });

  const session = await get_session();
  if (!session) return fail("Avval saytga kiring");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return fail("Avval saytga kiring");

  // Brauzerdan kelgan qiymatlarga ishonilmaydi -- har biri serverda tekshiriladi.
  if (!ALLOWED_METHODS.includes(method)) return fail("Bu to'lov usuli hozircha mavjud emas");
  if (typeof plan !== "string" || !plan.trim() || plan.length > 40) return fail("Tarif noto'g'ri");
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) return fail("Summa noto'g'ri");
  if (!(await getCourseById(courseId))) return fail("Kurs topilmadi");
  if (user.enrolledCourses.includes(courseId)) return fail("Bu kurs sizda allaqachon ochiq");

  // Onlayn to'lov tizimi yo'q: har qanday to'lov chek yuklanib, admin tasdiqlaguncha
  // "pending" turadi. (Avval method === "visa" bo'lsa kurs darhol, pulsiz ochilardi --
  // usul brauzerdan kelgani uchun buni istalgan foydalanuvchi qilishi mumkin edi.)
  const status = "pending";

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

  // Kurs admin to'lovni tasdiqlaganda ochiladi (admin-actions -> assignCourseAction).
  if (!user.pendingPayments.includes(courseId)) {
    await prisma.user.update({
      where: { id: user.id },
      data: { pendingPayments: { push: courseId } },
    });
  }

  // Telegram va email xabarnoma
  const course = await getCourseById(courseId);
  const notifyData = {
    userName: user.name,
    userEmail: user.email,
    courseTitle: course?.title || courseId,
    plan,
    amount,
    method,
    status,
  };
  await Promise.all([
    sendPaymentNotification(notifyData),
    sendEnrollmentNotificationEmail(notifyData),
  ]);

  return { success: true as const, paymentId: payment.id };
}

import { supabase } from "@/lib/supabase";

export async function submitPaymentProofAction(formData: FormData) {
  const paymentId = formData.get("paymentId") as string;
  const receiptFile = formData.get("receiptFile") as File;
  // requestPaymentAction dagi kabi: xato matni o'quvchiga yetishi uchun qaytariladi.
  const fail = (error: string) => ({ success: false as const, error });

  const session = await get_session();
  if (!session) return fail("Avval saytga kiring");

  // To'lov shu foydalanuvchiniki bo'lishi shart (boshqa odamning to'loviga chek
  // qo'yib bo'lmasin).
  const own = await prisma.payment.findUnique({ where: { id: paymentId }, select: { userId: true } });
  if (!own || own.userId !== session.user.id) return fail("To'lov topilmadi");

  // Chek: faqat rasm yoki PDF, 5 MB gacha. Kengaytma fayl nomidan emas, turidan olinadi.
  if (receiptFile && receiptFile.size > 0) {
    const ext = RECEIPT_TYPES[receiptFile.type];
    if (!ext) return fail("Chek rasm (JPG, PNG, WEBP) yoki PDF bo'lishi kerak");
    if (receiptFile.size > MAX_RECEIPT_BYTES) return fail("Chek hajmi 5 MB dan oshmasin");
  }

  let receiptUrl = "";

  if (receiptFile && receiptFile.size > 0) {
    try {
      const ext = RECEIPT_TYPES[receiptFile.type];
      const fileName = `receipt-${paymentId}-${Date.now()}.${ext}`;
      
      const arrayBuffer = await receiptFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Supabase storagega yuklash
      const { data: uploadData, error } = await supabase.storage
        .from("receipts") // supabase dasbboarddan "receipts" nomli public bucket yaratish unutilmasin
        .upload(fileName, buffer, { contentType: receiptFile.type, upsert: false });

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

  // Telegram va email xabarnoma (chek url bilan)
  const course = await getCourseById(payment.courseId);
  const notifyData = {
    userName: payment.user.name,
    userEmail: payment.user.email,
    courseTitle: course?.title || payment.courseId,
    plan: payment.plan,
    amount: payment.amount,
    method: payment.method,
    status: payment.status,
    receiptUrl: receiptUrl || undefined,
  };
  await Promise.all([
    sendPaymentNotification(notifyData),
    sendEnrollmentNotificationEmail(notifyData),
  ]);

  return { success: true as const };
}
