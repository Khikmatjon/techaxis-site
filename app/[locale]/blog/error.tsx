"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { pick } from "@/lib/locale-text";

const T = {
  uz: { title: "Sahifa ochilmadi", message: "Vaqtincha xatolik yuz berdi. Qayta urinib ko'ring yoki bosh sahifaga qayting.", retry: "Qayta urinish", home: "Bosh sahifa" },
  ru: { title: "Страница не открылась", message: "Произошла временная ошибка. Попробуйте ещё раз или вернитесь на главную.", retry: "Повторить", home: "На главную" },
  en: { title: "The page did not open", message: "A temporary error occurred. Please try again or go back to the home page.", retry: "Try again", home: "Home" },
};

// Blog bo'limidagi kutilmagan xatolikda xom "Application error" o'rniga shu sahifa chiqadi.
export default function BlogError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale ?? "uz";
  const t = pick(T, locale);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{t.message}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 px-6 rounded-xl"
          >
            {t.retry}
          </button>
          <Link
            href={`/${locale}`}
            className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-6 rounded-xl"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
