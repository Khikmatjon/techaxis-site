"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, Database, Edit2, ExternalLink, Eye, EyeOff, Info, Plus, RefreshCw, Save, Search, Trash2, X,
} from "lucide-react";
import {
  getAdminPostsAction, savePostAction, deletePostAction, setPostPublishedAction, seedPostsAction,
} from "@/lib/actions/blog-actions";
import {
  POST_TYPES, POST_TYPE_META, POST_LIMITS, formatPostDate, readMinutes, slugify, todayDateInput, validatePostInput,
  type BlogPost, type PostType,
} from "@/lib/blog";
import { PostContent } from "@/components/blog/post-content";

// Blog boshqaruvi: haftalik faktlar, maqolalar, yangiliklar va bizning ishlarimiz.
// /admin sahifasi ichida "Blog va yangiliklar" tab sifatida ishlatiladi.

type Source = "db" | "file" | "seed";
type Toast = { kind: "ok" | "err"; text: string } | null;

interface Draft {
  id: string | null;
  type: PostType;
  title: string;
  slug: string;
  slugTouched: boolean; // slug qo'lda o'zgartirilgan bo'lsa, sarlavhadan avtomatik yaratilmaydi
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt: string; // YYYY-MM-DD
}

const newDraft = (): Draft => ({
  id: null,
  type: "fact",
  title: "",
  slug: "",
  slugTouched: false,
  excerpt: "",
  content: "",
  coverImage: "",
  published: false,
  publishedAt: todayDateInput(),
});

const draftFrom = (p: BlogPost): Draft => ({
  id: p.id,
  type: p.type,
  title: p.title,
  slug: p.slug,
  slugTouched: true,
  excerpt: p.excerpt,
  content: p.content,
  coverImage: p.coverImage ?? "",
  published: p.published,
  publishedAt: p.publishedAt.slice(0, 10),
});

const T = {
  title: "Blog va yangiliklar",
  subtitle: "Haftalik faktlar, maqolalar, yangiliklar va bizning ishlarimizni yozing, tahrirlang va nashr qiling",
  newPost: "Yangi yozuv",
  refresh: "Yangilash",
  total: "Jami",
  published: "Nashr etilgan",
  drafts: "Qoralama",
  search: "Sarlavha yoki slug bo'yicha qidirish...",
  all: "Hammasi",
  statusAll: "Barcha holatlar",
  publish: "Nashr qilish",
  hide: "Yashirish",
  edit: "Tahrirlash",
  remove: "O'chirish",
  openSite: "Saytda ochish",
  empty: "Bu filtr bo'yicha yozuv topilmadi",
  loadFailed: "Yozuvlarni yuklab bo'lmadi. Qayta urinib ko'ring.",
  seed: "Boshlang'ich yozuvlarni yuklash",
  seedText: "Bazada hali yozuv yo'q. Tayyor boshlang'ich to'plamni (maqola va faktlar) yuklashingiz mumkin.",
  fileMode: "Mahalliy sinov rejimi: yozuvlar shu kompyuterdagi .data/blog-posts.json faylida saqlanadi. Saytda (Vercel) yozuvlar bazada saqlanadi.",
  readOnly: "Hozircha saytda ichki boshlang'ich yozuvlar ko'rsatilmoqda, tahrirlash o'chirilgan.",
  editorNew: "Yangi yozuv",
  editorEdit: "Yozuvni tahrirlash",
  fType: "Tur",
  fTitle: "Sarlavha",
  fSlug: "Slug (sahifa manzili)",
  fExcerpt: "Qisqa tavsif (ro'yxatda va qidiruvda ko'rinadi)",
  fContent: "Matn",
  fCover: "Muqova rasm manzili (ixtiyoriy)",
  fDate: "Sana",
  fPublished: "Saytda ko'rinsin (nashr etilgan)",
  preview: "Ko'rib chiqish",
  editText: "Yozish",
  save: "Saqlash",
  cancel: "Bekor qilish",
  help: "Matn yozish qoidalari",
  previewEmpty: "Matn yozing, bu yerda ko'rinadi.",
};

function Notice({ tone, children }: { tone: "info" | "warn" | "ok"; children: ReactNode }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-200",
    warn: "bg-amber-500/10 border-amber-500/30 text-amber-200",
    ok: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
  }[tone];
  const Icon = tone === "warn" ? AlertTriangle : tone === "ok" ? Database : Info;
  return (
    <div className={`flex items-start gap-3 border rounded-xl p-4 text-sm ${styles}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="space-y-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [source, setSource] = useState<Source>("db");
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<PostType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminPostsAction();
      setPosts(data.posts);
      setSource(data.source);
      setSourceError(data.error);
      setLoadFailed(false);
    } catch (err) {
      console.error(err);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const readOnly = source === "seed";

  const counts = useMemo(
    () => ({
      total: posts.length,
      published: posts.filter((p) => p.published).length,
      drafts: posts.filter((p) => !p.published).length,
    }),
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (typeFilter === "all" || p.type === typeFilter) &&
        (statusFilter === "all" || (statusFilter === "published") === p.published) &&
        (!q || p.title.toLowerCase().includes(q) || p.slug.includes(q))
    );
  }, [posts, query, typeFilter, statusFilter]);

  function openEditor(post?: BlogPost) {
    setDraft(post ? draftFrom(post) : newDraft());
    setFormError(null);
    setShowPreview(false);
  }

  async function handleSave() {
    if (!draft) return;
    const payload = {
      type: draft.type,
      title: draft.title,
      slug: draft.slug || slugify(draft.title),
      excerpt: draft.excerpt,
      content: draft.content,
      coverImage: draft.coverImage,
      published: draft.published,
      publishedAt: draft.publishedAt,
    };
    const check = validatePostInput(payload);
    if (!check.ok) {
      setFormError(check.error);
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      const res = await savePostAction(draft.id, payload);
      if (!res.ok) {
        setFormError(res.error);
        return;
      }
      setToast({ kind: "ok", text: draft.id ? "Yozuv saqlandi" : "Yozuv qo'shildi" });
      setDraft(null);
      await load();
    } catch (err) {
      console.error(err);
      setFormError("Saqlab bo'lmadi. Qayta urinib ko'ring.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    setBusyId(post.id);
    try {
      const res = await setPostPublishedAction(post.id, !post.published);
      if (!res.ok) {
        setToast({ kind: "err", text: res.error });
      } else {
        setToast({ kind: "ok", text: post.published ? "Qoralamaga qaytarildi" : "Nashr etildi" });
        await load();
      }
    } catch (err) {
      console.error(err);
      setToast({ kind: "err", text: "Amalni bajarib bo'lmadi" });
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(post: BlogPost) {
    if (!confirm(`"${post.title}" yozuvini o'chirasizmi? Buni qaytarib bo'lmaydi.`)) return;
    setBusyId(post.id);
    try {
      const res = await deletePostAction(post.id);
      if (!res.ok) {
        setToast({ kind: "err", text: res.error });
      } else {
        setToast({ kind: "ok", text: "Yozuv o'chirildi" });
        setDraft(null);
        await load();
      }
    } catch (err) {
      console.error(err);
      setToast({ kind: "err", text: "O'chirib bo'lmadi" });
    } finally {
      setBusyId(null);
    }
  }

  async function handleSeed() {
    setBusyId("seed");
    try {
      const res = await seedPostsAction();
      if (!res.ok) {
        setToast({ kind: "err", text: res.error });
      } else {
        setToast({ kind: "ok", text: res.added > 0 ? `${res.added} ta yozuv qo'shildi` : "Hammasi allaqachon bor" });
        await load();
      }
    } catch (err) {
      console.error(err);
      setToast({ kind: "err", text: "Yuklab bo'lmadi" });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Sarlavha va asosiy tugmalar */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{T.title}</h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">{T.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-4 py-2.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> {T.refresh}
          </button>
          <button
            onClick={() => openEditor()}
            disabled={readOnly || loading}
            className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl px-4 py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> {T.newPost}
          </button>
        </div>
      </div>

      {/* Manba haqida xabarlar */}
      {source === "file" && <Notice tone="info">{T.fileMode}</Notice>}
      {source === "seed" && (
        <Notice tone="warn">
          <p>{sourceError ?? "Baza ulanmagan."}</p>
          <p>{T.readOnly}</p>
        </Notice>
      )}
      {source === "db" && !loading && !loadFailed && posts.length === 0 && (
        <Notice tone="ok">
          <p>{T.seedText}</p>
          <button
            onClick={handleSeed}
            disabled={busyId === "seed"}
            className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
          >
            {T.seed}
          </button>
        </Notice>
      )}
      {loadFailed && <Notice tone="warn">{T.loadFailed}</Notice>}

      {/* Statistika */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: T.total, value: counts.total, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: T.published, value: counts.published, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: T.drafts, value: counts.drafts, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.bg}`}>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtrlar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={T.search}
            aria-label={T.search}
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...POST_TYPES] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                typeFilter === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
              }`}
            >
              {t === "all" ? T.all : POST_TYPE_META[t].plural}
            </button>
          ))}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
          aria-label={T.statusAll}
          className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500"
        >
          <option value="all">{T.statusAll}</option>
          <option value="published">{T.published}</option>
          <option value="draft">{T.drafts}</option>
        </select>
      </div>

      {/* Yozuvlar ro'yxati */}
      {loading && posts.length === 0 ? (
        <div className="text-center py-16 text-slate-500">Yuklanmoqda...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">{T.empty}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => {
            const meta = POST_TYPE_META[post.type];
            const busy = busyId === post.id;
            return (
              <div
                key={post.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${meta.badge}`}>{meta.label}</span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        post.published ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {post.published ? T.published : T.drafts}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatPostDate(post.publishedAt)} · {readMinutes(post.content)} daq.
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm">{post.title}</p>
                  <p className="text-slate-500 text-xs truncate">/blog/{post.slug}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {post.published && (
                    <a
                      href={`/uz/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-3 py-2 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {T.openSite}
                    </a>
                  )}
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={readOnly || busy}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {post.published ? T.hide : T.publish}
                  </button>
                  <button
                    onClick={() => openEditor(post)}
                    disabled={readOnly || busy}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:text-blue-200 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> {T.edit}
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={readOnly || busy}
                    aria-label={T.remove}
                    title={T.remove}
                    className="flex items-center text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg p-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tahrirlash oynasi */}
      {draft && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={draft.id ? T.editorEdit : T.editorNew}
        >
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">{draft.id ? T.editorEdit : T.editorNew}</h3>
              <button
                onClick={() => setDraft(null)}
                aria-label={T.cancel}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Tur */}
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{T.fType}</span>
                <div className="flex flex-wrap gap-2">
                  {POST_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDraft((d) => d && { ...d, type: t })}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
                        draft.type === t
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      {POST_TYPE_META[t].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sarlavha */}
              <div>
                <label htmlFor="post-title" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {T.fTitle}
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={draft.title}
                  maxLength={POST_LIMITS.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setDraft((d) => d && { ...d, title, slug: d.slugTouched ? d.slug : slugify(title) });
                  }}
                  className={inputClass}
                />
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="post-slug" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {T.fSlug}
                </label>
                <input
                  id="post-slug"
                  type="text"
                  value={draft.slug}
                  maxLength={POST_LIMITS.slugMax}
                  onChange={(e) => {
                    const slug = e.target.value.toLowerCase();
                    setDraft((d) => d && { ...d, slug, slugTouched: true });
                  }}
                  className={`${inputClass} font-mono`}
                />
                <p className="text-xs text-slate-500 mt-1.5">
                  /uz/blog/<span className="text-slate-300">{draft.slug || "..."}</span>
                </p>
              </div>

              {/* Qisqa tavsif */}
              <div>
                <label htmlFor="post-excerpt" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {T.fExcerpt}
                </label>
                <textarea
                  id="post-excerpt"
                  rows={2}
                  value={draft.excerpt}
                  maxLength={POST_LIMITS.excerpt}
                  onChange={(e) => {
                    const excerpt = e.target.value;
                    setDraft((d) => d && { ...d, excerpt });
                  }}
                  className={`${inputClass} resize-y`}
                />
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {draft.excerpt.length}/{POST_LIMITS.excerpt}
                </p>
              </div>

              {/* Matn */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="post-content" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {T.fContent}
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setShowPreview(false)}
                      className={`px-3 py-1.5 ${!showPreview ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}
                    >
                      {T.editText}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPreview(true)}
                      className={`px-3 py-1.5 ${showPreview ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}
                    >
                      {T.preview}
                    </button>
                  </div>
                </div>

                {showPreview ? (
                  <div className="min-h-[16rem] max-h-[28rem] overflow-y-auto bg-slate-950 border border-slate-700 rounded-xl p-5">
                    {draft.content.trim() ? (
                      <PostContent content={draft.content} />
                    ) : (
                      <p className="text-slate-500 text-sm">{T.previewEmpty}</p>
                    )}
                  </div>
                ) : (
                  <textarea
                    id="post-content"
                    rows={14}
                    value={draft.content}
                    maxLength={POST_LIMITS.content}
                    onChange={(e) => {
                      const content = e.target.value;
                      setDraft((d) => d && { ...d, content });
                    }}
                    className={`${inputClass} font-mono leading-relaxed resize-y`}
                  />
                )}
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {draft.content.length}/{POST_LIMITS.content}
                </p>

                <details className="mt-2 text-xs text-slate-400">
                  <summary className="cursor-pointer font-bold text-slate-300">{T.help}</summary>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>
                      <code className="text-cyan-300">## Sarlavha</code> va <code className="text-cyan-300">### Kichik sarlavha</code>
                    </li>
                    <li>
                      <code className="text-cyan-300">**qalin**</code>, <code className="text-cyan-300">*qiyshiq*</code>
                    </li>
                    <li>
                      Ro&apos;yxat: <code className="text-cyan-300">- band</code>, tartibli: <code className="text-cyan-300">1. band</code>
                    </li>
                    <li>
                      Havola: <code className="text-cyan-300">[matn](https://manzil)</code>
                    </li>
                    <li>
                      Iqtibos: <code className="text-cyan-300">&gt; matn</code>, chiziq: <code className="text-cyan-300">---</code>
                    </li>
                    <li>Yangi abzats uchun bo&apos;sh qator qoldiring. Faktning oxiriga manba havolasini yozing.</li>
                  </ul>
                </details>
              </div>

              {/* Muqova rasm */}
              <div>
                <label htmlFor="post-cover" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {T.fCover}
                </label>
                <input
                  id="post-cover"
                  type="text"
                  value={draft.coverImage}
                  maxLength={POST_LIMITS.cover}
                  placeholder="https://..."
                  onChange={(e) => {
                    const coverImage = e.target.value;
                    setDraft((d) => d && { ...d, coverImage });
                  }}
                  className={inputClass}
                />
              </div>

              {/* Sana va holat */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="post-date" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {T.fDate}
                  </label>
                  <input
                    id="post-date"
                    type="date"
                    value={draft.publishedAt}
                    onChange={(e) => {
                      const publishedAt = e.target.value;
                      setDraft((d) => d && { ...d, publishedAt });
                    }}
                    className={inputClass}
                  />
                </div>
                <label className="flex items-center gap-3 sm:mt-7 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={draft.published}
                    onChange={(e) => {
                      const published = e.target.checked;
                      setDraft((d) => d && { ...d, published });
                    }}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="text-sm font-bold text-slate-200">{T.fPublished}</span>
                </label>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 text-sm"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {formError}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-slate-800">
              <div>
                {draft.id && (
                  <button
                    type="button"
                    onClick={() => {
                      const post = posts.find((p) => p.id === draft.id);
                      if (post) handleDelete(post);
                    }}
                    disabled={saving}
                    className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" /> {T.remove}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  disabled={saving}
                  className="text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-5 py-2.5 transition-colors disabled:opacity-50"
                >
                  {T.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl px-5 py-2.5 transition-colors disabled:opacity-60"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {T.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Xabar (toast) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold shadow-2xl ${
            toast.kind === "ok"
              ? "bg-emerald-600/95 border-emerald-400/40 text-white"
              : "bg-red-600/95 border-red-400/40 text-white"
          }`}
        >
          {toast.kind === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {toast.text}
        </div>
      )}
    </div>
  );
}
