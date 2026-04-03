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

// Ishlab chiqarish (Production) uchun asosiy admin hisobi
const PRODUCTION_ADMINS: UserDB[] = [
  {
    id: "admin-production-1",
    name: "Hikmatjon",
    email: "Hikmatjon0903", // Login sifatida ishlatiladi
    hash: bcrypt.hashSync("jon@0903jon", 10),
    role: "admin",
    enrolledCourses: ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"],
    pendingPayments: []
  }
];

export function getUsers(): UserDB[] {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(PRODUCTION_ADMINS, null, 2));
    return PRODUCTION_ADMINS;
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
