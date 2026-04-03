import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const DB_PATH = path.join(process.cwd(), "lib", "db", "users.json");

export interface UserDB {
  id: string;
  name: string;
  email: string;
  hash: string;
  role: "student" | "admin";
  enrolledCourses: string[];
  pendingPayments: string[];
}

// Demo usermiz uchun hashlangan parol generatori
const DEMO_USERS: UserDB[] = [
  {
    id: "admin-1",
    name: "TechAxis Admin",
    email: "admin@techaxis.uz",
    hash: bcrypt.hashSync("admin123", 10),
    role: "admin",
    enrolledCourses: ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"],
    pendingPayments: []
  },
  {
    id: "student-1",
    name: "Alisher Karimov",
    email: "student@techaxis.uz",
    hash: bcrypt.hashSync("1234", 10),
    role: "student",
    enrolledCourses: ["solidworks-basics"],
    pendingPayments: []
  },
  {
    id: "student-2",
    name: "Malika Toshmatova",
    email: "student2@techaxis.uz",
    hash: bcrypt.hashSync("1234", 10),
    role: "student",
    enrolledCourses: [],
    pendingPayments: ["catia-v5"]
  }
];

export function getUsers(): UserDB[] {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEMO_USERS, null, 2));
    return DEMO_USERS;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

export function saveUsers(users: UserDB[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
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
