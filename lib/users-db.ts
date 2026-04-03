import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// ESLATMA: Bu fayl endi FAQAT eski Next.js static build (pre-Supabase) uchun  
// qoldirilgan — haqiqiy DB da Prisma ishlatiladi.
// Bu faylga hech qachon parol yoki token yozmang!

export interface PaymentRequest {
  id: string;
  courseId: string;
  plan: string;
  amount: number;
  method: "transfer" | "visa";
  status: "pending" | "completed" | "failed";
  createdAt: string;
  receiptUrl?: string;
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  hash: string;
  role: "student" | "admin";
  enrolledCourses: string[];
  pendingPayments: string[];
  payments?: PaymentRequest[];
}

// ⚠️ Bu fayl artiq asosan dashboard type import uchun ishlatiladi.
// Haqiqiy foydalanuvchilar Supabase'da → lib/prisma.ts orqali boshqariladi.
