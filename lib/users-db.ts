import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// Baza yo'li - ahost.uz va boshqa hostlar uchun loyihaning eng asosiy root qismida.
const DB_PATH = path.join(process.cwd(), "users.json");

export interface PaymentRequest {
  id: string;
  courseId: string;
  plan: string;
  amount: number;
  method: "click" | "payme" | "visa" | "transfer";
  status: "pending" | "completed" | "failed";
  createdAt: string;
  receiptUrl?: string; // Chek rasmi yoki linki
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  hash: string;
  role: "student" | "admin";
  enrolledCourses: string[];
  pendingPayments: string[]; // Eski versiya bilan moslik uchun
  payments?: PaymentRequest[]; // Yangi to'lovlar tarixi
}

const getProductionAdmins = (): UserDB[] => [
  {
    id: "admin-production-1",
    name: "Hikmatjon",
    email: "hikmatjon0903",
    // bcrypt.hashSync ni har doim file yuklanganda emas, faqat kerak bo'lganda chaqiramiz
    hash: bcrypt.hashSync("jon@0903jon", 10),
    role: "admin",
    enrolledCourses: ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"],
    pendingPayments: []
  }
];

export function getUsers(): UserDB[] {
  try {
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      console.log("DATABASE_INITIALIZED: " + DB_PATH);
      const admins = getProductionAdmins();
      fs.writeFileSync(DB_PATH, JSON.stringify(admins, null, 2));
      return admins;
    }

    const data = fs.readFileSync(DB_PATH, "utf-8");
    if (!data || data.trim() === "") {
        console.warn("DATABASE_EMPTY: Resetting to defaults");
        const admins = getProductionAdmins();
        return admins;
    }
    const users = JSON.parse(data);
    console.log("DATABASE_LOADED: Found " + users.length + " users");
    return users;
  } catch (error) {
    console.error("Database error in getUsers:", error);
    return getProductionAdmins(); // Failsafe
  }
}

export function saveUsers(users: UserDB[]) {
  try {
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Database save error:", error);
  }
}

export function findUserByEmail(email: string) {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(name: string, email: string, pass: string) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return null;

  const newUser: UserDB = {
    id: `user-${Date.now()}`,
    name,
    email,
    hash: bcrypt.hashSync(pass, 10),
    role: "student",
    enrolledCourses: [],
    pendingPayments: []
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}
