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
    pathname === '/favicon.ico' ||
    // Next.js ikonka yo'li (app/apple-icon.tsx) -- nuqtasiz, til prefiksisiz
    pathname.startsWith('/apple-icon')
  ) {
    return NextResponse.next()
  }

  // 2. Locale mavjudligini tekshiramiz
  const localeFromPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  const currentLocale = localeFromPath || defaultLocale;

  // 3. AVTORIZATSIYA: faqat kirgan foydalanuvchilar uchun bo'limlar.
  // Til prefiksidan keyingi BIRINCHI segment tekshiriladi (/uz/admin/... -> "admin").
  // Avval pathname.includes("/admin") edi -- /uz/blog/admin-... kabi maqola ham login so'rardi.
  const rest = localeFromPath ? pathname.slice(localeFromPath.length + 1) : pathname;
  const section = rest.split('/')[1] ?? '';
  const isAdminSection = section === 'admin' || section === 'admin-cms';
  // checkout ham shu yerda: kirmagan foydalanuvchi sahifada 500 xato ko'rmasdan, darhol
  // login'ga (keyin shu sahifaga qaytish manzili bilan) yuboriladi.
  const isProtectedRoute = isAdminSection || section === 'dashboard' || section === 'checkout';

  if (isProtectedRoute) {
    const loginUrl = new URL(`/${currentLocale}/login`, req.url);
    if (section === 'checkout') loginUrl.searchParams.set('callback', `/${currentLocale}${rest}`);

    if (!cookie) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = await decrypt(cookie);
      // Admin bo'limida rolni tekshirish
      if (isAdminSection && session?.user?.role !== "admin") {
         return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, req.url));
      }
    } catch (e) {
      return NextResponse.redirect(loginUrl);
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