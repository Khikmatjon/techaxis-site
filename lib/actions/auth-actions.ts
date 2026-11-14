"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { encrypt, get_session } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { LIMITS, blockedFor, clearLimit, clientIp, hashKey, hit, tooMany } from "@/lib/rate-limit";

// Foydalanuvchi topilmaganda ham parol tekshiruvi bajariladi (bir xil vaqt): javob tezligidan
// "bu email ro'yxatdan o'tganmi" degan xulosa chiqarib bo'lmasin. Hech kimning paroli emas.
const DUMMY_HASH = "$2b$10$/xp9RKMXVHLa3ULFdVGeoOx3Er3wTb36zFdsMpdwBWxWMHBvm7OP.";

const MIN_PASSWORD = 8;
// Oddiy tekshiruv: bitta @, oldi-orqasida bo'sh joysiz matn va nuqtali domen.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function loginAction(formData: FormData) {
  try {
    const emailRaw = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!emailRaw || !password) {
      return { error: "Iltimos, barcha maydonlarni to'ldiring" };
    }

    const email = emailRaw.trim();

    // Cheklov: bitta email uchun 5 ta, bitta IP uchun 30 ta xato urinishdan keyin 15 daqiqa blok.
    // Hisob bazada yuritiladi (lib/rate-limit.ts); email/IP hash ko'rinishida saqlanadi.
    const emailKey = hashKey("login-email", email.toLowerCase());
    const ipKey = hashKey("login-ip", await clientIp());
    const wait = Math.max(await blockedFor(emailKey, LIMITS.loginEmail), await blockedFor(ipKey, LIMITS.loginIp));
    if (wait > 0) return { error: tooMany(wait) };
    const failed = async () => {
      await hit(emailKey, LIMITS.loginEmail);
      await hit(ipKey, LIMITS.loginIp);
    };

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      await bcrypt.compare(password, DUMMY_HASH);
      await failed();
      console.warn("LOGIN_FAILED: user not found");
      return { error: "Email yoki parol noto'g'ri" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hash);
    if (!isPasswordCorrect) {
      await failed();
      console.warn("LOGIN_FAILED: password mismatch", { id: user.id });
      return { error: "Email yoki parol noto'g'ri" };
    }

    console.log("LOGIN_SUCCESS:", { id: user.id, role: user.role });

    // Muvaffaqiyatli kirishda shu emailning xato hisobi tozalanadi
    await clearLimit(emailKey);

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

    // Maxfiylik siyosati va shartlarga rozilik majburiy -- faqat brauzerdagi
    // checkboxga ishonmaymiz, to'g'ridan-to'g'ri so'rov bilan chetlab o'tilmasin.
    if (formData.get("consent") !== "true") {
      return { error: "Ro'yxatdan o'tish uchun maxfiylik siyosati va foydalanish shartlariga rozilik bildiring" };
    }

    const email = emailRaw.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) return { error: "Email noto'g'ri kiritilgan" };
    if (name.trim().length < 2 || name.length > 80) return { error: "Ismni to'g'ri kiriting" };
    if (password.length < MIN_PASSWORD) return { error: `Parol kamida ${MIN_PASSWORD} ta belgidan iborat bo'lsin` };

    // Ommaviy ro'yxatdan o'tish (bot) urinishlarini cheklash: bitta IP'dan soatiga 20 ta.
    const regKey = hashKey("register-ip", await clientIp());
    const regWait = await blockedFor(regKey, LIMITS.register);
    if (regWait > 0) return { error: tooMany(regWait) };
    await hit(regKey, LIMITS.register);

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

// Joriy sessiya foydalanuvchisini qaytaradi (id, email, role, name) yoki null.
// Navbar buni `/api/auth/session` route handler o'rniga ishlatadi, chunki
// bu deploymentda route handler'lar javob bermaydi (osilib qoladi).
export async function getCurrentUserAction() {
  const session = await get_session();
  if (!session || !session.user) return null;
  return session.user;
}

export async function updateUserCredentialsAction(formData: FormData) {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return { error: "Iltimos, tizimga qayta kiring" };

    const session = await get_session();
    if (!session) return { error: "Sessiya yaroqsiz" };

    const currentPassword = formData.get("currentPassword") as string;
    const newEmailRaw = formData.get("newEmail") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword || !newEmailRaw || !newPassword) {
      return { error: "Barcha maydonlarni to'ldiring" };
    }

    const newEmail = newEmailRaw.trim().toLowerCase();
    if (!EMAIL_RE.test(newEmail)) return { error: "Email noto'g'ri kiritilgan" };
    if (newPassword.length < MIN_PASSWORD) return { error: `Yangi parol kamida ${MIN_PASSWORD} ta belgidan iborat bo'lsin` };

    // Joriy parol shart: ochiq qolgan kompyuterda yoki o'g'irlangan sessiya bilan
    // boshqa odam email va parolni almashtirib, akkauntni egallab olmasin. Joriy parolni
    // cheksiz taxmin qilib bo'lmasligi uchun xato urinishlar ham cheklanadi (5 ta / 15 daqiqa).
    const credKey = hashKey("credentials", String(session.user.id));
    const credWait = await blockedFor(credKey, LIMITS.credentials);
    if (credWait > 0) return { error: tooMany(credWait) };
    const me = await prisma.user.findUnique({ where: { id: session.user.id }, select: { hash: true } });
    if (!me || !(await bcrypt.compare(currentPassword, me.hash))) {
      await hit(credKey, LIMITS.credentials);
      return { error: "Joriy parol noto'g'ri" };
    }
    await clearLimit(credKey);

    // Check if new email is taken by another user
    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing && existing.id !== session.user.id) {
      return { error: "Ushbu email allaqachon band qilingan" };
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: newEmail, hash },
    });

    // Avtomatik tizimdan chiqaramiz (xavfsizlik uchun qayta login qilishni talab qiladi)
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });

    return { success: true };
  } catch (error: any) {
    console.error("CREDENTIAL_UPDATE_ERROR:", error.message || error);
    return { error: "Xatolik yuz berdi" };
  }
}
