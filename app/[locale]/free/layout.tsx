import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Sahifa "use client" bo'lgani uchun sarlavha va tavsif shu layout orqali beriladi
// (matn: content/seo.ts).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("free", locale, "/free");
}

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
