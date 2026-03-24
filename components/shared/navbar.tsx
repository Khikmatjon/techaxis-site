"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Sun } from 'lucide-react';
import { LanguageSwitcher } from "./language-switcher";

const Navbar = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { 
      title: dict?.navbar?.software || "Dasturlar", 
      href: "/software",
      items: [
        { label: "SOLIDWORKS", href: "/software#solidworks" },
        { label: "CATIA", href: "/software#catia" },
        { label: "3DEXPERIENCE", href: "/software#3dexperience" }
      ] 
    },
    { 
      title: dict?.navbar?.solutions || "Yechimlar", 
      href: "/solutions",
      items: [
        { label: dict?.navbar?.projects || "Loyihalar", href: "/solutions#projects" },
        { label: "Sanoat yechimlari", href: "/solutions#industry" }
      ] 
    },
    { 
      title: dict?.navbar?.training || "Ta'lim", 
      href: "/training",
      items: [
        { label: dict?.navbar?.courses || "Kurslar", href: "/training#courses" },
        { label: "O'quv dasturi", href: "/training#curriculum" }
      ] 
    },
    { 
      title: dict?.navbar?.about || "Haqimizda", 
      href: "/#about",
      items: [
        { label: "Kompaniya tarixi", href: "/#history" },
        { label: dict?.about?.exp_label || "Tajriba", href: "/#experience" }
      ] 
    },
    { 
      title: dict?.navbar?.certificates || "Sertifikatlar", 
      href: "/#certificates",
      items: [
        { label: "Xalqaro litsenziyalar", href: "/#licenses" },
        { label: "Hamkorlarimiz", href: "/#partners" }
      ] 
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white dark:bg-slate-950 border-b border-transparent dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-cyan-500">
              TechAxis
            </Link>
          </div>

          {/* MAIN MENU LINKS (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <div key={i} className="relative group py-6">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1 text-[15px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  {link.title}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
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

          {/* RIGHT SIDE ICONS & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              <Sun className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
            <Link 
              href="#contact" 
              className="bg-[#0084FF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors shadow-sm"
            >
              {dict?.navbar?.contact || "Bog'lanish"}
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 dark:text-slate-300 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;