"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Paperclip, Phone, Save, Trash2 } from "lucide-react";
import { deleteOrderAction, getOrdersAction, updateOrderAction } from "@/lib/actions/order-actions";

// Mijoz loyihalari buyurtmalari (/services sahifasidagi forma). /admin sahifasida "Buyurtmalar"
// tab sifatida ishlatiladi: holatni belgilash, izoh, CSV yuklab olish. Biriktirilgan fayl saytda
// saqlanmaydi -- u Telegram'ga kelgan, bu yerda faqat nomi ko'rinadi.

type Order = Awaited<ReturnType<typeof getOrdersAction>>[number];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  yangi: { label: "Yangi", color: "bg-blue-500/15 text-blue-800 dark:text-blue-300" },
  boglanildi: { label: "Bog'lanildi", color: "bg-amber-500/15 text-amber-800 dark:text-amber-300" },
  bajarilmoqda: { label: "Bajarilmoqda", color: "bg-violet-500/15 text-violet-800 dark:text-violet-300" },
  topshirildi: { label: "Topshirildi", color: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300" },
  rad_etildi: { label: "Rad etildi", color: "bg-slate-500/15 text-slate-600 dark:text-slate-400" },
};

const inputClass =
  "bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500";

const telegramHref = (t: string) => {
  const u = t.trim().replace(/^@/, "").replace(/^https?:\/\/t\.me\//, "");
  return /^[A-Za-z0-9_]{4,32}$/.test(u) ? `https://t.me/${u}` : null;
};

function toCsv(rows: Order[]) {
  const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Sana", "Ism", "Telefon", "Telegram", "Nima kerak", "Loyiha", "Fayl", "Til", "Holat", "Izoh"];
  const lines = rows.map((r) =>
    [new Date(r.createdAt).toLocaleString("uz-UZ"), r.name, r.phone, r.telegram, r.need, r.message, r.fileName, r.lang,
      STATUS_LABELS[r.status]?.label ?? r.status, r.note].map(cell).join(","),
  );
  return "﻿" + [head.map(cell).join(","), ...lines].join("\r\n"); // BOM: Excel o'zbekcha harflarni to'g'ri ochadi
}

function Row({ order, onChanged }: { order: Order; onChanged: () => void }) {
  const [status, setStatus] = useState(order.status);
  const [note, setNote] = useState(order.note ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const dirty = status !== order.status || note !== (order.note ?? "");
  const tg = order.telegram ? telegramHref(order.telegram) : null;

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await updateOrderAction(order.id, status, note);
      if (!res.success) setMsg(res.error);
      else onChanged();
    } catch {
      setMsg("Saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`${order.name} buyurtmasini o'chirasizmi? Qaytarib bo'lmaydi.`)) return;
    try {
      await deleteOrderAction(order.id);
      onChanged();
    } catch {
      setMsg("O'chirib bo'lmadi");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{order.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {new Date(order.createdAt).toLocaleString("uz-UZ")} · {order.need} · sayt tili: {order.lang.toUpperCase()}
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_LABELS[order.status]?.color ?? ""}`}>
          {STATUS_LABELS[order.status]?.label ?? order.status}
        </span>
      </div>

      {order.message && <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{order.message}</p>}

      <div className="flex flex-wrap gap-4 text-sm">
        <a href={`tel:${order.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 hover:underline">
          <Phone className="w-4 h-4" /> {order.phone}
        </a>
        {order.telegram && (tg
          ? <a href={tg} target="_blank" rel="noopener noreferrer" className="text-cyan-700 dark:text-cyan-400 hover:underline">{order.telegram}</a>
          : <span className="text-slate-700 dark:text-slate-300">{order.telegram}</span>)}
        {order.fileName && (
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300" title="Fayl saytda saqlanmaydi — Telegram'ga kelgan">
            <Paperclip className="w-4 h-4" /> {order.fileName} (Telegram&apos;da)
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} sm:w-48`} aria-label="Holat">
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} placeholder="Izoh (masalan: narx aytildi, 3 kunda topshiriladi)" className={`${inputClass} flex-1`} aria-label="Izoh" />
        <button onClick={save} disabled={!dirty || saving} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-sm px-4 py-2 rounded-xl">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Saqlash
        </button>
        <button onClick={remove} className="inline-flex items-center justify-center text-slate-500 hover:text-red-700 dark:hover:text-red-400 px-2" aria-label="O'chirish" title="O'chirish">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {msg && <p className="text-sm text-red-700 dark:text-red-400">{msg}</p>}
    </div>
  );
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  function load() {
    getOrdersAction()
      .then((rows) => { setOrders(rows); setError(null); })
      .catch(() => setError("Buyurtmalarni yuklab bo'lmadi (baza bilan aloqa yo'q bo'lishi mumkin)."));
  }
  useEffect(load, []);

  function downloadCsv() {
    if (!orders) return;
    const url = URL.createObjectURL(new Blob([toCsv(orders)], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `buyurtmalar-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (error) return <p className="text-red-700 dark:text-red-400">{error}</p>;
  if (!orders) return <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...</div>;

  const counts = orders.reduce<Record<string, number>>((m, o) => ((m[o.status] = (m[o.status] ?? 0) + 1), m), {});
  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setFilter("all")} className={`text-sm font-bold px-3 py-1.5 rounded-full ${filter === "all" ? "bg-white text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
          Hammasi ({orders.length})
        </button>
        {Object.entries(STATUS_LABELS).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`text-sm font-bold px-3 py-1.5 rounded-full ${filter === k ? "bg-white text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
            {v.label} ({counts[k] ?? 0})
          </button>
        ))}
        <button onClick={downloadCsv} disabled={orders.length === 0} className="ml-auto inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white disabled:opacity-40">
          <Download className="w-4 h-4" /> Excel (CSV)
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">{orders.length === 0 ? "Hali buyurtma yo'q. Buyurtmalar Xizmatlar sahifasidagi formadan keladi." : "Bu holatda buyurtma yo'q."}</p>
      ) : (
        <div className="space-y-3">
          {shown.map((o) => <Row key={`${o.id}-${o.updatedAt}`} order={o} onChanged={load} />)}
        </div>
      )}
    </div>
  );
}
