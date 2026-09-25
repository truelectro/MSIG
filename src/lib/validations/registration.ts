import { z } from "zod";
import { eventConfig } from "@/config/event";
import { calculateAgeOnEventDay } from "@/lib/utils";

const validCategoryIds = eventConfig.categories.map((c) => c.id);

export const step1Schema = z.object({
  categoryId: z
    .string({ required_error: "Please select an entry category" })
    .min(1, "Please select an entry category")
    .refine((val) => validCategoryIds.includes(val), {
      message: "The selected category is not recognized",
    })
    .refine(
      (val) => {
        const cat = eventConfig.categories.find((c) => c.id === val);
        return cat && cat.availability !== "sold_out" && cat.availability !== "not_yet_open";
      },
      {
        message: "This category is currently sold out or closed for registration",
      }
    ),
});

export const step2Schema = z
  .object({
    categoryId: z.string().min(1),
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full legal or preferred name (minimum 2 characters)"),
    email: z
      .string()
      .trim()
      .email("Please provide a valid email address where race updates can be sent"),
    phone: z
      .string()
      .trim()
      .min(7, "Please provide an operational contact phone number for event dispatch"),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter your birth date in YYYY-MM-DD format"),
    emergencyContactName: z
      .string()
      .trim()
      .min(2, "Please provide the name of an emergency contact"),
    emergencyContactPhone: z
      .string()
      .trim()
      .min(7, "Please provide a reachable telephone number for your emergency contact"),
    startWave: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const category = eventConfig.categories.find((c) => c.id === data.categoryId);
    if (!category) return;

    const age = calculateAgeOnEventDay(data.dateOfBirth, eventConfig.eventDateIso);
    if (age < category.minAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: `Participants in the ${category.title} must be at least ${category.minAge} years old on race day (October 17, 2026). Your calculated age is ${age}.`,
      });
    }
  });

export const step3Schema = z.object({
  liabilityConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must review and agree to the Participation Waiver & Medical Consent to register.",
    }),
  }),
  rulesConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm acceptance of the event rules, cutoff times, and safety protocols.",
    }),
  }),
  newsletterOptIn: z.boolean().default(false),
});

export const fullRegistrationSchema = z.object({
  categoryId: step1Schema.shape.categoryId,
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().min(7, "Operational phone number is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid birth date (YYYY-MM-DD) is required"),
  emergencyContactName: z.string().trim().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().trim().min(7, "Emergency contact phone is required"),
  startWave: z.string().optional(),
  liabilityConsent: step3Schema.shape.liabilityConsent,
  rulesConsent: step3Schema.shape.rulesConsent,
  newsletterOptIn: z.boolean().default(false),
  idempotencyKey: z.string().optional(),
});
