import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Next.js dev server hot-reload jarayonida ko'payib ketmasligi uchun
const connectionString = process.env.DATABASE_URL!;

const pool = globalForPrisma.prisma ? null : new Pool({ connectionString });
const adapter = pool ? new PrismaPg(pool) : null;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: adapter! });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
