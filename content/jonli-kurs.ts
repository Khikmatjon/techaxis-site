// =============================================================================
// SOLIDWORKS JONLI ONLAYN KURSI (/uz/solidworks-jonli-kurs) — sahifa matni
// =============================================================================
//
// Bu kurs saytdagi video kurslardan (admin panel -> Kurslar) ALOHIDA: darslar jonli
// o'tadi, to'lov sayt orqali emas -- birinchi (bepul) darsdan keyin, karta orqali.
// Arizalar Telegram'ga va admin paneldagi "Jonli kurs" tabiga keladi.
//
// Qanday tahrirlash:
//   - "KEYIN-TOLDIRING" bilan belgilangan joylarni to'ldiring. null bo'lsa, o'sha
//     qator sahifada umuman ko'rinmaydi.
//   - Faqat haqiqatan bor narsani yozing (o'ylab topilgan raqam, sharh yoki va'da yo'q).
//   - Dastur (16 dars) to'liq rejasi: "SOLIDWORKS jonli kursi — darslar rejasi" hujjati.
// =============================================================================

export const JONLI_KURS = {
  guruh: "1-guruh",
  boshlanish: "20-oktabr 2026",

  // Kurs narxi (bitta narx, birinchi darsdan keyin to'lanadi).
  narx: "990 000 so'm" as string | null,

  // KEYIN-TOLDIRING: dars kunlari va soati ma'lum bo'lgach qo'shing, masalan
  // "Seshanba–juma, 19:00–21:00".
  jadval: "Haftada 4 marta, har dars 1,5–2 soat" as string | null,
  davomiylik: "4 hafta, 16 dars",

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

  // Kurs oxirida o'quvchi nimaga erishadi.
  natijalar: [
    "CSWA va CSWP imtihonlariga tayyorgarlik — dastur rasmiy imtihon mavzulari asosida tuzilgan",
    "Detal, yig'ma va texnik chizmani mustaqil yasash",
    "Oddiy Sheet Metal detallar va ularning yoyilmasi",
    "Oddiy statik tahlil (Simulation): kuchlanish va xavfsizlik koeffitsiyenti",
    "Yakuniy loyiha: 5–8 detalli mexanizm — yig'ma, chizmalar va BOM bilan",
  ],

  // 16 dars, 4 hafta. Batafsil (amaliyot, uy vazifasi) -- darslar rejasi hujjatida.
  dastur: [
    {
      hafta: "1-hafta",
      nomi: "Eskiz va asosiy detallar",
      darslar: [
        { mavzu: "Kirish va muhit", tafsilot: "Interfeys, fayl turlari, birliklar, shablonlar; dasturni o'rnatish" },
        { mavzu: "2D eskiz I", tafsilot: "Chiziq, aylana, yoy; bog'lanishlar (relations), Smart Dimension" },
        { mavzu: "2D eskiz II va Extrude", tafsilot: "Ellips, Convert, Trim, Offset, Mirror; Extruded Boss/Cut" },
        { mavzu: "Asosiy 3D amallar", tafsilot: "Revolve, Fillet, Chamfer, Hole Wizard; material va massa" },
      ],
    },
    {
      hafta: "2-hafta",
      nomi: "Murakkab detallar va parametrlar",
      darslar: [
        { mavzu: "Detalni boyitish", tafsilot: "Shell, Rib, Draft; chiziqli, aylanma va Fill massivlar, Mirror" },
        { mavzu: "Yordamchi geometriya, Sweep va Loft", tafsilot: "Tekislik va o'qlar; Sweep va Loft asoslari" },
        { mavzu: "Parametrlar va konfiguratsiyalar", tafsilot: "Tenglamalar, bog'langan o'lchamlar, Design Table" },
        { mavzu: "Detalni o'zgartirish mashqi", tafsilot: "Chizmadan model, Move/Delete Face, multi-body detallar" },
      ],
    },
    {
      hafta: "3-hafta",
      nomi: "Yig'ma va texnik chizma",
      darslar: [
        { mavzu: "Yig'ma I", tafsilot: "Komponent qo'shish, standart bog'lanishlar (Mates), mate references" },
        { mavzu: "Yig'ma II", tafsilot: "Murakkab bog'lanishlar, in-context, Interference va Collision Detection" },
        { mavzu: "Texnik chizma I", tafsilot: "Standart, kesim, detal va yordamchi ko'rinishlar" },
        { mavzu: "Texnik chizma II", tafsilot: "O'lchamlar, annotatsiyalar, dopusklar, BOM va balloonlar" },
      ],
    },
    {
      hafta: "4-hafta",
      nomi: "Sheet Metal, Simulation va imtihonga tayyorgarlik",
      darslar: [
        { mavzu: "Sheet Metal", tafsilot: "Base, Edge va Miter Flange, Sketched Bend, yoyilma (Flat Pattern)" },
        { mavzu: "Simulation", tafsilot: "Statik tahlil: mahkamlash, yuklama, setka, natijalar" },
        { mavzu: "CSWA'ga tayyorgarlik", tafsilot: "Imtihon formati, namuna savollar, vaqtga sinov imtihoni" },
        { mavzu: "CSWP va yakuniy loyiha", tafsilot: "CSWP bo'limlari bo'yicha mashq, yakuniy loyiha himoyasi" },
      ],
    },
  ],
} as const;

// Formadagi "SOLIDWORKS bilan tajribangiz" variantlari (server ham shu ro'yxat bilan tekshiradi).
export const DARAJALAR = ["Endi boshlayman", "Biroz bilaman", "Ishda ishlataman"] as const;
