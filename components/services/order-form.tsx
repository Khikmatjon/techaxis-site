"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { sendToTelegram } from "@/lib/actions/send-telegram";
import { SITE_SOCIAL } from "@/config/site";
import { asLoc, pick } from "@/lib/locale-text";
import { trXato } from "@/lib/action-messages";

// Mijoz loyihasi buyurtmasi: egasining Telegram'iga (sayt boti orqali) "MIJOZ" sarlavhasi bilan
// keladi. Xabar admin uchun o'zbekcha: tanlangan ish turi o'zbekcha nomi bilan yuboriladi.
const TURLAR = [
  { uz: "Texnik chizma", ru: "Технический чертёж", en: "Technical drawing" },
  { uz: "3D model", ru: "3D-модель", en: "3D model" },
  { uz: "Ishlab chiqarishga tayyorlash", ru: "Подготовка к производству", en: "Preparation for manufacturing" },
  { uz: "Boshqa", ru: "Другое", en: "Other" },
];

const T = {
  uz: {
    done: "Buyurtmangiz qabul qilindi", doneText: "Tez orada siz bilan bog'lanib, muddat va narxni aytamiz.",
    name: "Ismingiz", namePh: "Ism va familiya", phone: "Telefon raqamingiz", tg: "Telegram", optional: "(ixtiyoriy)",
    need: "Nima kerak", about: "Loyiha haqida qisqacha", aboutPh: "Masalan: detal o'lchamlari, material, miqdor, muddat...",
    submit: "Buyurtma yuborish", retry: "Qaytadan urining yoki", viaTg: "Telegram orqali", after: " yozing.",
  },
  ru: {
    done: "Заказ принят", doneText: "Мы скоро свяжемся с вами и назовём сроки и стоимость.",
    name: "Ваше имя", namePh: "Имя и фамилия", phone: "Номер телефона", tg: "Telegram", optional: "(необязательно)",
    need: "Что нужно", about: "Кратко о проекте", aboutPh: "Например: размеры детали, материал, количество, сроки...",
    submit: "Отправить заказ", retry: "Попробуйте ещё раз или", viaTg: "напишите нам в Telegram", after: ".",
  },
  en: {
    done: "Your order has been received", doneText: "We will contact you soon with the timeline and price.",
    name: "Your name", namePh: "First and last name", phone: "Phone number", tg: "Telegram", optional: "(optional)",
    need: "What you need", about: "About the project", aboutPh: "For example: part dimensions, material, quantity, deadline...",
    submit: "Send the order", retry: "Please try again or", viaTg: "message us on Telegram", after: ".",
  },
};

const input =
  "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white outline-none focus:ring-2 ring-blue-500 placeholder:text-slate-500";

export function OrderForm({ locale }: { locale: string }) {
  const t = pick(T, locale);
  const loc = asLoc(locale);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    data.set("kind", "mijoz");
    data.set("lang", loc);
    data.set("service", `Mijoz loyihasi: ${String(data.get("need") ?? "")}`);
    try {
      const res = await sendToTelegram(data);
      if (res.success) setStatus("success");
      else {
        setError(trXato(res.error, locale));
        setStatus("error");
      }
    } catch {
      setError(trXato("Xabar yuborilmadi", locale));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-3 py-6">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.done}</h3>
        <p className="text-slate-600 dark:text-slate-400">{t.doneText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="order-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t.name}</label>
        <input id="order-name" name="name" required maxLength={100} autoComplete="name" className={input} placeholder={t.namePh} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="order-phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t.phone}</label>
          <input id="order-phone" name="phone" required type="tel" maxLength={40} autoComplete="tel" className={input} placeholder="+998 90 123 45 67" />
        </div>
        <div>
          <label htmlFor="order-telegram" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t.tg} <span className="font-normal text-slate-500">{t.optional}</span>
          </label>
          <input id="order-telegram" name="telegram" maxLength={60} className={input} placeholder="@username" />
        </div>
      </div>
      <div>
        <label htmlFor="order-need" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t.need}</label>
        <select id="order-need" name="need" className={`${input} cursor-pointer`} defaultValue={TURLAR[0].uz}>
          {TURLAR.map((tur) => <option key={tur.uz} value={tur.uz}>{tur[loc]}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="order-message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t.about}</label>
        <textarea id="order-message" name="message" rows={4} maxLength={2000} className={input} placeholder={t.aboutPh} />
      </div>

      {/* Bot tuzog'i: odam ko'rmaydi va to'ldirmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#006FD6] hover:bg-blue-700 disabled:opacity-60 py-4 font-bold text-white transition-colors"
      >
        {status === "loading" ? (
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <>{t.submit} <Send className="w-5 h-5" /></>
        )}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}. {t.retry}{" "}
          <a href={SITE_SOCIAL.telegramBot} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{t.viaTg}</a>{t.after}
        </p>
      )}
    </form>
  );
}
