import { describe, it, expect } from "vitest";
import { step1Schema, step2Schema, step3Schema, fullRegistrationSchema } from "../src/lib/validations/registration";

describe("Registration Validation Schemas", () => {
  describe("Step 1 Schema (Category Selection)", () => {
    it("accepts a valid category ID", () => {
      const result = step1Schema.safeParse({ categoryId: "aburi-fondo-115" });
      expect(result.success).toBe(true);
    });

    it("rejects unknown category ID", () => {
      const result = step1Schema.safeParse({ categoryId: "space-tour-500" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.categoryId).toBeDefined();
      }
    });

    it("rejects empty category ID", () => {
      const result = step1Schema.safeParse({ categoryId: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("Step 2 Schema (Participant Details & Age Eligibility)", () => {
    const validParticipant = {
      categoryId: "aburi-fondo-115", // min age 18
      fullName: "Casey Miller",
      email: "casey.miller@example.com",
      phone: "+233 24 555 0182",
      dateOfBirth: "1996-05-20", // 30 on Oct 17, 2026
      emergencyContactName: "Pat Miller",
      emergencyContactPhone: "+233 20 555 0199",
    };

    it("accepts valid adult participant data", () => {
      const result = step2Schema.safeParse(validParticipant);
      expect(result.success).toBe(true);
    });

    it("rejects participant who does not meet category minimum age", () => {
      // Born on Oct 18, 2008 -> turns 18 on Oct 18, 2026, so 17 on race day (Oct 17, 2026)
      const minor = {
        ...validParticipant,
        dateOfBirth: "2008-10-18",
      };
      const result = step2Schema.safeParse(minor);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.dateOfBirth).toBeDefined();
        expect(errors.dateOfBirth?.[0]).toContain("must be at least 18 years old");
      }
    });

    it("rejects malformed email address", () => {
      const result = step2Schema.safeParse({
        ...validParticipant,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined();
      }
    });

    it("rejects short or empty names", () => {
      const result = step2Schema.safeParse({
        ...validParticipant,
        fullName: "A",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("Step 3 Schema (Review & Consent)", () => {
    it("accepts when required consents are true", () => {
      const result = step3Schema.safeParse({
        liabilityConsent: true,
        rulesConsent: true,
        newsletterOptIn: false,
      });
      expect(result.success).toBe(true);
    });

    it("rejects when liability consent is false", () => {
      const result = step3Schema.safeParse({
        liabilityConsent: false,
        rulesConsent: true,
        newsletterOptIn: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.liabilityConsent).toBeDefined();
      }
    });

    it("rejects when rules consent is false", () => {
      const result = step3Schema.safeParse({
        liabilityConsent: true,
        rulesConsent: false,
        newsletterOptIn: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.rulesConsent).toBeDefined();
      }
    });
  });

  describe("Full Registration Schema", () => {
    it("validates a complete valid payload", () => {
      const fullPayload = {
        categoryId: "aburi-fondo-115",
        fullName: "Jordan Lee",
        email: "jordan@example.com",
        phone: "+233 24 555 1234",
        dateOfBirth: "1990-01-01",
        emergencyContactName: "Sam Lee",
        emergencyContactPhone: "+233 20 555 5678",
        liabilityConsent: true,
        rulesConsent: true,
        newsletterOptIn: true,
      };

      const result = fullRegistrationSchema.safeParse(fullPayload);
      expect(result.success).toBe(true);
    });
  });
});
