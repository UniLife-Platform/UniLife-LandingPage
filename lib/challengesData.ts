export interface ChallengeItem {
  id: string; // e.g. "oou-venture-2026"
  slug: string; // url slug e.g. "oou-venture-2026"
  title: string;
  subtitle: string;
  tagline: string;
  category: "Entrepreneurship & Innovation" | "Alumni & Mentorship";
  institution: string; // e.g. "Olabisi Onabanjo University"
  campusScope: string; // e.g. "OOU (Ago-Iwoye, Sagamu, Ayetoro, Ibogun)" or "All Nigerian Universities"
  status: "Open" | "Active Sprint" | "Judging" | "Coming Soon";
  statusColor: string;
  badge: string;
  badgeAccent: string;
  badgeBg: string;
  prizePool?: string;
  deadline: string;
  participantsCount: string;
  heroImage: string;
  formType: "tally" | "google_form" | "external";
  formUrl: string;
  externalLinkText: string;
  partner: string;
  partnerRole: string;
  eligibility: string;
  description: string;
  tracksOrPillars: {
    icon: string;
    title: string;
    desc: string;
    details?: string;
  }[];
  schedule?: {
    phase: string;
    timeline: string;
    desc: string;
  }[];
  highlights?: string[];
}

export const ALL_CHALLENGES: ChallengeItem[] = [
  {
    id: "oou-venture-2026",
    slug: "oou-venture-2026",
    title: "OOU Entrepreneurship & Innovation Challenge",
    subtitle: "Directorate of Entrepreneurship & Innovation (DEI) Sprint 2026/2027",
    tagline: "Form cross-faculty teams across Ago-Iwoye, Sagamu, Ayetoro, and Ibogun to prototype solutions, pitch to industry leaders, and access venture capital.",
    category: "Entrepreneurship & Innovation",
    institution: "Olabisi Onabanjo University",
    campusScope: "OOU (Ago-Iwoye, Sagamu, Ayetoro, Ibogun)",
    status: "Open",
    statusColor: "#10b981",
    badge: "Student Sprint • 2026/2027",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    prizePool: "Seed Grants & Incubation",
    deadline: "October 30, 2026",
    participantsCount: "640+ students registered",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so/r/q4yGqY",
    externalLinkText: "Apply via Official Tally Form",
    partner: "OOU Directorate of Entrepreneurship & Innovation",
    partnerRole: "Led by Dr. Ogunkoya (Director of DEI)",
    eligibility: "All matriculated OOU undergraduate and postgraduate students across all four campuses (Ago-Iwoye, Sagamu, Ayetoro, Ibogun).",
    description: "The official Olabisi Onabanjo University Entrepreneurship and Innovation Challenge, spearheaded by the Directorate of Entrepreneurship & Innovation (DEI) under Dr. Ogunkoya. The challenge empowers interdisciplinary student teams to turn lecture-hall concepts and campus laboratory discoveries into commercially viable, market-tested ventures.",
    tracksOrPillars: [
      {
        icon: "♻️",
        title: "Waste-to-Wealth & Circular Economy",
        desc: "Upcycle campus plastic, organic ag-waste, and scrap into revenue-generating commodities.",
        details: "Focuses on repurposing PET bottles, cassava peels, and sawdust into interlocking construction pavers, eco-briquettes, and bio-fertilizer."
      },
      {
        icon: "🌱",
        title: "Digital Agriculture & AgTech",
        desc: "Empower Ayetoro smallholders, poultry clusters, and campus farm plots with telemetry and direct market channels.",
        details: "Eliminating middleman exploitation and post-harvest storage losses with IoT temperature bins and SMS clearinghouses."
      },
      {
        icon: "💼",
        title: "Student Employability & Micro-SaaS",
        desc: "Peer escrow freelance syndicates, campus micro-agencies, and verified credential portfolios.",
        details: "Building decentralized platforms for students to monetize coding, design, translation, and tutoring skills safely."
      },
      {
        icon: "🩺",
        title: "Community Health & Emergency Access",
        desc: "Emergency student blood matching networks for Sagamu Teaching Hospital and nighttime dispensary locators.",
        details: "Rapid responder dispatch and cold-chain vaccine tracking for university hostels and surrounding rural health centers."
      }
    ],
    schedule: [
      { phase: "Application Window", timeline: "Open Now", desc: "Teams register and submit pitch decks via the official Tally portal." },
      { phase: "Mentorship & Vetting", timeline: "November 2026", desc: "Sessions guided by the Industry Advisory Board for Entrepreneurship." },
      { phase: "Grand Pitch Finale", timeline: "December 2026", desc: "Live presentation in front of university leadership and venture sponsors." }
    ]
  },
  {
    id: "alumni-mentorship-board",
    slug: "alumni-mentorship-board",
    title: "Industry Advisory Board for Entrepreneurship",
    subtitle: "Request from Alumnus • Mentorship & Strategic Advisory for Candidates",
    tagline: "Calling distinguished alumni and industry leaders to guide, mentor, and evaluate student candidates. No cash donations or financial commitments required.",
    category: "Alumni & Mentorship",
    institution: "Olabisi Onabanjo University Alumni Network",
    campusScope: "OOU Global Alumni & Industry Leaders",
    status: "Open",
    statusColor: "#4f7fff",
    badge: "Alumni & Mentor Call",
    badgeAccent: "#4f7fff",
    badgeBg: "rgba(79,127,255,0.12)",
    prizePool: "Mentorship & Impact",
    deadline: "Rolling Admissions",
    participantsCount: "Distinguished Colleagues Invited",
    heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    formType: "google_form",
    formUrl: "https://forms.gle/QV6Ki6ikwZE5fk8w7",
    externalLinkText: "Fill the Official Google Form",
    partner: "Industry Advisory Board for Entrepreneurship",
    partnerRole: "Alumni Mentorship Committee",
    eligibility: "Distinguished alumni, industry practitioners, entrepreneurs, and senior executives passionate about mentoring student candidates.",
    description: "Greetings Distinguished Colleagues! We invite you to join our Industry Advisory Board for Entrepreneurship. As an advisory member and mentor, your practical market insights, corporate guidance, and strategic feedback will prepare our student innovators to build sustainable enterprises. No cash donations or financial commitments are required—only your invaluable experience, time, and mentorship.",
    highlights: [
      "Zero cash commitments: No financial or cash donations required.",
      "Direct student impact: Mentor finalists across tech, commerce, agtech, and health.",
      "Official university recognition: Part of the accredited OOU Entrepreneurship ecosystem."
    ],
    tracksOrPillars: [
      {
        icon: "🎓",
        title: "One-on-One Team Mentorship",
        desc: "Guide student founder teams through business model canvas validation, market testing, and go-to-market strategies."
      },
      {
        icon: "🤝",
        title: "Industry Advisory Feedback",
        desc: "Review prototype pitches, offer strategic critique, and share practical domain knowledge from real-world Nigerian industry."
      },
      {
        icon: "🏆",
        title: "Pitch Jury & Evaluation",
        desc: "Sit on the judging panel for innovation sprint semi-finals and recommend high-potential student ventures for venture grants."
      }
    ],
    schedule: [
      { phase: "Advisor Onboarding", timeline: "Ongoing", desc: "Complete the official Google Form application to register your domain expertise." },
      { phase: "Candidate Matching", timeline: "Cohort Based", desc: "Advisory members are paired with relevant student innovation teams." },
      { phase: "Demo Day & Sprint Review", timeline: "Sprint Milestones", desc: "Participate in virtual and campus pitch reviews." }
    ]
  }
];

export function getChallengeBySlug(slug: string): ChallengeItem | undefined {
  return ALL_CHALLENGES.find((c) => c.slug === slug || c.id === slug);
}
