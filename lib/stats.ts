import { prisma } from "@/lib/prisma";

// Saytdagi statistik raqamlar SiteStats jadvalidan (admin panel orqali
// tahrirlanadi) o'qiladi. Qiymat null bo'lsa yoki baza bilan aloqa
// bo'lmasa, mos element saytda umuman ko'rinmaydi (isbotsiz raqam
// qo'ymaslik uchun) -- ommaviy sahifalar hech qachon shu sabab bilan
// yiqilmasligi kerak.
export type Stats = {
  clients: number | null;
  partners: number | null;
  projects: number | null;
  students: number | null;
  rating: number | null;
};

const EMPTY_STATS: Stats = { clients: null, partners: null, projects: null, students: null, rating: null };

export async function getStats(): Promise<Stats> {
  try {
    const row = await prisma.siteStats.findUnique({ where: { id: "singleton" } });
    if (!row) return EMPTY_STATS;
    return {
      clients: row.clients,
      partners: row.partners,
      projects: row.projects,
      students: row.students,
      rating: row.rating,
    };
  } catch {
    return EMPTY_STATS;
  }
}
