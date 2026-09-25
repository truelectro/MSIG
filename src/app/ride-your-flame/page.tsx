import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutEventSection } from "@/components/landing/AboutEventSection";
import { RideRegistrationSection } from "@/components/landing/RideRegistrationSection";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: `${eventConfig.eventName} — The Aburi Mountain Fondo 2026 | MSIG Events`,
  description:
    "An iconic 115 KM pure mountain road cycling fondo ascending the Akuapem Ridge in Ghana. October 17, 2026. Raising awareness for youth sexual and reproductive health.",
};

export default function RideYourFlamePage() {
  return (
    <>
      <HeroSection />
      <AboutEventSection />
      <RideRegistrationSection />
      <FaqAccordion />
    </>
  );
}
