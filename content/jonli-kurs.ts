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
  // KEYIN-TOLDIRING: keyingi guruh boshlanish sanasi ma'lum bo'lgach yozing, masalan
  // "15-noyabr 2026" (ruscha/inglizchasini content/jonli-kurs-tarjima.ts'ga ham).
  // null bo'lsa sana sahifada umuman ko'rinmaydi.
  boshlanish: null as string | null,

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

  // Sahifa boshidagi qisqa taklif (e'londagi havoladan kelgan odam birinchi o'qiydigan matn).
  taklif:
    "4 hafta ichida SOLIDWORKS'da detal, yig'ma va texnik chizmani mustaqil yasashni o'rganasiz va " +
    "xalqaro CSWA hamda CSWP imtihonlariga tayyorlanasiz. Video emas — jonli darslar, kichik guruh " +
    "va har bir savolga o'sha zahoti javob.",

  kimlarUchun: [
    { nomi: "Talabalar", izoh: "Muhandislik yo'nalishida o'qiysiz va SOLIDWORKS'ni amalda, tartib bilan o'rganmoqchisiz." },
    { nomi: "Yosh muhandislar va konstruktorlar", izoh: "Ishda tezroq va to'g'riroq model, yig'ma va chizma qilishni xohlaysiz." },
    { nomi: "Boshqa dasturdan o'tayotganlar", izoh: "AutoCAD yoki boshqa CAD'da ishlagansiz, endi 3D parametrik modellashtirishga o'tasiz." },
    { nomi: "Sertifikat olmoqchi bo'lganlar", izoh: "CSWA va CSWP — SOLIDWORKS'ning rasmiy sertifikatlari; rezyumeda bilimingizni tasdiqlaydi." },
  ],

  // Darslar qanday o'tadi (darslar rejasi hujjatiga mos).
  darsFormati: [
    { nomi: "Jonli Zoom darsi", izoh: "Ekranimda ko'rsataman, siz o'sha zahoti takrorlaysiz va savol berasiz." },
    { nomi: "Aniq tuzilish", izoh: "Har dars 1,5–2 soat: takrorlash, yangi mavzu, keyin amaliyot." },
    { nomi: "Kichik guruh", izoh: "Guruhda atigi 5 kishi — har bir o'quvchining ishi ko'rib chiqiladi." },
    { nomi: "Uy vazifasi", izoh: "Har darsdan keyin amaliy topshiriq, keyingi dars uni takrorlash bilan boshlanadi." },
    { nomi: "Haftalik mini-test", izoh: "Har hafta oxirida imtihon uslubida, vaqtga qarshi mashq." },
    { nomi: "Yakuniy loyiha", izoh: "Kurs oxirida o'z mexanizmingiz: detallar, yig'ma, chizmalar va BOM." },
  ],

  savollar: [
    // Javoblar egasining so'zlari asosida (2026-10-11).
    { q: "SOLIDWORKS'ni umuman bilmasam bo'ladimi?", a: "Ha, bo'ladi — noldan birga o'rganamiz. Birinchi darsda dasturni o'rnatib, interfeys bilan tanishamiz." },
    { q: "Qanday kompyuter kerak?", a: "SOLIDWORKS'ni bemalol ko'tara oladigan kompyuter. Dastur faqat Windows'da ishlaydi." },
    { q: "Dasturni qayerdan olaman?", a: "Rasmiy saytdan birga yuklab olamiz. Talabalar uchun SOLIDWORKS Design Standard for Students rasmiy va bepul." },
    { q: "To'lov qanday?", a: "Birinchi dars bepul. Format yoqsa, keyin karta orqali, Click yoki bank o'tkazmasi bilan to'laysiz." },
    { q: "CSWA va CSWP sertifikatini kim beradi?", a: "Rasmiy SOLIDWORKS (Dassault Systèmes). Imtihon solidworks.com orqali topshiriladi, kurs esa aynan shu imtihon mavzulari bo'yicha tayyorlaydi." },
  ],

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
