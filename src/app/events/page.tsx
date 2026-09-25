import type { Metadata } from "next";
import { MsigEventsPage } from "@/components/events/MsigEventsPage";

export const metadata: Metadata = {
  title: "MSIG Events — Official Endurance & Youth Sports Series | Ghana",
  description:
    "Explore official endurance cycling, urban criteriums, and youth cultural showcases across Ghana organized by MSI Ghana. Register for active events or preview upcoming editions.",
};

export default function EventsHubPage() {
  return <MsigEventsPage />;
}
