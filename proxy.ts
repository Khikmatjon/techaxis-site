import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'
import { decrypt } from './lib/session'

// Content-Security-Policy: brauzerga sayt qaysi manbalardan skript, rasm, ramka yuklashi mumkinligini aytadi.
// Saytning haqiqiy tashqi manbalari: YouTube (darslik videosi va eskiz rasmi), Unsplash rasmlari,
// Supabase (to'lov cheklari rasmi). Boshqasi kerak bo'lsa shu yerga qo'shiladi.
// - img-src https: -- admin panelda kurs/blog rasmi uchun istalgan https manzil qo'yilishi mumkin
//   (rasm orqali xavf yo'q; skript, ramka va ulanishlar esa qat'iy cheklangan).
// - 'unsafe-inline' (skript/uslub) -- Next.js o'zining inline skriptlarini shunday ishlatadi; nonce
//   sahifalarni statik keshdan chiqarib yuborardi.
// - frame-src: lesson.videoUrl da YouTube'dan boshqa https embed (masalan Vimeo) ham qo'yilishi mumkin.
// Faqat production'da yoqiladi (next dev eval ishlatadi).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://youtube-nocookie.com https://www.youtube.com https://player.vimeo.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

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
  // Sayt kamera, mikrofon, joylashuv, to'lov API va USB'dan foydalanmaydi: brauzerda yopiq.
  // (autoplay/fullscreen yopilmaydi: YouTube darsliklari ularni ishlatadi.)
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()");
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Content-Security-Policy", CSP);
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)'
  ]
}