"use server";

import {
  processRegistrationSubmission,
  SubmitRegistrationResult,
  getAllStoredRegistrations,
} from "@/lib/services/registrationService";
import { RyfExportRecord } from "@/lib/exportExcel";

const sampleRyfRegistrations: RyfExportRecord[] = [
  {
    id: "sample-ryf-1",
    referenceCode: "RYF-2026-A101",
    fullName: "Samuel Kwabena Asante",
    email: "samuel.asante@ghana-cycling.org",
    phone: "+233 24 456 7890",
    dateOfBirth: "1994-05-12",
    categoryName: "The Aburi Mountain Fondo (115 KM)",
    startWave: "Wave 1 — Competitive Elite (6:00 AM)",
    emergencyContactName: "Akua Asante",
    emergencyContactPhone: "+233 24 112 3344",
    amount: 450,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-21T09:20:00Z",
  },
  {
    id: "sample-ryf-2",
    referenceCode: "RYF-2026-B204",
    fullName: "Kwame Darko Mensah",
    email: "k.darko@accrariders.com",
    phone: "+233 50 890 1234",
    dateOfBirth: "1988-11-23",
    categoryName: "The Aburi Mountain Fondo (115 KM)",
    startWave: "Wave 2 — Fast Sportive (6:15 AM)",
    emergencyContactName: "Grace Mensah",
    emergencyContactPhone: "+233 50 334 5566",
    amount: 450,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-22T14:45:00Z",
  },
  {
    id: "sample-ryf-3",
    referenceCode: "RYF-2026-C319",
    fullName: "Ama Dickson Osei",
    email: "ama.dickson@gmail.com",
    phone: "+233 55 234 5678",
    dateOfBirth: "1998-03-15",
    categoryName: "The Ridge Challenge (65 KM)",
    startWave: "Wave 3 — Open Challenge (6:30 AM)",
    emergencyContactName: "Kofi Osei",
    emergencyContactPhone: "+233 55 998 7766",
    amount: 300,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-23T11:10:00Z",
  },
  {
    id: "sample-ryf-4",
    referenceCode: "RYF-2026-D442",
    fullName: "Kofi Annan Quaye",
    email: "kofi.quaye@tema-velo.com",
    phone: "+233 27 765 4321",
    dateOfBirth: "1991-08-30",
    categoryName: "Community Scenic Ride (35 KM)",
    startWave: "Wave 4 — Social Peloton (6:45 AM)",
    emergencyContactName: "Esi Quaye",
    emergencyContactPhone: "+233 27 554 3322",
    amount: 180,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-24T08:05:00Z",
  },
  {
    id: "sample-ryf-5",
    referenceCode: "RYF-2026-E558",
    fullName: "Belinda Addo",
    email: "belinda.addo@spintexcyclists.com",
    phone: "+233 20 123 9876",
    dateOfBirth: "1996-01-20",
    categoryName: "The Aburi Mountain Fondo (115 KM)",
    startWave: "Wave 1 — Competitive Elite (6:00 AM)",
    emergencyContactName: "Michael Addo",
    emergencyContactPhone: "+233 20 887 6655",
    amount: 450,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-25T07:30:00Z",
  },
  {
    id: "sample-ryf-6",
    referenceCode: "RYF-2026-F670",
    fullName: "Emmanuel Tetteh",
    email: "e.tetteh@vanguard-tech.gh",
    phone: "+233 24 901 2345",
    dateOfBirth: "1985-09-08",
    categoryName: "The Ridge Challenge (65 KM)",
    startWave: "Wave 2 — Fast Sportive (6:15 AM)",
    emergencyContactName: "Doris Tetteh",
    emergencyContactPhone: "+233 24 776 5544",
    amount: 300,
    currency: "GHS",
    paymentStatus: "confirmed",
    createdAt: "2026-09-25T09:50:00Z",
  },
];

export async function submitRegistrationAction(
  prevState: SubmitRegistrationResult | null,
  payload: Record<string, unknown>
): Promise<SubmitRegistrationResult> {
  // Simulate natural network latency for authentic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 600));

  return await processRegistrationSubmission(payload);
}

export async function getRyfRegistrations(): Promise<RyfExportRecord[]> {
  const stored = getAllStoredRegistrations();

  const formattedStored: RyfExportRecord[] = stored.map((r) => ({
    id: r.id,
    referenceCode: r.referenceCode,
    fullName: r.participant.fullName,
    email: r.participant.email,
    phone: r.participant.phone,
    dateOfBirth: r.participant.dateOfBirth,
    categoryName: r.category.title,
    startWave: r.participant.startWave || "Wave 1 (Standard)",
    emergencyContactName: r.participant.emergencyContactName,
    emergencyContactPhone: r.participant.emergencyContactPhone,
    amount: r.price.total,
    currency: r.price.currency,
    paymentStatus: r.paymentStatus,
    createdAt: r.createdAt,
  }));

  // Combine live session records with sample roster for a realistic complete dashboard view
  const allRecords = [...formattedStored, ...sampleRyfRegistrations];

  // Deduplicate by referenceCode if any overlap
  const seen = new Set<string>();
  const uniqueRecords: RyfExportRecord[] = [];
  for (const rec of allRecords) {
    if (!seen.has(rec.referenceCode)) {
      seen.add(rec.referenceCode);
      uniqueRecords.push(rec);
    }
  }

  return uniqueRecords;
}

