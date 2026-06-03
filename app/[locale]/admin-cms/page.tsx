"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Eski /admin-cms manzili endi bitta admin panelga (/admin) yo'naltiriladi.
// Kurs mazmunini boshqarish shu yerda "Kurslar mazmuni" tabida joylashgan.
export default function AdminCmsRedirect() {
  const params = useParams();
  const locale = (params?.locale as string) || "uz";
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${locale}/admin`);
  }, [locale, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-lg">Admin panelga yo'naltirilmoqda...</div>
    </div>
  );
}
