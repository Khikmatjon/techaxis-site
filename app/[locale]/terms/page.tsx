import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { LegalPage } from "@/components/legal/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: `${dict.terms.title} | TechAxis` };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return (
    <LegalPage
      title={dict.terms.title}
      intro={dict.terms.intro}
      sections={dict.terms.sections}
      legal={dict.legal}
    />
  );
}
