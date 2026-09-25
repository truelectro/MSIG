/**
 * Sentinel values representing distinct domain states.
 * Explicitly distinguishes between zero (0), unknown, not applicable, and not yet announced.
 */
export type SentinelValue = 0 | "unknown" | "not_applicable" | "not_yet_announced";

export type Discipline = "cycling" | "running";

export type AvailabilityStatus = "open" | "limited" | "sold_out" | "not_yet_open";

export interface CategoryEntry {
  id: string;
  discipline: Discipline;
  title: string;
  subtitle: string;
  distanceKm: number;
  distanceMiles: number;
  elevationGainMeters: number | SentinelValue;
  elevationGainFeet: number | SentinelValue;
  terrain: string;
  startTime: string;
  cutoffTime: string | SentinelValue;
  minAge: number;
  suitability: string;
  inclusions: string[];
  basePrice: number;
  processingFee: number;
  taxRate: number; // e.g. 0.05 for 5% tax
  currency: string;
  availability: AvailabilityStatus;
  availableSlots?: number | SentinelValue;
  routeSummary: string;
  aidStationsCount: number | SentinelValue;
  technicalDifficulty: "moderate" | "demanding" | "accessible";
  elevationProfilePoints: Array<{ distanceKm: number; elevationM: number }>;
}

export interface OrganizerContact {
  organizationName: string;
  email: string;
  phone?: string | SentinelValue;
  emergencyDayOfPhone?: string | SentinelValue;
  accessibilityContactEmail: string;
}

export interface EventLogistics {
  venueName: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  coordinates?: { lat: number; lng: number } | SentinelValue;
  packetPickupSchedule: Array<{ date: string; timeWindow: string; location: string }>;
  startWavesSchedule: Array<{ categoryId: string; time: string; waveName: string }>;
  parkingTransitInfo: string;
  bagDropDetails: string;
  mandatoryEquipment: {
    cycling: string[];
    running: string[];
  };
  recommendedEquipment: {
    cycling: string[];
    running: string[];
  };
  accessibilityNotice: string;
}

export interface EventPolicies {
  refundPolicy: string;
  transferPolicy: string;
  weatherPolicy: string;
  cancellationPolicy: string;
  liabilityWaiverSummary: string;
}

export interface EventConfig {
  eventName: string;
  edition: string;
  eventDateIso: string; // ISO 8601 string or SentinelValue
  eventDateDisplay: string;
  timezone: string;
  locationDisplay: string;
  isDemoDataset: boolean;
  demoDisclaimerNotice: string;
  registrationOpensIso: string;
  registrationClosesIso: string;
  categories: CategoryEntry[];
  logistics: EventLogistics;
  organizer: OrganizerContact;
  policies: EventPolicies;
}
