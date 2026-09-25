export interface MsigEventItem {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  status: "active" | "upcoming";
  discipline: string;
  category: "Cycling" | "Sports" | "Culture";
  dateDisplay: string;
  locationDisplay: string;
  summary: string;
  highlights: string[];
  subpageUrl?: string;
  registrationUrl?: string;
  logoId:
    | "ride-your-flame"
    | "flame-criterium"
    | "flame-coastal-gravel"
    | "ignite-campus-3x3"
    | "flame-escarpment-climb"
    | "msig-youth-culture-sound"
    | "girls-safe-space";
  accentColor: "gold" | "blue" | "green" | "pink";
  featuredBadge?: string;
}

export const msigEvents: MsigEventItem[] = [
  {
    id: "girls-safe-space",
    title: "Girls' Safe Space",
    subtitle: "Campus Wellness & Reproductive Health Tour",
    edition: "2026 Campus Edition",
    status: "active",
    discipline: "Youth Wellness, SRH & Sisterhood",
    category: "Culture",
    dateDisplay: "September 25, 2026",
    locationDisplay: "UG Legon, Accra",
    summary:
      "A welcoming lifestyle sanctuary bringing reproductive healthcare into a trendy, judgment-free space for young Ghanaian women. Cycle syncing, modern contraception literacy, complimentary take-home BK-1 kits, and free private Pink October clinical breast screenings.",
    highlights: [
      "Safe, open discussions on cycle syncing, PCOS & birth control",
      "Complimentary take-home BK-1 Emergency Backup Kit",
      "Free private clinical breast cancer screenings (Pink October)",
      "24/7 confidential WhatsApp SRH chatbot onboarding",
    ],
    subpageUrl: "/girl-safe-space",
    registrationUrl: "/girl-safe-space/register",
    logoId: "girls-safe-space",
    accentColor: "pink",
    featuredBadge: "Active • Free Registration Open",
  },
  {
    id: "ride-your-flame",
    title: "Ride Your Flame",
    subtitle: "The Aburi Mountain Fondo 115K",
    edition: "2026 Inaugural Ghana Edition",
    status: "active",
    discipline: "Pure Cycling (Road & Mountain Highway)",
    category: "Cycling",
    dateDisplay: "Saturday, October 17, 2026",
    locationDisplay: "Ayi Mensah & Aburi Mountain Ridge, Eastern Region",
    summary:
      "Ghana's flagship 115 KM mountain cycling fondo ascending the legendary Akuapem escarpment from Accra to the Aburi Botanical Gardens finish line pavilion. 100% focused on pure road cycling with neutral mechanical support and scenic rest stations.",
    highlights: [
      "115 KM paved mountain highway course with 1,680m elevation gain",
      "Full mobile SAG van & neutral mechanical paceline escorts",
      "4 Rest stops featuring chilled fresh Ghanaian coconuts & electrolytes",
      "Aburi Botanical Gardens finish celebration & cast gold medallion",
    ],
    subpageUrl: "/ride-your-flame",
    registrationUrl: "/register",
    logoId: "ride-your-flame",
    accentColor: "gold",
    featuredBadge: "Active • Registration Open",
  },
];
