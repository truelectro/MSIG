import type { Metadata } from "next";
import { MsigEventsPage } from "@/components/events/MsigEventsPage";

export const metadata: Metadata = {
  title: "MSIG Events — Official Event Series | MSI Ghana",
  description:
    "Explore official endurance cycling, urban criteriums, and youth cultural showcases across Ghana organized by MSI Ghana. Lead event: Ride Your Flame (The Aburi Mountain Fondo).",
};

export default function HomePage() {
  return <MsigEventsPage />;
}
