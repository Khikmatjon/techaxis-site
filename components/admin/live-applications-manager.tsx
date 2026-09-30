"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Phone, Save, Trash2 } from "lucide-react";
import {
  deleteLiveApplicationAction,
  getLiveApplicationsAction,
  updateLiveApplicationAction,
} from "@/lib/actions/live-course-actions";

// Jonli kursga arizalar (/uz/solidworks-jonli-kurs formasi). /admin sahifasida
// "Jonli kurs" tab sifatida ishlatiladi: holatni belgilash, izoh, CSV yuklab olish.

type Application = Awaited<ReturnType<typeof getLiveApplicationsAction>>[number];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  yangi: { label: "Yangi", color: "bg-blue-500/15 text-blue-300" },
  boglanildi: { label: "Bog'lanildi", color: "bg-amber-500/15 text-amber-300" },
  sinov_darsi: { label: "Sinov darsida", color: "bg-violet-500/15 text-violet-300" },
  tolandi: { label: "To'ladi", color: "bg-emerald-500/15 text-emerald-300" },
  rad_etdi: { label: "Rad etdi", color: "bg-slate-500/15 text-slate-400" },
};

const inputClass =
  "bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500";

const telegramHref = (t: string) => {
  const u = t.trim().replace(/^@/, "").replace(/^https?:\/\/t\.me\//, "");
  return /^[A-Za-z0-9_]{4,32}$/.test(u) ? `https://t.me/${u}` : null;
};

function toCsv(rows: Application[]) {
  const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Sana", "Ism", "Telefon", "Telegram", "Tajriba", "Guruh", "Holat", "Izoh"];
  const lines = rows.map((r) =>
    [new Date(r.createdAt).toLocaleString("uz-UZ"), r.name, r.phone, r.telegram, r.level, r.group,
      STATUS_LABELS[r.status]?.label ?? r.status, r.note].map(cell).join(","),
  );
  return "﻿" + [head.map(cell).join(","), ...lines].join("\r\n"); // BOM: Excel o'zbekcha harflarni to'g'ri ochadi
}

function Row({ app, onChanged }: { app: Application; onChanged: () => void }) {
  const [status, setStatus] = useState(app.status);
  const [note, setNote] = useState(app.note ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const dirty = status !== app.status || note !== (app.note ?? "");
  const tg = app.telegram ? telegramHref(app.telegram) : null;

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await updateLiveApplicationAction(app.id, status, note);
      if (!res.success) setMsg(res.error);
      else onChanged();
    } catch {
      setMsg("Saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`${app.name} arizasini o'chirasizmi? Qaytarib bo'lmaydi.`)) return;
    try {
      await deleteLiveApplicationAction(app.id);
      onChanged();
    } catch {
      setMsg("O'chirib bo'lmadi");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-bold text-white">{app.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {new Date(app.createdAt).toLocaleString("uz-UZ")} · {app.group} · {app.level}
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_LABELS[app.status]?.color ?? ""}`}>
          {STATUS_LABELS[app.status]?.label ?? app.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <a href={`tel:${app.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline">
          <Phone className="w-4 h-4" /> {app.phone}
        </a>
        {app.telegram && (tg
          ? <a href={tg} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{app.telegram}</a>
          : <span className="text-slate-300">{app.telegram}</span>)}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} sm:w-48`} aria-label="Holat">
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} placeholder="Izoh (masalan: 12-oktabr darsiga keladi)" className={`${inputClass} flex-1`} aria-label="Izoh" />
        <button onClick={save} disabled={!dirty || saving} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-sm px-4 py-2 rounded-xl">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Saqlash
        </button>
        <button onClick={remove} className="inline-flex items-center justify-center text-slate-500 hover:text-red-400 px-2" aria-label="O'chirish" title="O'chirish">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {msg && <p className="text-sm text-red-400">{msg}</p>}
    </div>
  );
}

export default function LiveApplicationsManager() {
  const [apps, setApps] = useState<Application[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  function load() {
    getLiveApplicationsAction()
      .then((rows) => { setApps(rows); setError(null); })
      .catch(() => setError("Arizalarni yuklab bo'lmadi (baza bilan aloqa yo'q bo'lishi mumkin)."));
  }
  useEffect(load, []);

  function downloadCsv() {
    if (!apps) return;
    const url = URL.createObjectURL(new Blob([toCsv(apps)], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `jonli-kurs-arizalari-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (error) return <p className="text-red-400">{error}</p>;
  if (!apps) return <div className="flex items-center gap-2 text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...</div>;

  const counts = apps.reduce<Record<string, number>>((m, a) => ((m[a.status] = (m[a.status] ?? 0) + 1), m), {});
  const shown = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setFilter("all")} className={`text-sm font-bold px-3 py-1.5 rounded-full ${filter === "all" ? "bg-white text-slate-900" : "bg-slate-800 text-slate-300"}`}>
          Hammasi ({apps.length})
        </button>
        {Object.entries(STATUS_LABELS).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`text-sm font-bold px-3 py-1.5 rounded-full ${filter === k ? "bg-white text-slate-900" : "bg-slate-800 text-slate-300"}`}>
            {v.label} ({counts[k] ?? 0})
          </button>
        ))}
        <button onClick={downloadCsv} disabled={apps.length === 0} className="ml-auto inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40">
          <Download className="w-4 h-4" /> Excel (CSV)
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="text-slate-400">{apps.length === 0 ? "Hali ariza yo'q. Arizalar /uz/solidworks-jonli-kurs sahifasidagi formadan keladi." : "Bu holatda ariza yo'q."}</p>
      ) : (
        <div className="space-y-3">
          {shown.map((a) => <Row key={`${a.id}-${a.updatedAt}`} app={a} onChanged={load} />)}
        </div>
      )}
    </div>
  );
}
