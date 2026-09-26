import { Info, Mail } from "lucide-react";
import { SITE_EMAIL, LEGAL_ENTITY } from "@/config/site";

type Section = { h: string; p: string };

// /privacy va /terms uchun umumiy ko'rinish. Matn locales/*.json dan,
// yuridik shaxs va email esa config/site.ts dan keladi (bitta joyda
// o'zgartirilsa, ikkala sahifa ham yangilanadi).
export function LegalPage({
  title,
  intro,
  sections,
  legal,
}: {
  title: string;
  intro: string;
  sections: Section[];
  legal: {
    updated: string;
    draft_notice: string;
    entity_label: string;
    entity_pending: string;
    contact_label: string;
    contact_cta: string;
  };
}) {
  return (
    <div className="bg-white dark:bg-slate-950 pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{legal.updated}</p>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{legal.draft_notice}</p>
        </div>

        <p className="mt-10 text-lg leading-relaxed text-slate-700 dark:text-slate-300">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 space-y-3 text-sm">
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-bold">{legal.entity_label}:</span> {LEGAL_ENTITY ?? legal.entity_pending}
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-bold">{legal.contact_label}:</span> {legal.contact_cta}{" "}
            <a href={`mailto:${SITE_EMAIL}`} className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              <Mail className="w-4 h-4" /> {SITE_EMAIL}
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
