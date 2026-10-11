// =============================================
// KURSLAR MA'LUMOTLARI — Demo statik data
// =============================================

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  text?: string;
  images?: string[];
  isFree: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  best: boolean;
}

export interface MarketingData {
  whyTitle: string;
  whyDesc: string;
  benefits: { title: string; desc: string }[];
  capabilitiesTitle: string;
  capabilities: { title: string; desc: string }[];
  stepsTitle: string;
  steps: { step: string; title: string; points: string[] }[];
  outcomes: string[];
  pricing: PricingPlan[];
  faq: { q: string; a: string }[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number; // USD
  priceUZS: number; // UZS
  thumbnail: string;
  instructor: string;
  instructorAvatar: string;
  level: "Boshlang'ich" | "O'rta" | "Yuqori";
  duration: string;
  studentsCount: number;
  rating: number;
  tags: string[];
  modules: Module[];
  marketing: MarketingData;
  // Kurs, modul yoki darsning eng oxirgi o'zgargan vaqti (ISO). Faqat bazadan
  // o'qilganda bor; sitemap'dagi lastmod uchun.
  updatedAt?: string;
}

// Narx, daraja, instruktor, modul va darslar saytga BAZADAN keladi (admin panel ->
// "Kurslar mazmuni"). Bu fayldan faqat har bir kursning "marketing" matni (Nega bu
// kurs, dastur bosqichlari, tariflar jadvali, FAQ) olinadi -- uni shu yerda tahrirlang.
// Qoida: kompaniya nomlari, maosh va'dalari, o'ylab topilgan raqamlar yozilmaydi --
// faqat isbotlanadigan ma'lumot.
export const COURSES: Course[] = [
  {
    id: "solidworks-basics",
    title: "SOLIDWORKS Asoslari",
    subtitle: "Noldan boshlab: eskiz, 3D detal, yig'ma va texnik chizma",
    description: "SOLIDWORKS'ni noldan o'rganasiz: 2D eskiz, 3D detal, harakatlanuvchi yig'ma va ishlab chiqarish uchun texnik chizma. Kurs oxirida yakuniy loyiha — to'liq texnik hujjat tayyorlaysiz.",
    price: 99,
    priceUZS: 1260000,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    instructor: "TechAxis",
    instructorAvatar: "",
    level: "Boshlang'ich",
    duration: "12–14 dars",
    studentsCount: 128,
    rating: 4.8,
    tags: ["SOLIDWORKS", "3D", "CAD", "Chizmachilik"],
    marketing: {
      whyTitle: "Nega SOLIDWORKS?",
      whyDesc: "Mashinasozlik va mahsulot dizaynida keng tarqalgan 3D CAD dasturi: detal, yig'ma va texnik chizma bitta muhitda.",
      benefits: [
        { title: "Keng tarqalgan", desc: "Mashinasozlik va mahsulot dizaynida eng ko'p ishlatiladigan 3D CAD dasturlaridan biri." },
        { title: "Parametrik model", desc: "O'lchamni o'zgartirsangiz, detal, yig'ma va chizma birga yangilanadi." },
        { title: "Butun jarayon bitta dasturda", desc: "Eskizdan detalga, detaldan yig'maga va ishlab chiqarish chizmasigacha." }
      ],
      capabilitiesTitle: "Kursda nimalarni o'rganasiz",
      capabilities: [
        { title: "2D eskiz", desc: "Chiziq, aylana, spline; bog'lanishlar (relations) va Smart Dimension bilan to'liq aniqlangan eskiz." },
        { title: "3D detal", desc: "Extrude, Revolve, Fillet, Chamfer, Shell, Pattern va Mirror bilan detal yasash." },
        { title: "Yig'ma", desc: "Detallarni Mates bilan yig'ish, harakatlanuvchi mexanizm, to'qnashuvni tekshirish va BOM." },
        { title: "Texnik chizma", desc: "Ko'rinishlar, o'lchamlar, dopusklar va annotatsiyalar bilan ishlab chiqarish chizmasi." }
      ],
      stepsTitle: "Kurs dasturi",
      steps: [
        { step: "1", title: "Kirish va eskiz", points: ["Interfeys, sozlamalar va shablonlar", "Eskiz, bog'lanishlar va o'lchamlar", "Eskiz amaliyoti: detal chizish"] },
        { step: "2", title: "3D modellashtirish", points: ["Extrude va Revolve", "Fillet, Chamfer va Shell", "Pattern va Mirror, murakkab model amaliyoti"] },
        { step: "3", title: "Yig'ma", points: ["Yig'ma yaratish va Mates", "Harakatlanuvchi mexanizmlar", "Interference Detection va BOM"] },
        { step: "4", title: "Texnik chizma va yakuniy loyiha", points: ["Chizma ko'rinishlari", "O'lchamlar va annotatsiyalar", "Yakuniy loyiha: to'liq texnik hujjat"] }
      ],
      outcomes: [
        "Eskizdan boshlab 3D detal yasay olasiz",
        "Detallardan harakatlanuvchi yig'ma tuzib, to'qnashuvlarni tekshirasiz",
        "Ishlab chiqarish uchun o'lchamli texnik chizma va BOM tayyorlaysiz"
      ],
      pricing: [
        { name: "Starter", price: "Asosiy", desc: "0 dan boshlovchilar uchun", features: ["Asosiy (Poydevor) qism videolari", "Dastur instalyatsiyasiga yordam", "2 ta kichik loyiha chizish", "Sertifikat (Asosiy bosqich)"], cta: "Sotib Olish", best: false },
        { name: "Pro", price: "$99", desc: "Muhandislik cho'qqisi (Amaliyot)", features: ["To'liq videodarslar", "Murakkab Assambleya tahlili", "Render va Visualizatsiya bonus", "Premium sertifikat", "Ish izlash bo'yicha ko'rsatma"], cta: "Eng ma'quli", best: true },
        { name: "Mentor", price: "VIP", desc: "Jonli yordam", features: ["Barcha Pro imkoniyatlar", "Kurs davomida 1:1 Jonli dars (zoom)", "Uy vazifalar tahlili va nazorat", "Kafolatlangan Portfolio (5+ detal)", "Karyera konsultatsiyasi"], cta: "Band Qilish", best: false }
      ],
      faq: [
        { q: "SOLIDWORKS'ni o'rganish qiyinmi?", a: "Kurs noldan boshlanadi: avval interfeys va eskiz, keyin 3D, yig'ma va chizma. Oldindan CAD tajribasi shart emas." },
        { q: "Kompyuterimga qanday talablar bor?", a: "SOLIDWORKS faqat Windows'da ishlaydi. Aniq talablar rasmiy solidworks.com saytidagi System Requirements sahifasida." },
        { q: "Dasturni qayerdan olaman?", a: "Talabalar uchun SOLIDWORKS Design Standard for Students rasmiy va bepul: solidworks.com/product/students." }
      ]
    },
    modules: [
      {
        id: "sw-m1",
        title: "Kirish va Muhit",
        lessons: [
          { id: "sw-l1", title: "SOLIDWORKS'ga kirish va o'rnatish", duration: "8:45", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Ushbu darsda SOLIDWORKS dasturini kompyuteringizga qanday o'rnatishni va birinchi marta ishga tushirishni o'rganamiz. Dasturning asosiy interfeysi va navigatsiya bilan tanishamiz." },
          { id: "sw-l2", title: "Interfeys va asosiy buyruqlar", duration: "12:20", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "SOLIDWORKS interfeysi: Feature Manager, grafik maydon va buyruqlar paneli bilan ishlashni o'rganamiz. Sichqoncha va klaviatura yorliqlarini o'zlashtiramiz." },
          { id: "sw-l3", title: "Loyiha sozlamalari va shablonlar", duration: "10:15", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Yangi loyiha yaratish, shablon tanlash va asosiy hujjat sozlamalarini o'rnatishni ko'ramiz. O'lchov birliklari va koordinata tizimlarini sozlaymiz." },
        ]
      },
      {
        id: "sw-m2",
        title: "2D Sketch (Eskiz)",
        lessons: [
          { id: "sw-l4", title: "Sketch asoslari va chiziqlar", duration: "15:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "2D eskizda to'g'ri chiziq, qiyshiq chiziq va murakkab shakllarni qanday chizishni o'rganamiz. Smart Dimensions yordamida aniq o'lchamlar beramiz." },
          { id: "sw-l5", title: "Geometric va Smart Dimensions", duration: "18:45", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Geometrik cheklovlar (horizontal, vertical, parallel, perpendicular) va o'lcham cheklovlari orqali eskizni to'liq aniqlashtiramiz." },
          { id: "sw-l6", title: "Murakkab shakllar va spline", duration: "14:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Aylana, ellips, to'rtburchak va spline kabi murakkab shakllarni chizishni o'rganamiz. Mirror va pattern buyruqlari bilan vaqtni tejashni ko'ramiz." },
          { id: "sw-l7", title: "Sketch amaliyoti: Detal chizish", duration: "22:10", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Real muhandislik detalining 2D eskizini chizamiz. Barcha o'rganilgan texnikalarni amalda qo'llaymiz va xatolarni tuzatish usullarini ko'ramiz." },
        ]
      },
      {
        id: "sw-m3",
        title: "3D Modellashtirish",
        lessons: [
          { id: "sw-l8", title: "Extrude va Revolve", duration: "20:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "2D eskizdan 3D model yaratishning asosiy ikki usuli: Extrude (cho'zish) va Revolve (aylantirish) buyruqlarini o'rganamiz. Har bir buyruqning parametrlarini batafsil ko'ramiz." },
          { id: "sw-l9", title: "Fillet, Chamfer va Shell", duration: "16:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Modelni chiroyli va ishlab chiqarishga tayyor qilish uchun burchaklarni yumshatish (Fillet), kesish (Chamfer) va qobiq yaratish (Shell) buyruqlarini o'rganamiz." },
          { id: "sw-l10", title: "Pattern va Mirror", duration: "19:15", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Bir xil elementlarni ko'paytirish uchun Linear Pattern, Circular Pattern va Mirror funksiyalarini o'rganamiz. Bu buyruqlar loyihalash vaqtini sezilarli qisqartiradi." },
          { id: "sw-l11", title: "Murakkab 3D model: Amaliyot", duration: "35:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Haqiqiy muhandislik detalini (flanets yoki bracket) noldan yaratamiz. Barcha 3D modellashtirish texnikalarini kompleks loyihada birgalikda qo'llaymiz." },
        ]
      },
      {
        id: "sw-m4",
        title: "Assembly (Yig'ma)",
        lessons: [
          { id: "sw-l12", title: "Assembly yaratish va Mates", duration: "25:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Bir nechta detallarni bir joyga yig'ish uchun Assembly modulini o'rganamiz. Coincident, Concentric va Distance Mates bilan detallarni to'g'ri joylashtirish usullarini ko'ramiz." },
          { id: "sw-l13", title: "Harakatlanuvchi mexanizmlar", duration: "28:20", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Assembly'da harakat simulyatsiyasini ko'ramiz. Sharnir va mexanik bog'liqliklar yordamida mexanizmning harakatini tekshiramiz." },
          { id: "sw-l14", title: "Interference Detection va BOM", duration: "22:45", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Detallar bir-biriga tegib ketmasligi uchun Interference Detection funksiyasini ishlatamiz. Bill of Materials (BOM) jadvalini avtomatik yaratishni o'rganamiz." },
        ]
      },
      {
        id: "sw-m5",
        title: "Texnik Chizma (Drawing)",
        lessons: [
          { id: "sw-l15", title: "Drawing asoslari va ko'rinishlar", duration: "20:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "3D modeldan 2D texnik chizma yaratishni o'rganamiz. Frontal, lateral va plan ko'rinishlarini chiqarishni va GOST/ISO standartlariga mos holatga keltirishni ko'ramiz." },
          { id: "sw-l16", title: "O'lchamlar va annotatsiyalar", duration: "18:15", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Texnik chizmaga o'lchamlar, toleranslar, sirt sifati belgilari va texnik talablarni qo'shishni o'rganamiz. Bu ma'lumotlar ishlab chiqarish uchun zarurdir." },
          { id: "sw-l17", title: "Yakuniy loyiha: To'liq texnik hujjat", duration: "45:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Kurs yakuniy loyihasi: Murakkab mexanizm uchun to'liq texnik hujjat paketi tayyorlaymiz. Model, assembly va texnik chizmalar majmuasini portfolio uchun taqdim etamiz." },
        ]
      }
    ]
  },
  {
    id: "catia-v5",
    title: "CATIA V5 Professional",
    subtitle: "Sketcher, Part Design, yig'ma va texnik chizma",
    description: "CATIA V5 — Dassault Systèmes dasturi, aviatsiya va avtomobilsozlikda keng qo'llaniladi. Kursda Sketcher, Part Design, Assembly Design, DMU Kinematics va Drafting workbench'larini amaliy loyihalar bilan o'rganasiz.",
    price: 149,
    priceUZS: 1890000,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    instructor: "TechAxis",
    instructorAvatar: "",
    level: "O'rta",
    duration: "12–14 dars",
    studentsCount: 84,
    rating: 4.9,
    tags: ["CATIA", "CAD", "Aviatsiya", "Avtomobil"],
    marketing: {
      whyTitle: "Nega CATIA V5?",
      whyDesc: "Dassault Systèmes dasturi: aviatsiya va avtomobilsozlikda murakkab detallar va katta yig'malar uchun ishlatiladi.",
      benefits: [
        { title: "Aviatsiya va avtomobilsozlik", desc: "CATIA aynan shu sohalarda murakkab yuzalar va katta yig'malar uchun ishlatiladi." },
        { title: "Workbench tizimi", desc: "Har bir ish turi — eskiz, detal, yig'ma, chizma — o'z workbench'ida: tartibli va kuchli muhit." },
        { title: "Kinematika", desc: "DMU Kinematics bilan mexanizm harakatini kompyuterda tekshirish." }
      ],
      capabilitiesTitle: "Kursda nimalarni o'rganasiz",
      capabilities: [
        { title: "Sketcher", desc: "2D profillar, geometrik va o'lcham cheklovlari bilan to'liq aniqlangan eskiz." },
        { title: "Part Design", desc: "Pad, Pocket, Shaft, Fillet, Chamfer, Draft, Pattern va Mirror bilan 3D detal." },
        { title: "Assembly Design va DMU", desc: "Constraints bilan yig'ish, Bottom-Up va Top-Down yondashuv, DMU Kinematics." },
        { title: "Drafting", desc: "3D modeldan ko'rinishlari tartiblangan texnik chizma." }
      ],
      stepsTitle: "Kurs dasturi",
      steps: [
        { step: "1", title: "Kirish va Sketcher", points: ["Interfeys va Workbench tushunchasi", "Sketcher: shakllar va cheklovlar"] },
        { step: "2", title: "Part Design", points: ["Pad, Pocket va Shaft", "Fillet, Chamfer va Draft", "Pattern, Mirror va real detal amaliyoti"] },
        { step: "3", title: "Assembly Design", points: ["Yig'ma va Constraints", "Top-Down va Bottom-Up yondashuv", "DMU Kinematics: mexanizm harakati"] },
        { step: "4", title: "Drafting va yakuniy loyiha", points: ["Chizma va ko'rinishlar", "Yakuniy loyiha: detal, yig'ma va chizma"] }
      ],
      outcomes: [
        "CATIA V5 da eskizdan 3D detal yasaysiz",
        "Yig'ma tuzib, mexanizm harakatini DMU Kinematics'da tekshirasiz",
        "Detal va yig'ma uchun texnik chizma tayyorlaysiz"
      ],
      pricing: [
        { name: "Starter", price: "$49", desc: "Boshlang'ich imkoniyat", features: ["CATIA vizual kurslari (Part Design)", "Standart muhandislik amaliyoti", "Guruhda muhokama"], cta: "O'qish", best: false },
        { name: "Pro", price: "$149", desc: "Avtomobilsozlik Sirlari", features: ["Surfacing (GSD) va DMU maxsus qism", "Premium Telegram Yordamchi bot", "Portfolio (Eksklyuziv loyihalar)", "Certificate of Excellence"], cta: "Sotib Olish", best: true },
        { name: "Mentor", price: "Business", desc: "B2B / Shaxsiy mentoring", features: ["Zavod va ishlab chiqaruvchi xodimlari", "Muhandislik to'g'irlashlari konsultatsiyasi", "Sanoat sirlari asosidagi Master Class"], cta: "Bog'lanish", best: false }
      ],
      faq: [
        { q: "Oldin faqat AutoCAD'da ishlaganman. CATIA'ni o'rgana olamanmi?", a: "Ha. Kurs CATIA interfeysidan boshlanadi; AutoCAD'dagi chizma tajribasi eskiz bosqichida yordam beradi." },
        { q: "Kompyuterim kuchli bo'lishi kerakmi?", a: "CATIA V5 Windows'da ishlaydi; katta yig'malar uchun kuchliroq kompyuter kerak bo'ladi. Aniq talablar Dassault Systèmes rasmiy sahifasida." }
      ]
    },
    modules: [
      {
        id: "cat-m1",
        title: "Kirish",
        lessons: [
          { id: "cat-l1", title: "CATIA V5 ga kirish va interfeys", duration: "10:00", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "CATIA V5 dasturini o'rnatish va birinchi marta ishga tushirish. Asosiy menyu, asboblar paneli va Product Structure brauzerini o'rganamiz." },
          { id: "cat-l2", title: "Workbench tushunchasi va navigatsiya", duration: "13:30", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "CATIA V5 ning Workbench tizimini tushuntiramiz. Part Design, Assembly Design va Sketcher Workbench'lar o'rtasida qanday o'tishni ko'ramiz." },
          { id: "cat-l3", title: "Sketcher: Asosiy shakllar va cheklovlar", duration: "17:45", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "CATIA Sketcher muhitida 2D profillar chizamiz. Constraints (cheklovlar) va dimensional constraints orqali eskizni to'liq aniqlaymiz." },
        ]
      },
      {
        id: "cat-m2",
        title: "Part Design",
        lessons: [
          { id: "cat-l4", title: "Pad, Pocket va Shaft", duration: "22:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Part Design'ning asosiy buyruqlari: Pad (qo'shish), Pocket (kesish) va Shaft (aylantirish) yordamida 3D modellar yaratamiz." },
          { id: "cat-l5", title: "Fillet, Chamfer va Draft", duration: "16:20", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Detallarni ishlab chiqarishga tayyor qilish: Fillet burchaklarni yumshatadi, Chamfer qiyshiq kesim hosil qiladi, Draft qolipdan chiqarish uchun burchak beradi." },
          { id: "cat-l6", title: "Pattern va Mirror funksiyalari", duration: "14:50", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Rectangular Pattern, Circular Pattern va Mirror funksiyalari yordamida takroriy elementlarni samarali modellashtirish usullarini o'rganamiz." },
          { id: "cat-l7", title: "Part Design amaliyoti: Real detal", duration: "38:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Avtomobil yoki aerokosmik sohada ishlatiladigan real detalning CATIA V5 da modelini yaratamiz. Barcha o'rganilgan buyruqlarni kompleks loyihada qo'llaymiz." },
        ]
      },
      {
        id: "cat-m3",
        title: "Assembly Design",
        lessons: [
          { id: "cat-l8", title: "Assembly yaratish va Constraints", duration: "26:15", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "CATIA Assembly Design Workbench'ini o'rganamiz. Coincidence, Contact va Offset Constraints yordamida detallarni to'g'ri joylashtirish usullarini ko'ramiz." },
          { id: "cat-l9", title: "Top-Down va Bottom-Up yondashuv", duration: "20:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Yig'mani loyihalashning ikki asosiy metodologiyasi: Bottom-Up (tayyor detallarni yig'ish) va Top-Down (yig'ma ichida yangi detal yaratish) farqlarini tushuntiramiz." },
          { id: "cat-l10", title: "DMU Kinematics: Mexanizm harakati", duration: "30:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Digital Mock-Up Kinematics yordamida yig'madagi mexanizm harakatini simulyatsiya qilamiz. Joints va commands bilan harakatlanuvchi tizimlar tahlilini o'rganamiz." },
        ]
      },
      {
        id: "cat-m4",
        title: "Drafting (Texnik Chizma)",
        lessons: [
          { id: "cat-l11", title: "Drawing yaratish va ko'rinishlar", duration: "24:40", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "CATIA Drafting Workbench'ida 3D modeldan texnik chizma yaratamiz. Front, Top, Right va isometric ko'rinishlarini qo'shamiz va ularni tartiblaymiz." },
          { id: "cat-l12", title: "Yakuniy loyiha: Aviatsiya detali", duration: "50:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Kurs yakuniy loyihasi: Aviatsiya yoki avtomobil sohasi uchun to'liq muhandislik hujjat to'plami. Part, Assembly va Drawing fayllaridan iborat professional portfolio loyihasi." },
        ]
      }
    ]
  },
  {
    id: "3d-modeling",
    title: "SOLIDWORKS Simulation (FEA)",
    subtitle: "Detalni ishlab chiqarishdan oldin kompyuterda sinash",
    description: "SOLIDWORKS Simulation'da detal yuklama va issiqlikka qanday chidashini tekshirishni o'rganasiz: mesh, chegara shartlari, statik va termal tahlil, natijalarni talqin qilish va topologik optimizatsiya.",
    price: 79,
    priceUZS: 1000000,
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    instructor: "TechAxis",
    instructorAvatar: "",
    level: "O'rta",
    duration: "12–14 dars",
    studentsCount: 62,
    rating: 4.7,
    tags: ["FEA", "SOLIDWORKS Simulation", "Simulyatsiya", "Mustahkamlik"],
    marketing: {
      whyTitle: "Nega FEA?",
      whyDesc: "Detal yuklamaga chidashini prototip yasashdan oldin SOLIDWORKS Simulation'da tekshirish — vaqt va materialni tejaydi.",
      benefits: [
        { title: "Prototipdan oldin sinash", desc: "Detalni yasab sindirishdan oldin uni kompyuterda tekshirasiz." },
        { title: "Material tejash", desc: "Topologik optimizatsiya bilan keraksiz materialni olib tashlab, mustahkamlikni saqlaysiz." },
        { title: "Raqam bilan asoslash", desc: "Kuchlanish, deformatsiya va xavfsizlik koeffitsiyenti — qaror raqamlarga tayanadi." }
      ],
      capabilitiesTitle: "Kursda nimalarni o'rganasiz",
      capabilities: [
        { title: "Statik tahlil", desc: "Yuklama ostidagi kuchlanish, deformatsiya va xavfsizlik koeffitsiyenti." },
        { title: "Termal tahlil", desc: "Issiqlik o'tkazuvchanlik va issiqlikdan kengayish." },
        { title: "Mesh va konvergentsiya", desc: "Mesh sifati natija aniqligiga qanday ta'sir qilishini tekshirish." },
        { title: "Topologik optimizatsiya", desc: "Mustahkamlikni saqlagan holda material sarfini kamaytirish." }
      ],
      stepsTitle: "Kurs dasturi",
      steps: [
        { step: "1", title: "FEA asoslari", points: ["Element, tugun va mesh", "Material xossalari va chegara shartlari"] },
        { step: "2", title: "Statik va termal tahlil", points: ["Static Structural Analysis", "Thermal Analysis"] },
        { step: "3", title: "Natijalar", points: ["Mesh sifati va konvergentsiya", "Natijalarni talqin qilish va hisobot"] },
        { step: "4", title: "Amaliy loyihalar", points: ["Topologik optimizatsiya", "Yakuniy loyiha: to'liq tahlil hisoboti"] }
      ],
      outcomes: [
        "Detal yuklamaga chidashini hisob-kitob bilan asoslay olasiz",
        "Mesh va chegara shartlarini to'g'ri qo'yib, natijani tekshira olasiz",
        "Topologik optimizatsiya bilan material sarfini kamaytirasiz"
      ],
      pricing: [
        { name: "FEA Starter", price: "$39", desc: "Tahlilni noldan o'rganish", features: ["Asosiy metodikalar", "Oddiy statik simulyatsiyalar", "Loyihalar kutubxonasi"], cta: "Olish", best: false },
        { name: "Engineer Pro", price: "$79", desc: "Keng qamrovli tahlil", features: ["To'liq Thermal & Static", "Olimpiada/StartUp lar uchun muhandislik portfel", "Individual muhokama zali"], cta: "Eng optimali", best: true },
        { name: "Corporate", price: "$$$", desc: "Zavod yechimlari", features: ["Ishlab chiqarish bilan to'g'ridan to'g'ri integratsiya", "Korxona xodimlarini ommaviy tekshirish bazasi"], cta: "Bog'lanish", best: false }
      ],
      faq: [
        { q: "Kurs qaysi dasturda o'tiladi?", a: "SOLIDWORKS Simulation'da. SOLIDWORKS'da model yasash asoslarini bilish foydali bo'ladi." },
        { q: "Fizika va matematikani qancha chuqur bilish kerak?", a: "Kerakli mexanika tushunchalari (kuchlanish, deformatsiya, material xossalari) kurs davomida tushuntiriladi. Hisobni dastur bajaradi." }
      ]
    },
    modules: [
      {
        id: "fea-m1",
        title: "FEA Asoslari",
        lessons: [
          { id: "fea-l1", title: "FEA nima va nima uchun kerak?", duration: "11:00", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Finite Element Analysis (FEA) ning mohiyatini tushunamiz. Nima uchun fizik prototip o'rniga kompyuter simulyatsiyasi tejamkor va tezkor ekanligini ko'ramiz." },
          { id: "fea-l2", title: "Elementlar, tugunlar va mesh tushunchasi", duration: "14:30", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "FEA ning matematik asosi: model mayda elementlarga (mesh) bo'linadi, har bir tugunida (node) kuchlanish va deformatsiya hisoblanadi. Bu jarayonning mantiqini o'rganamiz." },
          { id: "fea-l3", title: "Material xossalari va Boundary Conditions", duration: "16:45", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "To'g'ri tahlil uchun material xossalarini (elastiklik moduli, Poisson koeffitsienti) kiritishni va chegara shartlarini (mahkamlash, yuk) o'rnatishni o'rganamiz." },
        ]
      },
      {
        id: "fea-m2",
        title: "Simulation (Simulyatsiya)",
        lessons: [
          { id: "fea-l4", title: "Static Structural Analysis", duration: "25:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Statik yuklamalar ostidagi kuchlanish, deformatsiya va xavfsizlik koeffitsientini hisoblashni o'rganamiz. Tahlilni SOLIDWORKS Simulation'da bajaramiz." },
          { id: "fea-l5", title: "Mesh sifati va konvergentsiya", duration: "20:15", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Mesh sifati tahlil aniqligiga qanday ta'sir qilishini o'rganamiz. Mesh refinement (qayta ingichkalash) va konvergentsiya testini o'tkazamiz." },
          { id: "fea-l6", title: "Thermal Analysis", duration: "22:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Issiqlik o'tkazuvchanlik va issiqlik kengayishini tahlil qilamiz. Elektron plata yoki dvigatel qismlari uchun termal simulyatsiya o'tkazamiz." },
          { id: "fea-l7", title: "Natijalarni talqin qilish va hisobot", duration: "18:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Von Mises kuchlanish, umumiy deformatsiya va xavfsizlik koeffitsienti natijalarini qanday o'qish va talqin qilishni o'rganamiz. Muhandislik hisoboti yozamiz." },
        ]
      },
      {
        id: "fea-m3",
        title: "Amaliy Loyihalar",
        lessons: [
          { id: "fea-l8", title: "Topologik optimizatsiya", duration: "30:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Topology Optimization yordamida material sarfini kamaytirib, detalning kuchliligini saqlaymiz. Zamonaviy muhandislikda bu usul vaqt va xarajatlarni keskin kamaytiradi." },
          { id: "fea-l9", title: "Yakuniy loyiha: To'liq tahlil hisoboti", duration: "55:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Kurs yakuniy loyihasi: Real sanoat detaliga to'liq FEA tahlili o'tkazamiz — statik, termal va optimallashtirish. Professional muhandislik hisoboti tayyorlaymiz." },
        ]
      }
    ]
  },
  {
    id: "plm-systems",
    title: "PLM Tizimlar (3DEXPERIENCE)",
    subtitle: "Muhandislik ma'lumotlarini bitta platformada boshqarish",
    description: "PLM (Product Lifecycle Management) — mahsulot ma'lumotlarini g'oyadan ishlab chiqarishgacha bitta tizimda boshqarish. Kursda 3DEXPERIENCE platformasida jamoaviy ishlash, versiyalar, BOM va o'zgarishlarni boshqarishni o'rganasiz.",
    price: 89,
    priceUZS: 1130000,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    instructor: "TechAxis",
    instructorAvatar: "",
    level: "Yuqori",
    duration: "12–14 dars",
    studentsCount: 45,
    rating: 4.6,
    tags: ["PLM", "PDM", "3DEXPERIENCE", "Boshqaruv"],
    marketing: {
      whyTitle: "Nega PLM?",
      whyDesc: "PDM/PLM tizimlari kompaniyaning barcha muhandislik ma'lumotlarini bir joyda boshqarish imkonini beradi.",
      benefits: [
        { title: "Yagona ma'lumot manbai", desc: "Fayllar dublikati yo'qoladi, hamma bir xil — oxirgi — versiya bilan ishlaydi." },
        { title: "Jamoaviy ishlash", desc: "Bir loyihada bir nechta muhandis rollar va ruxsatlar bilan ishlaydi." },
        { title: "O'zgarishlar nazorati", desc: "Versiya, reviziya va o'zgartirish so'rovlari (ECO) tartibli boshqariladi." },
        { title: "Dassault Systèmes tizimi", desc: "3DEXPERIENCE platformasida CATIA, SOLIDWORKS, ENOVIA va boshqa dasturlar bir joyda ishlaydi." }
      ],
      capabilitiesTitle: "Kursda nimalarni o'rganasiz",
      capabilities: [
        { title: "Collaborative Space", desc: "Jamoa uchun ish maydoni, rollar va ruxsatlarni sozlash." },
        { title: "Versiya va reviziya", desc: "Dizayn o'zgarishlari tarixi va kerak bo'lsa oldingi versiyaga qaytish." },
        { title: "BOM boshqaruvi", desc: "ENOVIA'da Bill of Materials: Engineering BOM va Manufacturing BOM farqi." },
        { title: "Workflow va o'zgarishlar", desc: "O'zgartirish so'rovi (ECO) va tasdiqlash zanjirini platformada sozlash." }
      ],
      stepsTitle: "Kurs dasturi",
      steps: [
        { step: "1", title: "PLM asoslari", points: ["PLM va PDM farqi", "3DEXPERIENCE interfeysi va Compass"] },
        { step: "2", title: "Jamoaviy ishlash", points: ["Collaborative Space va rollar", "Versiya va reviziya boshqaruvi"] },
        { step: "3", title: "BOM va o'zgarishlar", points: ["ENOVIA: BOM boshqaruvi", "Workflow va Change Management"] },
        { step: "4", title: "Amaliyot", points: ["Virtual kompaniya muhitini sozlash", "Yakuniy loyiha: PLM joriy etish rejasi"] }
      ],
      outcomes: [
        "Kichik jamoa uchun 3DEXPERIENCE muhitini sozlay olasiz",
        "Versiyalar, BOM va o'zgarishlarni platformada boshqarasiz",
        "Kompaniya uchun PLM joriy etish rejasini tuza olasiz"
      ],
      pricing: [
        { name: "Concept", price: "$49", desc: "Tushuncha", features: ["Barcha asosiy videolar", "Platforma demo ishlash logikasi", "Asosiy sertifikat"], cta: "Sotib Olish", best: false },
        { name: "Integrator", price: "$89", desc: "Menejer", features: ["To'liq ENOVIA amaliyotlari", "3DEXPERIENCE doirasida real Keyslar", "Premium qo'llab quvvatlash"], cta: "Tanlash", best: true },
        { name: "Enterprise", price: "$$$", desc: "Jamoa", features: ["Kompaniyangiz uchun PLM integratsiyasi buyurtmasi", "Xodimlaringizni onlayn o'qitish"], cta: "Ariza", best: false }
      ],
      faq: [
        { q: "Bu kurs menga kerakmi?", a: "Yakka o'zingiz ishlasangiz, PLM kamroq kerak. Ikki va undan ko'p kishi bitta loyihada ishlasa, ma'lumot va o'zgarishlarni boshqarish uchun muhim." }
      ]
    },
    modules: [
      {
        id: "plm-m1",
        title: "PLM Asoslari",
        lessons: [
          { id: "plm-l1", title: "PLM nima? PDM vs PLM farqi", duration: "12:00", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Product Lifecycle Management (PLM) va Product Data Management (PDM) tizimlarini taqqoslaymiz. Mahsulot hayoti davri boshqaruvining zamonaviy yondashuvlarini ko'ramiz." },
          { id: "plm-l2", title: "Dassault Systèmes va 3DEXPERIENCE platformasi", duration: "15:20", isFree: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Dassault Systèmes kompaniyasi va ularning 3DEXPERIENCE platformasini tanishtirish. CATIA, ENOVIA, SIMULIA, DELMIA kabi ilovalar bir ekotizimda qanday ishlashini tushunamiz." },
          { id: "plm-m3", title: "3DEXPERIENCE interfeysi va Compass", duration: "14:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "3DEXPERIENCE platformasining Compass navigatsiyasi va asosiy widget'larini o'rganamiz. Bulutli muhitda ishlashning afzalliklari va xavfsizlik yondashuvlarini ko'ramiz." },
        ]
      },
      {
        id: "plm-m2",
        title: "3DEXPERIENCE Amaliyoti",
        lessons: [
          { id: "plm-l4", title: "Collaborative Space va jamoa boshqaruvi", duration: "22:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Bir vaqtda bir nechta muhandis bitta loyihada ishlashi uchun Collaborative Space ni sozlaymiz. Ruxsatlar (roles), resurslarni taqsimlash va sinxronizatsiyani o'rganamiz." },
          { id: "plm-l5", title: "Version Control va Revision management", duration: "19:30", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Dizayn o'zgarishlarini kuzatish: version (versiya) va revision (tahrirlash) tizimini o'rganamiz. Eski versiyaga qaytish va o'zgarishlar tarixini ko'rish usullarini ko'ramiz." },
          { id: "plm-l6", title: "ENOVIA: BOM boshqaruvi", duration: "25:45", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "ENOVIA ilovasida Bill of Materials (BOM) yaratish va boshqarishni o'rganamiz. Engineering BOM va Manufacturing BOM o'rtasidagi farqni tushuntiramiz." },
          { id: "plm-l7", title: "Workflow va Change Management", duration: "21:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Dizayn o'zgarishlari (ECO — Engineering Change Order) jarayonini rasmiylashtirish. Tasdiqlash zanjiri (approval workflow) ni platformada qanday sozlash mumkinligini ko'ramiz." },
        ]
      },
      {
        id: "plm-m3",
        title: "Amaliyot",
        lessons: [
          { id: "plm-l8", title: "Virtual kompaniya muhitini sozlash", duration: "35:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Amaliy mashg'ulot: Kichik virtual muhandislik kompaniyasi uchun 3DEXPERIENCE muhitini noldan sozlaymiz. Rollar, loyihalar, fayllar va workflow ni birgalikda quramiz." },
          { id: "plm-l9", title: "Yakuniy loyiha: PLM joriy etish rejasi", duration: "40:00", isFree: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", text: "Kurs yakuniy loyihasi: Real kompaniya uchun PLM tizimini joriy etish rejasini (implementation plan) tayyorlaymiz. Muammolar tahlili, yechim arxitekturasi va ROI hisob-kitobini taqdim etamiz." },
        ]
      }
    ]
  }
];

// ---- YORDAMCHI FUNKSIYALAR ----

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string): { lesson: Lesson; course: Course } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  for (const module of course.modules) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course };
  }
  return undefined;
}

export function getTotalLessons(course: Course): number {
  return course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getFirstLesson(course: Course): Lesson | undefined {
  return course.modules[0]?.lessons[0];
}
