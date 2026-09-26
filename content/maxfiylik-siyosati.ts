// ============================================================================
//  MAXFIYLIK SIYOSATI — sahifa matni
//  Saytdagi sahifa: techaxis.uz/uz/privacy  (ru va en versiyalari ham shu faylda)
//
//  Qanday o'zgartiriladi:
//   - Faqat qo'shtirnoq "..." ichidagi matnni o'zgartiring.
//   - Matn ichida " belgisini ishlatmang (kerak bo'lsa « » ishlating).
//   - Yangi bo'lim qo'shish: { sarlavha: "...", matn: "..." }, qatorini nusxalab,
//     kerakli joyga qo'ying.
//   - Matnni o'zgartirsangiz, "yangilangan" sanasini ham yangilang.
// ============================================================================
import type { HuquqiyHujjat } from "@/components/legal/legal-page";

export const MAXFIYLIK_SIYOSATI: HuquqiyHujjat = {
  uz: {
    sarlavha: "Maxfiylik siyosati",
    yangilangan: "Oxirgi yangilanish: 2026-yil 26-sentabr",
    kirish: "Bu sahifada techaxis.uz saytida qanday ma'lumotlaringizni olishimiz va ulardan qanday foydalanishimiz haqida yozilgan.",
    bolimlar: [
      { sarlavha: "Qanday ma'lumot olamiz", matn: "Ro'yxatdan o'tganingizda — ismingiz, emailingiz va parolingiz. Kursga yozilganingizda — tanlangan kurs va to'lov ma'lumotlari. Bog'lanish formasi orqali — ismingiz, emailingiz, telefoningiz va xabaringiz." },
      { sarlavha: "Nima uchun kerak", matn: "Hisobingizni ochish, kurslarga kirish, to'lovni tasdiqlash va siz bilan bog'lanish uchun." },
      { sarlavha: "Qayerda saqlanadi", matn: "Ma'lumotlaringiz himoyalangan serverlarda saqlanadi. Parolingiz shifrlangan holda saqlanadi — uni hech kim, jumladan biz ham ko'ra olmaymiz." },
      { sarlavha: "Boshqalarga beriladimi", matn: "Yo'q. Ma'lumotlaringiz sotilmaydi va reklama uchun boshqalarga berilmaydi." },
      { sarlavha: "Cookie", matn: "Sayt faqat tizimga kirganingizni eslab qolish uchun cookie ishlatadi. Reklama yoki kuzatuv cookie'lari yo'q." },
      { sarlavha: "Ma'lumotlaringizni o'chirish", matn: "Ma'lumotlaringizni ko'rish, o'zgartirish yoki o'chirishni xohlasangiz, info@techaxis.uz manziliga yozing." },
    ],
  },

  ru: {
    sarlavha: "Политика конфиденциальности",
    yangilangan: "Последнее обновление: 26 сентября 2026 г.",
    kirish: "На этой странице описано, какие данные мы получаем на сайте techaxis.uz и как их используем.",
    bolimlar: [
      { sarlavha: "Какие данные мы получаем", matn: "При регистрации — ваше имя, email и пароль. При записи на курс — выбранный курс и данные об оплате. Через форму обратной связи — имя, email, телефон и ваше сообщение." },
      { sarlavha: "Зачем они нужны", matn: "Чтобы создать ваш аккаунт, открыть доступ к курсам, подтвердить оплату и связаться с вами." },
      { sarlavha: "Где хранятся", matn: "Ваши данные хранятся на защищённых серверах. Пароль хранится в зашифрованном виде — его никто не может увидеть, включая нас." },
      { sarlavha: "Передаются ли другим", matn: "Нет. Ваши данные не продаются и не передаются другим в рекламных целях." },
      { sarlavha: "Cookie", matn: "Сайт использует cookie только для того, чтобы запомнить, что вы вошли в систему. Рекламных и отслеживающих cookie нет." },
      { sarlavha: "Удаление данных", matn: "Если хотите посмотреть, изменить или удалить свои данные, напишите на info@techaxis.uz." },
    ],
  },

  en: {
    sarlavha: "Privacy Policy",
    yangilangan: "Last updated: September 26, 2026",
    kirish: "This page explains what information we collect on techaxis.uz and how we use it.",
    bolimlar: [
      { sarlavha: "What we collect", matn: "When you register — your name, email and password. When you enroll in a course — the selected course and payment details. Through the contact form — your name, email, phone and message." },
      { sarlavha: "Why we need it", matn: "To create your account, give you access to courses, confirm your payment and get in touch with you." },
      { sarlavha: "Where it's stored", matn: "Your data is stored on secure servers. Your password is stored encrypted — nobody, including us, can see it." },
      { sarlavha: "Do we share it", matn: "No. Your data is never sold or shared with others for advertising." },
      { sarlavha: "Cookies", matn: "The site uses a cookie only to remember that you're signed in. There are no advertising or tracking cookies." },
      { sarlavha: "Deleting your data", matn: "If you want to view, change or delete your data, write to info@techaxis.uz." },
    ],
  },
};
