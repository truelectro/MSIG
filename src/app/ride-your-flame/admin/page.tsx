import type { Metadata } from "next";
import { getRyfRegistrations } from "@/app/actions/registrationActions";
import { RyfAdminDashboardClient } from "@/components/admin/RyfAdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ride Your Flame Admin — Rider Roster & Wave Allocations | MSI Ghana",
  description:
    "Official Race Director portal for the Aburi Mountain Fondo 115K. View confirmed cyclist registrations, verify safety details, and export rosters to Excel.",
};

export default async function RyfAdminPage() {
  const result = await getRyfRegistrations();

  return (
    <RyfAdminDashboardClient
      initialRecords={result.data}
      isDemo={result.isDemo}
      dbError={result.error}
    />
  );
}
