import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

import * as dotenv from "dotenv";
dotenv.config();

// .env dan o'qiydi — to'g'ridan-to'g'ri yozilmagan
const connectionString = process.env.DATABASE_URL;

import { Pool } from "pg";

if (!connectionString) {
  throw new Error("DATABASE_URL .env faylida topilmadi!");
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "hikmatjon0903";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD .env faylida topilmadi!");
  }

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        id: "admin-production-1",
        name: "Hikmatjon",
        email: adminEmail,
        hash,
        role: "admin",
        enrolledCourses: ["solidworks-basics", "catia-v5", "3d-modeling", "plm-systems"],
        pendingPayments: [],
      },
    });
    console.log("✅ Admin foydalanuvchi yaratildi:", adminEmail);
  } else {
    console.log("ℹ️  Admin allaqachon mavjud:", adminEmail);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
