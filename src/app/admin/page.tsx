import type { Metadata } from "next";
import { getGssRegistrations } from "@/app/actions/gssRegistrationActions";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard — Girls' Safe Space Registrations | MSI Ghana",
  description:
    "Event coordinator and medical team dashboard to view attendee details, track BK-1 kits, manage breast screening slots, and export registration rosters to Excel.",
};

export default async function AdminPage() {
  const result = await getGssRegistrations();

  return (
    <AdminDashboardClient
      initialRecords={result.data}
      isDemo={result.isDemo}
      dbError={result.error}
    />
  );
}
