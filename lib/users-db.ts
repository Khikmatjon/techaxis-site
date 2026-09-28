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
  method: string | "transfer" | "visa";
  status: string | "pending" | "completed" | "failed";
  createdAt: Date | string;
  receiptUrl?: string | null;
}

// Brauzerga yuboriladigan foydalanuvchi ma'lumoti. Parol xeshi (hash) bu yerda YO'Q va
// hech qachon brauzerga yuborilmaydi -- serverda lib/actions/*.ts dagi USER_PUBLIC_SELECT.
export interface UserDB {
  id: string;
  name: string;
  email: string;
  role: string | "student" | "admin";
  enrolledCourses: string[];
  pendingPayments: string[];
  payments?: PaymentRequest[];
}

// ⚠️ Bu fayl artiq asosan dashboard type import uchun ishlatiladi.
// Haqiqiy foydalanuvchilar Supabase'da → lib/prisma.ts orqali boshqariladi.
