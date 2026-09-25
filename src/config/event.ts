import { EventConfig } from "@/types/event";

export const eventConfig: EventConfig = {
  eventName: "Ride Your Flame",
  edition: "2026 Inaugural Ghana Edition",
  eventDateIso: "2026-10-17",
  eventDateDisplay: "Saturday, October 17, 2026",
  timezone: "Africa/Accra",
  locationDisplay: "Aburi Mountains & Akuapem Ridge Escarpment, Eastern Region, Ghana",
  isDemoDataset: true,
  demoDisclaimerNotice:
    "Simulated Event Demonstration: Dates, entry fees (GHS), and route data are illustrative for this digital showcase in Ghana. No commercial transactions are completed.",
  registrationOpensIso: "2026-03-01T08:00:00Z",
  registrationClosesIso: "2026-10-10T23:59:59Z",

  categories: [
    {
      id: "aburi-fondo-115",
      discipline: "cycling",
      title: "Aburi Mountain Fondo 115K",
      subtitle: "The Ultimate Mountain Ride & Garden Festival • Accra to Aburi Ridge",
      distanceKm: 115,
      distanceMiles: 71.5,
      elevationGainMeters: 1680,
      elevationGainFeet: 5512,
      terrain: "100% Paved mountain highway, scenic Ayi Mensah hill climb & rolling ridge escarpment",
      startTime: "06:30 AM",
      cutoffTime: "03:00 PM (8h 30m limit)",
      minAge: 18,
      suitability:
        "Created for college students, university squads, young adults, and cycling crews ready for an epic group road trip up the Akuapem Ridge. Ride your pace, soak in panoramic views, and celebrate at the finish-line garden festival.",
      inclusions: [
        "Official commemorative race bib, timing chip & festival wristband",
        "4 High-energy rest stops with chilled fresh coconuts, music, electrolytes & snacks",
        "Mobile SAG support van with bike pumps, spare tubes, neutral wheels & marshals",
        "Free gear bag transit from start corral directly to Aburi gardens pavilion",
        "Cast gold-tone finisher medallion & commemorative festival tech t-shirt",
        "Full VIP pass to the Aburi Gardens Afterparty: live DJ sets, cold drinks & Ghanaian feast",
      ],
      basePrice: 1200,
      processingFee: 90,
      taxRate: 0.15,
      currency: "GHS",
      availability: "open",
      availableSlots: 180,
      routeSummary:
        "Rolls out from the Accra foothills at sunrise, tackling the scenic climb up the Akuapem escarpment before weaving through colonial mountain towns and Mamfe ridge overlooks, finishing at the Aburi Botanical Gardens festival grounds.",
      aidStationsCount: 4,
      technicalDifficulty: "demanding",
      elevationProfilePoints: [
        { distanceKm: 0, elevationM: 80 },
        { distanceKm: 18, elevationM: 140 },
        { distanceKm: 34, elevationM: 520 },
        { distanceKm: 55, elevationM: 710 },
        { distanceKm: 72, elevationM: 640 },
        { distanceKm: 88, elevationM: 730 },
        { distanceKm: 102, elevationM: 420 },
        { distanceKm: 115, elevationM: 480 },
      ],
    },
  ],

  logistics: {
    venueName: "Aburi Botanical Gardens Heritage Grounds",
    address: "Peduase-Aburi Highway",
    city: "Aburi",
    region: "Eastern Region",
    postalCode: "AK-012-4411",
    country: "Ghana",
    coordinates: { lat: 5.8492, lng: -0.1749 },
    packetPickupSchedule: [
      {
        date: "Friday, October 16, 2026",
        timeWindow: "10:00 AM – 06:00 PM",
        location: "Accra Mall Staging Pavilion (Tetteh Quarshie Interchange, Accra)",
      },
      {
        date: "Saturday, October 17, 2026",
        timeWindow: "05:00 AM – 06:00 AM",
        location: "Aburi Gardens Race Hub (Adjacent to Main Botanical Entrance)",
      },
    ],
    startWavesSchedule: [
      { categoryId: "aburi-fondo-115", time: "06:30 AM", waveName: "Wave 1: Campus Crews & Fast Pace" },
      { categoryId: "aburi-fondo-115", time: "06:45 AM", waveName: "Wave 2: Social Squads & Party Pace" },
      { categoryId: "aburi-fondo-115", time: "07:00 AM", waveName: "Wave 3: Open Ride & Adventure" },
    ],
    parkingTransitInfo:
      "Complimentary air-conditioned participant and bike shuttles depart from University of Ghana (Legon Campus), Accra Mall (Tetteh Quarshie Interchange), and Kotoka International Airport (ACC) Park & Ride every 15 minutes starting at 04:30 AM on race morning. Free secure participant parking is available at the Aburi Gardens Lower Grounds.",
    bagDropDetails:
      "Complimentary secure bag check is stationed inside the Heritage Pavilion at Aburi Gardens. Luggage tags matching your bib number are provided in your race packet. Bag drop opens at 05:00 AM and is secured until 05:30 PM.",
    mandatoryEquipment: {
      cycling: [
        "Certified bicycle helmet buckled at all times while on bicycle",
        "Operational front white light and rear red light for morning mountain fog",
        "Two water bottles or minimum 1.5L hydration bladder (tropical hydration compliance)",
        "Tire repair kit (spare tubes/plugs, tire levers, pump/CO2)",
      ],
      running: [],
    },
    recommendedEquipment: {
      cycling: [
        "Lightweight sweat-wicking base layer and UV arm sun-sleeves",
        "GPS computer with offline course map preloaded",
        "Electrolyte replacement tablets for tropical mountain warmth",
      ],
      running: [],
    },
    accessibilityNotice:
      "Ride Your Flame welcomes paracyclists and handcyclists on the paved Aburi mountain highway course. Lead and sweep motorcycle escorts are provided for adaptive divisions. Contact accessibility@rideyourflame.com for accommodations.",
  },

  organizer: {
    organizationName: "MSI Ghana",
    email: "ghana@rideyourflame.com",
    phone: "+233 30 255 0194",
    emergencyDayOfPhone: "+233 24 555 0199",
    accessibilityContactEmail: "accessibility@rideyourflame.com",
  },

  policies: {
    refundPolicy:
      "Cancellations requested in writing prior to September 17, 2026 (30 days before event date) receive a 100% rollover credit to future editions or an 80% direct refund via mobile money / original card. Within 30 days of the event, registrations are non-refundable, but participant bib transfers are permitted up to 72 hours before race day.",
    transferPolicy:
      "Athlete-to-athlete bib transfers are free of charge through the self-service registration portal until October 14, 2026 at 11:59 PM GMT.",
    weatherPolicy:
      "The race takes place in tropical mountain conditions, rain or shine. In case of localized torrential thunderstorms or high-wind squalls on the escarpment, the Race Director reserves authority to temporarily hold start waves until conditions clear.",
    cancellationPolicy:
      "If public safety orders or extreme circumstances force event postponement, all entries automatically transfer to the rescheduled date or can be exchanged for a full credit voucher.",
    liabilityWaiverSummary:
      "Participants certify that they are in sound physical health and have undertaken appropriate training for endurance cycling in tropical mountain terrain. Participants acknowledge the physical exertion involved and consent to emergency medical treatment if deemed necessary by on-course medical staff.",
  },
};
