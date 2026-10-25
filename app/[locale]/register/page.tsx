"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth-actions";
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { pick } from "@/lib/locale-text";
import { trXato } from "@/lib/action-messages";

const T = {
  uz: {
    weak: "Juda zaif", medium: "O'rtacha", strong: "Kuchli", mismatch: "Parollar mos kelmadi", tooShort: "Parol kamida 8 ta belgi bo'lishi kerak",
    title: "Hisob yarating", intro: "Kurslarimizga kirish uchun ro'yxatdan o'ting", name: "Ism va familiya", namePh: "Alisher Karimov",
    password: "Parol", min8: "Kamida 8 ta belgi", hide: "Parolni yashirish", show: "Parolni ko'rsatish", confirm: "Parolni tasdiqlang",
    submit: "Ro'yxatdan o'tish", haveAccount: "Allaqachon hisobingiz bormi?", login: "Kirish",
  },
  ru: {
    weak: "Очень слабый", medium: "Средний", strong: "Надёжный", mismatch: "Пароли не совпадают", tooShort: "Пароль должен содержать не менее 8 символов",
    title: "Создайте аккаунт", intro: "Зарегистрируйтесь, чтобы получить доступ к курсам", name: "Имя и фамилия", namePh: "Алишер Каримов",
    password: "Пароль", min8: "Не менее 8 символов", hide: "Скрыть пароль", show: "Показать пароль", confirm: "Подтвердите пароль",
    submit: "Зарегистрироваться", haveAccount: "Уже есть аккаунт?", login: "Войти",
  },
  en: {
    weak: "Very weak", medium: "Medium", strong: "Strong", mismatch: "Passwords do not match", tooShort: "The password must be at least 8 characters long",
    title: "Create an account", intro: "Sign up to get access to our courses", name: "First and last name", namePh: "Alex Johnson",
    password: "Password", min8: "At least 8 characters", hide: "Hide password", show: "Show password", confirm: "Confirm password",
    submit: "Sign up", haveAccount: "Already have an account?", login: "Sign in",
  },
};

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = pick(T, locale);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const CONSENT_TEXT = {
    uz: { before: "Men ", privacy: "Maxfiylik siyosati", and: " va ", terms: "Foydalanish shartlari", after: " bilan tanishdim va roziman", required: "Davom etish uchun shartlarga rozilik bildiring" },
    ru: { before: "Я ознакомился(ась) и согласен(на) с ", privacy: "Политикой конфиденциальности", and: " и ", terms: "Условиями использования", after: "", required: "Чтобы продолжить, примите условия" },
    en: { before: "I have read and agree to the ", privacy: "Privacy Policy", and: " and ", terms: "Terms of Use", after: "", required: "Please accept the terms to continue" },
  };
  const consent = CONSENT_TEXT[locale as keyof typeof CONSENT_TEXT] ?? CONSENT_TEXT.uz;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = (() => {
    const p = form.password;
    if (p.length === 0) return 0;
    if (p.length < 4) return 1;
    if (p.length < 8) return 2;
    return 3;
  })();

  const strengthColors = ["", "bg-red-500", "bg-yellow-500", "bg-emerald-500"];
  const strengthLabels = ["", t.weak, t.medium, t.strong];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError(t.mismatch);
      return;
    }
    // Server ham kamida 8 belgi talab qiladi (lib/actions/auth-actions.ts -> MIN_PASSWORD)
    if (form.password.length < 8) {
      setError(t.tooShort);
      return;
    }
    if (!agreed) {
      setError(consent.required);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("consent", agreed ? "true" : "false");

    const result = await registerAction(formData);
    setLoading(false);

    if (result.error) {
      setError(trXato(result.error, locale));
      return;
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Orqa fon */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${locale}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Axis</span>
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">{t.title}</h1>
          <p className="text-slate-400">{t.intro}</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                ⚠ {error}
              </div>
            )}

            {/* Ism */}
            <div className="space-y-1.5">
              <label htmlFor="reg-name" className="text-sm font-semibold text-slate-300">{t.name}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="reg-name"
                  type="text"
                  required
                  placeholder={t.namePh}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="text-sm font-semibold text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Parol */}
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="text-sm font-semibold text-slate-300">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder={t.min8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.hide : t.show}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-slate-700"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{strengthLabels[passwordStrength]}</span>
                </div>
              )}
            </div>

            {/* Tasdiqlash */}
            <div className="space-y-1.5">
              <label htmlFor="reg-password2" className="text-sm font-semibold text-slate-300">{t.confirm}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="reg-password2"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {form.confirm && form.password === form.confirm && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                )}
              </div>
            </div>

            {/* Rozilik (majburiy) */}
            <label className="flex items-start gap-3 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-600 bg-slate-800 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm text-slate-400 leading-relaxed">
                {consent.before}
                <Link href={`/${locale}/privacy`} target="_blank" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  {consent.privacy}
                </Link>
                {consent.and}
                <Link href={`/${locale}/terms`} target="_blank" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  {consent.terms}
                </Link>
                {consent.after}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t.submit} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            {t.haveAccount}{" "}
            <Link href={`/${locale}/login`} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              {t.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
