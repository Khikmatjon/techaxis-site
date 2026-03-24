"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  const currentLocale = pathname.split("/")[1] || 'uz';

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-1"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>

      <div className={`absolute top-full right-0 mt-6 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 transition-all duration-200 origin-top-right z-50 ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
        {['uz', 'en', 'ru'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentLocale === lang 
                ? 'bg-blue-50 text-[#0084FF] dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:text-[#0084FF] dark:hover:bg-slate-800'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};