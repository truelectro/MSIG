import * as XLSX from "xlsx";
import { GssRegistrationRecord } from "@/app/actions/gssRegistrationActions";

export function exportRegistrationsToExcel(
  records: GssRegistrationRecord[],
  filename = "Girls_Safe_Space_Registrations_UG_Legon.xlsx"
) {
  const worksheetData = records.map((r, index) => ({
    "No.": index + 1,
    "Attendee Name": r.name,
    "Phone / WhatsApp": r.phone_number,
    "Tour Stop": r.stop,
    "Session Time": r.session_time,
    "BK-1 Kit Reserved": r.reserve_bk1_kit ? "YES" : "NO",
    "Breast Screening Slot": r.reserve_breast_exam ? "YES" : "NO",
    "Confidential Question for Midwives": r.anonymous_question || "None",
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
