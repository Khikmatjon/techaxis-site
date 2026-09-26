import { Mail } from "lucide-react";
import { SITE_EMAIL, LEGAL_ENTITY } from "@/config/site";

// Matnning o'zi content/maxfiylik-siyosati.ts va content/foydalanish-shartlari.ts
// fayllarida; bu komponent faqat ko'rinishni beradi.
export type HuquqiyMatn = {
  sarlavha: string;
  yangilangan: string;
  kirish: string;
  bolimlar: { sarlavha: string; matn: string }[];
};
export type HuquqiyHujjat = Record<"uz" | "ru" | "en", HuquqiyMatn>;

export function pickLocale(doc: HuquqiyHujjat, locale: string): HuquqiyMatn {
  return doc[locale as keyof HuquqiyHujjat] ?? doc.uz;
}

// /privacy va /terms uchun umumiy ko'rinish. Pastdagi yuridik shaxs va email
// config/site.ts dan keladi.
export function LegalPage({
  doc,
  labels,
}: {
  doc: HuquqiyMatn;
  labels: {
    entity_label: string;
    entity_pending: string;
    contact_label: string;
    contact_cta: string;
  };
}) {
  return (
    <div className="bg-white dark:bg-slate-950 pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{doc.sarlavha}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{doc.yangilangan}</p>

        <p className="mt-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{doc.kirish}</p>

        <div className="mt-10 space-y-10">
          {doc.bolimlar.map((s) => (
            <section key={s.sarlavha}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{s.sarlavha}</h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{s.matn}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 space-y-3 text-sm">
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-bold">{labels.entity_label}:</span> {LEGAL_ENTITY ?? labels.entity_pending}
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-bold">{labels.contact_label}:</span> {labels.contact_cta}{" "}
            <a href={`mailto:${SITE_EMAIL}`} className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              <Mail className="w-4 h-4" /> {SITE_EMAIL}
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
