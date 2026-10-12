"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { asLoc, pick } from '@/lib/locale-text';

const T = {
  uz: {
    title: "Sahifa topilmadi",
    text: "Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.",
    home: "Bosh sahifaga qaytish",
    courses: "Kurslarni ko'rish",
  },
  ru: {
    title: "Страница не найдена",
    text: "Запрашиваемая страница не существует или была перемещена.",
    home: "Вернуться на главную",
    courses: "Смотреть курсы",
  },
  en: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    home: "Back to home",
    courses: "Browse courses",
  },
};

// not-found sahifasi params olmaydi -- til manzilning birinchi qismidan (/ru/...) olinadi.
export default function NotFound() {
  const locale = asLoc(usePathname()?.split('/')[1]);
  const t = pick(T, locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md">{t.text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/${locale}`}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          {t.home}
        </Link>
        <Link
          href={`/${locale}/courses`}
          className="px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-full transition-all active:scale-95"
        >
          {t.courses}
        </Link>
      </div>
    </div>
  );
}
