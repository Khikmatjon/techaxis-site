import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, crumb } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { LegalPage, pickLocale } from "@/components/legal/legal-page";
import { FOYDALANISH_SHARTLARI } from "@/content/foydalanish-shartlari";

// Matnni o'zgartirish uchun: content/foydalanish-shartlari.ts
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("terms", locale, "/terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return (
    <>
      <JsonLd data={breadcrumbLd(locale, [{ name: crumb("terms", locale), path: "/terms" }])} />
      <LegalPage doc={pickLocale(FOYDALANISH_SHARTLARI, locale)} labels={dict.legal} />
    </>
  );
}
