// =============================================
// KURSLAR MA'LUMOTLARI — Demo statik data
// =============================================

export interface Lesson {
  id: string;
  title: string;
  duration: string; // "12:30"
  videoUrl?: string;
  pdfUrl?: string;
  text?: string;
  images?: string[];
  isFree: boolean; // birinchi dars bepul preview sifatida
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
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
  duration: string; // "24 soat"
  studentsCount: number;
  rating: number;
  modules: Module[];
  tags: string[];
}

export const COURSES: Course[] = [
  {
    id: "solidworks-basics",
    title: "SOLIDWORKS Asoslari",
    subtitle: "3D modellashtirish va muhandislik chizmalarini yaratish",
    description:
      "Ushbu kurs orqali SOLIDWORKS dasturini noldan o'rganasiz. Boshlang'ich 3D modellashtirish, chizmachilik va simulyatsiya asoslarini egallaysiz.",
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
    modules: [
      {
        id: "sw-m1",
        title: "Kirish va Interfeys",
        lessons: [
          {
            id: "sw-l1",
            title: "SOLIDWORKS'ga kirish",
            duration: "8:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "SOLIDWORKS — bu 3D CAD dasturi bo'lib, muhandislik loyihalarida keng qo'llaniladi. Ushbu darsda dasturning interfeysi va asosiy vositalari bilan tanishasiz.",
            images: [
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
            ],
            isFree: true,
          },
          {
            id: "sw-l2",
            title: "Fayllar bilan ishlash",
            duration: "10:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Part, Assembly va Drawing fayl turlarini yaratish va saqlash.",
            isFree: false,
          },
          {
            id: "sw-l3",
            title: "Sketch asoslari",
            duration: "15:10",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "2D eskiz chizish, o'lchamlar qo'yish va cheklovlar.",
            isFree: false,
          },
        ],
      },
      {
        id: "sw-m2",
        title: "3D Modellashtirish",
        lessons: [
          {
            id: "sw-l4",
            title: "Extrude va Revolve",
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Sketch'dan 3D jism yaratish — Extrude Boss/Cut va Revolve amallari.",
            images: [
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
            ],
            isFree: false,
          },
          {
            id: "sw-l5",
            title: "Fillet va Chamfer",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Qirralarni yumoqlashtirish va qirqish amallari.",
            isFree: false,
          },
        ],
      },
      {
        id: "sw-m3",
        title: "Chizmachilik (Drawing)",
        lessons: [
          {
            id: "sw-l6",
            title: "Drawing yaratish",
            duration: "20:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "3D modeldan chizma yaratish, ko'rinishlar qo'yish.",
            isFree: false,
          },
          {
            id: "sw-l7",
            title: "O'lchamlar va izohlar",
            duration: "14:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Chizmada o'lchamlar, toleranslar va texnik izohlar.",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: "catia-v5",
    title: "CATIA V5 Professional",
    subtitle: "Sanoat darajasida muhandislik loyihalash",
    description:
      "CATIA V5 — aviatsiya va avtomobil sanoatida qo'llaniladigan eng kuchli CAD tizimidir. Bu kurs sizni professional darajaga olib chiqadi.",
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
    modules: [
      {
        id: "cat-m1",
        title: "CATIA muhiti",
        lessons: [
          {
            id: "cat-l1",
            title: "CATIA V5 ga kirish",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "CATIA V5 interfeysi, workbenchlar va asosiy sozlamalar.",
            isFree: true,
          },
          {
            id: "cat-l2",
            title: "Part Design asoslari",
            duration: "22:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Part Design workbench orqali 3D qismlar yaratish.",
            isFree: false,
          },
        ],
      },
      {
        id: "cat-m2",
        title: "Surface Modeling",
        lessons: [
          {
            id: "cat-l3",
            title: "Generative Shape Design",
            duration: "28:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Yuza modellashtirish va murakkab shakllar yaratish.",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: "3d-modeling",
    title: "3D Modellashtirish va Tahlil",
    subtitle: "FEA simulyatsiya va mustahkamlik tahlili",
    description:
      "Konstruksiyalar mustahkamligini raqamli usulda tekshirish. Simulation Xpress va ANSYS asoslari.",
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
    modules: [
      {
        id: "3d-m1",
        title: "Simulyatsiya asoslari",
        lessons: [
          {
            id: "3d-l1",
            title: "Nima uchun simulyatsiya?",
            duration: "7:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Raqamli simulyatsiyaning ahamiyati va qo'llanish sohalari.",
            isFree: true,
          },
          {
            id: "3d-l2",
            title: "Material xossalari",
            duration: "11:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Material kutubxonasi va mexanik xususiyatlarni belgilash.",
            isFree: false,
          },
        ],
      },
      {
        id: "3d-m2",
        title: "Amaliy tahlil",
        lessons: [
          {
            id: "3d-l3",
            title: "Statik tahlil",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "Yuklanish va mahkamlash shartlarini berish.",
            isFree: false,
          },
          {
            id: "3d-l4",
            title: "Natijalarni talqin qilish",
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Von Mises kuchlanish, deformatsiya va xavfsizlik koeffitsienti.",
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: "plm-systems",
    title: "PLM Tizimlar",
    subtitle: "Mahsulot hayotiy siklini boshqarish",
    description:
      "PLM (Product Lifecycle Management) — korxonada mahsulot ma'lumotlarini boshqarishning zamonaviy usuli.",
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
    modules: [
      {
        id: "plm-m1",
        title: "PLM asoslari",
        lessons: [
          {
            id: "plm-l1",
            title: "PLM nima?",
            duration: "9:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "PLM tushunchasi, tarixi va zamonaviy tizimlarga kirish.",
            isFree: true,
          },
          {
            id: "plm-l2",
            title: "3DEXPERIENCE platforma",
            duration: "16:40",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            pdfUrl: "#",
            text: "Dassault Systèmes 3DEXPERIENCE platformasiga umumiy ko'rinish.",
            isFree: false,
          },
        ],
      },
      {
        id: "plm-m2",
        title: "Amaliy joriy etish",
        lessons: [
          {
            id: "plm-l3",
            title: "Korxonada PLM joriy etish",
            duration: "30:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            text: "PLM tizimini bosqichma-bosqich joriy etish metodologiyasi.",
            isFree: false,
          },
        ],
      },
    ],
  },
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
