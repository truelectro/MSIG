import * as XLSX from "xlsx";
import { GssRegistrationRecord } from "@/app/actions/gssRegistrationActions";

export function exportRegistrationsToExcel(
  records: GssRegistrationRecord[],
  filename = "Girls_Safe_Space_Registrations_UPSA.xlsx"
) {
  const worksheetData = records.map((r, index) => ({
    "No.": index + 1,
    "Attendee Name": r.name,
    "Phone / WhatsApp": r.phone_number,
    "Tour Stop": r.stop,
    "Session Time": r.session_time,
    "BK-1 Kit Reserved": r.reserve_bk1_kit ? "YES" : "NO",
    "Breast Screening Slot": r.reserve_breast_exam ? "YES" : "NO",
    "Confidential Question for Resource Persons": r.anonymous_question || "None",
    "Registration Date & Time": new Date(r.created_at).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Adjust column widths for professional readability
  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 24 }, // Name
    { wch: 20 }, // Phone
    { wch: 16 }, // Tour Stop
    { wch: 24 }, // Session Time
    { wch: 18 }, // BK-1 Kit
    { wch: 22 }, // Breast Screening
    { wch: 45 }, // Question
    { wch: 24 }, // Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "GSS Attendees");

  XLSX.writeFile(workbook, filename);
}

export function exportRegistrationsToCsv(
  records: GssRegistrationRecord[],
  filename = "Girls_Safe_Space_Registrations.csv"
) {
  const headers = [
    "No.",
    "Name",
    "Phone Number",
    "Tour Stop",
    "Session Time",
    "BK-1 Kit Reserved",
    "Breast Screening Reserved",
    "Confidential Question",
    "Registration Date",
  ];

  const rows = records.map((r, i) => [
    i + 1,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.phone_number.replace(/"/g, '""')}"`,
    `"${r.stop.replace(/"/g, '""')}"`,
    `"${r.session_time.replace(/"/g, '""')}"`,
    r.reserve_bk1_kit ? "YES" : "NO",
    r.reserve_breast_exam ? "YES" : "NO",
    `"${(r.anonymous_question || "").replace(/"/g, '""')}"`,
    `"${new Date(r.created_at).toISOString()}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface RyfExportRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  categoryName: string;
  startWave: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  createdAt: string;
}

export function exportRyfRegistrationsToExcel(
  records: RyfExportRecord[],
  filename = "Ride_Your_Flame_Riders_Roster.xlsx"
) {
  const worksheetData = records.map((r, index) => ({
    "No.": index + 1,
    "Bib / Ref Code": r.referenceCode,
    "Rider Full Name": r.fullName,
    "Category": r.categoryName,
    "Start Wave": r.startWave,
    "Email": r.email,
    "Phone": r.phone,
    "Date of Birth": r.dateOfBirth,
    "Emergency Contact": `${r.emergencyContactName} (${r.emergencyContactPhone})`,
    "Fee Paid": `${r.currency} ${r.amount}`,
    "Payment Status": r.paymentStatus,
    "Registration Date": new Date(r.createdAt).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 18 }, // Bib / Ref Code
    { wch: 24 }, // Rider Name
    { wch: 20 }, // Category
    { wch: 24 }, // Wave
    { wch: 24 }, // Email
    { wch: 18 }, // Phone
    { wch: 14 }, // DOB
    { wch: 32 }, // Emergency Contact
    { wch: 14 }, // Fee
    { wch: 16 }, // Status
    { wch: 22 }, // Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riders Roster");

  XLSX.writeFile(workbook, filename);
}

export function exportRyfRegistrationsToCsv(
  records: RyfExportRecord[],
  filename = "Ride_Your_Flame_Riders_Roster.csv"
) {
  const headers = [
    "No.",
    "Bib / Ref Code",
    "Rider Full Name",
    "Category",
    "Start Wave",
    "Email",
    "Phone",
    "Date of Birth",
    "Emergency Contact Name",
    "Emergency Contact Phone",
    "Fee",
    "Currency",
    "Payment Status",
    "Registration Date",
  ];

  const rows = records.map((r, i) => [
    i + 1,
    `"${r.referenceCode.replace(/"/g, '""')}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.categoryName.replace(/"/g, '""')}"`,
    `"${r.startWave.replace(/"/g, '""')}"`,
    `"${r.email.replace(/"/g, '""')}"`,
    `"${r.phone.replace(/"/g, '""')}"`,
    `"${r.dateOfBirth}"`,
    `"${r.emergencyContactName.replace(/"/g, '""')}"`,
    `"${r.emergencyContactPhone.replace(/"/g, '""')}"`,
    r.amount,
    r.currency,
    `"${r.paymentStatus}"`,
    `"${new Date(r.createdAt).toISOString()}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

