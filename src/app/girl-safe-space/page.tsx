import type { Metadata } from "next";
import { GssHero } from "@/components/girls-safe-space/GssHero";
import { GssRegistrationCtaSection } from "@/components/girls-safe-space/GssRegistrationCtaSection";
import { GssCampusTour } from "@/components/girls-safe-space/GssCampusTour";

export const metadata: Metadata = {
  title: "Girls' Safe Space — Campus Wellness & Reproductive Health Tour 2026 | MSI Ghana",
  description:
    "A welcoming lifestyle sanctuary bridging reproductive healthcare and young Ghanaian women. Cycle syncing, modern birth control literacy, and peer sisterhood across UG Legon, KNUST, UPSA, UCC, TTU, UDS and Accra.",
  openGraph: {
    title: "Girls' Safe Space — Health Meets Sisterhood | MSI Ghana",
    description:
      "Join us for Girls' Safe Space: A judgment-free reproductive wellness tour for university students & young women across Ghana. Free admission.",
    type: "website",
  },
};

export default function GirlSafeSpacePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1416] font-gss-sans antialiased selection:bg-[#f3e8ff] selection:text-[#662d91]">
      {/* 1. About / Hero Section */}
      <GssHero />

      {/* 2. Registration CTA Callout (Directs to separate /girl-safe-space/register page) */}
      <GssRegistrationCtaSection />

      {/* 3. University Campus Tour Schedule */}
      <GssCampusTour />
    </div>
  );
}
