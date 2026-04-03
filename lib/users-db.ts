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

const PRODUCTION_ADMINS: UserDB[] = [
  {
    id: "admin-production-1",
    name: "Hikmatjon",
    email: "hikmatjon0903",
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
      fs.writeFileSync(DB_PATH, JSON.stringify(PRODUCTION_ADMINS, null, 2));
      return PRODUCTION_ADMINS;
    }

    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Database error in getUsers:", error);
    return PRODUCTION_ADMINS; // Failsafe: hamma narsa buzilsa ham admin kira olsin
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
