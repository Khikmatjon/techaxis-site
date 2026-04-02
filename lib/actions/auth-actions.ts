"use server";

import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";
import { findUserByEmail, addUser } from "@/lib/users-db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = findUserByEmail(email);
  if (!user) return { error: "Email yoki parol noto'g'ri" };

  const isPasswordCorrect = await bcrypt.compare(password, user.hash);
  if (!isPasswordCorrect) return { error: "Email yoki parol noto'g'ri" };

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
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (findUserByEmail(email)) return { error: "Bu email bilan allaqachon ro'yxatdan o'tilgan" };

  const newUser = addUser(name, email, password);
  if (!newUser) return { error: "Ro'yxatdan o'tishda xatolik yuz berdi" };

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
    path: "/"
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/");
}
