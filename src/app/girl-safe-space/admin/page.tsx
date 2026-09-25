import type { Metadata } from "next";
import { getGssRegistrations } from "@/app/actions/gssRegistrationActions";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Girls' Safe Space Admin — Attendee Roster & Kit Allocation | MSI Ghana",
  description:
    "Official attendee roster and coordinator dashboard for Girls' Safe Space at UG Legon. Track registrations, BK-1 emergency kits, and clinical breast screenings.",
};

export default async function GirlSafeSpaceAdminPage() {
  const result = await getGssRegistrations();

  return (
    <AdminDashboardClient
      initialRecords={result.data}
      isDemo={result.isDemo}
      dbError={result.error}
    />
  );
}
