import { CategoryEntry } from "./event";

export interface ParticipantDetails {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD for age threshold verification
  emergencyContactName: string;
  emergencyContactPhone: string;
  startWave?: string;
}

export interface PriceCalculation {
  basePrice: number;
  processingFee: number;
  taxes: number;
  total: number;
  currency: string;
}

export interface RegistrationDraft {
  categoryId: string;
  participant: ParticipantDetails;
  liabilityConsent: boolean;
  rulesConsent: boolean;
  newsletterOptIn: boolean;
}

export interface RegistrationRecord {
  id: string;
  referenceCode: string;
  createdAt: string;
  category: CategoryEntry;
  participant: ParticipantDetails;
  price: PriceCalculation;
  paymentStatus: "simulated_success" | "confirmed" | "pending";
  isDemoRecord: boolean;
}

export type RegistrationStep = 1 | 2 | 3;
