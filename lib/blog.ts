export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "Beginner" | "Problem-based" | "Comparison" | "Case-study";
  readTime: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "4",
    slug: "ev-motor-telemetry-design",
    title: "EV & Hybrid Motor Telemetry System Design (Real Engineering Project)",
    excerpt: "Elektr va gibrid avtomobillar motorlari uchun mo‘ljallangan telemetry monitoring tizimi mexanik dizayni va sensor integratsiyasi.",
    content: `
Elektr va gibrid avtomobillar uchun mo‘ljallangan motorlarda ishlatiladigan telemetry monitoring tizimi ustida real loyihada ishladim. 
Ushbu loyiha yuqori tezlik, kuchli vibratsiya va harorat o‘zgarishlari mavjud bo‘lgan muhitda aniq va barqaror ishlaydigan mexanik + sensor integratsiya tizimini yaratishga qaratilgan.

### Project Overview
*   **Loyiha turi:** EV / Hybrid Motor Engineering
*   **Rolim:** Mechanical Design Engineer
*   **Dasturlar:** SolidWorks (Advanced Assembly, Precision Design)

### Engineering Objectives
*   Motor ichida sensorlarni joylashtirish
*   Yuqori RPM sharoitida barqaror ishlash
*   Vibratsiya va issiqlikka chidamlilik
*   Signal uzatish uchun optimal routing

### Mechanical Design Approach
**Sensor Integration**
*   Rotor va stator atrofida sensor joylashuvi
*   Minimal space ichida maksimal funksiya
*   EMI ta’sirini kamaytirish dizayni

**Structural Design**
*   High-speed rotating system uchun balanslash
*   Precision tolerance control
*   Thermal expansion hisobga olingan

**Cable Routing System**
*   Ichki signal kabellarni xavfsiz yo‘naltirish
*   Rotatsiya vaqtida zarar ko‘rmasligi uchun himoya

### Engineering Challenges & Solutions
1.  **Muammo:** Yuqori aylanish tezligida komponentlarning siljishi. **Yechim:** Balanced structure design va secure mounting points.
2.  **Muammo:** Vibratsiya sabab signal yo‘qolishi. **Yechim:** Stabil sensor housing va optimized cable routing.
3.  **Muammo:** Cheklangan joy. **Yechim:** Compact layered design va multi-functional component integration.
    `,
    date: "2026-04-03",
    category: "Case-study",
    readTime: "12 min",
    image: "/images/projects/ev-motor-telemetry.png"
  },
  {
    id: "5",
    slug: "retractable-cord-device-design",
    title: "Retractable Cord Device Design (SolidWorks Case Study)",
    excerpt: "Garaq va workshoplar uchun devor ichiga o'rnatiladigan ixcham retractable power cord tizimi mexanik dizayni.",
    content: `
Garage va workshoplar uchun mo‘ljallangan, devor ichiga o‘rnatiladigan retractable power cord device dizayni ustida ishladim. 
Maqsad — standart 2×4 wall cavity (≈3.5 inch) ichiga sig‘adigan, kabelni tortib ishlatish va qayta ichkariga yig‘ib qo‘yish imkonini beradigan ixcham mexanik tizim yaratish.

### Project Overview
*   **Loyiha turi:** Mechanical Product Design
*   **Dastur:** SolidWorks (Part + Assembly + Sheet Metal)
*   **Metodlar:** Parametric modeling, Assembly design, Compact mechanism design

### Design Requirements
*   Qurilma devor ichiga sig‘ishi kerak (≤ 3.5 inch depth)
*   Retractable cord mexanizmi ishlashi
*   Qurilma flush (tekis) yopilishi
*   Standart outlet orqali ishlashi
*   Oson montaj (stud orasiga o‘rnatish)

### Mechanical Design Solution
**Cord Retraction System**
*   Spring-loaded spool (kabelni yig‘uvchi baraban)
*   Controlled tension system
*   Smooth retraction (kabel chirmashmaydi)

**Housing Design**
*   Ikki qismli корпус (old cover + main body)
*   Devor ichiga mos o‘lchamlar
*   Ventilation va kabel yo‘llari

### Engineering Challenges & Solutions
1.  **Muammo:** Kichik joyda kabelni yig‘ish. **Yechim:** Compact spool design + optimized radius.
2.  **Muammo:** Cord tangling (chirmashish). **Yechim:** Guide channel + controlled tension system.
3.  **Muammo:** Installation qiyinligi. **Yechim:** Modular housing + bracket system.
    `,
    date: "2026-04-03",
    category: "Case-study",
    readTime: "8 min",
    image: "/images/projects/retractable-cord.png"
  },
  {
    id: "1",
    slug: "solidworks-nima",
    title: "SolidWorks nima va uni qanday o'rganish mumkin?",
    excerpt: "Dunyodagi eng ommabop 3D CAD tizimlaridan biri bo'lgan SolidWorks haqida to'liq ma'lumot va boshlang'ich qadamlar.",
    content: "SolidWorks bu... (Maqola matni bu yerda joylashadi)",
    date: "2026-04-03",
    category: "Beginner",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    slug: "solidworks-ishlamayapti-nima-qilish-kerak",
    title: "SolidWorks ishlamayapti: Eng ko'p uchraydigan 5 ta xato va ularning yechimi",
    excerpt: "Dasturni o'rnatish yoki ishlatish jarayonida qotib qolish yoki umuman ochilmaslik holatlarining texnik yechimlari.",
    content: "Ko'pincha kompyuter grafika kartasi... (Maqola matni bu yerda joylashadi)",
    date: "2026-04-01",
    category: "Problem-based",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    slug: "catia-vs-solidworks",
    title: "CATIA va SolidWorks: Qaysi birini tanlash kerak?",
    excerpt: "Ikkita gigant dastur o'rtasidagi farqlar, imkoniyatlar va kimlar uchun qaysi biri to'g'ri kelishi tahlil qilinadi.",
    content: "CATIA aviatsiya va katta assambleyalar uchun... (Maqola matni bu yerda joylashadi)",
    date: "2026-03-25",
    category: "Comparison",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
