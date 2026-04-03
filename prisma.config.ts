import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
