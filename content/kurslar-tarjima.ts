// =============================================================================
// KURSLAR MATNINING RUSCHA VA INGLIZCHA TARJIMASI
// =============================================================================
// Kurs nomi, tavsifi, daraja, modul va dars nomlari BAZADA faqat o'zbekcha (admin panel ->
// "Kurslar mazmuni"). /ru va /en sahifalarida ular shu lug'atdan tarjima qilinadi:
// kalit = bazadagi o'zbekcha matn AYNAN shunday (harfma-harf).
//
// Admin panelda o'zbekcha matnni o'zgartirsangiz yoki yangi dars qo'shsangiz, shu yerga
// yangi matn va uning tarjimasini qo'shing -- aks holda /ru va /en da o'sha joy o'zbekcha
// chiqadi. Tekshirish: node scripts/check-i18n.mjs http://localhost:3000
//
// Darslarning o'zi (video, dars matni) o'zbek tilida -- ular tarjima qilinmaydi, saytda
// "dars o'zbek tilida" deb ko'rsatiladi.
// =============================================================================
import type { MarketingData } from "@/lib/courses";

type Tarjima = { ru: string; en: string };

export const KURS_IBORALAR: Record<string, Tarjima> = {
  // --- Daraja va davomiylik ---
  "Boshlang'ich": { ru: "Начальный", en: "Beginner" },
  "O'rta": { ru: "Средний", en: "Intermediate" },
  Yuqori: { ru: "Продвинутый", en: "Advanced" },
  "12–14 dars": { ru: "12–14 уроков", en: "12–14 lessons" },

  // --- Teglar ---
  SOLIDWORKS: { ru: "SOLIDWORKS", en: "SOLIDWORKS" },
  "3D": { ru: "3D", en: "3D" },
  CAD: { ru: "CAD", en: "CAD" },
  Chizmachilik: { ru: "Черчение", en: "Drafting" },
  CATIA: { ru: "CATIA", en: "CATIA" },
  Aviatsiya: { ru: "Авиация", en: "Aviation" },
  Avtomobil: { ru: "Автомобилестроение", en: "Automotive" },
  FEA: { ru: "FEA", en: "FEA" },
  "SOLIDWORKS Simulation": { ru: "SOLIDWORKS Simulation", en: "SOLIDWORKS Simulation" },
  Simulyatsiya: { ru: "Симуляция", en: "Simulation" },
  Mustahkamlik: { ru: "Прочность", en: "Strength" },
  PLM: { ru: "PLM", en: "PLM" },
  PDM: { ru: "PDM", en: "PDM" },
  "3DEXPERIENCE": { ru: "3DEXPERIENCE", en: "3DEXPERIENCE" },
  Boshqaruv: { ru: "Управление", en: "Management" },

  // --- SOLIDWORKS Asoslari ---
  "SOLIDWORKS Asoslari": { ru: "Основы SOLIDWORKS", en: "SOLIDWORKS Fundamentals" },
  "Noldan boshlab: eskiz, 3D detal, yig'ma va texnik chizma": {
    ru: "С нуля: эскиз, 3D-деталь, сборка и технический чертёж",
    en: "From scratch: sketch, 3D part, assembly and technical drawing",
  },
  "SOLIDWORKS'ni noldan o'rganasiz: 2D eskiz, 3D detal, harakatlanuvchi yig'ma va ishlab chiqarish uchun texnik chizma. Kurs oxirida yakuniy loyiha — to'liq texnik hujjat tayyorlaysiz.": {
    ru: "Вы изучите SOLIDWORKS с нуля: 2D-эскиз, 3D-деталь, подвижная сборка и технический чертёж для производства. В конце курса — итоговый проект: полный комплект технической документации.",
    en: "You will learn SOLIDWORKS from scratch: 2D sketches, 3D parts, moving assemblies and technical drawings for manufacturing. The course ends with a final project: a complete set of technical documentation.",
  },
  "Kirish va Muhit": { ru: "Введение и рабочая среда", en: "Introduction and Environment" },
  "SOLIDWORKS'ga kirish va o'rnatish": { ru: "Введение в SOLIDWORKS и установка", en: "Introduction to SOLIDWORKS and installation" },
  "Interfeys va asosiy buyruqlar": { ru: "Интерфейс и основные команды", en: "Interface and basic commands" },
  "Loyiha sozlamalari va shablonlar": { ru: "Настройки проекта и шаблоны", en: "Project settings and templates" },
  "2D Sketch (Eskiz)": { ru: "2D Sketch (эскиз)", en: "2D Sketch" },
  "Sketch asoslari va chiziqlar": { ru: "Основы Sketch и линии", en: "Sketch basics and lines" },
  "Geometric va Smart Dimensions": { ru: "Геометрические взаимосвязи и Smart Dimensions", en: "Geometric relations and Smart Dimensions" },
  "Murakkab shakllar va spline": { ru: "Сложные формы и сплайны", en: "Complex shapes and splines" },
  "Sketch amaliyoti: Detal chizish": { ru: "Практика Sketch: эскиз детали", en: "Sketch practice: drawing a part" },
  "3D Modellashtirish": { ru: "3D-моделирование", en: "3D Modeling" },
  "Extrude va Revolve": { ru: "Extrude и Revolve", en: "Extrude and Revolve" },
  "Fillet, Chamfer va Shell": { ru: "Fillet, Chamfer и Shell", en: "Fillet, Chamfer and Shell" },
  "Pattern va Mirror": { ru: "Pattern и Mirror", en: "Pattern and Mirror" },
  "Murakkab 3D model: Amaliyot": { ru: "Сложная 3D-модель: практика", en: "Complex 3D model: practice" },
  "Assembly (Yig'ma)": { ru: "Assembly (сборка)", en: "Assembly" },
  "Assembly yaratish va Mates": { ru: "Создание сборки и Mates", en: "Creating an assembly and Mates" },
  "Harakatlanuvchi mexanizmlar": { ru: "Подвижные механизмы", en: "Moving mechanisms" },
  "Interference Detection va BOM": { ru: "Interference Detection и BOM", en: "Interference Detection and BOM" },
  "Texnik Chizma (Drawing)": { ru: "Технический чертёж (Drawing)", en: "Technical Drawing" },
  "Drawing asoslari va ko'rinishlar": { ru: "Основы Drawing и виды", en: "Drawing basics and views" },
  "O'lchamlar va annotatsiyalar": { ru: "Размеры и аннотации", en: "Dimensions and annotations" },
  "Yakuniy loyiha: To'liq texnik hujjat": { ru: "Итоговый проект: полный комплект документации", en: "Final project: complete technical documentation" },

  // --- CATIA V5 Professional ---
  "CATIA V5 Professional": { ru: "CATIA V5 Professional", en: "CATIA V5 Professional" },
  "Sketcher, Part Design, yig'ma va texnik chizma": {
    ru: "Sketcher, Part Design, сборка и технический чертёж",
    en: "Sketcher, Part Design, assembly and technical drawing",
  },
  "CATIA V5 — Dassault Systèmes dasturi, aviatsiya va avtomobilsozlikda keng qo'llaniladi. Kursda Sketcher, Part Design, Assembly Design, DMU Kinematics va Drafting workbench'larini amaliy loyihalar bilan o'rganasiz.": {
    ru: "CATIA V5 — программа Dassault Systèmes, которая широко применяется в авиации и автомобилестроении. На курсе вы освоите рабочие среды (workbench) Sketcher, Part Design, Assembly Design, DMU Kinematics и Drafting на практических проектах.",
    en: "CATIA V5 is Dassault Systèmes software widely used in aviation and the automotive industry. In this course you will learn the Sketcher, Part Design, Assembly Design, DMU Kinematics and Drafting workbenches through hands-on projects.",
  },
  Kirish: { ru: "Введение", en: "Introduction" },
  "CATIA V5 ga kirish va interfeys": { ru: "Введение в CATIA V5 и интерфейс", en: "Introduction to CATIA V5 and the interface" },
  "Workbench tushunchasi va navigatsiya": { ru: "Рабочие среды (workbench) и навигация", en: "Workbenches and navigation" },
  "Sketcher: Asosiy shakllar va cheklovlar": { ru: "Sketcher: основные формы и ограничения", en: "Sketcher: basic shapes and constraints" },
  "Part Design": { ru: "Part Design", en: "Part Design" },
  "Pad, Pocket va Shaft": { ru: "Pad, Pocket и Shaft", en: "Pad, Pocket and Shaft" },
  "Fillet, Chamfer va Draft": { ru: "Fillet, Chamfer и Draft", en: "Fillet, Chamfer and Draft" },
  "Pattern va Mirror funksiyalari": { ru: "Функции Pattern и Mirror", en: "Pattern and Mirror features" },
  "Part Design amaliyoti: Real detal": { ru: "Практика Part Design: реальная деталь", en: "Part Design practice: a real part" },
  "Assembly Design": { ru: "Assembly Design", en: "Assembly Design" },
  "Assembly yaratish va Constraints": { ru: "Создание сборки и Constraints", en: "Creating an assembly and Constraints" },
  "Top-Down va Bottom-Up yondashuv": { ru: "Подходы Top-Down и Bottom-Up", en: "Top-down and bottom-up approaches" },
  "DMU Kinematics: Mexanizm harakati": { ru: "DMU Kinematics: движение механизма", en: "DMU Kinematics: mechanism motion" },
  "Drafting (Texnik Chizma)": { ru: "Drafting (технический чертёж)", en: "Drafting (Technical Drawing)" },
  "Drawing yaratish va ko'rinishlar": { ru: "Создание чертежа и виды", en: "Creating a drawing and views" },
  "Yakuniy loyiha: Aviatsiya detali": { ru: "Итоговый проект: авиационная деталь", en: "Final project: an aircraft part" },

  // --- SOLIDWORKS Simulation (FEA) ---
  "SOLIDWORKS Simulation (FEA)": { ru: "SOLIDWORKS Simulation (FEA)", en: "SOLIDWORKS Simulation (FEA)" },
  "Detalni ishlab chiqarishdan oldin kompyuterda sinash": {
    ru: "Проверка детали на компьютере до её изготовления",
    en: "Test a part on the computer before it is manufactured",
  },
  "SOLIDWORKS Simulation'da detal yuklama va issiqlikka qanday chidashini tekshirishni o'rganasiz: mesh, chegara shartlari, statik va termal tahlil, natijalarni talqin qilish va topologik optimizatsiya.": {
    ru: "Вы научитесь проверять в SOLIDWORKS Simulation, как деталь выдерживает нагрузку и нагрев: сетка (mesh), граничные условия, статический и тепловой анализ, интерпретация результатов и топологическая оптимизация.",
    en: "You will learn to check in SOLIDWORKS Simulation how a part withstands loads and heat: mesh, boundary conditions, static and thermal analysis, interpreting results and topology optimization.",
  },
  "FEA Asoslari": { ru: "Основы FEA", en: "FEA Fundamentals" },
  "FEA nima va nima uchun kerak?": { ru: "Что такое FEA и зачем он нужен?", en: "What is FEA and why is it needed?" },
  "Elementlar, tugunlar va mesh tushunchasi": { ru: "Элементы, узлы и сетка (mesh)", en: "Elements, nodes and the mesh" },
  "Material xossalari va Boundary Conditions": { ru: "Свойства материала и Boundary Conditions", en: "Material properties and boundary conditions" },
  "Simulation (Simulyatsiya)": { ru: "Simulation (симуляция)", en: "Simulation" },
  "Static Structural Analysis": { ru: "Static Structural Analysis", en: "Static Structural Analysis" },
  "Mesh sifati va konvergentsiya": { ru: "Качество сетки и сходимость", en: "Mesh quality and convergence" },
  "Thermal Analysis": { ru: "Thermal Analysis", en: "Thermal Analysis" },
  "Natijalarni talqin qilish va hisobot": { ru: "Интерпретация результатов и отчёт", en: "Interpreting results and reporting" },
  "Amaliy Loyihalar": { ru: "Практические проекты", en: "Practical Projects" },
  "Topologik optimizatsiya": { ru: "Топологическая оптимизация", en: "Topology optimization" },
  "Yakuniy loyiha: To'liq tahlil hisoboti": { ru: "Итоговый проект: полный отчёт по анализу", en: "Final project: a full analysis report" },

  // --- PLM Tizimlar (3DEXPERIENCE) ---
  "PLM Tizimlar (3DEXPERIENCE)": { ru: "PLM-системы (3DEXPERIENCE)", en: "PLM Systems (3DEXPERIENCE)" },
  "Muhandislik ma'lumotlarini bitta platformada boshqarish": {
    ru: "Управление инженерными данными на одной платформе",
    en: "Managing engineering data on one platform",
  },
  "PLM (Product Lifecycle Management) — mahsulot ma'lumotlarini g'oyadan ishlab chiqarishgacha bitta tizimda boshqarish. Kursda 3DEXPERIENCE platformasida jamoaviy ishlash, versiyalar, BOM va o'zgarishlarni boshqarishni o'rganasiz.": {
    ru: "PLM (Product Lifecycle Management) — управление данными об изделии от идеи до производства в одной системе. На курсе вы научитесь работать в команде на платформе 3DEXPERIENCE, управлять версиями, BOM и изменениями.",
    en: "PLM (Product Lifecycle Management) means managing product data from idea to production in a single system. In this course you will learn teamwork on the 3DEXPERIENCE platform and how to manage versions, BOMs and changes.",
  },
  "PLM Asoslari": { ru: "Основы PLM", en: "PLM Fundamentals" },
  "PLM nima? PDM vs PLM farqi": { ru: "Что такое PLM? Разница между PDM и PLM", en: "What is PLM? PDM vs PLM" },
  "Dassault Systèmes va 3DEXPERIENCE platformasi": { ru: "Dassault Systèmes и платформа 3DEXPERIENCE", en: "Dassault Systèmes and the 3DEXPERIENCE platform" },
  "3DEXPERIENCE interfeysi va Compass": { ru: "Интерфейс 3DEXPERIENCE и Compass", en: "The 3DEXPERIENCE interface and Compass" },
  "3DEXPERIENCE Amaliyoti": { ru: "Практика 3DEXPERIENCE", en: "3DEXPERIENCE in Practice" },
  "Collaborative Space va jamoa boshqaruvi": { ru: "Collaborative Space и управление командой", en: "Collaborative Space and team management" },
  "Version Control va Revision management": { ru: "Version Control и управление ревизиями", en: "Version control and revision management" },
  "ENOVIA: BOM boshqaruvi": { ru: "ENOVIA: управление BOM", en: "ENOVIA: BOM management" },
  "Workflow va Change Management": { ru: "Workflow и Change Management", en: "Workflow and change management" },
  Amaliyot: { ru: "Практика", en: "Practice" },
  "Virtual kompaniya muhitini sozlash": { ru: "Настройка среды виртуальной компании", en: "Setting up a virtual company environment" },
  "Yakuniy loyiha: PLM joriy etish rejasi": { ru: "Итоговый проект: план внедрения PLM", en: "Final project: a PLM implementation plan" },
};

// Kurs sahifasidagi marketing matni (lib/courses.ts -> marketing) -- kurs id bo'yicha.
// O'zbekchasi lib/courses.ts da; u yerda o'zgartirsangiz, shu yerni ham yangilang.
export const KURS_MARKETING: Record<string, { ru: MarketingData; en: MarketingData }> = {
  "solidworks-basics": {
    ru: {
      whyTitle: "Почему SOLIDWORKS?",
      whyDesc: "Распространённая 3D CAD-программа в машиностроении и дизайне изделий: детали, сборки и технические чертежи в одной среде.",
      benefits: [
        { title: "Широко используется", desc: "Одна из самых распространённых 3D CAD-программ в машиностроении и дизайне изделий." },
        { title: "Параметрическая модель", desc: "Меняете размер — деталь, сборка и чертёж обновляются вместе." },
        { title: "Весь процесс в одной программе", desc: "От эскиза к детали, от детали к сборке и до производственного чертежа." },
      ],
      capabilitiesTitle: "Чему вы научитесь на курсе",
      capabilities: [
        { title: "2D-эскиз", desc: "Линии, окружности, сплайны; взаимосвязи (relations) и полностью определённый эскиз со Smart Dimension." },
        { title: "3D-деталь", desc: "Построение деталей с Extrude, Revolve, Fillet, Chamfer, Shell, Pattern и Mirror." },
        { title: "Сборка", desc: "Сборка деталей с Mates, подвижный механизм, проверка столкновений и BOM." },
        { title: "Технический чертёж", desc: "Производственный чертёж с видами, размерами, допусками и аннотациями." },
      ],
      stepsTitle: "Программа курса",
      steps: [
        { step: "1", title: "Введение и эскиз", points: ["Интерфейс, настройки и шаблоны", "Эскиз, взаимосвязи и размеры", "Практика эскиза: эскиз детали"] },
        { step: "2", title: "3D-моделирование", points: ["Extrude и Revolve", "Fillet, Chamfer и Shell", "Pattern и Mirror, практика сложной модели"] },
        { step: "3", title: "Сборка", points: ["Создание сборки и Mates", "Подвижные механизмы", "Interference Detection и BOM"] },
        { step: "4", title: "Технический чертёж и итоговый проект", points: ["Виды чертежа", "Размеры и аннотации", "Итоговый проект: полный комплект документации"] },
      ],
      outcomes: [
        "Сможете построить 3D-деталь, начиная с эскиза",
        "Соберёте из деталей подвижную сборку и проверите столкновения",
        "Подготовите технический чертёж с размерами и BOM для производства",
      ],
      pricing: [
        { name: "Starter", price: "Базовый", desc: "Для начинающих с нуля", features: ["Видео базовой части", "Помощь с установкой программы", "2 небольших проекта", "Сертификат (базовый этап)"], cta: "Купить", best: false },
        { name: "Pro", price: "$99", desc: "Инженерная практика", features: ["Полный видеокурс", "Разбор сложных сборок", "Бонус: рендер и визуализация", "Премиум-сертификат", "Советы по поиску работы"], cta: "Лучший выбор", best: true },
        { name: "Mentor", price: "VIP", desc: "Живая поддержка", features: ["Все возможности Pro", "Живые занятия 1:1 во время курса (Zoom)", "Разбор и проверка домашних заданий", "Гарантированное портфолио (5+ деталей)", "Карьерная консультация"], cta: "Забронировать", best: false },
      ],
      faq: [
        { q: "Сложно ли изучить SOLIDWORKS?", a: "Курс начинается с нуля: сначала интерфейс и эскиз, затем 3D, сборки и чертежи. Опыт работы в CAD не нужен." },
        { q: "Какие требования к компьютеру?", a: "SOLIDWORKS работает только в Windows. Точные требования — на странице System Requirements официального сайта solidworks.com." },
        { q: "Где взять программу?", a: "Для студентов есть официальная бесплатная версия SOLIDWORKS Design Standard for Students: solidworks.com/product/students." },
      ],
    },
    en: {
      whyTitle: "Why SOLIDWORKS?",
      whyDesc: "A widely used 3D CAD program in mechanical engineering and product design: parts, assemblies and technical drawings in one environment.",
      benefits: [
        { title: "Widely used", desc: "One of the most widely used 3D CAD programs in mechanical engineering and product design." },
        { title: "Parametric model", desc: "Change a dimension and the part, assembly and drawing update together." },
        { title: "The whole process in one program", desc: "From sketch to part, from part to assembly, all the way to the manufacturing drawing." },
      ],
      capabilitiesTitle: "What you will learn",
      capabilities: [
        { title: "2D sketch", desc: "Lines, circles, splines; relations and fully defined sketches with Smart Dimension." },
        { title: "3D part", desc: "Building parts with Extrude, Revolve, Fillet, Chamfer, Shell, Pattern and Mirror." },
        { title: "Assembly", desc: "Putting parts together with Mates, moving mechanisms, interference checks and BOM." },
        { title: "Technical drawing", desc: "Manufacturing drawings with views, dimensions, tolerances and annotations." },
      ],
      stepsTitle: "Course program",
      steps: [
        { step: "1", title: "Introduction and sketching", points: ["Interface, settings and templates", "Sketches, relations and dimensions", "Sketch practice: drawing a part"] },
        { step: "2", title: "3D modeling", points: ["Extrude and Revolve", "Fillet, Chamfer and Shell", "Pattern and Mirror, complex model practice"] },
        { step: "3", title: "Assembly", points: ["Creating an assembly and Mates", "Moving mechanisms", "Interference Detection and BOM"] },
        { step: "4", title: "Technical drawing and final project", points: ["Drawing views", "Dimensions and annotations", "Final project: complete technical documentation"] },
      ],
      outcomes: [
        "Build a 3D part starting from a sketch",
        "Assemble parts into a moving assembly and check for interference",
        "Prepare a dimensioned technical drawing and BOM for manufacturing",
      ],
      pricing: [
        { name: "Starter", price: "Basic", desc: "For complete beginners", features: ["Videos of the basic part", "Help installing the software", "2 small projects", "Certificate (basic stage)"], cta: "Buy", best: false },
        { name: "Pro", price: "$99", desc: "Engineering practice", features: ["Full video course", "Complex assembly walkthroughs", "Bonus: rendering and visualization", "Premium certificate", "Job search guidance"], cta: "Best choice", best: true },
        { name: "Mentor", price: "VIP", desc: "Live support", features: ["Everything in Pro", "1:1 live lessons during the course (Zoom)", "Homework review and feedback", "Guaranteed portfolio (5+ parts)", "Career consultation"], cta: "Book", best: false },
      ],
      faq: [
        { q: "Is SOLIDWORKS hard to learn?", a: "The course starts from zero: first the interface and sketching, then 3D, assemblies and drawings. No prior CAD experience is needed." },
        { q: "What computer do I need?", a: "SOLIDWORKS runs only on Windows. The exact requirements are on the System Requirements page of the official solidworks.com site." },
        { q: "Where do I get the software?", a: "Students can get the official free SOLIDWORKS Design Standard for Students: solidworks.com/product/students." },
      ],
    },
  },
  "catia-v5": {
    ru: {
      whyTitle: "Почему CATIA V5?",
      whyDesc: "Программа Dassault Systèmes: используется в авиации и автомобилестроении для сложных деталей и больших сборок.",
      benefits: [
        { title: "Авиация и автомобилестроение", desc: "CATIA используется именно в этих отраслях для сложных поверхностей и больших сборок." },
        { title: "Система рабочих сред", desc: "Каждый вид работы — эскиз, деталь, сборка, чертёж — в своём workbench: упорядоченная и мощная среда." },
        { title: "Кинематика", desc: "Проверка движения механизма на компьютере с DMU Kinematics." },
      ],
      capabilitiesTitle: "Чему вы научитесь на курсе",
      capabilities: [
        { title: "Sketcher", desc: "2D-профили и полностью определённый эскиз с геометрическими и размерными ограничениями." },
        { title: "Part Design", desc: "3D-детали с Pad, Pocket, Shaft, Fillet, Chamfer, Draft, Pattern и Mirror." },
        { title: "Assembly Design и DMU", desc: "Сборка с Constraints, подходы Bottom-Up и Top-Down, DMU Kinematics." },
        { title: "Drafting", desc: "Технический чертёж с упорядоченными видами по 3D-модели." },
      ],
      stepsTitle: "Программа курса",
      steps: [
        { step: "1", title: "Введение и Sketcher", points: ["Интерфейс и рабочие среды (workbench)", "Sketcher: формы и ограничения"] },
        { step: "2", title: "Part Design", points: ["Pad, Pocket и Shaft", "Fillet, Chamfer и Draft", "Pattern, Mirror и практика на реальной детали"] },
        { step: "3", title: "Assembly Design", points: ["Сборка и Constraints", "Подходы Top-Down и Bottom-Up", "DMU Kinematics: движение механизма"] },
        { step: "4", title: "Drafting и итоговый проект", points: ["Чертёж и виды", "Итоговый проект: деталь, сборка и чертёж"] },
      ],
      outcomes: [
        "Построите 3D-деталь по эскизу в CATIA V5",
        "Соберёте сборку и проверите движение механизма в DMU Kinematics",
        "Подготовите технические чертежи детали и сборки",
      ],
      pricing: [
        { name: "Starter", price: "$49", desc: "Начальный уровень", features: ["Видеокурс CATIA (Part Design)", "Стандартная инженерная практика", "Обсуждение в группе"], cta: "Учиться", best: false },
        { name: "Pro", price: "$149", desc: "Секреты автомобилестроения", features: ["Специальный раздел Surfacing (GSD) и DMU", "Премиум Telegram-бот помощник", "Портфолио (эксклюзивные проекты)", "Certificate of Excellence"], cta: "Купить", best: true },
        { name: "Mentor", price: "Business", desc: "B2B / персональный ментор", features: ["Для сотрудников заводов и производителей", "Консультации по инженерным доработкам", "Мастер-класс на основе отраслевого опыта"], cta: "Связаться", best: false },
      ],
      faq: [
        { q: "Раньше я работал только в AutoCAD. Смогу ли я изучить CATIA?", a: "Да. Курс начинается с интерфейса CATIA; опыт черчения в AutoCAD поможет на этапе эскиза." },
        { q: "Нужен ли мощный компьютер?", a: "CATIA V5 работает в Windows; для больших сборок нужен более мощный компьютер. Точные требования — на официальной странице Dassault Systèmes." },
      ],
    },
    en: {
      whyTitle: "Why CATIA V5?",
      whyDesc: "Dassault Systèmes software used in aviation and the automotive industry for complex parts and large assemblies.",
      benefits: [
        { title: "Aviation and automotive", desc: "CATIA is used in exactly these industries for complex surfaces and large assemblies." },
        { title: "Workbench system", desc: "Each type of work — sketch, part, assembly, drawing — has its own workbench: an organized and powerful environment." },
        { title: "Kinematics", desc: "Check how a mechanism moves on the computer with DMU Kinematics." },
      ],
      capabilitiesTitle: "What you will learn",
      capabilities: [
        { title: "Sketcher", desc: "2D profiles and fully defined sketches with geometric and dimensional constraints." },
        { title: "Part Design", desc: "3D parts with Pad, Pocket, Shaft, Fillet, Chamfer, Draft, Pattern and Mirror." },
        { title: "Assembly Design and DMU", desc: "Assembling with Constraints, bottom-up and top-down approaches, DMU Kinematics." },
        { title: "Drafting", desc: "Technical drawings with well-arranged views from the 3D model." },
      ],
      stepsTitle: "Course program",
      steps: [
        { step: "1", title: "Introduction and Sketcher", points: ["Interface and workbenches", "Sketcher: shapes and constraints"] },
        { step: "2", title: "Part Design", points: ["Pad, Pocket and Shaft", "Fillet, Chamfer and Draft", "Pattern, Mirror and real part practice"] },
        { step: "3", title: "Assembly Design", points: ["Assemblies and Constraints", "Top-down and bottom-up approaches", "DMU Kinematics: mechanism motion"] },
        { step: "4", title: "Drafting and final project", points: ["Drawings and views", "Final project: part, assembly and drawing"] },
      ],
      outcomes: [
        "Build 3D parts from sketches in CATIA V5",
        "Create assemblies and check mechanism motion in DMU Kinematics",
        "Prepare technical drawings for parts and assemblies",
      ],
      pricing: [
        { name: "Starter", price: "$49", desc: "Entry level", features: ["CATIA video course (Part Design)", "Standard engineering practice", "Group discussion"], cta: "Start learning", best: false },
        { name: "Pro", price: "$149", desc: "Automotive know-how", features: ["Special Surfacing (GSD) and DMU section", "Premium Telegram assistant bot", "Portfolio (exclusive projects)", "Certificate of Excellence"], cta: "Buy", best: true },
        { name: "Mentor", price: "Business", desc: "B2B / personal mentoring", features: ["For factory and manufacturer staff", "Consulting on engineering fixes", "Master class based on industry experience"], cta: "Contact us", best: false },
      ],
      faq: [
        { q: "I have only worked in AutoCAD before. Can I learn CATIA?", a: "Yes. The course starts with the CATIA interface; your AutoCAD drafting experience will help at the sketching stage." },
        { q: "Do I need a powerful computer?", a: "CATIA V5 runs on Windows; large assemblies need a more powerful computer. The exact requirements are on the official Dassault Systèmes page." },
      ],
    },
  },
  "3d-modeling": {
    ru: {
      whyTitle: "Почему FEA?",
      whyDesc: "Проверить в SOLIDWORKS Simulation, выдержит ли деталь нагрузку, ещё до изготовления прототипа — это экономит время и материал.",
      benefits: [
        { title: "Испытание до прототипа", desc: "Вы проверяете деталь на компьютере, а не изготавливаете и ломаете её." },
        { title: "Экономия материала", desc: "Топологическая оптимизация убирает лишний материал и сохраняет прочность." },
        { title: "Обоснование цифрами", desc: "Напряжения, деформации и коэффициент запаса — решения опираются на цифры." },
      ],
      capabilitiesTitle: "Чему вы научитесь на курсе",
      capabilities: [
        { title: "Статический анализ", desc: "Напряжения, деформации и коэффициент запаса под нагрузкой." },
        { title: "Тепловой анализ", desc: "Теплопроводность и тепловое расширение." },
        { title: "Сетка и сходимость", desc: "Как качество сетки влияет на точность результата." },
        { title: "Топологическая оптимизация", desc: "Снижение расхода материала при сохранении прочности." },
      ],
      stepsTitle: "Программа курса",
      steps: [
        { step: "1", title: "Основы FEA", points: ["Элементы, узлы и сетка", "Свойства материала и граничные условия"] },
        { step: "2", title: "Статический и тепловой анализ", points: ["Static Structural Analysis", "Thermal Analysis"] },
        { step: "3", title: "Результаты", points: ["Качество сетки и сходимость", "Интерпретация результатов и отчёт"] },
        { step: "4", title: "Практические проекты", points: ["Топологическая оптимизация", "Итоговый проект: полный отчёт по анализу"] },
      ],
      outcomes: [
        "Сможете расчётом обосновать, что деталь выдержит нагрузку",
        "Правильно зададите сетку и граничные условия и проверите результат",
        "Снизите расход материала с помощью топологической оптимизации",
      ],
      pricing: [
        { name: "FEA Starter", price: "$39", desc: "Анализ с нуля", features: ["Основные методики", "Простые статические симуляции", "Библиотека проектов"], cta: "Получить", best: false },
        { name: "Engineer Pro", price: "$79", desc: "Комплексный анализ", features: ["Полный Thermal и Static", "Инженерное портфолио для олимпиад и стартапов", "Индивидуальный зал обсуждений"], cta: "Лучший выбор", best: true },
        { name: "Corporate", price: "$$$", desc: "Решения для заводов", features: ["Прямая интеграция с производством", "База для массовой проверки сотрудников предприятия"], cta: "Связаться", best: false },
      ],
      faq: [
        { q: "В какой программе проходит курс?", a: "В SOLIDWORKS Simulation. Полезно знать основы построения моделей в SOLIDWORKS." },
        { q: "Насколько глубоко нужно знать физику и математику?", a: "Нужные понятия механики (напряжение, деформация, свойства материала) объясняются на курсе. Расчёт выполняет программа." },
      ],
    },
    en: {
      whyTitle: "Why FEA?",
      whyDesc: "Checking in SOLIDWORKS Simulation whether a part will withstand the load before building a prototype saves time and material.",
      benefits: [
        { title: "Test before the prototype", desc: "You check the part on the computer instead of building it and breaking it." },
        { title: "Save material", desc: "Topology optimization removes unnecessary material while keeping the strength." },
        { title: "Backed by numbers", desc: "Stress, deformation and factor of safety — decisions rely on numbers." },
      ],
      capabilitiesTitle: "What you will learn",
      capabilities: [
        { title: "Static analysis", desc: "Stress, deformation and factor of safety under load." },
        { title: "Thermal analysis", desc: "Heat conduction and thermal expansion." },
        { title: "Mesh and convergence", desc: "How mesh quality affects the accuracy of the result." },
        { title: "Topology optimization", desc: "Reducing material use while keeping the strength." },
      ],
      stepsTitle: "Course program",
      steps: [
        { step: "1", title: "FEA fundamentals", points: ["Elements, nodes and the mesh", "Material properties and boundary conditions"] },
        { step: "2", title: "Static and thermal analysis", points: ["Static Structural Analysis", "Thermal Analysis"] },
        { step: "3", title: "Results", points: ["Mesh quality and convergence", "Interpreting results and reporting"] },
        { step: "4", title: "Practical projects", points: ["Topology optimization", "Final project: a full analysis report"] },
      ],
      outcomes: [
        "Prove with calculations that a part will withstand the load",
        "Set up the mesh and boundary conditions correctly and verify the result",
        "Reduce material use with topology optimization",
      ],
      pricing: [
        { name: "FEA Starter", price: "$39", desc: "Analysis from scratch", features: ["Core methods", "Simple static simulations", "Project library"], cta: "Get it", best: false },
        { name: "Engineer Pro", price: "$79", desc: "Comprehensive analysis", features: ["Full Thermal & Static", "Engineering portfolio for olympiads and startups", "Private discussion room"], cta: "Best choice", best: true },
        { name: "Corporate", price: "$$$", desc: "Solutions for factories", features: ["Direct integration with production", "Database for testing company staff at scale"], cta: "Contact us", best: false },
      ],
      faq: [
        { q: "Which software is the course taught in?", a: "SOLIDWORKS Simulation. Knowing the basics of modeling in SOLIDWORKS will help." },
        { q: "How deeply do I need to know physics and math?", a: "The mechanics concepts you need (stress, deformation, material properties) are explained during the course. The software does the calculations." },
      ],
    },
  },
  "plm-systems": {
    ru: {
      whyTitle: "Почему PLM?",
      whyDesc: "Системы PDM/PLM позволяют управлять всеми инженерными данными компании в одном месте.",
      benefits: [
        { title: "Единый источник данных", desc: "Дубликаты файлов исчезают, все работают с одной — последней — версией." },
        { title: "Командная работа", desc: "Несколько инженеров работают над одним проектом с ролями и правами доступа." },
        { title: "Контроль изменений", desc: "Версии, ревизии и запросы на изменение (ECO) управляются по порядку." },
        { title: "Система Dassault Systèmes", desc: "На платформе 3DEXPERIENCE CATIA, SOLIDWORKS, ENOVIA и другие программы работают в одном месте." },
      ],
      capabilitiesTitle: "Чему вы научитесь на курсе",
      capabilities: [
        { title: "Collaborative Space", desc: "Настройка рабочего пространства, ролей и прав доступа для команды." },
        { title: "Версии и ревизии", desc: "История изменений конструкции и возврат к предыдущей версии при необходимости." },
        { title: "Управление BOM", desc: "Bill of Materials в ENOVIA: разница между Engineering BOM и Manufacturing BOM." },
        { title: "Workflow и изменения", desc: "Настройка запроса на изменение (ECO) и цепочки согласования на платформе." },
      ],
      stepsTitle: "Программа курса",
      steps: [
        { step: "1", title: "Основы PLM", points: ["Разница между PLM и PDM", "Интерфейс 3DEXPERIENCE и Compass"] },
        { step: "2", title: "Командная работа", points: ["Collaborative Space и роли", "Управление версиями и ревизиями"] },
        { step: "3", title: "BOM и изменения", points: ["ENOVIA: управление BOM", "Workflow и Change Management"] },
        { step: "4", title: "Практика", points: ["Настройка среды виртуальной компании", "Итоговый проект: план внедрения PLM"] },
      ],
      outcomes: [
        "Сможете настроить среду 3DEXPERIENCE для небольшой команды",
        "Будете управлять версиями, BOM и изменениями на платформе",
        "Сможете составить план внедрения PLM для компании",
      ],
      pricing: [
        { name: "Concept", price: "$49", desc: "Понимание", features: ["Все основные видео", "Логика работы платформы на демо", "Базовый сертификат"], cta: "Купить", best: false },
        { name: "Integrator", price: "$89", desc: "Менеджер", features: ["Полная практика ENOVIA", "Реальные кейсы в 3DEXPERIENCE", "Премиум-поддержка"], cta: "Выбрать", best: true },
        { name: "Enterprise", price: "$$$", desc: "Команда", features: ["Заказ интеграции PLM для вашей компании", "Онлайн-обучение ваших сотрудников"], cta: "Заявка", best: false },
      ],
      faq: [
        { q: "Нужен ли мне этот курс?", a: "Если вы работаете один, PLM нужен меньше. Если над одним проектом работают двое и больше, он важен для управления данными и изменениями." },
      ],
    },
    en: {
      whyTitle: "Why PLM?",
      whyDesc: "PDM/PLM systems let a company manage all of its engineering data in one place.",
      benefits: [
        { title: "Single source of truth", desc: "Duplicate files disappear and everyone works with the same, latest version." },
        { title: "Teamwork", desc: "Several engineers work on one project with roles and permissions." },
        { title: "Change control", desc: "Versions, revisions and engineering change orders (ECO) are managed in order." },
        { title: "A Dassault Systèmes system", desc: "On the 3DEXPERIENCE platform, CATIA, SOLIDWORKS, ENOVIA and other applications work in one place." },
      ],
      capabilitiesTitle: "What you will learn",
      capabilities: [
        { title: "Collaborative Space", desc: "Setting up a team workspace, roles and permissions." },
        { title: "Versions and revisions", desc: "Design change history and rolling back to an earlier version when needed." },
        { title: "BOM management", desc: "Bill of Materials in ENOVIA: Engineering BOM vs Manufacturing BOM." },
        { title: "Workflow and changes", desc: "Setting up change orders (ECO) and the approval chain on the platform." },
      ],
      stepsTitle: "Course program",
      steps: [
        { step: "1", title: "PLM fundamentals", points: ["PLM vs PDM", "The 3DEXPERIENCE interface and Compass"] },
        { step: "2", title: "Teamwork", points: ["Collaborative Space and roles", "Version and revision management"] },
        { step: "3", title: "BOM and changes", points: ["ENOVIA: BOM management", "Workflow and change management"] },
        { step: "4", title: "Practice", points: ["Setting up a virtual company environment", "Final project: a PLM implementation plan"] },
      ],
      outcomes: [
        "Set up a 3DEXPERIENCE environment for a small team",
        "Manage versions, BOMs and changes on the platform",
        "Draw up a PLM implementation plan for a company",
      ],
      pricing: [
        { name: "Concept", price: "$49", desc: "Understanding", features: ["All core videos", "Platform logic on a demo", "Basic certificate"], cta: "Buy", best: false },
        { name: "Integrator", price: "$89", desc: "Manager", features: ["Full ENOVIA practice", "Real cases in 3DEXPERIENCE", "Premium support"], cta: "Choose", best: true },
        { name: "Enterprise", price: "$$$", desc: "Team", features: ["PLM integration for your company", "Online training for your staff"], cta: "Apply", best: false },
      ],
      faq: [
        { q: "Do I need this course?", a: "If you work alone, PLM matters less. If two or more people work on one project, it is important for managing data and changes." },
      ],
    },
  },
};
