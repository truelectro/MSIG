import type { Metadata } from "next";
import { MsigEventsPage } from "@/components/events/MsigEventsPage";

export const metadata: Metadata = {
  title: "Choices Ghana — Official Event Series | MSI Ghana",
  description:
    "Explore official youth wellness, health, and cultural initiatives across Ghana organized by Choices Ghana (MSI Ghana).",
};

export default function HomePage() {
  return <MsigEventsPage />;
}
