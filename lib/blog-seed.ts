// Boshlang'ich blog yozuvlari. Ular:
//  - baza hali tayyor bo'lmaganda saytda ko'rsatiladi (faqat nashr etilganlari),
//  - admin paneldagi "Boshlang'ich yozuvlarni yuklash" tugmasi bilan bazaga ko'chiriladi,
//  - mahalliy sinovda (bazasiz) boshlang'ich to'plam bo'ladi.
//
// Barcha ma'lumotlar rasmiy manbalardan olingan (havolalar har yozuv oxirida) va 2026-yil sentabr holatiga tegishli.
// Yangi faktlarni admin paneldan yozing: bu fayl faqat boshlang'ich to'plam uchun.
import type { BlogPost } from "@/lib/blog";

const SEED_DATE = "2026-09-20T00:00:00.000Z";

export const SEED_POSTS: BlogPost[] = [
  {
    id: "seed-solidworks-catia-3dexperience-imkoniyatlar-va-talablar",
    slug: "solidworks-catia-3dexperience-imkoniyatlar-va-talablar",
    type: "article",
    title: "SOLIDWORKS, CATIA va 3DEXPERIENCE: nimalar qila olasiz va qanday kompyuter kerak",
    excerpt:
      "Uchta Dassault Systèmes yechimi nima uchun ishlatiladi, ularga qanday talablar qo'yiladi va tanlashda nimaga e'tibor berish kerak. Faqat rasmiy manbalardagi ma'lumotlar, 2026-yil sentabr holatiga.",
    content: `Bu maqolada uchta mashhur muhandislik yechimi haqida qisqa va aniq ma'lumot bor: **SOLIDWORKS**, **CATIA** va **3DEXPERIENCE**. Uchalasini ham Dassault Systèmes ishlab chiqaradi. Ma'lumotlar rasmiy sahifalardan olingan va 2026-yil sentabr holatiga tegishli. Talablar har yili o'zgaradi, shuning uchun maqola oxirida rasmiy havolalar berilgan.

## SOLIDWORKS: nimalar qila olasiz

SOLIDWORKS — 3D CAD (kompyuterda loyihalash) dasturi. Rasmiy sahifaga ko'ra, u bilan detallar, yig'malar va ishlab chiqarishga tayyor hujjatlar (chizmalar) yaratiladi. Parametrik modellashtirishda o'lchamni o'zgartirsangiz, o'zgarish butun modelga tarqaladi.

- **SOLIDWORKS Design** kompyuterga o'rnatiladi va xohlasangiz bulut imkoniyatlariga ulanadi: fayllarni ulashish, izoh qoldirish va o'zgarishlar tarixini saqlash.
- **SOLIDWORKS xDesign** brauzerda ishlaydi. Rasmiy ta'rifga ko'ra, uni o'rnatish, yangilash yoki maxsus uskuna kerak emas.
- Litsenziya ikki xil: nomli foydalanuvchi (bir nechta qurilmada ishlatiladi) yoki bitta qurilmaga bog'langan.
- SOLIDWORKS oilasida yana PDM, Electrical, Visualize, Composer va eDrawings kabi mahsulotlar bor.
- 2026-versiya yangiliklaridan: takrorlanadigan ishlarni (masalan, chizma yaratishni) avtomatlashtiradigan AI vositalari va katta yig'malarda faqat kerakli qismlarni yuklash (Selective Loading).

## CATIA: nimalar qila olasiz

CATIA V5 nomi *Computer-Aided Three-dimensional Interactive Application V5* so'zlaridan olingan. Dassault Systèmes uni CAD, CAM va CAE uchun keng qo'llaniladigan dasturlar to'plami deb ta'riflaydi va avtomobilsozlik, aviatsiya hamda sanoat uskunalari kabi sohalarni tilga oladi.

- Modullar: Part Design, Assembly Design, Drafting, Surfacing va boshqalar.
- CAM: CNC dastgohlar uchun yo'l (toolpath) hosil qilish.
- Simulyatsiya va tahlil: mahsulotning xatti-harakati va mustahkamligini baholash.
- Rasmiy CATIA sahifasi yo'nalishlarni shunday ajratadi: bino va infratuzilma, dizayn va stayling, elektr va suyuqlik muhandisligi, mexanik muhandislik, tizimlar muhandisligi.
- Mahsulot qatorida CATIA V5 bilan birga 3DEXPERIENCE CATIA va CATIA Magic ham bor.

## 3DEXPERIENCE: bu nima

3DEXPERIENCE — Dassault Systèmes platformasi. Rasmiy hujjatlarga ko'ra, CATIA, SOLIDWORKS, ENOVIA, SIMULIA va boshqa ilovalarning desktop hamda brauzer mijozlari shu platforma doirasida sertifikatlanadi. Platformaning bulutli (SaaS) va o'z serveringizda o'rnatiladigan (on-premise) variantlari tilga olinadi. SOLIDWORKS Design esa 3DEXPERIENCE platformasiga ulanib, real vaqtda fikr-mulohaza olish, ma'lumotlarni boshqarish va jamoada ishlash imkonini beradi. Bugungi kunda rasmiy sahifa platformani korxona bilimi, sun'iy intellekt va virtual egizaklar (Virtual Twin) atrofida tavsiflaydi.

## Talablar

**SOLIDWORKS (rasmiy talablar):**

- Operatsion tizim: Windows 11 (64-bit). Windows 10 ni qo'llab-quvvatlaydigan oxirgi versiya — SOLIDWORKS 2025 SP5. Windows Home nashrlari qo'llab-quvvatlanmaydi.
- Protsessor: x86_64 (Intel 64 yoki AMD64).
- RAM: 16 GB (32 GB tavsiya etiladi).
- Videokarta: sertifikatlangan kartalar va drayverlar.
- Disk: SSD tavsiya etiladi.
- Mac kompyuterda Boot Camp orqali Windows ishlatish qo'llab-quvvatlanmaydi.

**CATIA va 3DEXPERIENCE:** Dassault Systèmes sertifikatlangan ish stansiyalari ro'yxatini e'lon qiladi. 2026-yilning aprel, may, iyun va iyul oylari uchun alohida yangi ro'yxatlar bor. Sertifikatsiya 64-bitli desktop va brauzer mijozlariga tegishli. Bulutga o'tishdan oldin kompyuteringiz sertifikatlanganini rasmiy "Cloud Eligibility" vositasi bilan tekshirish tavsiya etiladi. O'z serveringizda o'rnatishdan oldin esa "On-Premise Program Directories" hujjatlariga qarash kerak.

## Takliflar

- Kompyuter olishdan oldin aynan o'rnatmoqchi bo'lgan versiyaning rasmiy talablar sahifasini oching: talablar yildan yilga o'zgaradi.
- Rasmiy tavsiya 32 GB RAM. Yangi kompyuter olayotgan bo'lsangiz, shuni maqsad qiling.
- Noutbuk olayotganda Windows Home emasligini tekshiring.
- Videokartani [SOLIDWORKS sertifikatlangan ro'yxati](https://www.solidworks.com/support/hardware-certification/) dan tanlang.
- Kompyuteringiz talabga javob bermasa, brauzerda ishlaydigan SOLIDWORKS xDesign ni ko'rib chiqing.
- Talaba yoki o'qituvchi bo'lsangiz: CATIA sahifasida Academic va Student litsenziya dasturlari alohida ko'rsatilgan. Shartlarini rasmiy sahifadan o'qing.

## Manbalar

Barchasi rasmiy sahifalar, 2026-yil sentabr holatida:

- [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)
- [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)
- [SOLIDWORKS Hardware Certification](https://www.solidworks.com/support/hardware-certification/)
- [CATIA, Dassault Systèmes](https://www.3ds.com/products/catia/)
- [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)
- [3DEXPERIENCE, Dassault Systèmes](https://www.3ds.com/products/3dexperience)
- [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    coverImage: null,
    published: true,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-catia-v5-nomi-nimani-anglatadi",
    slug: "catia-v5-nomi-nimani-anglatadi",
    type: "fact",
    title: "CATIA V5 nomi nimani anglatadi?",
    excerpt:
      "CATIA nomi qisqartma. Dassault Systèmes uni CAD, CAM va CAE uchun keng ishlatiladigan dasturlar to'plami deb ta'riflaydi.",
    content: `**CATIA V5** — *Computer-Aided Three-dimensional Interactive Application V5* so'zlarining qisqartmasi. Dassault Systèmes uni CAD (loyihalash), CAM (ishlab chiqarish) va CAE (muhandislik tahlili) uchun keng qo'llaniladigan dasturlar to'plami deb ta'riflaydi.

Rasmiy sahifada avtomobilsozlik, aviatsiya va sanoat uskunalari kabi sohalar tilga olinadi.

Manba: [CATIA V5, Dassault Systèmes](https://www.3ds.com/products/catia/catia-v5)`,
    coverImage: null,
    published: true,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-solidworks-windows-home-qollab-quvvatlanmaydi",
    slug: "solidworks-windows-home-qollab-quvvatlanmaydi",
    type: "fact",
    title: "SOLIDWORKS Windows Home'ni qo'llab-quvvatlamaydi",
    excerpt:
      "Kompyuter olishdan oldin Windows nashrini tekshiring: SOLIDWORKS rasmiy talablarida Home nashrlari qo'llab-quvvatlanmaydi.",
    content: `SOLIDWORKS rasmiy talablarida alohida qayd etilgan: **Windows Home nashrlari qo'llab-quvvatlanmaydi**. Kompyuter yoki noutbuk olishdan oldin Windows nashrini tekshirib oling.

Yana bir eslatma: Mac kompyuterda Boot Camp orqali Windows ishlatish ham qo'llab-quvvatlanmaydi.

Manba: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    coverImage: null,
    published: true,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-solidworks-uchun-qancha-ram-kerak",
    slug: "solidworks-uchun-qancha-ram-kerak",
    type: "fact",
    title: "SOLIDWORKS uchun qancha RAM kerak?",
    excerpt: "Rasmiy talab — 16 GB, tavsiya — 32 GB.",
    content: `SOLIDWORKS rasmiy talablarida RAM: **16 GB (32 GB tavsiya etiladi)**. PDM Contributor/Viewer yoki Electrical Schematic uchun 8 GB (16 GB tavsiya etiladi).

Videokarta uchun talab aniq model emas, balki "sertifikatlangan kartalar va drayverlar" deb yozilgan. Diskda esa SSD tavsiya etiladi.

Manba: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    coverImage: null,
    published: false,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-windows-10-va-solidworks-oxirgi-versiya",
    slug: "windows-10-va-solidworks-oxirgi-versiya",
    type: "fact",
    title: "Windows 10 va SOLIDWORKS: oxirgi versiya qaysi?",
    excerpt: "Windows 10 ni qo'llab-quvvatlaydigan oxirgi SOLIDWORKS versiyasi — 2025 SP5.",
    content: `SOLIDWORKS qo'llab-quvvatlash jadvaliga ko'ra, Windows 10 (64-bit) ni qo'llab-quvvatlaydigan **oxirgi versiya — SOLIDWORKS 2025 SP5**. Windows 11 (64-bit) uchun qo'llab-quvvatlash hozir faol.

Jadval izohida yozilishicha, "End of Support" — Microsoft mahsuloti qo'llab-quvvatlanadigan oxirgi SOLIDWORKS versiyasi.

Manba: [SOLIDWORKS System Requirements](https://www.solidworks.com/support/system-requirements)`,
    coverImage: null,
    published: false,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-catia-uchun-kompyuter-sertifikatlangan-royxat",
    slug: "catia-uchun-kompyuter-sertifikatlangan-royxat",
    type: "fact",
    title: "CATIA uchun kompyuter tanlashda sertifikatlangan ro'yxatga qarang",
    excerpt: "Dassault Systèmes sertifikatlangan ish stansiyalari ro'yxatini muntazam e'lon qiladi.",
    content: `Dassault Systèmes rasmiy sahifasida sertifikatlangan ish stansiyalari ro'yxati e'lon qilinadi: 2026-yilning aprel, may, iyun va iyul oylari uchun alohida yangi ro'yxatlar bor. Sertifikatsiya 3DEXPERIENCE platformasi, CATIA, SOLIDWORKS, ENOVIA, SIMULIA va boshqa ilovalarning 64-bitli desktop va brauzer mijozlariga tegishli. V5 uchun esa 64-bitli "rich client" mahsulotlariga.

Bulutga (3DEXPERIENCE SaaS) o'tishdan oldin kompyuteringiz sertifikatlanganini "Cloud Eligibility" vositasi bilan tekshirish tavsiya etiladi.

Manba: [Certified Hardware and Software, Dassault Systèmes](https://www.3ds.com/support/hardware-and-software)`,
    coverImage: null,
    published: false,
    publishedAt: SEED_DATE,
  },
  {
    id: "seed-solidworks-2026-selective-loading",
    slug: "solidworks-2026-selective-loading",
    type: "fact",
    title: "SOLIDWORKS 2026: katta yig'mada faqat kerakli qismlarni yuklash",
    excerpt: "Selective Loading katta yig'malar bilan ishlashni yengillashtiradi (rasmiy ta'rif).",
    content: `SOLIDWORKS Design 2026 yangiliklari orasida rasmiy sahifa **Selective Loading** ni keltiradi: katta yig'mada faqat kerakli komponentlarni yuklab, ishlash samaradorligini oshirish imkoni.

Shu bilan birga, rasmiy sahifa takrorlanadigan ishlarni (masalan, chizma yaratish va yig'mani qayta qurish) avtomatlashtiradigan AI vositalarini ham tilga oladi.

Manba: [SOLIDWORKS 3D CAD](https://www.solidworks.com/product/solidworks-3d-cad)`,
    coverImage: null,
    published: false,
    publishedAt: SEED_DATE,
  },
];
