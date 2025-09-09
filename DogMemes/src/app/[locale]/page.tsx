import { Suspense } from "react";
import { HeroSection } from "@/components/blocks/hero-section";
import { CTASection } from "@/components/blocks/cta-section";
import { Footer } from "@/components/blocks/footer";
import { Usage } from "@/components/blocks/usage";
import { Benefit } from "@/components/blocks/benefit";
import { Pricing } from "@/components/blocks/pricing";
import { BrandingSection } from "@/components/blocks/branding-section";
import { Introduce } from "@/components/blocks/introduce";
import { FAQSection } from "@/components/blocks/faq-section";
import { FeaturesSection } from "@/components/blocks/features-section";
import {
  HomeSkeleton,
} from "@/components/skeletons/home-skeleton";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const url = locale === "en" ? "/" : `/${locale}`;

  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: {
      canonical: url,
    },
  }
}

function HomeContent() {
  return (
    <>
      <HeroSection />
      <BrandingSection />
      <Introduce />
      <Usage />
      <FeaturesSection />
      <Benefit />
      <Pricing />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default async function () {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-16">
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}


