// =============================================================================
// SOLIDWORKS JONLI ONLAYN KURSI (/uz/solidworks-jonli-kurs) — sahifa matni
// =============================================================================
//
// Bu kurs saytdagi video kurslardan (admin panel -> Kurslar) ALOHIDA: darslar jonli
// o'tadi, to'lov sayt orqali emas -- birinchi (bepul) darsdan keyin, karta orqali.
// Arizalar Telegram'ga keladi (bosh sahifadagi aloqa formasi bilan bir xil bot).
//
// Qanday tahrirlash:
//   - "KEYIN-TOLDIRING" bilan belgilangan joylarni to'ldiring. null bo'lsa, o'sha
//     qator sahifada umuman ko'rinmaydi.
//   - Faqat haqiqatan bor narsani yozing (o'ylab topilgan raqam, sharh yoki va'da yo'q).
// =============================================================================

export const JONLI_KURS = {
  guruh: "1-guruh",
  boshlanish: "Oktabr 2026",
  // KEYIN-TOLDIRING: aniq sana ma'lum bo'lgach, masalan "2026-yil 12-oktabr".
  aniqSana: null as string | null,

  // Kurs narxi (bitta narx, birinchi darsdan keyin to'lanadi).
  narx: "990 000 so'm" as string | null,

  // KEYIN-TOLDIRING: dars vaqti va kurs davomiyligini qo'shing, masalan "Haftada 3 marta, 19:00–20:30, 8 hafta".
  jadval: "Haftada 3 marta" as string | null,

  // Guruhdagi joylar soni. null bo'lsa ko'rinmaydi.
  joylar: 5 as number | null,

  // Darslar qayerda o'tadi.
  platforma: "Zoom" as string | null,

  oqituvchi: {
    ism: "Hikmatjon Meliqo'ziyev",
    sertifikatlar: [
      { nomi: "CSWA", toliq: "Certified SOLIDWORKS Associate" },
      { nomi: "CSWP", toliq: "Certified SOLIDWORKS Professional" },
    ],
    // KEYIN-TOLDIRING: sertifikatni tekshirish havolasi (bo'lsa). null bo'lsa ko'rinmaydi.
    tekshirishHavolasi: null as string | null,
  },

  // KEYIN-TOLDIRING: dastur -- o'zingiz o'tadigan mavzularga moslang.
  dastur: [
    { mavzu: "Kirish va muhit", tafsilot: "Interfeys, asosiy buyruqlar, loyiha sozlamalari" },
    { mavzu: "2D eskiz (Sketch)", tafsilot: "Chiziqlar, bog'lanishlar (relations), o'lchamlar" },
    { mavzu: "3D modellashtirish", tafsilot: "Extrude, Revolve, Fillet, Chamfer, Shell, Pattern, Mirror" },
    { mavzu: "Yig'ma (Assembly)", tafsilot: "Detallarni yig'ish, bog'lanishlar (Mates), harakat" },
    { mavzu: "Texnik chizma (Drawing)", tafsilot: "Ko'rinishlar, o'lchamlar va annotatsiyalar" },
  ],
} as const;
