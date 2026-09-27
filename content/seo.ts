// =============================================================================
// SAHIFA SARLAVHALARI VA TAVSIFLARI (Google natijasi va Telegram/ijtimoiy
// tarmoqlarda havola ulashilganda chiqadigan matn)
// =============================================================================
//
// Qanday tahrirlash:
//   - "title" 60 belgidan, "description" 155 belgidan oshmasin (uzunrog'ini
//     Google kesib tashlaydi).
//   - Har sahifaning matni boshqasidan farq qilsin -- uch tilda ham.
//   - Faqat sahifada haqiqatan bor narsani yozing (tasdiqlanmagan da'vo yo'q).
//   - Matn ichida " belgisi ishlatmang, o'rniga « » yozing.
//   - Tekshirish: node scripts/check-meta.mjs http://localhost:3000
//
// Kurs sahifalari va blog maqolalari matni bu yerda emas: ular kurs/maqola
// ma'lumotidan avtomatik tuziladi (lib/seo.ts -> courseMetadata).
// =============================================================================

type Matn = { title: string; description: string };
export type SeoSahifa = Record<"uz" | "ru" | "en", Matn>;

export const SEO = {
  home: {
    uz: {
      title: "TechAxis — SOLIDWORKS va CATIA kurslari, 3D loyihalash",
      description:
        "SOLIDWORKS, CATIA va 3DEXPERIENCE bo'yicha onlayn kurslar, 3D modellashtirish va muhandislik xizmatlari. Toshkent, O'zbekiston.",
    },
    ru: {
      title: "TechAxis — курсы SOLIDWORKS и CATIA, 3D-проектирование",
      description:
        "Онлайн-курсы по SOLIDWORKS, CATIA и 3DEXPERIENCE, 3D-моделирование и инженерные услуги. Ташкент, Узбекистан.",
    },
    en: {
      title: "TechAxis — SOLIDWORKS & CATIA courses, 3D design",
      description:
        "Online SOLIDWORKS, CATIA and 3DEXPERIENCE courses, 3D modeling and engineering services. Tashkent, Uzbekistan.",
    },
  },
  software: {
    uz: {
      title: "SOLIDWORKS, CATIA va 3DEXPERIENCE dasturlari | TechAxis",
      description:
        "SOLIDWORKS, CATIA va 3DEXPERIENCE imkoniyatlari. Litsenziya tanlash, dasturni o'rnatish va ishlashni o'rganishda yordam.",
    },
    ru: {
      title: "Программы SOLIDWORKS, CATIA и 3DEXPERIENCE | TechAxis",
      description:
        "Возможности SOLIDWORKS, CATIA и 3DEXPERIENCE. Помощь с выбором лицензии, установкой программы и обучением.",
    },
    en: {
      title: "SOLIDWORKS, CATIA and 3DEXPERIENCE software | TechAxis",
      description:
        "What SOLIDWORKS, CATIA and 3DEXPERIENCE can do. Help with choosing a license, installing the software and learning it.",
    },
  },
  solidworks: {
    uz: {
      title: "SOLIDWORKS Design paketlarini taqqoslash | TechAxis",
      description:
        "SOLIDWORKS Design: Standard, Professional va Premium paketlari imkoniyatlari bir sahifada — detallar, yig'malar, simulyatsiya, routing.",
    },
    ru: {
      title: "Сравнение пакетов SOLIDWORKS Design | TechAxis",
      description:
        "SOLIDWORKS Design: возможности пакетов Standard, Professional и Premium на одной странице — детали, сборки, симуляция, трубопроводы.",
    },
    en: {
      title: "SOLIDWORKS Design packages compared | TechAxis",
      description:
        "SOLIDWORKS Design Standard, Professional and Premium side by side: parts, assemblies, simulation, routing.",
    },
  },
  catia: {
    uz: {
      title: "CATIA va 3DEXPERIENCE paketlarini taqqoslash | TechAxis",
      description:
        "CATIA paketlari: Engineering Excellence, Systems Engineering va Creative Design imkoniyatlari bir sahifada.",
    },
    ru: {
      title: "Сравнение пакетов CATIA и 3DEXPERIENCE | TechAxis",
      description:
        "Пакеты CATIA: возможности Engineering Excellence, Systems Engineering и Creative Design на одной странице.",
    },
    en: {
      title: "CATIA and 3DEXPERIENCE packages compared | TechAxis",
      description:
        "CATIA packages side by side: Engineering Excellence, Systems Engineering and Creative Design.",
    },
  },
  training: {
    uz: {
      title: "Muhandislik kurslari va korporativ ta'lim | TechAxis",
      description:
        "SOLIDWORKS, CATIA, FEA tahlil va PLM kurslari, universitet va korxonalar uchun guruh o'qitish, sertifikat imtihonlari haqida.",
    },
    ru: {
      title: "Инженерные курсы и корпоративное обучение | TechAxis",
      description:
        "Курсы SOLIDWORKS, CATIA, FEA-анализа и PLM, групповое обучение для вузов и предприятий, о сертификационных экзаменах.",
    },
    en: {
      title: "Engineering courses and corporate training | TechAxis",
      description:
        "SOLIDWORKS, CATIA, FEA analysis and PLM courses, group training for universities and companies, about certification exams.",
    },
  },
  courses: {
    uz: {
      title: "Barcha kurslar: SOLIDWORKS, CATIA, FEA, PLM | TechAxis",
      description:
        "TechAxis kurslari ro'yxati: SOLIDWORKS asoslari, CATIA V5, 3D modellashtirish va FEA, PLM (3DEXPERIENCE). Narx, davomiylik va daraja.",
    },
    ru: {
      title: "Все курсы: SOLIDWORKS, CATIA, FEA, PLM | TechAxis",
      description:
        "Каталог курсов TechAxis: основы SOLIDWORKS, CATIA V5, 3D-моделирование и FEA, PLM (3DEXPERIENCE). Цена, длительность и уровень.",
    },
    en: {
      title: "All courses: SOLIDWORKS, CATIA, FEA, PLM | TechAxis",
      description:
        "TechAxis course catalog: SOLIDWORKS basics, CATIA V5, 3D modeling and FEA, PLM (3DEXPERIENCE). Price, duration and level.",
    },
  },
  blog: {
    uz: {
      title: "Blog: SOLIDWORKS, CATIA, 3DEXPERIENCE faktlari | TechAxis",
      description:
        "SOLIDWORKS, CATIA va 3DEXPERIENCE haqida rasmiy manbalarga tayangan qisqa faktlar, maqolalar va yangiliklar.",
    },
    ru: {
      title: "Блог: факты о SOLIDWORKS, CATIA, 3DEXPERIENCE | TechAxis",
      description:
        "Короткие факты, статьи и новости о SOLIDWORKS, CATIA и 3DEXPERIENCE со ссылками на официальные источники.",
    },
    en: {
      title: "Blog: SOLIDWORKS, CATIA, 3DEXPERIENCE facts | TechAxis",
      description:
        "Short facts, articles and news about SOLIDWORKS, CATIA and 3DEXPERIENCE, based on official sources.",
    },
  },
  free: {
    uz: {
      title: "Bepul qo'llanma: 3D modellashtirishni boshlash | TechAxis",
      description:
        "3D modellashtirishni o'rganishni boshlovchilar uchun bepul qo'llanma: SolidWorks va CATIA farqlari va birinchi qadamlar.",
    },
    ru: {
      title: "Бесплатное руководство по 3D-моделированию | TechAxis",
      description:
        "Бесплатное руководство для начинающих изучать 3D-моделирование: различия SolidWorks и CATIA и первые шаги.",
    },
    en: {
      title: "Free guide: getting started with 3D modeling | TechAxis",
      description:
        "A free guide for 3D modeling beginners: how SolidWorks and CATIA differ and the first steps to take.",
    },
  },
  privacy: {
    uz: {
      title: "Maxfiylik siyosati | TechAxis",
      description:
        "techaxis.uz qanday ma'lumot to'playdi, nima uchun va qayerda saqlaydi, ma'lumotlaringizni qanday o'chirish mumkin.",
    },
    ru: {
      title: "Политика конфиденциальности | TechAxis",
      description:
        "Какие данные собирает techaxis.uz, зачем и где хранит, и как удалить ваши данные.",
    },
    en: {
      title: "Privacy Policy | TechAxis",
      description:
        "What data techaxis.uz collects, why and where it is stored, and how to delete your data.",
    },
  },
  terms: {
    uz: {
      title: "Foydalanish shartlari | TechAxis",
      description:
        "techaxis.uz dan foydalanish shartlari: hisob, kurslar va to'lov, kurs materiallaridan foydalanish.",
    },
    ru: {
      title: "Условия использования | TechAxis",
      description:
        "Условия использования techaxis.uz: учётная запись, курсы и оплата, использование материалов курсов.",
    },
    en: {
      title: "Terms of Use | TechAxis",
      description:
        "Terms of use for techaxis.uz: your account, courses and payment, use of course materials.",
    },
  },
  login: {
    uz: { title: "Kirish | TechAxis", description: "TechAxis hisobingizga kiring: kurslaringiz va darslaringiz." },
    ru: { title: "Вход | TechAxis", description: "Войдите в аккаунт TechAxis: ваши курсы и уроки." },
    en: { title: "Sign in | TechAxis", description: "Sign in to your TechAxis account: your courses and lessons." },
  },
  register: {
    uz: { title: "Ro'yxatdan o'tish | TechAxis", description: "TechAxis'da hisob oching va kurslarga yoziling." },
    ru: { title: "Регистрация | TechAxis", description: "Создайте аккаунт TechAxis и записывайтесь на курсы." },
    en: { title: "Sign up | TechAxis", description: "Create a TechAxis account and enroll in courses." },
  },
  // Qidiruvga chiqmaydigan sahifa (noindex): kursga yozilish va to'lov.
  checkout: {
    uz: { title: "Kursga yozilish va to'lov | TechAxis", description: "Tarifni tanlang va kurs uchun to'lovni amalga oshiring." },
    ru: { title: "Запись на курс и оплата | TechAxis", description: "Выберите тариф и оплатите курс." },
    en: { title: "Course enrollment and payment | TechAxis", description: "Choose a plan and pay for the course." },
  },
} satisfies Record<string, SeoSahifa>;

export type SeoKey = keyof typeof SEO;

// =============================================================================
// ASOSIY MATNI RUS VA INGLIZ TILIGA TO'LIQ TARJIMA QILINGAN SAHIFALAR
// =============================================================================
// Faqat shu sahifalar Google'ga uch tildagi versiya sifatida ko'rsatiladi (hreflang)
// va sitemap'ga uch tilda kiradi. Ro'yxatda yo'q sahifaning /ru va /en versiyasida
// asosiy matn hali o'zbekcha -- ular /uz versiyaning nusxasi hisoblanadi (canonical ->
// /uz) va sitemap'ga faqat /uz kiradi.
// Sahifani uch tilga tarjima qilgach, uning manzilini shu ro'yxatga qo'shing
// ("" = bosh sahifa). Tekshirish: node scripts/check-meta.mjs
export const TARJIMA_QILINGAN: readonly string[] = ["", "/privacy", "/terms"];
