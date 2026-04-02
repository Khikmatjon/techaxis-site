import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "lib", "db", "courses.json");

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  isFree?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  lessons: Lesson[];
}

const DEMO_COURSES: Course[] = [
  {
    id: "solidworks-basics",
    title: "SOLIDWORKS: Professional 3D Modellashtirish",
    description: "Sanoat darajasidagi dizaynlarni noldan yaratishni o'rganing.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
    price: "750,000",
    lessons: [
      { id: "L1", title: "Kirish va Dasturni o'rnatish", videoUrl: "https://www.youtube.com/embed/example1", duration: "12:45", isFree: true },
      { id: "L2", title: "Sketch (Eskiz) chizish asoslari", videoUrl: "https://www.youtube.com/embed/example2", duration: "25:30" },
      { id: "L3", title: "3D Extrude va Revolve buyruqlari", videoUrl: "https://www.youtube.com/embed/example3", duration: "18:20" },
    ]
  },
  {
    id: "catia-v5-mastery",
    title: "CATIA V5: Samolyotsozlik va Avtomobilsozlik",
    description: "Murakkab sirtli modellar va yig'ish (Assembly) texnologiyalari.",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2000",
    price: "1,200,000",
    lessons: [
      { id: "C1", title: "CATIA Interface va Logic", videoUrl: "https://www.youtube.com/embed/example4", duration: "15:00", isFree: true },
    ]
  }
];

export function getCourses(): Course[] {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEMO_COURSES, null, 2));
    return DEMO_COURSES;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

export function getCourseById(id: string) {
  return getCourses().find(c => c.id === id);
}
