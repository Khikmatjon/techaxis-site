"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Sun, Moon, LogOut, LayoutDashboard, Shield, User, BookOpen, Settings, Loader2 } from 'lucide-react';
import { LanguageSwitcher } from "./language-switcher";
import { logoutAction, updateUserCredentialsAction } from '@/lib/actions/auth-actions';
import { useTheme } from "next-themes";

const Navbar = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Locale ni pathdan olish
  const locale = pathname.split("/")[1] || "uz";

  useEffect(() => {
    setMounted(true);
    // Severdan sessiyani tekshirish
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setNewEmail(data.user.email);
        } else {
          setUser(null);
        }
      });
  }, [pathname]); // sahifa o'zgarganda qayta tekshir

  async function handleLogout() {
    await logoutAction(); // Server action cookieni o'chiradi
    setUser(null);
    setUserMenuOpen(false);
    router.refresh(); // Statusni yangilash uchun
  }

  async function handleUpdateCredentials(e: React.FormEvent) {
    e.preventDefault();
    setSettingsLoading(true);
    
    const formData = new FormData();
    formData.append("newEmail", newEmail);
    formData.append("newPassword", newPassword);
    
    const res = await updateUserCredentialsAction(formData);
    setSettingsLoading(false);
    
    if (res.error) {
      alert("Xatolik: " + res.error);
    } else {
      alert("Muvaffaqiyatli o'zgartirildi! Iltimos yangi ma'lumotlar bilan qaytadan kiring.");
      setSettingsOpen(false);
      setUser(null);
      setUserMenuOpen(false);
      router.push(`/${locale}/login`);
    }
  }

  const renderThemeToggle = () => {
    if (!mounted) return <div className="w-9 h-9" />;
    return (
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </button>
    );
  };

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
        { label: dict?.navbar?.industrial_solutions || "Sanoat yechimlari", href: `/${locale}/#services` }
      ]
    },
    {
      title: dict?.navbar?.training || "Ta'lim",
      href: `/${locale}/training`,
      items: [
        { label: dict?.navbar?.courses || "Kurslar", href: `/${locale}/courses` },
        { label: dict?.navbar?.curriculum || "O'quv dasturi", href: `/${locale}/training#curriculum` }
      ]
    },
    {
      title: dict?.navbar?.resources_title || "Resurslar",
      href: `/${locale}/blog`,
      items: [
        { label: dict?.navbar?.blog || "Bilimlar bazasi", href: `/${locale}/blog` },
        { label: dict?.navbar?.free_resources || "Bepul materiallar", href: `/${locale}/free` }
      ]
    },
    {
      title: dict?.navbar?.about || "Haqimizda",
      href: `/${locale}/#about`,
      items: [
        { label: dict?.navbar?.history || "Kompaniya tarixi", href: `/${locale}/#about` },
        { label: dict?.navbar?.experience || dict?.about?.exp_label || "Tajriba", href: `/${locale}/#about` }
      ]
    },
    {
      title: dict?.navbar?.certificates || "Sertifikatlar",
      href: `/${locale}/#certificates`,
      items: [
        { label: dict?.navbar?.global_certs || "Xalqaro litsenziyalar", href: `/${locale}/#about` },
        { label: dict?.navbar?.partners || "Hamkorlarimiz", href: `/${locale}/#about` }
      ]
    }
  ];

  return (
    <>
      <nav className="sticky top-0 w-full z-[100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300">
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
            {renderThemeToggle()}
            <LanguageSwitcher />

            {user ? (
              // ---- KIRGAN FOYDALANUVCHI ----
              <div className="relative" ref={(el) => {
                if (!el) return;
                const handleClickOutside = (e: MouseEvent) => {
                  if (!el.contains(e.target as Node)) setUserMenuOpen(false);
                };
                document.addEventListener('click', handleClickOutside);
                return () => document.removeEventListener('click', handleClickOutside);
              }}>
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
                        {dict?.navbar?.dashboard || "Mening kabinetim"}
                      </Link>
                      <Link
                        href={`/${locale}/dashboard`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        {dict?.navbar?.my_courses || "Kurslarim"}
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href={`/${locale}/admin`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Shield className="w-4 h-4 text-purple-500" />
                          {dict?.navbar?.admin_panel || "Admin panel"}
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          setSettingsOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        Sozlamalar
                      </button>

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {dict?.navbar?.logout || "Chiqish"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // ---- KIRMAGAN FOYDALANUVCHI ----
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/login`}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {dict?.navbar?.login || "Kirish"}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-blue-500/25 hover:shadow-md"
                >
                  {dict?.navbar?.register || "Ro'yxatdan o'tish"}
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center gap-3">
            {renderThemeToggle()}
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
                    <LayoutDashboard className="w-4 h-4" /> {dict?.navbar?.dashboard || "Kabinetim"}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href={`/${locale}/admin`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4" /> {dict?.navbar?.admin_panel || "Admin panel"}
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> {dict?.navbar?.logout || "Chiqish"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-center"
                  >
                    {dict?.navbar?.login || "Kirish"}
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    onClick={() => setIsOpen(false)}
                    className="block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all text-center"
                  >
                    {dict?.navbar?.register || "Ro'yxatdan o'tish"}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>

    {/* SETTINGS MODAL */}
    {settingsOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
          <button 
            onClick={() => setSettingsOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mb-6">
            <h2 className="text-xl font-bold dark:text-white">Sozlamalar</h2>
            <p className="text-sm text-slate-500 mt-1">Emaili yoki parolni tahrirlash</p>
          </div>

          <form onSubmit={handleUpdateCredentials} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Yangi Email (Login)
              </label>
              <input
                type="text"
                required
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Yangi Parol
              </label>
              <input
                type="password"
                required
                placeholder="Yangi parol (masalan: admin_h2)"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button 
              type="submit"
              disabled={settingsLoading || (!newEmail || !newPassword)}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
            >
              {settingsLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Saqlash"}
            </button>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;