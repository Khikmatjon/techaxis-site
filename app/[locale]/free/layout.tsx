import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";

// Sahifa "use client" bo'lgani uchun sarlavha va tavsif shu layout orqali beriladi
// (matn: content/seo.ts).
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("free", locale, "/free");
}

export default async function FreeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("free", locale), path: "/free" }])} />
      {children}
    </>
  );
}
