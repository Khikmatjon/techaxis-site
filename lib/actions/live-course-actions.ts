"use server";

import { prisma } from "@/lib/prisma";
import { get_session } from "@/lib/session";

// Jonli kursga arizalar -- admin paneldagi "Jonli kurs" tabi (oldingi arizalar tarixi).
// Ariza sahifasi 2026-11-09 da olib tashlandi (1-guruh qabuli yopildi); qayta ochilganda
// ochiq ariza action'i va sahifa git tarixida (claude/jonli-kurs-olib-tashlash dan oldingi holat).
// Loyiha qoidasi: Route Handler emas, Server Actions.

// Admin paneldagi holatlar (bazada kalit, ekranda nomi).
const STATUSES = ["yangi", "boglanildi", "sinov_darsi", "tolandi", "rad_etdi"];

async function requireAdmin() {
  const session = await get_session();
  if (!session || session.user?.role !== "admin") throw new Error("Unauthorized");
}

export async function getLiveApplicationsAction() {
  await requireAdmin();
  return prisma.liveApplication.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
}

export async function updateLiveApplicationAction(id: string, status: string, note: string) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { success: false as const, error: "Holat noto'g'ri" };
  await prisma.liveApplication.update({
    where: { id },
    data: { status, note: note.trim().slice(0, 1000) || null },
  });
  return { success: true as const };
}

export async function deleteLiveApplicationAction(id: string) {
  await requireAdmin();
  await prisma.liveApplication.delete({ where: { id } });
  return { success: true as const };
}
