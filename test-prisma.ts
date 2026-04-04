import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    await prisma.user.deleteMany({ where: { role: "admin" } });
    
    const hash = await bcrypt.hash("admin_h", 10);
    await prisma.user.create({
      data: {
        id: "admin-production-1",
        name: "Admin",
        email: "admin",
        hash: hash,
        role: "admin",
        enrolledCourses: [],
        pendingPayments: []
      }
    });

    console.log("PRISMA SUCCESS: Admin fixed.");
  } catch (err) {
    console.error("PRISMA ERROR:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
