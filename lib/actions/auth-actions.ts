"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export async function loginAction(formData: FormData) {
  try {
    const emailRaw = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!emailRaw || !password) {
      return { error: "Iltimos, barcha maydonlarni to'ldiring" };
    }

    const email = emailRaw.trim();

    console.log("LOGIN_ATTEMPT:", { email });

    // Rate limiting: 5 urinishdan keyin 15 daqiqa blok
    const rateCheck = checkRateLimit(`login:${email}`);
    if (!rateCheck.allowed) {
      const minutes = Math.ceil((rateCheck.remainingMs || 0) / 60000);
      return { error: `Juda ko'p urinish. ${minutes} daqiqadan so'ng qayta urinib ko'ring.` };
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      console.warn("LOGIN_FAILED: User not found", email);
      return { error: "Email yoki parol noto'g'ri" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hash);
    if (!isPasswordCorrect) {
      console.warn("LOGIN_FAILED: Password mismatch", email);
      return { error: "Email yoki parol noto'g'ri" };
    }

    console.log("LOGIN_SUCCESS:", { id: user.id, role: user.role });
    
    // Muvaffaqiyatli kirishda rate limit tozalash
    resetRateLimit(`login:${email}`);

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 soat
    const session = await encrypt({
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      expires,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("LOGIN_ERROR:", error.message || error);
    return { error: "Tizimga kirishda kutilmagan xatolik yuz berdi" };
  }
}

export async function registerAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const emailRaw = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !emailRaw || !password) {
      return { error: "Iltimos, barcha maydonlarni to'ldiring" };
    }

    const email = emailRaw.trim().toLowerCase();

    console.log("REGISTER_ATTEMPT:", { name, email });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "Bu email bilan allaqachon ro'yxatdan o'tilgan" };
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hash,
        role: "student",
        enrolledCourses: [],
        pendingPayments: [],
      },
    });

    console.log("REGISTER_SUCCESS:", { id: newUser.id });

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({
      user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      expires,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error: any) {
    console.error("REGISTER_ERROR:", error.message || error);
    return { error: "Ro'yxatdan o'tishda kutilmagan xatolik yuz berdi" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/");
}
