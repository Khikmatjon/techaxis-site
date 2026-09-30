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

  // KEYIN-TOLDIRING: kurs narxi (bitta narx), masalan "600 000 so'm".
  narx: null as string | null,

  // KEYIN-TOLDIRING: jadval va davomiyligi, masalan "Haftada 3 marta, 19:00–20:30, 8 hafta".
  jadval: null as string | null,

  // KEYIN-TOLDIRING: guruhdagi joylar soni, masalan 12. null bo'lsa ko'rinmaydi.
  joylar: null as number | null,

  // KEYIN-TOLDIRING: darslar qayerda o'tadi, masalan "Zoom" yoki "Google Meet".
  platforma: null as string | null,

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
