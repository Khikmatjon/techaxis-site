import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString =
  "postgresql://postgres.aovaqntrhpxbwmtohyiy:jon%400903jon@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "hikmatjon0903";
  const adminPassword = "jon@0903jon";

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
