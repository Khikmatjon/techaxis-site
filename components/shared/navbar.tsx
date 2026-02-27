"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from "./language-switcher";

const Navbar = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: dict?.navbar?.software, href: "/software" },
    { title: dict?.navbar?.training, href: "/training" },
    { title: dict?.navbar?.solutions, href: "#projects" }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. Logotip har doim chapda */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-blue-600">
              TECHAXIS <span className="text-slate-900 dark:text-white underline decoration-emerald-500">GROUP</span>
            </Link>
          </div>

          {/* 2. Menyu har doim o'rtada (Desktop) */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                {link.title}
              </Link>
            ))}
          </div>

          {/* 3. Tillar va Tugma har doim o'ngda */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              href="#contact" 
              className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all"
            >
              {dict?.navbar?.contact}
            </Link>
            
            {/* Mobil menyu tugmasi */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;