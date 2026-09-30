"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitLiveApplicationAction } from "@/lib/actions/live-course-actions";
import { DARAJALAR } from "@/content/jonli-kurs";
import { SITE_SOCIAL } from "@/config/site";

// Jonli kursga ariza: Telegram'ga yuboriladi va admin paneldagi "Jonli kurs" ro'yxatiga yoziladi.

export function LiveCourseSignupForm({ group }: { group: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    data.set("group", group);

    try {
      const res = await submitLiveApplicationAction(data);
      if (res.success) {
        setStatus("success");
      } else {
        setError(res.error);
        setStatus("error");
      }
    } catch {
      setError("Ariza yuborilmadi");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-4 py-6">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Arizangiz qabul qilindi</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Tez orada siz bilan bog&apos;lanib, birinchi dars sanasi va SOLIDWORKS&apos;ni o&apos;rnatish bo&apos;yicha ma&apos;lumot beramiz.
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white outline-none focus:ring-2 ring-blue-500 placeholder:text-slate-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="live-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ismingiz</label>
        <input id="live-name" name="name" required maxLength={100} autoComplete="name" className={input} placeholder="Ism va familiya" />
      </div>
      <div>
        <label htmlFor="live-phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Telefon raqamingiz</label>
        <input id="live-phone" name="phone" required type="tel" maxLength={40} autoComplete="tel" className={input} placeholder="+998 90 123 45 67" />
      </div>
      <div>
        <label htmlFor="live-telegram" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Telegram <span className="font-normal text-slate-500">(ixtiyoriy)</span>
        </label>
        <input id="live-telegram" name="telegram" maxLength={60} className={input} placeholder="@username" />
      </div>
      <div>
        <label htmlFor="live-level" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">SOLIDWORKS bilan tajribangiz</label>
        <select id="live-level" name="level" className={`${input} cursor-pointer`} defaultValue={DARAJALAR[0]}>
          {DARAJALAR.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Bot tuzog'i: odam ko'rmaydi va to'ldirmaydi (server to'ldirilgan arizani saqlamaydi) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#0084FF] hover:bg-blue-600 disabled:opacity-60 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
      >
        {status === "loading" ? (
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <>Joy band qilish <Send className="w-4 h-4" /></>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-sm font-bold text-red-500">
          {error}. Qaytadan urining yoki{" "}
          <a href={SITE_SOCIAL.telegramBot} target="_blank" rel="noopener noreferrer" className="underline">Telegram orqali</a> yozing.
        </p>
      )}
    </form>
  );
}
