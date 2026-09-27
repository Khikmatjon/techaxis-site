import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Sahifa "use client" bo'lgani uchun sarlavha shu layout orqali beriladi (content/seo.ts).
// Bu sahifa qidiruv natijalariga chiqmaydi (noindex).
export async function generateMetadata({ params }: { params: Promise<{ locale: string; courseId: string }> }): Promise<Metadata> {
  const { locale, courseId } = await params;
  return pageMetadata("checkout", locale, `/checkout/${courseId}`);
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
