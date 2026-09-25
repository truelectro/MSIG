import { describe, it, expect } from "vitest";
import { processRegistrationSubmission, getRegistrationByIdOrRef } from "../src/lib/services/registrationService";

describe("Registration Flow & Transaction Integrity", () => {
  const basePayload = {
    categoryId: "aburi-fondo-115",
    fullName: "Morgan Taylor",
    email: "morgan.taylor@example.com",
    phone: "+233 24 555 7788",
    dateOfBirth: "1992-08-14",
    emergencyContactName: "Robin Taylor",
    emergencyContactPhone: "+233 20 555 9900",
    startWave: "wave-1",
    liabilityConsent: true,
    rulesConsent: true,
    newsletterOptIn: false,
  };

  it("processes a valid registration and produces an authoritative receipt", async () => {
    const result = await processRegistrationSubmission(basePayload);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.record.referenceCode).toMatch(/^RYF-2026-[A-Z0-9]{4}$/);
      expect(result.record.category.id).toBe("aburi-fondo-115");
      expect(result.record.participant.fullName).toBe("Morgan Taylor");
      expect(result.record.participant.startWave).toBe("wave-1");
      expect(result.record.paymentStatus).toBe("simulated_success");
      // 1200 + 90 + 180 = 1470
      expect(result.record.price.total).toBe(1470);
      expect(result.record.isDemoRecord).toBe(true);
    }
  });

  it("enforces idempotency so duplicate submissions return identical reference codes", async () => {
    const idempotencyKey = "unique-key-" + Date.now();
    const payload = {
      ...basePayload,
      email: "idempotent.test@example.com",
      idempotencyKey,
    };

    const firstCall = await processRegistrationSubmission(payload);
    expect(firstCall.success).toBe(true);

    const secondCall = await processRegistrationSubmission(payload);
    expect(secondCall.success).toBe(true);

    if (firstCall.success && secondCall.success) {
      expect(secondCall.record.id).toBe(firstCall.record.id);
      expect(secondCall.record.referenceCode).toBe(firstCall.record.referenceCode);
    }
  });

  it("retrieves record by reference code", async () => {
    const res = await processRegistrationSubmission({
      ...basePayload,
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
    });
    expect(res.success).toBe(true);

    if (res.success) {
      const fetched = await getRegistrationByIdOrRef(res.record.referenceCode);
      expect(fetched).not.toBeNull();
      expect(fetched?.participant.fullName).toBe("Alex Rivera");
    }
  });

  it("rejects submission when required liability consent is missing", async () => {
    const invalidPayload = {
      ...basePayload,
      liabilityConsent: false,
    };

    const result = await processRegistrationSubmission(invalidPayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors?.liabilityConsent).toBeDefined();
    }
  });
});
