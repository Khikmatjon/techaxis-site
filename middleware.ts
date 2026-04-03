import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// Himoyalangan yo'llar
const PROTECTED_ROUTES = ["/dashboard", "/checkout", "/admin"];
const ADMIN_ONLY_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Locale prefix ni olib tashlash (uz, ru, en)
  const pathWithoutLocale = pathname.replace(/^\/(uz|ru|en)/, "");

  const isProtected = PROTECTED_ROUTES.some((r) => pathWithoutLocale.startsWith(r));
  const isAdminOnly = ADMIN_ONLY_ROUTES.some((r) => pathWithoutLocale.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathWithoutLocale.startsWith(r));

  // Sessiyani o'qish
  const sessionCookie = request.cookies.get("session")?.value;
  let session: any = null;

  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
      // Muddati o'tgan sessiyani rad etish
      if (session?.expires && new Date(session.expires) < new Date()) {
        session = null;
      }
    } catch {
      session = null;
    }
  }

  // 1️⃣ Himoyalangan yo'llarga kirish tekshiruvi
  if (isProtected && !session) {
    const loginUrl = new URL(
      pathname.replace(/dashboard|checkout.*|admin/, "login"),
      request.url
    );
    loginUrl.searchParams.set("callback", pathname);
    const response = NextResponse.redirect(loginUrl);
    // Yaroqsiz cookie ni tozalash
    response.cookies.delete("session");
    return response;
  }

  // 2️⃣ Faqat admin uchun yo'llar
  if (isAdminOnly && session?.user?.role !== "admin") {
    const locale = pathname.match(/^\/(uz|ru|en)/)?.[1] || "uz";
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // 3️⃣ Tizimga kirgan foydalanuvchi /login yoki /register ga kirmasin
  if (isAuthRoute && session) {
    const locale = pathname.match(/^\/(uz|ru|en)/)?.[1] || "uz";
    if (session.user?.role === "admin") {
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // 4️⃣ Xavfsizlik headerlari — barcha javobga qo'shiladi
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

export const config = {
  matcher: [
    // API routes va static fayllardan tashqari hamma yo'l
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
