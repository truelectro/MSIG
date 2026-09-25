import { eventConfig } from "@/config/event";
import { calculateAuthoritativePrice, getCategoryById } from "./pricingService";
import { fullRegistrationSchema } from "@/lib/validations/registration";
import { RegistrationRecord } from "@/types/registration";

// Server-side in-memory registry of completed registrations for session retrieval
const registrationStore = new Map<string, RegistrationRecord>();
const idempotencyStore = new Map<string, RegistrationRecord>();

function generateReferenceCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RYF-2026-${randomPart}`;
}

export type SubmitRegistrationResult =
  | { success: true; record: RegistrationRecord }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Server-side registration processor.
 * 1. Validates inputs against full schema
 * 2. Enforces idempotency via idempotencyKey if provided
 * 3. Enforces inventory & authoritative server-side price calculation
 * 4. Simulates payment confirmation
 */
export async function processRegistrationSubmission(
  rawInput: Record<string, unknown>
): Promise<SubmitRegistrationResult> {
  const validation = fullRegistrationSchema.safeParse(rawInput);
  if (!validation.success) {
    const flattened = validation.error.flatten();
    return {
      success: false,
      error: "Please correct the highlighted form errors before proceeding.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  const data = validation.data;

  // Check idempotency
  if (data.idempotencyKey && idempotencyStore.has(data.idempotencyKey)) {
    const existing = idempotencyStore.get(data.idempotencyKey)!;
    return { success: true, record: existing };
  }

  const category = getCategoryById(data.categoryId);
  if (!category) {
    return { success: false, error: "The selected category does not exist." };
  }

  if (category.availability === "sold_out" || category.availability === "not_yet_open") {
    return {
      success: false,
      error: "This category is no longer accepting new registrations.",
    };
  }

  const price = calculateAuthoritativePrice(data.categoryId);
  const id = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const referenceCode = generateReferenceCode();

  const record: RegistrationRecord = {
    id,
    referenceCode,
    createdAt: new Date().toISOString(),
    category,
    participant: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      startWave: data.startWave,
    },
    price,
    paymentStatus: "simulated_success",
    isDemoRecord: true,
  };

  registrationStore.set(record.id, record);
  registrationStore.set(record.referenceCode, record);

  if (data.idempotencyKey) {
    idempotencyStore.set(data.idempotencyKey, record);
  }

  return { success: true, record };
}

export async function getRegistrationByIdOrRef(
  identifier: string
): Promise<RegistrationRecord | null> {
  return registrationStore.get(identifier) || null;
}

export function getAllStoredRegistrations(): RegistrationRecord[] {
  // Deduplicate since both id and referenceCode are keys in the map
  const uniqueRecords = new Map<string, RegistrationRecord>();
  for (const record of registrationStore.values()) {
    uniqueRecords.set(record.id, record);
  }
  return Array.from(uniqueRecords.values());
}
