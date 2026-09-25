export interface GssCampusStop {
  id: string;
  institution: string;
  shortName: string;
  city: string;
  venue?: string;
  dateDisplay: string;
  timeDisplay: string;
  spotsLeft: number;
  status: "open" | "few_left" | "waitlist";
  isFlagship?: boolean;
}

export interface GssTopicModule {
  id: string;
  badge: string;
  title: string;
  italicAccent: string;
  tagline: string;
  description: string;
  takeaways: string[];
  iconName: "cycle" | "pill" | "shield" | "heart" | "flower" | "chat";
}

export interface GssFaq {
  question: string;
  answer: string;
  category: "privacy" | "services" | "bk1" | "attendance";
}

export const gssCampusStops: GssCampusStop[] = [
  {
    id: "upsa",
    institution: "University of Professional Studies, Accra",
    shortName: "UPSA",
    city: "Accra",
    dateDisplay: "September 25, 2026",
    timeDisplay: "7:00 PM – 8:00 PM",
    spotsLeft: 42,
    status: "open",
    isFlagship: true,
  },
];

export const gssTopics: GssTopicModule[] = [
  {
    id: "cycle-syncing",
    badge: "Hormonal Harmony",
    title: "Cycle Syncing &",
    italicAccent: "Body Literacy",
    tagline: "Decode your hormones, mood rhythms, and natural energy curve.",
    description:
      "Your menstrual cycle is much more than your bleed days. Learn how estrogen, progesterone, and LH shift across your follicular, ovulatory, and luteal phases—and how aligning your study hours, gym workouts, and nutrition can eliminate burnout and period dread.",
    takeaways: [
      "The 4 distinct phases of your monthly cycle",
      "Foods and habits that reduce severe PMS and cramps",
      "Identifying your exact ovulation window without anxiety",
      "Free physical cycle tracking wellness booklet included",
    ],
    iconName: "cycle",
  },
  {
    id: "contraception-literacy",
    badge: "Reproductive Freedom",
    title: "Modern Birth Control vs.",
    italicAccent: "Emergency Contraception",
    tagline: "Get facts without guilt, clinical jargon, or judgment.",
    description:
      "Tired of guessing between WhatsApp gossip and campus myths? We break down the real medical differences between daily/ongoing contraception (pills, implants, IUDs, injections) and emergency contraception. Understand exact timelines, effectiveness windows, and how each method interacts with your cycle.",
    takeaways: [
      "When to use ongoing contraception vs. emergency pills",
      "Debunking the myth: does birth control cause long-term infertility? (No)",
      "How to manage side effects and choose what suits your lifestyle",
      "Direct referrals to certified MSI clinics for low-cost/free placement",
    ],
    iconName: "pill",
  },
  {
    id: "bk1-backup",
    badge: "Smart Safety Net",
    title: "The BK-1 Emergency",
    italicAccent: "Backup Kit Protocol",
    tagline: "Because life happens, and proactive self-care is non-negotiable.",
    description:
      "Every modern young woman deserves peace of mind in her bag or bedside drawer. The BK-1 Emergency Backup Kit is designed specifically as a stigma-free, confidential safety net for unexpected situations, condom tears, or missed protection. Learn exactly how, when, and why to take it safely.",
    takeaways: [
      "Zero judgment: why carrying backup is responsible adulting",
      "The 72-hour window and peak efficacy timeline",
      "What to expect: normal side effects vs. red flags",
      "Every registered attendee receives a complimentary BK-1 Kit",
    ],
    iconName: "shield",
  },
  {
    id: "pcos-period-pain",
    badge: "End The Silence",
    title: "PCOS, Heavy Bleeding &",
    italicAccent: "Period Pain",
    tagline: "Stop being told that crippling cramps are 'just part of being a woman.'",
    description:
      "Polycystic Ovary Syndrome (PCOS), painful cramps, and irregular cycles affect tens of thousands of Ghanaian students silently. Our certified Resource Persons outline common red flags, how to seek ultrasound diagnosis without dismissive doctors, and lifestyle interventions that genuinely help.",
    takeaways: [
      "Recognizing subtle signs of hormonal imbalance & PCOS",
      "Distinguishing normal period cramps from chronic conditions",
      "How to advocate for yourself during medical consultations",
      "Holistic and medical relief protocols",
    ],
    iconName: "heart",
  },
  {
    id: "vaginal-wellness",
    badge: "Microbiome Care",
    title: "Vaginal Flora &",
    italicAccent: "Douching Myths",
    tagline: "Your vagina cleans itself. Unlearn harmful herbal wash rituals.",
    description:
      "High-fragrance soaps, hot water steaming, and harsh herbal concoctions marketed across campus disrupt your delicate vaginal pH and kill protective lactobacilli. Learn the science of healthy discharge, preventing recurring yeast infections and BV, and keeping your intimate health thriving.",
    takeaways: [
      "Why steaming and scented washes cause chronic infections",
      "Interpreting discharge colors, textures, and normal scents",
      "Safe hygiene routines after workouts and intimacy",
      "Private swap of unsafe products for dermatologist-approved care",
    ],
    iconName: "flower",
  },
  {
    id: "intimacy-boundaries",
    badge: "Empowered Sisterhood",
    title: "Intimacy, Consent &",
    italicAccent: "Healthy Boundaries",
    tagline: "Own your voice, communicate your limits, and protect your peace.",
    description:
      "Navigating relationships in university or early career shouldn't mean compromising on your safety or personal comfort. Join facilitated, small-group sisterhood discussions exploring boundary setting, navigating peer pressure, and honest communication about safe sex and emotional well-being.",
    takeaways: [
      "How to assertively communicate contraceptive expectations with partners",
      "Recognizing toxic relationship dynamics and coercion early",
      "Building a supportive, non-judgmental friend network",
      "Direct 1-on-1 confidential counseling on site",
    ],
    iconName: "chat",
  },
];

export const gssFaqs: GssFaq[] = [
  {
    question: "Is Girls' Safe Space really 100% free to attend?",
    answer:
      "Yes! Attendance, educational workshops, the take-home BK-1 Emergency Backup Kit, and the private clinical breast cancer screening are 100% complimentary courtesy of MSI Ghana and youth health partners.",
    category: "services",
  },
  {
    question: "How is my privacy and confidentiality guaranteed?",
    answer:
      "We operate under strict medical confidentiality protocols. No names or personal details are shared with university faculties, halls of residence, or outside parties. Private clinical breast screenings and consultations with Resource Persons take place inside sound-dampened, discrete wellness pods where only you and the certified clinician are present.",
    category: "privacy",
  },
  {
    question: "What exactly is the BK-1 Emergency Backup Kit?",
    answer:
      "The BK-1 Kit is a discreet, self-care backup package containing an emergency contraceptive dose, an informational guide detailing cycle safety, symptom relief instructions, and direct QR access to MSI Ghana's 24/7 confidential counseling team. It is designed to be kept on hand so you are never stranded in an unexpected moment.",
    category: "bk1",
  },
  {
    question: "Do I have to do the breast screening if I attend?",
    answer:
      "Not at all. The Pink October clinical breast examination is completely voluntary. When registering, you can choose whether or not to reserve a screening slot. If you change your mind at any point during the event, our Resource Persons will respect your preference completely.",
    category: "services",
  },
  {
    question: "Can I bring my friends, roommates, or sister?",
    answer:
      "Absolutely! We encourage attending with friends. However, because venue seating and free take-home BK-1 kits are limited per session, please make sure each person submits their own registration form to secure their entry pass.",
    category: "attendance",
  },
  {
    question: "What if my university campus isn't listed yet?",
    answer:
      "If you attend another institution (e.g., Central, Ashesi, Wisconsin, Pentecost, or regional technical universities), you are warmly welcome to register for the nearest tour stop or the Accra/Kumasi Urban Sessions! You can also connect to our 24/7 WhatsApp Chatbot right now for immediate, confidential guidance.",
    category: "attendance",
  },
];
