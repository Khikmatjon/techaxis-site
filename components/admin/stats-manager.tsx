"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, Loader2, Save } from "lucide-react";
import { getAdminStatsAction, updateStatsAction } from "@/lib/actions/stats-actions";

// Bosh sahifadagi statistika: mijozlar, hamkorlar, loyihalar, o'quvchilar,
// reyting. /admin sahifasi ichida "Statistika" tab sifatida ishlatiladi.
// Maydon bo'sh qoldirilsa, mos raqam saytda umuman ko'rinmaydi.

type Field = { key: "clients" | "partners" | "projects" | "students"; label: string; hint: string };

const FIELDS: Field[] = [
  { key: "clients", label: "Mijozlar soni", hint: "Bosh sahifada: \"50+ ... ishonchini qozongan\"" },
  { key: "partners", label: "Hamkor korxonalar", hint: "\"Biz haqimizda\" bo'limida" },
  { key: "projects", label: "Loyiha tajribasi", hint: "\"Biz haqimizda\" bo'limida" },
  { key: "students", label: "Jami o'quvchilar", hint: "Hozircha hech qayerda ko'rsatilmaydi, zaxira maydon" },
];

const inputClass =
  "w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

export default function StatsManager() {
  const [values, setValues] = useState<Record<string, string>>({
    clients: "", partners: "", projects: "", students: "", rating: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStatsAction()
      .then((s) => {
        setValues({
          clients: s.clients?.toString() ?? "",
          partners: s.partners?.toString() ?? "",
          projects: s.projects?.toString() ?? "",
          students: s.students?.toString() ?? "",
          rating: s.rating?.toString() ?? "",
        });
      })
      .catch(() => setError("Statistikani yuklab bo'lmadi (baza bilan aloqa yo'q bo'lishi mumkin)."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const formData = new FormData();
    for (const key of Object.keys(values)) formData.set(key, values[key]);
    try {
      await updateStatsAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Saqlashda xatolik yuz berdi.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm rounded-xl px-4 py-3 mb-6">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p>Maydonni bo&apos;sh qoldirsangiz, mos raqam saytda umuman ko&apos;rinmaydi (faqat rostini yozing).</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-slate-300 mb-1.5">{f.label}</label>
              <input
                type="number"
                min={0}
                step={1}
                placeholder="—"
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className={inputClass}
              />
              <p className="text-xs text-slate-500 mt-1">{f.hint}</p>
            </div>
          ))}

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1.5">O&apos;rtacha reyting</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              placeholder="—"
              value={values.rating}
              onChange={(e) => setValues((v) => ({ ...v, rating: e.target.value }))}
              className={inputClass}
            />
            <p className="text-xs text-slate-500 mt-1">0 dan 5 gacha, hozircha hech qayerda ko&apos;rsatilmaydi</p>
          </div>
        </div>

        {error && <p className="text-sm font-bold text-red-400">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Saqlash
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Saqlandi, sayt yangilandi
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
