# Saytda nimani qayerda o'zgartirish mumkin

Keyin to'ldirilishi kerak bo'lgan barcha joylar kodda **`KEYIN-TOLDIRING`** so'zi bilan belgilangan.
Loyihada shu so'zni qidirsangiz (VS Code: `Ctrl+Shift+F`), hammasi chiqadi.

## 1. Admin panelda (kod kerak emas, saytda darhol yangilanadi)

`techaxis.uz/uz/admin`

| Nima | Qaysi tab |
|---|---|
| Kurs narxi, chegirma, tavsif, modul va darslar | Kurslar mazmuni |
| Bosh sahifadagi raqamlar (mijozlar, hamkorlar, loyihalar) | Statistika |
| Blog, faktlar, yangiliklar | Blog va yangiliklar |
| O'quvchiga kurs berish, to'lovni tasdiqlash, email yozish | O'quvchilar va to'lovlar |

## 2. Kodda — sozlamalar va matnlar

| Nima | Fayl |
|---|---|
| Telefon, email, manzil | `config/site.ts` |
| Yuridik shaxs nomi | `config/site.ts` → `LEGAL_ENTITY` |
| Ijtimoiy tarmoqlar (YouTube, Instagram, LinkedIn, Telegram bot) | `config/site.ts` → `SITE_SOCIAL` |
| To'lov kartasi raqami va egasi | `config/site.ts` → `PAYMENT_CARD` |
| Maxfiylik siyosati (3 tilda) | `content/maxfiylik-siyosati.ts` |
| Foydalanish shartlari, pulni qaytarish (3 tilda) | `content/foydalanish-shartlari.ts` |
| Menyu, bosh sahifa, xizmatlar, footer va boshqa sayt matnlari | `locales/uz.json`, `locales/ru.json`, `locales/en.json` (uchala tilni birga o'zgartiring) |
| Kurs sahifasidagi batafsil matn (Nega bu kurs, dastur, tariflar jadvali, FAQ) | `lib/courses.ts` |
| To'lov sahifasidagi tariflar (Starter/Pro/Mentor narxi) | `app/[locale]/checkout/[courseId]/page.tsx` |

## 3. Maxfiy kalitlar — faqat Vercel'da

Zoho Mail, Telegram bot, baza paroli va boshqa kalitlar **hech qachon kodga yozilmaydi**.
Ular Vercel → loyiha → Settings → Environment Variables bo'limida turadi.
Qaysi kalitlar borligi `.env.example` faylida yozilgan (qiymatlarsiz).

## 4. Hali hal qilinmagan ishlar

- **Yuridik shaxs** — rasmiylashgach `config/site.ts` ga yozing.
- **To'lov kartasi** — `config/site.ts` dagi raqamni tekshiring (`...1111 1111` namuna raqamga o'xshaydi).
- **Kompaniya ijtimoiy tarmoqlari** — ochilgach `config/site.ts` dagi havolalarni almashtiring.
- **Pulni qaytarish shartlari** — `content/foydalanish-shartlari.ts`.
- **Da'volar qoidasi:** saytga kompaniya nomlari (mijoz yoki "falon kompaniya ishlatadi"),
  "1-raqamli", "rasmiy hamkor", maosh va'dalari, o'ylab topilgan raqamlar yozilmaydi — faqat
  isbotlanadigan ma'lumot. Raqamlar (mijozlar, hamkorlar, o'quvchilar) faqat admin paneldagi
  "Statistika" tabidan, haqiqiy qiymat bo'lsa.

## Kodda o'zgartirgandan keyin

Admin paneldagi o'zgarishlar darhol ko'rinadi. Koddagi o'zgarishlar esa saytga chiqishi uchun
GitHub'ga yuborilib, Pull Request "Merge" qilinishi kerak — shundan keyin Vercel saytni 1–2 daqiqada yangilaydi.
