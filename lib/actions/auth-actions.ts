"use server";

import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";
import { findUserByEmail, addUser } from "@/lib/users-db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Iltimos, barcha maydonlarni to'ldiring" };
    }

    const user = findUserByEmail(email);
    if (!user) {
      console.log("Foydalanuvchi topilmadi:", email);
      return { error: "Email yoki parol noto'g'ri" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hash);
    if (!isPasswordCorrect) {
      console.log("Parol mos kelmadi:", email);
      return { error: "Email yoki parol noto'g'ri" };
    }

    // Sessiya yaratish
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 soat
    const sessionData = {
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      expires
    };
    const session = await encrypt(sessionData);

    // Cooke o'rnatish
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "Iltimos, barcha maydonlarni to'ldiring" };
    }

    if (findUserByEmail(email)) {
      return { error: "Bu email yoki login bilan allaqachon ro'yxatdan o'tilgan" };
    }

    const newUser = addUser(name, email.toLowerCase(), password);
    if (!newUser) {
      return { error: "Ro'yxatdan o'tishda texnik xatolik yuz berdi" };
    }

    // Sessiya yaratish
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ 
      user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, 
      expires 
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, { 
      expires, 
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
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
