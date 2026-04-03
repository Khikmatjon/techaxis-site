import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'
import { decrypt } from './lib/session'

// MANA SHU YER O'ZGARTIRILDI (middleware o'rniga proxy yozildi)
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const cookie = req.cookies.get("session")?.value;

  // 1. Static fayllar bularni o'tkazamiz
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('.') || 
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // 2. Locale mavjudligini tekshiramiz
  const localeFromPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  const currentLocale = localeFromPath || defaultLocale;

  // 3. XIMMATLI QISM: AVTORIZATSIYA VA XAVFSIZLIK
  const protectedRoutes = ["/dashboard", "/admin", "/profile"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));

  if (isProtectedRoute) {
    if (!cookie) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url));
    }
    
    try {
      const session = await decrypt(cookie);
      // Admin sahifasida rolni tekshirish
      if (pathname.includes("/admin") && session?.user?.role !== "admin") {
         return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url));
    }
  }

  // 4. Redirect Locale if missing
  if (!localeFromPath) {
    req.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(req.nextUrl)
  }

  const response = NextResponse.next();
  // Xavfsizlik sarlavhalari (Security Headers)
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)'
  ]
}