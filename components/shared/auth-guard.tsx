"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, User } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // Locale ni pathname dan olish: /uz/dashboard → uz
      const locale = pathname.split("/")[1] || "uz";
      router.replace(`/${locale}/login`);
      return;
    }

    if (requireAdmin && currentUser.role !== "admin") {
      const locale = pathname.split("/")[1] || "uz";
      router.replace(`/${locale}/dashboard`);
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [pathname, requireAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 font-medium">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
