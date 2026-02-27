"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const currentLocale = pathname.split("/")[1];

  return (
    <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
      <Globe size={14} className="text-slate-400" />
      <div className="flex items-center space-x-2">
        {['uz', 'en', 'ru'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`text-[10px] font-bold uppercase tracking-tighter transition-all ${
              currentLocale === lang 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};