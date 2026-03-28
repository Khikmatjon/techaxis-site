"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Sun, LogOut, LayoutDashboard, Shield, User, BookOpen } from 'lucide-react';
import { LanguageSwitcher } from "./language-switcher";
import { getCurrentUser, logout, User as AuthUser } from '@/lib/auth';

const Navbar = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Locale ni pathdan olish
  const locale = pathname.split("/")[1] || "uz";

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]); // sahifa o'zgarganda qayta tekshir

  function handleLogout() {
    logout();
    setUser(null);
    setUserMenuOpen(false);
    router.push(`/${locale}`);
  }

  const navLinks = [
    {
      title: dict?.navbar?.software || "Dasturlar",
      href: `/${locale}/software`,
      items: [
        { label: "SOLIDWORKS", href: `/${locale}/software#solidworks` },
        { label: "CATIA", href: `/${locale}/software#catia` },
        { label: "3DEXPERIENCE", href: `/${locale}/software#3dexperience` }
      ]
    },
    {
      title: dict?.navbar?.solutions || "Yechimlar",
      href: `/${locale}/#projects`,
      items: [
        { label: dict?.navbar?.projects || "Loyihalar", href: `/${locale}/#projects` },
        { label: "Sanoat yechimlari", href: `/${locale}/#services` }
      ]
    },
    {
      title: dict?.navbar?.training || "Ta'lim",
      href: `/${locale}/training`,
      items: [
        { label: dict?.navbar?.courses || "Kurslar", href: `/${locale}/dashboard` },
        { label: "O'quv dasturi", href: `/${locale}/training#curriculum` }
      ]
    },
    {
      title: dict?.navbar?.about || "Haqimizda",
      href: `/${locale}/#about`,
      items: [
        { label: "Kompaniya tarixi", href: `/${locale}/#about` },
        { label: dict?.about?.exp_label || "Tajriba", href: `/${locale}/#about` }
      ]
    },
    {
      title: dict?.navbar?.certificates || "Sertifikatlar",
      href: `/${locale}/#certificates`,
      items: [
        { label: "Xalqaro litsenziyalar", href: `/${locale}/#about` },
        { label: "Hamkorlarimiz", href: `/${locale}/#about` }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="text-white font-black text-xs">TA</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Axis</span>
              </span>
            </Link>
          </div>

          {/* MAIN MENU LINKS (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <div key={i} className="relative group py-6">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
                >
                  {link.title}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top shadow-xl bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-2 z-50">
                  {link.items.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.href}
                      className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-500 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Sun className="w-5 h-5" />
            </button>
            <LanguageSwitcher />

            {user ? (
              // ---- KIRGAN FOYDALANUVCHI ----
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full pl-2 pr-3 py-1.5 transition-all"
                >
                  <img
                    src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                    alt={user.name}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                      <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-400 font-medium">Tizimga kirgansiz</p>
                        <p className="text-slate-800 dark:text-white font-semibold text-sm truncate">{user.name}</p>
                        <p className="text-slate-400 text-xs truncate">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-0.5">
                        <Link
                          href={`/${locale}/dashboard`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-500" />
                          Mening kabinetem
                        </Link>
                        <Link
                          href={`/${locale}/dashboard`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          Kurslarim
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            href={`/${locale}/admin`}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Shield className="w-4 h-4 text-purple-500" />
                            Admin panel
                          </Link>
                        )}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Chiqish
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // ---- KIRMAGAN FOYDALANUVCHI ----
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/login`}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Kirish
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-blue-500/25 hover:shadow-md"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            {user && (
              <Link href={`/${locale}/dashboard`}>
                <img
                  src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              {user ? (
                <>
                  <Link
                    href={`/${locale}/dashboard`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Kabinetem
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href={`/${locale}/admin`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4" /> Admin panel
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Chiqish
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-center"
                  >
                    Kirish
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    onClick={() => setIsOpen(false)}
                    className="block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all text-center"
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;