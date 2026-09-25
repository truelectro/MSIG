import { describe, it, expect } from "vitest";
import {
  validateGhanaPhoneNumber,
  formatGhanaPhoneNumber,
  gssRegistrationSchema,
} from "@/lib/validations/gssRegistration";

describe("Ghana Phone Number Validation & Formatting", () => {
  it("accepts valid standard 10-digit Ghana numbers across networks", () => {
    // MTN
    expect(validateGhanaPhoneNumber("0241234567").isValid).toBe(true);
    expect(validateGhanaPhoneNumber("0549876543").isValid).toBe(true);
    expect(validateGhanaPhoneNumber("0551122334").isValid).toBe(true);
    expect(validateGhanaPhoneNumber("0595566778").isValid).toBe(true);

    // Telecel (Vodafone)
    expect(validateGhanaPhoneNumber("0201234567").isValid).toBe(true);
    expect(validateGhanaPhoneNumber("0509876543").isValid).toBe(true);

    // AT (AirtelTigo)
    expect(validateGhanaPhoneNumber("0271234567").isValid).toBe(true);
    expect(validateGhanaPhoneNumber("0579876543").isValid).toBe(true);

    // Fixed / Landline
    expect(validateGhanaPhoneNumber("0302123456").isValid).toBe(true);
  });

  it("handles spaces, dashes, dots, and parentheses gracefully", () => {
    const res1 = validateGhanaPhoneNumber("024 123 4567");
    expect(res1.isValid).toBe(true);
    expect(res1.normalized).toBe("0241234567");

    const res2 = validateGhanaPhoneNumber("020-555-1234");
    expect(res2.isValid).toBe(true);
    expect(res2.normalized).toBe("0205551234");

    const res3 = validateGhanaPhoneNumber("(054) 888 9999");
    expect(res3.isValid).toBe(true);
    expect(res3.normalized).toBe("0548889999");
  });

  it("normalizes international Ghana numbers (+233, 233, 00233) to 10-digit format", () => {
    const res1 = validateGhanaPhoneNumber("+233 24 123 4567");
    expect(res1.isValid).toBe(true);
    expect(res1.normalized).toBe("0241234567");

    const res2 = validateGhanaPhoneNumber("233201234567");
    expect(res2.isValid).toBe(true);
    expect(res2.normalized).toBe("0201234567");

    const res3 = validateGhanaPhoneNumber("00233541234567");
    expect(res3.isValid).toBe(true);
    expect(res3.normalized).toBe("0541234567");
  });

  it("accepts 9-digit numbers missing the leading zero and normalizes them", () => {
    const res = validateGhanaPhoneNumber("241234567");
    expect(res.isValid).toBe(true);
    expect(res.normalized).toBe("0241234567");
  });

  it("accepts valid international E.164 phone numbers", () => {
    const res = validateGhanaPhoneNumber("+14155552671");
    expect(res.isValid).toBe(true);
  });

  it("rejects incomplete or invalid phone numbers with descriptive errors", () => {
    // Too short
    const shortRes = validateGhanaPhoneNumber("024123");
    expect(shortRes.isValid).toBe(false);
    expect(shortRes.error).toContain("too short");

    // Invalid prefix
    const badPrefix = validateGhanaPhoneNumber("0123456789");
    expect(badPrefix.isValid).toBe(false);
    expect(badPrefix.error).toContain("Invalid network prefix");

    // Non-numeric
    const nonNum = validateGhanaPhoneNumber("not-a-number");
    expect(nonNum.isValid).toBe(false);

    // Empty
    const emptyRes = validateGhanaPhoneNumber("");
    expect(emptyRes.isValid).toBe(false);
  });

  it("formats Ghana phone numbers into readable 3-3-4 chunks", () => {
    expect(formatGhanaPhoneNumber("0241234567")).toBe("024 123 4567");
    expect(formatGhanaPhoneNumber("+233 24 123 4567")).toBe("024 123 4567");
  });
});

describe("Girls' Safe Space Registration Zod Schema", () => {
  const validPayload = {
    name: "Akosua Mensah",
    phoneNumber: "024 123 4567",
    stop: "UPSA",
    sessionTime: "7:00 PM – 8:00 PM",
    reserveBk1Kit: true,
    reserveBreastExam: true,
    anonymousQuestion: "How do I calculate ovulation days accurately?",
  };

  it("successfully validates a complete, valid registration payload", () => {
    const result = gssRegistrationSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts names with hyphens, spaces, and apostrophes", () => {
    expect(
      gssRegistrationSchema.safeParse({ ...validPayload, name: "Mary-Ann O'Connor" }).success
    ).toBe(true);
    expect(
      gssRegistrationSchema.safeParse({ ...validPayload, name: "Nana Yaa Asantewaa" }).success
    ).toBe(true);
  });

  it("rejects names that are too short, empty, or contain invalid symbols", () => {
    const shortRes = gssRegistrationSchema.safeParse({ ...validPayload, name: "A" });
    expect(shortRes.success).toBe(false);

    const emptyRes = gssRegistrationSchema.safeParse({ ...validPayload, name: "   " });
    expect(emptyRes.success).toBe(false);

    const symbolRes = gssRegistrationSchema.safeParse({ ...validPayload, name: "User@123!" });
    expect(symbolRes.success).toBe(false);
  });

  it("rejects invalid Ghana phone numbers in registration schema", () => {
    const result = gssRegistrationSchema.safeParse({
      ...validPayload,
      phoneNumber: "12345",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/phone|digit|short/i);
    }
  });

  it("enforces 500-character maximum on anonymous questions", () => {
    const longQuestion = "a".repeat(501);
    const result = gssRegistrationSchema.safeParse({
      ...validPayload,
      anonymousQuestion: longQuestion,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("500 characters");
    }

    const maxQuestion = "a".repeat(500);
    const validLongRes = gssRegistrationSchema.safeParse({
      ...validPayload,
      anonymousQuestion: maxQuestion,
    });
    expect(validLongRes.success).toBe(true);
  });

  it("allows empty anonymous questions", () => {
    const result = gssRegistrationSchema.safeParse({
      ...validPayload,
      anonymousQuestion: "",
    });
    expect(result.success).toBe(true);
  });
});
