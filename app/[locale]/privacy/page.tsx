import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { LegalPage, pickLocale } from "@/components/legal/legal-page";
import { MAXFIYLIK_SIYOSATI } from "@/content/maxfiylik-siyosati";

// Matnni o'zgartirish uchun: content/maxfiylik-siyosati.ts
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: `${pickLocale(MAXFIYLIK_SIYOSATI, locale).sarlavha} | TechAxis` };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return <LegalPage doc={pickLocale(MAXFIYLIK_SIYOSATI, locale)} labels={dict.legal} />;
}
