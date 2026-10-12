// =============================================================================
// SOLIDWORKS JONLI KURSI -- RUSCHA VA INGLIZCHA TARJIMA (/ru va /en sahifalar)
// =============================================================================
// O'zbekcha matn: content/jonli-kurs.ts. U yerda narx, sana, dastur va h.k.ni
// o'zgartirsangiz, shu yerni ham yangilang. Darslar o'zbek tilida o'tadi -- bu ru/en
// matnda ochiq yozilgan (taklif va birinchi savol).
// =============================================================================
import { JONLI_KURS, DARAJALAR } from "@/content/jonli-kurs";

type Izohli = { nomi: string; izoh: string };
export type JonliKursMatn = {
  guruh: string;
  boshlanish: string;
  narx: string | null;
  jadval: string | null;
  davomiylik: string;
  taklif: string;
  kimlarUchun: readonly Izohli[];
  darsFormati: readonly Izohli[];
  savollar: readonly { q: string; a: string }[];
  natijalar: readonly string[];
  dastur: readonly { hafta: string; nomi: string; darslar: readonly { mavzu: string; tafsilot: string }[] }[];
};

const TARJIMA: Record<"ru" | "en", JonliKursMatn> = {
  ru: {
    guruh: "Группа 1",
    boshlanish: "20 октября 2026",
    narx: "990 000 сум",
    jadval: "4 раза в неделю, каждый урок 1,5–2 часа",
    davomiylik: "4 недели, 16 уроков",
    taklif:
      "За 4 недели вы научитесь самостоятельно создавать в SOLIDWORKS детали, сборки и технические чертежи " +
      "и подготовитесь к международным экзаменам CSWA и CSWP. Не видео, а живые уроки, маленькая группа " +
      "и ответ на каждый вопрос сразу. Уроки проходят на узбекском языке.",
    kimlarUchun: [
      { nomi: "Студенты", izoh: "Вы учитесь на инженерном направлении и хотите освоить SOLIDWORKS на практике и по порядку." },
      { nomi: "Молодые инженеры и конструкторы", izoh: "Хотите на работе быстрее и точнее делать модели, сборки и чертежи." },
      { nomi: "Переходящие с другой программы", izoh: "Вы работали в AutoCAD или другой CAD-системе и теперь переходите на 3D-параметрическое моделирование." },
      { nomi: "Желающие получить сертификат", izoh: "CSWA и CSWP — официальные сертификаты SOLIDWORKS; они подтверждают ваши знания в резюме." },
    ],
    darsFormati: [
      { nomi: "Живой урок в Zoom", izoh: "Я показываю на своём экране, вы сразу повторяете и задаёте вопросы." },
      { nomi: "Чёткая структура", izoh: "Каждый урок 1,5–2 часа: повторение, новая тема, затем практика." },
      { nomi: "Маленькая группа", izoh: "В группе всего 5 человек — работа каждого ученика разбирается." },
      { nomi: "Домашнее задание", izoh: "После каждого урока — практическое задание, следующий урок начинается с его разбора." },
      { nomi: "Еженедельный мини-тест", izoh: "В конце каждой недели — упражнение в формате экзамена, на время." },
      { nomi: "Итоговый проект", izoh: "В конце курса — ваш собственный механизм: детали, сборка, чертежи и BOM." },
    ],
    savollar: [
      { q: "На каком языке проходят уроки?", a: "На узбекском языке." },
      { q: "Можно, если я совсем не знаю SOLIDWORKS?", a: "Да, можно — изучим вместе с нуля. На первом уроке установим программу и познакомимся с интерфейсом." },
      { q: "Какой нужен компьютер?", a: "Компьютер, который свободно тянет SOLIDWORKS. Программа работает только в Windows." },
      { q: "Где взять программу?", a: "Скачаем вместе с официального сайта. Для студентов SOLIDWORKS Design Standard for Students — официальная и бесплатная." },
      { q: "Как оплачивать?", a: "Первый урок бесплатный. Если формат подойдёт, дальше оплачиваете картой, через Click или банковским переводом." },
      { q: "Кто выдаёт сертификаты CSWA и CSWP?", a: "Официально SOLIDWORKS (Dassault Systèmes). Экзамен сдаётся через solidworks.com, а курс готовит именно по темам этого экзамена." },
    ],
    natijalar: [
      "Подготовка к экзаменам CSWA и CSWP — программа построена по темам официальных экзаменов",
      "Самостоятельное создание деталей, сборок и технических чертежей",
      "Простые детали из листового металла (Sheet Metal) и их развёртки",
      "Простой статический анализ (Simulation): напряжения и коэффициент запаса",
      "Итоговый проект: механизм из 5–8 деталей — со сборкой, чертежами и BOM",
    ],
    dastur: [
      {
        hafta: "Неделя 1",
        nomi: "Эскиз и основные детали",
        darslar: [
          { mavzu: "Введение и рабочая среда", tafsilot: "Интерфейс, типы файлов, единицы, шаблоны; установка программы" },
          { mavzu: "2D-эскиз I", tafsilot: "Линия, окружность, дуга; взаимосвязи (relations), Smart Dimension" },
          { mavzu: "2D-эскиз II и Extrude", tafsilot: "Эллипс, Convert, Trim, Offset, Mirror; Extruded Boss/Cut" },
          { mavzu: "Основные 3D-операции", tafsilot: "Revolve, Fillet, Chamfer, Hole Wizard; материал и масса" },
        ],
      },
      {
        hafta: "Неделя 2",
        nomi: "Сложные детали и параметры",
        darslar: [
          { mavzu: "Доработка детали", tafsilot: "Shell, Rib, Draft; линейные, круговые и Fill-массивы, Mirror" },
          { mavzu: "Вспомогательная геометрия, Sweep и Loft", tafsilot: "Плоскости и оси; основы Sweep и Loft" },
          { mavzu: "Параметры и конфигурации", tafsilot: "Уравнения, связанные размеры, Design Table" },
          { mavzu: "Упражнение на изменение детали", tafsilot: "Модель по чертежу, Move/Delete Face, многотельные детали (multi-body)" },
        ],
      },
      {
        hafta: "Неделя 3",
        nomi: "Сборка и технический чертёж",
        darslar: [
          { mavzu: "Сборка I", tafsilot: "Добавление компонентов, стандартные сопряжения (Mates), mate references" },
          { mavzu: "Сборка II", tafsilot: "Сложные сопряжения, in-context, Interference и Collision Detection" },
          { mavzu: "Технический чертёж I", tafsilot: "Стандартные виды, разрезы, выносные и вспомогательные виды" },
          { mavzu: "Технический чертёж II", tafsilot: "Размеры, аннотации, допуски, BOM и позиционные выноски (balloons)" },
        ],
      },
      {
        hafta: "Неделя 4",
        nomi: "Sheet Metal, Simulation и подготовка к экзамену",
        darslar: [
          { mavzu: "Sheet Metal", tafsilot: "Base, Edge и Miter Flange, Sketched Bend, развёртка (Flat Pattern)" },
          { mavzu: "Simulation", tafsilot: "Статический анализ: закрепления, нагрузки, сетка, результаты" },
          { mavzu: "Подготовка к CSWA", tafsilot: "Формат экзамена, примеры вопросов, пробный экзамен на время" },
          { mavzu: "CSWP и итоговый проект", tafsilot: "Упражнения по разделам CSWP, защита итогового проекта" },
        ],
      },
    ],
  },
  en: {
    guruh: "Group 1",
    boshlanish: "20 October 2026",
    narx: "990,000 UZS",
    jadval: "4 times a week, 1.5–2 hours per lesson",
    davomiylik: "4 weeks, 16 lessons",
    taklif:
      "In 4 weeks you will learn to build parts, assemblies and technical drawings in SOLIDWORKS on your own " +
      "and prepare for the international CSWA and CSWP exams. Not videos — live lessons, a small group and " +
      "an immediate answer to every question. Lessons are taught in Uzbek.",
    kimlarUchun: [
      { nomi: "Students", izoh: "You study engineering and want to learn SOLIDWORKS in practice, step by step." },
      { nomi: "Young engineers and designers", izoh: "You want to build models, assemblies and drawings faster and more accurately at work." },
      { nomi: "Switching from another program", izoh: "You have worked in AutoCAD or another CAD system and are moving to 3D parametric modeling." },
      { nomi: "Aiming for a certificate", izoh: "CSWA and CSWP are official SOLIDWORKS certifications; they prove your skills on your résumé." },
    ],
    darsFormati: [
      { nomi: "Live Zoom lesson", izoh: "I show it on my screen, you repeat it right away and ask questions." },
      { nomi: "Clear structure", izoh: "Each lesson is 1.5–2 hours: review, new topic, then practice." },
      { nomi: "Small group", izoh: "Only 5 people in the group — every student's work gets reviewed." },
      { nomi: "Homework", izoh: "A practical task after every lesson; the next lesson starts by reviewing it." },
      { nomi: "Weekly mini-test", izoh: "At the end of each week, a timed exam-style exercise." },
      { nomi: "Final project", izoh: "At the end of the course, your own mechanism: parts, assembly, drawings and BOM." },
    ],
    savollar: [
      { q: "What language are the lessons in?", a: "Uzbek." },
      { q: "Can I join if I don't know SOLIDWORKS at all?", a: "Yes — we will learn it together from zero. In the first lesson we install the software and get to know the interface." },
      { q: "What computer do I need?", a: "One that can comfortably run SOLIDWORKS. The software runs only on Windows." },
      { q: "Where do I get the software?", a: "We will download it together from the official site. For students, SOLIDWORKS Design Standard for Students is official and free." },
      { q: "How do I pay?", a: "The first lesson is free. If the format suits you, you then pay by card, via Click or by bank transfer." },
      { q: "Who issues the CSWA and CSWP certificates?", a: "SOLIDWORKS itself (Dassault Systèmes). The exam is taken through solidworks.com, and the course prepares you for exactly these exam topics." },
    ],
    natijalar: [
      "Preparation for the CSWA and CSWP exams — the program follows the official exam topics",
      "Building parts, assemblies and technical drawings on your own",
      "Simple Sheet Metal parts and their flat patterns",
      "Simple static analysis (Simulation): stress and factor of safety",
      "Final project: a 5–8 part mechanism with assembly, drawings and BOM",
    ],
    dastur: [
      {
        hafta: "Week 1",
        nomi: "Sketching and basic parts",
        darslar: [
          { mavzu: "Introduction and environment", tafsilot: "Interface, file types, units, templates; installing the software" },
          { mavzu: "2D sketch I", tafsilot: "Line, circle, arc; relations, Smart Dimension" },
          { mavzu: "2D sketch II and Extrude", tafsilot: "Ellipse, Convert, Trim, Offset, Mirror; Extruded Boss/Cut" },
          { mavzu: "Core 3D features", tafsilot: "Revolve, Fillet, Chamfer, Hole Wizard; material and mass" },
        ],
      },
      {
        hafta: "Week 2",
        nomi: "Complex parts and parameters",
        darslar: [
          { mavzu: "Enriching the part", tafsilot: "Shell, Rib, Draft; linear, circular and fill patterns, Mirror" },
          { mavzu: "Reference geometry, Sweep and Loft", tafsilot: "Planes and axes; Sweep and Loft basics" },
          { mavzu: "Parameters and configurations", tafsilot: "Equations, linked dimensions, Design Table" },
          { mavzu: "Part modification exercise", tafsilot: "Model from a drawing, Move/Delete Face, multi-body parts" },
        ],
      },
      {
        hafta: "Week 3",
        nomi: "Assemblies and technical drawings",
        darslar: [
          { mavzu: "Assembly I", tafsilot: "Adding components, standard mates, mate references" },
          { mavzu: "Assembly II", tafsilot: "Advanced mates, in-context, Interference and Collision Detection" },
          { mavzu: "Technical drawing I", tafsilot: "Standard, section, detail and auxiliary views" },
          { mavzu: "Technical drawing II", tafsilot: "Dimensions, annotations, tolerances, BOM and balloons" },
        ],
      },
      {
        hafta: "Week 4",
        nomi: "Sheet Metal, Simulation and exam preparation",
        darslar: [
          { mavzu: "Sheet Metal", tafsilot: "Base, Edge and Miter Flange, Sketched Bend, Flat Pattern" },
          { mavzu: "Simulation", tafsilot: "Static analysis: fixtures, loads, mesh, results" },
          { mavzu: "CSWA preparation", tafsilot: "Exam format, sample questions, timed practice exam" },
          { mavzu: "CSWP and final project", tafsilot: "Practice on CSWP sections, final project presentation" },
        ],
      },
    ],
  },
};

// Sahifa uchun joriy tildagi matn (joylar soni, platforma va o'qituvchi hamma tilda bir xil).
export function jonliKursMatn(locale: string) {
  const asosiy = { ...JONLI_KURS } as Omit<typeof JONLI_KURS, keyof JonliKursMatn> & JonliKursMatn;
  if (locale !== "ru" && locale !== "en") return asosiy;
  return { ...asosiy, ...TARJIMA[locale] };
}

// Formadagi tajriba variantlari tarjimasi (qiymati o'zbekcha yuboriladi -- server shu bilan tekshiradi).
export const DARAJA_NOMLARI: Record<(typeof DARAJALAR)[number], { ru: string; en: string }> = {
  "Endi boshlayman": { ru: "Только начинаю", en: "Just starting" },
  "Biroz bilaman": { ru: "Немного знаю", en: "I know a little" },
  "Ishda ishlataman": { ru: "Использую в работе", en: "I use it at work" },
};
