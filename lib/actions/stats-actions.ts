"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";
import { locales } from "@/lib/i18n";

// Statistika boshqaruvi (admin panel). Loyiha qoidasi: Route Handler emas,
// Server Actions. Har bir harakat avval admin ekanini tekshiradi.

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user?.role !== "admin") throw new Error("Unauthorized");
}

function refreshPublicPages() {
  for (const locale of locales) revalidatePath(`/${locale}`);
}

export async function getAdminStatsAction() {
  await requireAdmin();
  const row = await prisma.siteStats.findUnique({ where: { id: "singleton" } });
  return {
    clients: row?.clients ?? null,
    partners: row?.partners ?? null,
    projects: row?.projects ?? null,
    students: row?.students ?? null,
    rating: row?.rating ?? null,
  };
}

// Bo'sh maydon = null (saytda ko'rinmaydi). Manfiy son kiritilmaydi.
function parseIntOrNull(raw: FormDataEntryValue | null): number | null {
  const s = (raw as string || "").trim();
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n);
}

function parseRatingOrNull(raw: FormDataEntryValue | null): number | null {
  const s = (raw as string || "").trim();
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0 || n > 5) return null;
  return n;
}

export async function updateStatsAction(formData: FormData) {
  await requireAdmin();

  const data = {
    clients: parseIntOrNull(formData.get("clients")),
    partners: parseIntOrNull(formData.get("partners")),
    projects: parseIntOrNull(formData.get("projects")),
    students: parseIntOrNull(formData.get("students")),
    rating: parseRatingOrNull(formData.get("rating")),
  };

  await prisma.siteStats.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });

  refreshPublicPages();
  return { ok: true as const };
}
