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
}

export const COURSES: Course[] = [
  {
    id: "solidworks-basics",
    title: "SOLIDWORKS Asoslari",
    subtitle: "G'oyadan Haqiqatgacha: 0 dan professionalgacha",
    description: "SolidWorks — bu shunchaki chizma chizish emas, bu g'oyani virtual borliqda jonlantirishdir. Siz xayolingizdagi buyumni chizasiz, uni kuchlanishga sinaysiz va 3D printerda chiqarasiz.",
    price: 99,
    priceUZS: 1260000,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    instructor: "Javokhir Yusupov",
    instructorAvatar: "https://i.pravatar.cc/100?img=11",
    level: "Boshlang'ich",
    duration: "24 soat",
    studentsCount: 128,
    rating: 4.8,
    tags: ["SOLIDWORKS", "3D", "CAD", "Chizmachilik"],
    marketing: {
      whyTitle: "Nega aynan SolidWorks?",
      whyDesc: "Odamlarni va sanoatni o'ziga jalb qiluvchi eng ilg'or muhandislik vositasi.",
      benefits: [
        { title: "G'oyadan Haqiqatgacha", desc: "Bu shunchaki detal chizish emas, balki virtual 3D olamda jonlantirish." },
        { title: "Dunyo Standarti", desc: "Dunyoda 2 mln dan ortiq muhandis va Tesla, SpaceX gigantlari SolidWorks'da ishlaydi." },
        { title: "Yuqori Daromad", desc: "Sohani biladigan mutaxassislarning maoshi boshqalardan kamida 2-3 baravar yuqori." },
        { title: "Universal vosita", desc: "Zargarlikdan tortib to avtomobilsozlik va robototexnikagacha barcha joyda qo'llaniladi." }
      ],
      capabilitiesTitle: "SolidWorks yordamida nimalar qila olasiz?",
      capabilities: [
        { title: "3D Modellashtirish", desc: "Eng murakkab va detalizatsiya talab qiluvchi buyumlarni noldan chizish." },
        { title: "Assambleya (Yig'ish)", desc: "Minglab detallardan iborat dvigatel yoki zavod liniyasini yig'ish va xatoliklarni topish." },
        { title: "Simulyatsiya", desc: "Detal sinib ketadimi? Isib ketadimi? Hali pometall qilinganiga qadar kompyuterda aniqlash." },
        { title: "Real Render", desc: "Maxsulotingizni rasmga olingandek haqiqiy holatga aylantirib mijozlarga reklama qilish." }
      ],
      stepsTitle: "Kurs dasturi (Syllabus)",
      steps: [
        { step: "1", title: "Poydevor (2D va 3D asoslari)", points: ["Interfeys bilan tanishuv", "Sketching (To'g'ri chiziq, aylana, o'lchamlar)", "Features (Extrude, Revolve)"] },
        { step: "2", title: "Murakkab shakllar", points: ["Swept va Loft buyruqlari bilan ishlash", "Teshiklar ochish (Fillet, Chamfer)", "Massivlar (Pattern) bilan ishlash"] },
        { step: "3", title: "Assambleya va Mexanika", points: ["Detallarni birlashtirish (Mates)", "Harakatlanuvchi mexanizmlar asosi", "To'qnashuvlarni (Interference) aniqlash"] },
        { step: "4", title: "Professional chiqish", points: ["Xalqaro chizmalar (GOST/ISO)", "Photoview 360 va Visualize", "Katta Yakuniy loyiha (Portfolio)"] }
      ],
      outcomes: [
        "SolidWorks'da istalgan shakldagi uyni emas, murakkab mexanizmlarni vizual jonlantirasiz",
        "Ishlab chiqarish (zavod) uchun tayyor texnik chizmangiz (Blueprint) o'z qo'lingizda bo'ladi",
        "Hali ishlab chiqarilmagan buyumlarni sinish va chidamlilikka test QILIShNI o'rganasiz",
        "Dunyo gigantlari (Tesla, UzAuto) so'raydigan xalqaro CAD talablariga mos muhandis bo'lasiz"
      ],
      pricing: [
        { name: "Starter", price: "Asosiy", desc: "0 dan boshlovchilar uchun", features: ["Asosiy (Poydevor) qism videolari", "Dastur instalyatsiyasiga yordam", "2 ta kichik loyiha chizish", "Sertifikat (Asosiy bosqich)"], cta: "Sotib Olish", best: false },
        { name: "Pro", price: "$99", desc: "Muhandislik cho'qqisi (Amaliyot)", features: ["To'liq gapirot videodarsliklar", "Murakkab Assambleya tahlili", "Render va Visualizatsiya bonus", "Premium sertifikat", "Ish izlash bo'yicha ko'rsatma"], cta: "Eng ma'quli", best: true },
        { name: "Mentor", price: "VIP", desc: "Jonli yordam", features: ["Barcha Pro imkoniyatlar", "Kurs davomida 1:1 Jonli dars (zoom)", "Uy vazifalar tahlili va nazorat", "Kafolatlangan Portfolio (5+ detal)", "Karyera konsultatsiyasi"], cta: "Band Qilish", best: false }
      ],
      faq: [
        { q: "SolidWorks ni o'rganish qiyin emasmi?", a: "Yo'q! Biz dasturni 0 dan boshlab hatto o'rta maktab o'quvchisi ham tushuna oladigan sodda 'odam tili'da, murakkab chizmalarni o'rgatuvchi metodika bilan ishlaganmiz." },
        { q: "Mening Noutbukim ushbu dasturni ko'taradimi?", a: "SolidWorks (ayniqsa eskiroq versiyalari) maxsus o'yin qotadigan kompyuter talab qilmaydi. Kursimizdagi qismlarda noutbuklar tanlovi ham bor." },
        { q: "Darsdan tashqari qotib qolsam kimga murojaat qilaman?", a: "Pro tarifdagi foydalanuvchilar maxsus guruhlarga kiritiladi, Mentor tarifida bo'lsa to'g'ridan-to'g'ri bog'lanish va qo'llab-quvvatlash kafolatlangan." }
      ]
    },
    modules: [
      { id: "sw-m1", title: "Kirish va Interfeys", lessons: [ { id: "sw-l1", title: "SOLIDWORKS'ga kirish", duration: "8:45", isFree: true } ] }
    ]
  },
  {
    id: "catia-v5",
    title: "CATIA V5 Professional",
    subtitle: "Zamondosh Sanoat Dizayni",
    description: "CATIA bu shunchaki dastur emas — bu yirik komplekslarning (Samolyot, Avto, Kosmik stansiya) ichki muhandislik yadrosi. Airbus, Boeing va BMW tizimi.",
    price: 149,
    priceUZS: 1890000,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    instructor: "Bobur Mirzayev",
    instructorAvatar: "https://i.pravatar.cc/100?img=15",
    level: "O'rta",
    duration: "36 soat",
    studentsCount: 84,
    rating: 4.9,
    tags: ["CATIA", "CAD", "Aviatsiya", "Avtomobil"],
    marketing: {
      whyTitle: "Nega CATIA V5?",
      whyDesc: "Bu oddiygina mexanizmlar emas, balki butun boshli ishlab chiqarish zavodlari tanlagan ulkan masshtab.",
      benefits: [
        { title: "Aviatsiya Standarti", desc: "Airbus va Boeing muhandislari nima uchun arzimagan maoshga rozi bo'lishmaydi? CATIA bilgani uchun." },
        { title: "Super Qamrov", desc: "Bu orqali siz avtomobil kuzovidan tortib eng ichki dvigatel detallarini Surface Modeling bilan qilasiz." },
        { title: "Zavod va Integratsiya", desc: "Bu PLM tizimning bir qismi hisoblanib, ko'plab xoldinglar xodimlari bitta faylda bir xil ishlaydi." },
        { title: "Ishqalaydigan maosh", desc: "CATIA texnologiyasining og'irligi sohada xodim taqchilligini yaratar ekan, bu katta imkoniyat degani." }
      ],
      capabilitiesTitle: "CATIA yordamida mo'jizalar",
      capabilities: [
        { title: "Avtomobil Sirti (GSD)", desc: "Generative Shape Design yordamida dizaynerlarning sketchlarini matematik to'g'ri kuzovga aylantirish." },
        { title: "Product Assembly", desc: "Nafaqat mexanika, balki ulardagi elektr o'tkazgichlari (Wiring) va trubkalar tartibini ham ko'rish." },
        { title: "Kinetika va Analiz", desc: "Har bir detalning aerodinamik xossalarini joyida o'rganish." },
        { title: "Massiv Yig'ma", desc: "UzAuto yoki yirik aviozavodlardagi o'n minglab detallardan iborat platformani kompyuterda boshqarish." }
      ],
      stepsTitle: "Kurs bosqichlari (CATIA Syllabus)",
      steps: [
        { step: "1", title: "Asosiy muhit", points: ["CATIA interfeysi mentalligi", "Sketcher asoslari va limitlari", "Part Design logikasi"] },
        { step: "2", title: "Parametrik Modellashtirish", points: ["GSD (Generative Shape Design)", "Murakkab formalar yuzalar asosi", "Boolean operatsiyalari amaliyoti"] },
        { step: "3", title: "Product Structure (Assembly)", points: ["Yig'malarda pastdan-tepaga yondashuv", "Kinematik (mexanik) cheklovlar", "O'zaro bog'liqliklar tahlili"] },
        { step: "4", title: "Bozorga chiqqan dizayn", points: ["Sanoat chizma formalari", "DMU (Digital Mock-Up) bilan tekshiruv", "Diplom ishi: Fuzelaj yig'ish."] }
      ],
      outcomes: [
        "CATIA muhitida GSD arxitekturasida silliq dizayn (Kuzov, fuzelaj) yig'a olasiz",
        "Yirik zavod muhandislik jamoasida (Masalan BYD, UzAuto) uzluksiz integratsiyada ishlayolasiz",
        "10 000+ detallik Assembly arxitekturasini 'crash' siz yo'naltira bilish texnikasi."
      ],
      pricing: [
        { name: "Starter", price: "$49", desc: "Boshlang'ich imkonyat", features: ["CATIA vizual kurslari (Part Design)", "Standart muhandislik amaliyoti", "Guruhda muhokama"], cta: "O'qish", best: false },
        { name: "Pro", price: "$149", desc: "Avtomobilsozlik Sirlari", features: ["Surfacing (GSD) va DMU maxsus qism", "Premium Telegram Yordamchi bot", "Portfolio (Eksklyuziv loyihalar)", "Certificate of Excellence"], cta: "Sotib Olish", best: true },
        { name: "Mentor", price: "Business", desc: "B2B / Shahsiy mentoring", features: ["Zavod va ishlab chiqaruvchi xodimlari", "Muhandislik to'g'irlashlari konsultatsiyasi", "Sanoat sirlari asosidagi Master Class"], cta: "Bog'lanish", best: false }
      ],
      faq: [
        { q: "Men oldin faqat AutoCAD ko'rganman, CATIA eplaymanmi?", a: "Ha! Fikrlash 3D formatga o'tgan zahoti, muhandislik logikasi hisobiga u to'liq moslashib boradi." },
        { q: "Kompyuterim ancha kuchli bo'lishi kerakmi?", a: "Surface processing va Katta assemblylar uchun ha! Kamida 16GB RAM, o'rtacha kuchli CPU hamda yaxshi video karta (nVIDIA) kutiladi." }
      ]
    },
    modules: [
       { id: "cat-m1", title: "Kirish", lessons: [{ id: "cat-l1", title: "Interfeys", duration: "10:00", isFree: true }] }
    ]
  },
  {
    id: "3d-modeling",
    title: "3D Modellashtirish va Tahlil (FEA)",
    subtitle: "Raqamli Egizak: Ishlab chiqarishdan oldingi sinov sirlari",
    description: "Detallingiz og'irlik ostida nechchi soaniyadan so'ng sinishini bilasizmi? Issiqlikka qanday dosh beradi? O'z mahsulotini bozorda 'Uyatda' qoldirmoqchi bo'lmagan muhandisning siri — Simulyatsiya (FEA).",
    price: 79,
    priceUZS: 1000000,
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    instructor: "Sardor Nazarov",
    instructorAvatar: "https://i.pravatar.cc/100?img=20",
    level: "O'rta",
    duration: "18 soat",
    studentsCount: 62,
    rating: 4.7,
    tags: ["FEA", "Simulyatsiya", "ANSYS", "Mustahkamlik"],
    marketing: {
      whyTitle: "Niyatingiz — Sifatmi?",
      whyDesc: "Millionlab zararlar ko'pincha bittagina kichkina detal materialining chidamsizligidan kelib chiqadi. Siz buni kompyuterda sinaysiz.",
      benefits: [
        { title: "Zararni Yo'qotish", desc: "Haqiqiy prototipni quyib buzib yurgandan ko'ra kompyuterda 100x tezroq va tekin tahlil qiling." },
        { title: "Optimal Material", desc: "Metalning og'irini ishlatmay, keraksiz qismini qirqib tashlab zavod materialini qutqaring (Optimisation)." },
        { title: "ANSYS va SolidWorks", desc: "Ikki yirik tizimda yagona haqiqatni isbotlash sirlari." },
        { title: "Ekspert Muhandis", desc: "Quruvchi ustadan farq qiladigan yagona jihati - siz Ilmiy Tahlilchisiz!" }
      ],
      capabilitiesTitle: "FEA Tahlili yordamida",
      capabilities: [
        { title: "Linear Static Analysis", desc: "Kema motorining qotirmasi oddiy og'irlikda qiyshayib ketmaydimi?" },
        { title: "Thermal Analysis", desc: "Issiqlik tarqalishi tufayli elektron plata erib ketmasligini isbotlash." },
        { title: "Fluid Dynamics (CFD)", desc: "Mahsulotning suyuqlik ostida (yoki shamolda) qanday 'Oqim' chizig'iga munosabat bildirishini aniqlash." },
        { title: "Durability & Fatigue", desc: "Detal 1 yil chidaydimi yoki 10 yilmi? (Toliqish xossalari)." }
      ],
      stepsTitle: "Kurs Modullari",
      steps: [
        { step: "1", title: "Asos - Raqamli Muhandislik", points: ["FEA tamoyillari (O'qlar, nodlar, elementlar)", "Boundary Conditions (Chegara shartlari) o'rnatish"] },
        { step: "2", title: "Mesh va Materiallar", points: ["To'g'ri 'Meshing' tamoyili tahlil tezligi kaliti sifatida", "Stress/Strain (Kuchlanish/Deformatsiya) analiz grafikalari"] },
        { step: "3", title: "ANSYS Integratsiyasi", points: ["Statik Strukural analiz qilish tartibi", "Turli yuklamalarda detal harakatlari"] },
        { step: "4", title: "Amaliy Hisobot", points: ["Zavod uchun Ilmiy hisobot (Reports) yozish", "Optimallashtirish algoritmlari va yakun."] }
      ],
      outcomes: [
        "Siz chizgan detalingiz yuz foiz ishlashiga ilmiy javob bera olasiz",
        "Xalqaro bozordagi ANSYS mutaxassislarning ish haqqi ro'yxatiga nomzod bo'lasiz",
        "Material tanlash va sarfini (Topologik optimizatsiya) mukammallashtirasiz"
      ],
      pricing: [
        { name: "FEA Starter", price: "$39", desc: "Tahlilni noldan o'rganish", features: ["Asosiy metodikalar", "Oddiy statik simulyatsiyalar", "Loyihalar kutubxonasi"], cta: "Olish", best: false },
        { name: "Engineer Pro", price: "$79", desc: "Keng qamrovli ANSYS", features: ["To'liq Thermal & Static", "Olimpiada/StartUp lar uchun muhandislik portfel", "Individual muhokama zali"], cta: "Eng optimali", best: true },
        { name: "Corporate", price: "$$$", desc: "Zavod yechimlari", features: ["Ishlab chiqarish bilan to'g'ridan to'g'ri integratsiya", "Korxona xodimlarini ommaviy tekshirish bazasi"], cta: "Bog'lanish", best: false }
      ],
      faq: [
        { q: "Fizika modellarini qancha chuqur bilish kerak?", a: "Eng muhim fizika qoidalari (Nyuton yondashuvi, Mexanika)ni kurs davomida tushuntiramiz. Oliy fizika shart emas — dastur uni hisoblaydi!" }
      ]
    },
    modules: [
       { id: "fea-m1", title: "Kirish", lessons: [{ id: "fea-l1", title: "Simulyatsiya", duration: "10:00", isFree: true }] }
    ]
  },
  {
    id: "plm-systems",
    title: "PLM Tizimlar (3DEXPERIENCE)",
    subtitle: "Zavodni onlayn platformaga ko'chirish san'ati",
    description: "PLM (Product Lifecycle Management) tasavvur qiling — mahsulot g'oyadan boshlab, zavoddan chiqib utillizatsiya qilingunigacha bitta ulkan ekotizimda boshqariladi.",
    price: 89,
    priceUZS: 1130000,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    instructor: "Javokhir Yusupov",
    instructorAvatar: "https://i.pravatar.cc/100?img=11",
    level: "Yuqori",
    duration: "20 soat",
    studentsCount: 45,
    rating: 4.6,
    tags: ["PLM", "PDM", "3DEXPERIENCE", "Boshqaruv"],
    marketing: {
      whyTitle: "PLM asrining oltin kaliti",
      whyDesc: "O'zbekistonda kompaniyalar yiriklashayotgan siri shuki ular barcha ma'lumotlarni PDM/PLM orqali bir nuqtada birlashtirmoqda.",
      benefits: [
        { title: "Zavod Digitalizatsiyasi", desc: "Raqamli egizak modelida butun boshli zavod ma'lumotlarni yagona tizimda boshqarish." },
        { title: "Menejer Muhandislar", desc: "Bosh muhandis sifatida jamoalarni bulutli platformalarda koordinatsiya qilasiz." },
        { title: "Vaqt qadrida", desc: "Fayllarning dublikatlari yo'qoladi, xatolar soni kamayadi, hujjat almashinuvi silliqlashadi." },
        { title: "Dassault Systèmes Tizimi", desc: "Xalqaro standartdagi 3DEXPERIENCE platformasi O'zbekistonga ham o'ta tezlik bilan kirib keladi." }
      ],
      capabilitiesTitle: "PLM kursda nimani qila olasiz?",
      capabilities: [
        { title: "Collaborative Space", desc: "Uch-to'rt muhandis qanday qilib bir vaqtda bitta mashinada dizayn yo'qotmasdan ishlashini sirlari." },
        { title: "Version Control", desc: "Dizayn yoqmadimi? Istalgan payt qariyb qulab tushgan loyihangiz eski variantiga qayting." },
        { title: "Bill of Materials (BOM)", desc: "Mahsulot qancha va qay tarzda vujudga kelishini ishlab chiqarish hisobotida (excel larsiz) bilish." },
        { title: "Workflow Management", desc: "Ishni texnologga, dizaynerga qanday ruxsatlar bilan platforma orqali rasmiy uzatish algoritmlari." }
      ],
      stepsTitle: "Kurs Modullari (PLM Yondashuvi)",
      steps: [
        { step: "1", title: "PLM tushunchasi va Muqaddima", points: ["PLM vs PDM", "Dassault Systemes mahsuloti: 3DEXPERIENCE interfeysi"] },
        { step: "2", title: "Collaboration va Teamwork", points: ["Cloud da ishlash strategiyalari", "Revision & Iteration control tamoyili"] },
        { step: "3", title: "Katta ma'lumot tahlili", points: ["ENOVIA applikatsiyasi bilan ishlash", "BOM (Bill Of Material) boshqaruvi va arxitektura"] },
        { step: "4", title: "Loyiha amaliyoti", points: ["O'z kompaniya muhitingizni onlayn imitatsiya qilish", "Ishlatiladigan rollarni belgilash sirlari"] }
      ],
      outcomes: [
        "Jamoaviy muhandislik bo'limini mukammal boshqarish konsepti shakllanadi",
        "Siz shunchaki SAP, 1C tizimlari kabi lekin faqat muhandislarga xos PLM larni joriy qila olasiz",
        "Bu kurs kelajak korporatsiyalarida Top-Menejment roliga sizni eng yaqinlashtiradigan zinalardan biridir"
      ],
      pricing: [
        { name: "Concept", price: "$49", desc: "Tushuncha", features: ["Barcha asosiy videolar", "Platforma demo ishlash logikasi", "Asosiy sertifikat"], cta: "Sotib Olish", best: false },
        { name: "Integrator", price: "$89", desc: "Menejer", features: ["To'liq ENOVIA amaliyotlari", "3DEXPERIENCE doirasida real Keyslar", "Premium qo'llab quvvatlash"], cta: "Saylash", best: true },
        { name: "Enterprise", price: "$$$", desc: "Jamoa", features: ["Kompaniyangiz uchun PLM integratsiyasi buyurtmasi", "Xodimlaringizni onlayn o'qitish platformasi kafolati"], cta: "Ariza", best: false }
      ],
      faq: [
        { q: "Menga o'zi bu kerak bo'ladimi?", a: "Agar siz yakka o'zingiz chizib ishlasangiz, unchalik emas. Lekin 2 dan ortiq kishi bo'lib katta loyihaga kirsangiz, bu havo kabi muhim!" }
      ]
    },
    modules: [
       { id: "plm-m1", title: "Kirish", lessons: [{ id: "plm-l1", title: "PLM ni his qilish", duration: "10:00", isFree: true }] }
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
