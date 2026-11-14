"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitOrderAction } from "@/lib/actions/order-actions";
import { SITE_SOCIAL } from "@/config/site";
import { asLoc, pick } from "@/lib/locale-text";
import { trXato } from "@/lib/action-messages";

// Mijoz loyihasi buyurtmasi: egasining Telegram'iga (sayt boti orqali) "MIJOZ" sarlavhasi bilan
// keladi va admin paneldagi "Buyurtmalar" ro'yxatiga yoziladi. Xabar admin uchun o'zbekcha:
// tanlangan ish turi o'zbekcha nomi bilan yuboriladi (server ham shu ro'yxat bilan tekshiradi).
// Biriktirilgan fayl saytda saqlanmaydi -- Telegram'ga hujjat sifatida ketadi.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const FILE_ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,.dwg,.dxf,.step,.stp,.igs,.iges,.sldprt,.sldasm,.slddrw,.catpart,.catproduct,.catdrawing,.zip";
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
    file: "Chizma yoki rasm", fileHint: "PDF, rasm, DWG, DXF, STEP yoki CAD fayl — 4 MB gacha. Bir nechta fayl bo'lsa, ZIP qilib yuboring.",
    fileBig: "Fayl hajmi 4 MB dan oshmasin",
    submit: "Buyurtma yuborish", retry: "Qaytadan urining yoki", viaTg: "Telegram orqali", after: " yozing.",
  },
  ru: {
    done: "Заказ принят", doneText: "Мы скоро свяжемся с вами и назовём сроки и стоимость.",
    name: "Ваше имя", namePh: "Имя и фамилия", phone: "Номер телефона", tg: "Telegram", optional: "(необязательно)",
    need: "Что нужно", about: "Кратко о проекте", aboutPh: "Например: размеры детали, материал, количество, сроки...",
    file: "Чертёж или фото", fileHint: "PDF, изображение, DWG, DXF, STEP или CAD-файл — до 4 МБ. Несколько файлов отправьте одним ZIP-архивом.",
    fileBig: "Размер файла не должен превышать 4 МБ",
    submit: "Отправить заказ", retry: "Попробуйте ещё раз или", viaTg: "напишите нам в Telegram", after: ".",
  },
  en: {
    done: "Your order has been received", doneText: "We will contact you soon with the timeline and price.",
    name: "Your name", namePh: "First and last name", phone: "Phone number", tg: "Telegram", optional: "(optional)",
    need: "What you need", about: "About the project", aboutPh: "For example: part dimensions, material, quantity, deadline...",
    file: "Drawing or photo", fileHint: "PDF, image, DWG, DXF, STEP or CAD file — up to 4 MB. For several files, send one ZIP archive.",
    fileBig: "The file must not exceed 4 MB",
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
    const data = new FormData(e.currentTarget);
    data.set("lang", loc);
    // Katta fayl serverga yetmasdan to'xtatiladi (aks holda so'rov butunlay rad etiladi).
    const file = data.get("file");
    if (file instanceof File && file.size > MAX_FILE_BYTES) {
      setError(t.fileBig);
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await submitOrderAction(data);
      if (res.success) setStatus("success");
      else {
        setError(trXato(res.error, locale));
        setStatus("error");
      }
    } catch {
      setError(trXato("Buyurtma yuborilmadi", locale));
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
      <div>
        <label htmlFor="order-file" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {t.file} <span className="font-normal text-slate-500">{t.optional}</span>
        </label>
        <input
          id="order-file"
          name="file"
          type="file"
          accept={FILE_ACCEPT}
          className="block w-full text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-200 dark:file:bg-slate-700 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-slate-900 dark:file:text-white hover:file:bg-slate-300 dark:hover:file:bg-slate-600 file:cursor-pointer"
        />
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{t.fileHint}</p>
      </div>

      {/* Bot tuzog'i: odam ko'rmaydi va to'ldirmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

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
          {error.replace(/[.!\s]+$/, "")}. {t.retry}{" "}
          <a href={SITE_SOCIAL.telegramBot} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{t.viaTg}</a>{t.after}
        </p>
      )}
    </form>
  );
}
