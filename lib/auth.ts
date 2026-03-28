// =============================================
// AUTH LIBRARY — localStorage asosida (Demo)
// =============================================

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // faqat demo uchun, real tizimda yo'q
  avatar?: string;
  role: "student" | "admin";
  enrolledCourses: string[]; // ochilgan kurslar ID lari
  pendingPayments: string[];  // to'lov kutilayotgan kurslar
  createdAt: string;
}

// ---- DEMO FOYDALANUVCHILAR ----
const DEMO_USERS: User[] = [
  {
    id: "admin-001",
    name: "TechAxis Admin",
    email: "admin@techaxis.uz",
    password: "admin123",
    role: "admin",
    enrolledCourses: ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"],
    pendingPayments: [],
    createdAt: "2024-01-01",
  },
  {
    id: "student-001",
    name: "Alisher Karimov",
    email: "student@techaxis.uz",
    password: "1234",
    role: "student",
    enrolledCourses: ["solidworks-basics"],
    pendingPayments: [],
    createdAt: "2024-06-01",
  },
  {
    id: "student-002",
    name: "Malika Toshmatova",
    email: "student2@techaxis.uz",
    password: "1234",
    role: "student",
    enrolledCourses: [],
    pendingPayments: ["catia-v5"],
    createdAt: "2024-07-15",
  },
];

const USERS_KEY = "techaxis_users";
const SESSION_KEY = "techaxis_session";

// ---- YORDAMCHI FUNKSIYALAR ----

function getUsers(): User[] {
  if (typeof window === "undefined") return DEMO_USERS;
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  }
  return JSON.parse(stored);
}

function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ---- ASOSIY FUNKSIYALAR ----

export function register(name: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { success: false, error: "Bu email allaqachon ro'yxatdan o'tgan" };

  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    role: "student",
    enrolledCourses: [],
    pendingPayments: [],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);
  return { success: true, user: newUser };
}

export function loginWithEmail(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { success: false, error: "Email yoki parol noto'g'ri" };
  setSession(user);
  return { success: true, user };
}

export function loginWithGoogle(googleName?: string, googleEmail?: string): { success: boolean; user?: User } {
  // Demo: Google OAuth simulyatsiyasi
  const name = googleName || "Google Foydalanuvchi";
  const email = googleEmail || `google_${Date.now()}@gmail.com`;

  const users = getUsers();
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    user = {
      id: `google-${Date.now()}`,
      name,
      email,
      avatar: `https://i.pravatar.cc/100?u=${email}`,
      role: "student",
      enrolledCourses: [],
      pendingPayments: [],
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
  }

  setSession(user);
  return { success: true, user };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session);
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === "admin";
}

function setSession(user: User): void {
  if (typeof window === "undefined") return;
  // Parolsiz saqlash
  const { password: _, ...safeUser } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
}

// ---- ADMIN FUNKSIYALAR ----

export function getAllUsers(): User[] {
  return getUsers().filter((u) => u.role === "student");
}

export function assignCourse(userId: string, courseId: string): boolean {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) return false;

  if (!users[userIndex].enrolledCourses.includes(courseId)) {
    users[userIndex].enrolledCourses.push(courseId);
  }
  // Pending'dan o'chirish
  users[userIndex].pendingPayments = users[userIndex].pendingPayments.filter(
    (id) => id !== courseId
  );

  saveUsers(users);

  // Joriy sessiyani yangilash
  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    setSession(users[userIndex]);
  }
  return true;
}

export function requestCoursePayment(courseId: string): boolean {
  const current = getCurrentUser();
  if (!current) return false;

  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === current.id);
  if (userIndex === -1) return false;

  if (!users[userIndex].pendingPayments.includes(courseId)) {
    users[userIndex].pendingPayments.push(courseId);
  }

  saveUsers(users);
  setSession(users[userIndex]);
  return true;
}

export function refreshCurrentUser(): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const users = getUsers();
  const fresh = users.find((u) => u.id === current.id);
  if (fresh) setSession(fresh);
  return fresh || null;
}
