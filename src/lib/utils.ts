import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SentinelValue } from "@/types/event";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "GHS"): string {
  if (currency === "GHS") {
    return `GH₵ ${amount.toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatSentinelOrNumber(
  val: number | SentinelValue,
  unit = "",
  fallbackText = "TBA"
): string {
  if (val === 0) return `0 ${unit}`.trim();
  if (val === "unknown" || val === "not_yet_announced") return fallbackText;
  if (val === "not_applicable") return "N/A";
  return `${val.toLocaleString()} ${unit}`.trim();
}

/**
 * Calculates a participant's age on event day (2026-10-17).
 */
export function calculateAgeOnEventDay(
  birthDateString: string,
  eventDateString = "2026-10-17"
): number {
  if (!birthDateString) return 0;
  const birth = new Date(birthDateString);
  const event = new Date(eventDateString);
  let age = event.getFullYear() - birth.getFullYear();
  const monthDiff = event.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && event.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
