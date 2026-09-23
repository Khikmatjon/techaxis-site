import { notFound } from "next/navigation";

// Mos keladigan sahifa topilmasa (masalan /uz/mavjud-bolmagan-sahifa),
// Next.js'ning o'zi umumiy, stilsiz 404 chiqarardi, chunki mos keluvchi
// route umuman yo'q edi va shu segmentdagi not-found.tsx faqat notFound()
// chaqirilganda ishga tushadi. Bu catch-all shuni ta'minlaydi: har qanday
// tanilmagan /[locale]/... yo'li shu segmentning brendga mos
// not-found.tsx sahifasiga yo'naltiriladi.
export default async function CatchAll() {
  notFound();
}
