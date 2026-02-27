export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo va Ta'rif */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 font-display">TECHAXIS GROUP</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Biz kelajak texnologiyalarini bugun loyihalaymiz. Avtomobil sanoati, aqlli qurilmalar va 
              muhandislik ta'limi yo'nalishida professional yechimlar.
            </p>
          </div>

          {/* Kontakt ma'lumotlari */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider text-sm">Bog'lanish</h3>
            <ul className="space-y-3 text-slate-500 dark:text-slate-400 text-sm">
              <li>O'zbekiston Farg'ona shahar x uy </li>
              <li>techaxis.group@gmail.com</li>
              <li>+998 91 326 92 09</li>
            </ul>
          </div>

          {/* Ijtimoiy tarmoqlar (Vaqtinchalik) */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider text-sm">Ijtimoiy tarmoqlar</h3>
            <div className="flex space-x-4 text-slate-500">
              <span className="hover:text-blue-600 cursor-pointer transition">LinkedIn</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Instagram</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Telegram</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 uppercase tracking-[0.2em]">
          <p>© 2026 TechAxis Group. Barcha huquqlar himoyalangan.</p>
          <p className="mt-4 md:mt-0 italic font-medium">Precision in every pixel & prototype</p>
        </div>
      </div>
    </footer>
  )
}