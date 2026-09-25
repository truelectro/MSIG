import type { Metadata } from "next";
import { GssHero } from "@/components/girls-safe-space/GssHero";
import { GssRegistrationCtaSection } from "@/components/girls-safe-space/GssRegistrationCtaSection";
import { GssTopicsMatrix } from "@/components/girls-safe-space/GssTopicsMatrix";
import { GssBk1Showcase } from "@/components/girls-safe-space/GssBk1Showcase";
import { GssPinkOctoberSection } from "@/components/girls-safe-space/GssPinkOctoberSection";
import { GssCampusTour } from "@/components/girls-safe-space/GssCampusTour";
import { GssWhatsappChatbot } from "@/components/girls-safe-space/GssWhatsappChatbot";
import { GssFaqSection } from "@/components/girls-safe-space/GssFaqSection";

export const metadata: Metadata = {
  title: "Girls' Safe Space — Campus Wellness & Reproductive Health Tour 2026 | MSI Ghana",
  description:
    "A welcoming lifestyle sanctuary bridging reproductive healthcare and young Ghanaian women. Cycle syncing, modern birth control, complimentary take-home BK-1 kits, and free Pink October clinical breast screenings across UG Legon, KNUST, UPSA, UCC, TTU, UDS and Accra.",
  openGraph: {
    title: "Girls' Safe Space — Health Meets Sisterhood | MSI Ghana",
    description:
      "Join us for Girls' Safe Space: A judgment-free reproductive wellness tour for university students & young women across Ghana. Free admission, complimentary BK-1 backup kit, and confidential clinical breast screenings.",
    type: "website",
  },
};

export default function GirlSafeSpacePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1416] font-gss-sans antialiased selection:bg-[#f3e8ff] selection:text-[#662d91]">
      {/* 1. Hero Section */}
      <GssHero />

      {/* 2. Registration CTA Callout (Directs to separate /girl-safe-space/register page) */}
      <GssRegistrationCtaSection />

      {/* 3. SRH Topics & Body Literacy Matrix */}
      <GssTopicsMatrix />

      {/* 4. The BK-1 Emergency Backup Kit Showcase */}
      <GssBk1Showcase />

      {/* 5. Pink October Clinical Breast Cancer Screening Pods */}
      <GssPinkOctoberSection />

      {/* 6. University Campus Tour Schedule */}
      <GssCampusTour />

      {/* 7. 24/7 Confidential WhatsApp Companion (Maya) */}
      <GssWhatsappChatbot />

      {/* 8. Frequently Asked Questions */}
      <GssFaqSection />
    </div>
  );
}
