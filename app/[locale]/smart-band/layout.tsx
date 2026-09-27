import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Sahifa "use client" bo'lgani uchun sarlavha shu layout orqali beriladi (content/seo.ts).
// Bu sahifa qidiruv natijalariga chiqmaydi (noindex).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("smartBand", locale, "/smart-band");
}

export default function SmartBandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
