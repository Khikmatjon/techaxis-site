import statsJson from "@/data/stats.json";

// Saytdagi statistik raqamlar shu yerdan o'qiladi. Qiymat null bo'lsa,
// mos element saytda umuman ko'rinmaydi (isbotsiz raqam qo'ymaslik uchun).
// Haqiqiy qiymatni bilsangiz, data/stats.json faylini to'ldiring.
export type Stats = {
  clients: number | null;
  partners: number | null;
  projects: number | null;
  students: number | null;
  rating: number | null;
};

export const STATS: Stats = statsJson as Stats;
