import { z } from "zod";

/**
 * Validates and normalizes phone numbers with special support for Ghana phone numbers
 * (MTN, Telecel, AT, Glo, and fixed lines) as well as international E.164 formats.
 */
export function validateGhanaPhoneNumber(phone: string): {
  isValid: boolean;
  normalized?: string;
  error?: string;
} {
  if (!phone || typeof phone !== "string") {
    return { isValid: false, error: "Phone number is required." };
  }

  // Strip spaces, dashes, dots, parentheses
  const cleaned = phone.trim().replace(/[\s\-\.\(\)]/g, "");

  if (!cleaned) {
    return { isValid: false, error: "Phone number is required." };
  }

  // Ghana international prefix: +233, 00233, or 233 followed by 9 digits starting with 2, 3, or 5
  const ghanaIntlMatch = cleaned.match(/^(?:\+233|00233|233)([235]\d{8})$/);
  if (ghanaIntlMatch) {
    const nationalNumber = "0" + ghanaIntlMatch[1];
    return { isValid: true, normalized: nationalNumber };
  }

  // Standard Ghana 10-digit national number: e.g. 024XXXXXXX, 050XXXXXXX, 054XXXXXXX
  const ghanaNationalMatch = cleaned.match(/^0([235]\d{8})$/);
  if (ghanaNationalMatch) {
    return { isValid: true, normalized: cleaned };
  }

  // 9-digit entered without leading 0 (e.g. 24XXXXXXX)
  const ghana9DigitMatch = cleaned.match(/^([235]\d{8})$/);
  if (ghana9DigitMatch) {
    return { isValid: true, normalized: "0" + ghana9DigitMatch[1] };
  }

  // General international format E.164 (e.g. +14155552671, +447911123456)
  const intlMatch = cleaned.match(/^\+[1-9]\d{7,14}$/);
  if (intlMatch) {
    return { isValid: true, normalized: cleaned };
  }

  // Specific helpful error messages
  if (/^\d+$/.test(cleaned)) {
    if (cleaned.length < 10) {
      return {
        isValid: false,
        error: "Phone number is too short. Please enter a 10-digit number (e.g. 024 123 4567).",
      };
    }
    if (cleaned.length > 10 && !cleaned.startsWith("233")) {
      return {
        isValid: false,
        error: "Phone number is too long. Please verify the digits entered.",
      };
    }
    return {
      isValid: false,
      error: "Invalid network prefix. In Ghana, numbers begin with 02, 05, or 03 (e.g. 024, 050, 054).",
    };
  }

  return {
    isValid: false,
    error: "Please enter a valid phone number (e.g. 024 123 4567 or +233 24 123 4567).",
  };
}

/**
 * Format a 10-digit Ghana number into standard readable presentation: "024 123 4567"
 */
export function formatGhanaPhoneNumber(phone: string): string {
  const result = validateGhanaPhoneNumber(phone);
  if (!result.isValid || !result.normalized) return phone;
  const num = result.normalized;
  if (num.length === 10 && num.startsWith("0")) {
    return `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
  }
  return num;
}

/**
 * Zod validation schema for Girls' Safe Space event registration
 */
export const gssRegistrationSchema = z.object({
  name: z
    .string({ required_error: "Please enter your name or nickname" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(70, "Name cannot exceed 70 characters")
    .regex(
      /^[\p{L}\p{M}\s'\-\.]+$/u,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  phoneNumber: z
    .string({ required_error: "WhatsApp phone number is required" })
    .trim()
    .superRefine((val, ctx) => {
      const check = validateGhanaPhoneNumber(val);
      if (!check.isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            check.error ||
            "Please enter a valid Ghana phone number (e.g. 024 123 4567 or +233 24 123 4567)",
        });
      }
    }),
  stop: z
    .string({ required_error: "Please select a tour stop" })
    .trim()
    .min(1, "Tour stop is required")
    .default("UPSA"),
  sessionTime: z
    .string({ required_error: "Please select a session time" })
    .trim()
    .min(1, "Session time is required")
    .default("7:00 PM – 8:00 PM"),
  reserveBk1Kit: z.boolean().default(false),
  reserveBreastExam: z.boolean().default(false),
  anonymousQuestion: z
    .string()
    .trim()
    .max(500, "Anonymous question cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type GssRegistrationFormData = z.infer<typeof gssRegistrationSchema>;
