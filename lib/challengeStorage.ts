export interface ChallengeKPIs {
  studentEngagements: number;
  targetStudentEngagements: number;
  ventureIdeas: number;
  targetVentureIdeas: number;
  prototypesDeveloped: number;
  targetPrototypesDeveloped: number;
  marketValidated: number;
  targetMarketValidated: number;
  daysRemaining: number;
  fundingPotNgn: number;
  currentStreakDays: number;
}

export interface VentureSubmission {
  id: string;
  title: string;
  track: "Waste-to-Wealth" | "Digital Agriculture" | "Student Employability" | "Community Health";
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadMatric: string;
  leadFaculty: string;
  leadCampus: string;
  teamMembers: Array<{
    name: string;
    faculty: string;
    role: string;
  }>;
  problemStatement: string;
  solutionSummary: string;
  stage: "idea" | "matchmaking" | "prototype" | "validated" | "finalist";
  score?: {
    innovation: number;
    viability: number;
    teamDiversity: number;
    trackFit: number;
    total: number;
    feedback: string;
  };
  prototypeUrl?: string;
  pitchDeckUrl?: string;
  submittedAt: string;
  isFlagged?: boolean;
}

export interface MatchmakingProfile {
  id: string;
  studentName: string;
  matricNo: string;
  faculty: string;
  department: string;
  campus: string;
  skills: string[];
  lookingFor: string;
  trackPreference: string;
  contactEmail: string;
  status: "open" | "matched";
  matchedWith?: string;
  joinedAt: string;
}

export interface ChallengeAnnouncement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  isUrgent?: boolean;
  tag: string;
}

export const INITIAL_KPIS: ChallengeKPIs = {
  studentEngagements: 642,
  targetStudentEngagements: 1000,
  ventureIdeas: 41,
  targetVentureIdeas: 60,
  prototypesDeveloped: 18,
  targetPrototypesDeveloped: 30,
  marketValidated: 6,
  targetMarketValidated: 10,
  daysRemaining: 24,
  fundingPotNgn: 5000000,
  currentStreakDays: 14,
};

export const INNOVATION_TRACKS = [
  {
    id: "waste-to-wealth",
    name: "Waste-to-Wealth",
    icon: "♻️",
    accent: "#10B981", // Emerald
    badge: "Eco & Circular Economy",
    leadMentor: "Dr. O. Ogunkoya & Faculty of Science",
    tagline: "Upcycle campus plastic, organic ag-waste, and scrap into revenue-generating commodities.",
    problems: [
      "Over 4.2 tons of single-use PET bottles and polythene discarded weekly across Ago-Iwoye campuses.",
      "Untreated sawdust and cassava peel bio-waste accumulating around local farm settlements.",
      "Lack of decentralized collection and recycling incentive systems for university students.",
    ],
    projectIdeas: [
      "PlastiBrick: Interlocking construction pavers pressed from melted campus plastics.",
      "EcoCharcoal: Smokeless cooking briquettes made from cassava peels and sugarcane bagasse.",
      "SmartScrap Locker: Reverse-vending deposit bins offering UniLife SP tokens for crushed tins.",
    ],
    allocatedSeed: "₦1,250,000",
  },
  {
    id: "digital-agriculture",
    name: "Digital Agriculture",
    icon: "🌱",
    accent: "#F59E0B", // Amber / Gold
    badge: "Food Systems & AgTech",
    leadMentor: "College of Agricultural Sciences, Ayetoro",
    tagline: "Empower rural Ogun State farmers, poultry clusters, and campus farm plots with data.",
    problems: [
      "Smallholder farmers losing 35% of tomato and pepper yields to post-harvest storage spoilage.",
      "Unreliable poultry mortality monitoring in student-run enterprise farm schemes.",
      "Middleman price gouging between Ayetoro farm gates and Ago-Iwoye student markets.",
    ],
    projectIdeas: [
      "OOU AgroLink: WhatsApp-based market clearing house for farm harvest pre-orders.",
      "SolarChill Agro-Pouch: Low-cost evaporative clay-insulated cooling containers.",
      "PoultryGuard IoT: Low-cost temperature and ammonia sensor alerts for student farm pens.",
    ],
    allocatedSeed: "₦1,250,000",
  },
  {
    id: "student-employability",
    name: "Student Employability",
    icon: "💼",
    accent: "#3B82F6", // Royal Blue
    badge: "Future of Work & Skills",
    leadMentor: "Directorate of Entrepreneurship & Industry Liaisons",
    tagline: "Transform student technical craft and creative skills into monetizable freelance agencies.",
    problems: [
      "80% of penultimate and final-year students lack verifiable industry portfolio assets.",
      "Hostel-based student artisans (graphics, coding, tailoring, baking) struggle with escrow trust.",
      "Lack of structured micro-internships connecting students with alumni-led SMEs in Lagos and Ogun.",
    ],
    projectIdeas: [
      "CampusGig Escrow: Peer-to-peer verified student freelance marketplace built on UniLife.",
      "ResumeForge AI: Curriculum-aligned resume optimizer tailored for Nigerian graduate traineeships.",
      "CodeCraft OOU: Student-led micro-agency building websites for local Ijebu and Remo businesses.",
    ],
    allocatedSeed: "₦1,250,000",
  },
  {
    id: "community-health",
    name: "Community Health",
    icon: "🩺",
    accent: "#EC4899", // Pink
    badge: "HealthTech & Preventive Care",
    leadMentor: "Obafemi Awolowo College of Health Sciences, Sagamu",
    tagline: "Solve healthcare accessibility, emergency response, and medicine availability across OOU.",
    problems: [
      "Critical delays in locating rare blood donor matches for Sagamu Teaching Hospital emergencies.",
      "Nighttime pharmaceutical stockouts for students in off-campus Ago-Iwoye hostels.",
      "Untreated academic burnout and stigma around student mental health counseling.",
    ],
    projectIdeas: [
      "HaemoMatch OOU: Urgent SMS and push notification broadcast for screened student blood donors.",
      "PharmaFind: Real-time pharmacy inventory lookup within a 5km radius of campus gates.",
      "MindSafe Peer: Confidential, anonymous tele-triage for exam stress and psychosocial support.",
    ],
    allocatedSeed: "₦1,250,000",
  },
] as const;

export const INITIAL_VENTURES: VentureSubmission[] = [
  {
    id: "v-101",
    title: "PlastiPave Eco-Blocks",
    track: "Waste-to-Wealth",
    leadName: "Adeyemi Ayomide",
    leadEmail: "a.ayomide@oouagoiwoye.edu.ng",
    leadPhone: "+234 813 456 7890",
    leadMatric: "OOU/2021/ENG/0482",
    leadFaculty: "Faculty of Engineering & Technology",
    leadCampus: "Ibogun Campus",
    teamMembers: [
      { name: "Adeyemi Ayomide", faculty: "Engineering (Ibogun)", role: "Materials Lead" },
      { name: "Kemi Balogun", faculty: "Social Sciences (Ago-Iwoye)", role: "Market Viability" },
      { name: "Chinedu Okafor", faculty: "Basic Medical Sciences", role: "Environmental Safety" },
    ],
    problemStatement: "Over 4 tons of uncollected sachet water nylon waste litter Ago-Iwoye streets, blocking drains during rains.",
    solutionSummary: "Compacting shredded polyethylene with sand into high-tensile interlocking driveway pavers at 40% lower cost than concrete.",
    stage: "prototype",
    score: {
      innovation: 9,
      viability: 8,
      teamDiversity: 10,
      trackFit: 9,
      total: 36,
      feedback: "Strong cross-campus team (Ibogun + Ago-Iwoye). Prototype test blocks show high compression strength.",
    },
    prototypeUrl: "https://photos.app.goo.gl/sample-prototype",
    pitchDeckUrl: "https://docs.google.com/presentation/d/sample",
    submittedAt: "2026-09-08T10:14:00Z",
  },
  {
    id: "v-102",
    title: "AgroLink WhatsApp Clearinghouse",
    track: "Digital Agriculture",
    leadName: "Fatima Oladipo",
    leadEmail: "fatima.oladipo@oouagoiwoye.edu.ng",
    leadPhone: "+234 802 334 1122",
    leadMatric: "OOU/2022/AGR/1190",
    leadFaculty: "College of Agricultural Sciences",
    leadCampus: "Ayetoro Campus",
    teamMembers: [
      { name: "Fatima Oladipo", faculty: "Agricultural Extension (Ayetoro)", role: "Farmer Liason" },
      { name: "Tunde Bakare", faculty: "Computer Science (Ago-Iwoye)", role: "Bot Developer" },
    ],
    problemStatement: "Ayetoro tomato farmers incur 30% spoilage every harvest cycle due to missing direct links with university cafeteria caterers.",
    solutionSummary: "A WhatsApp bot connecting 45 rural farmers with 120 student kitchen heads for batch pre-purchases.",
    stage: "validated",
    score: {
      innovation: 8,
      viability: 10,
      teamDiversity: 8,
      trackFit: 10,
      total: 36,
      feedback: "Already transacted ₦480,000 in pilot deliveries between Ayetoro farm plots and Ago-Iwoye hostels.",
    },
    prototypeUrl: "https://wa.me/2348000000000",
    pitchDeckUrl: "https://drive.google.com/sample-deck",
    submittedAt: "2026-09-10T14:30:00Z",
  },
  {
    id: "v-103",
    title: "HaemoMatch OOU",
    track: "Community Health",
    leadName: "Dr. Olumide Adeleke (MBChB student)",
    leadEmail: "olumide.adeleke@oouagoiwoye.edu.ng",
    leadPhone: "+234 816 778 9900",
    leadMatric: "OOU/2020/CHS/0091",
    leadFaculty: "Clinical Sciences",
    leadCampus: "Sagamu Campus",
    teamMembers: [
      { name: "Olumide Adeleke", faculty: "Clinical Sciences (Sagamu)", role: "Clinical Protocol" },
      { name: "Zainab Bello", faculty: "Pharmacy (Sagamu)", role: "Blood Bank Liaison" },
      { name: "Ibrahim Salisu", faculty: "Science (Ago-Iwoye)", role: "Backend Engineer" },
    ],
    problemStatement: "Emergency caesarean patients in Sagamu often wait 3+ hours for compatible O-negative donors.",
    solutionSummary: "Automated geofenced SMS paging network matching pre-screened student blood donors on call.",
    stage: "prototype",
    score: {
      innovation: 9,
      viability: 9,
      teamDiversity: 9,
      trackFit: 10,
      total: 37,
      feedback: "Endorsed by resident doctors at OOUTH. Crucial lifesaving initiative.",
    },
    prototypeUrl: "https://haemomatch-demo.oou.ng",
    pitchDeckUrl: "https://drive.google.com/sample-deck-haemo",
    submittedAt: "2026-09-11T12:00:00Z",
  },
  {
    id: "v-104",
    title: "CampusGig Escrow Hub",
    track: "Student Employability",
    leadName: "Taiwo Adelegan",
    leadEmail: "t.adelegan@oouagoiwoye.edu.ng",
    leadPhone: "+234 809 112 3344",
    leadMatric: "OOU/2021/SMS/2301",
    leadFaculty: "Administration & Management",
    leadCampus: "Ago-Iwoye Campus",
    teamMembers: [
      { name: "Taiwo Adelegan", faculty: "Business Admin (Ago-Iwoye)", role: "Operations" },
      { name: "Victor Eze", faculty: "Law (Ago-Iwoye)", role: "Dispute & Escrow" },
      { name: "Blessing Okon", faculty: "Engineering (Ibogun)", role: "Fullstack Dev" },
    ],
    problemStatement: "Student graphic designers and web developers frequently get defrauded by clients refusing to pay upon file delivery.",
    solutionSummary: "Milestone-locked SP/Naira escrow payment gateway enabling campus creators to deliver work securely.",
    stage: "validated",
    score: {
      innovation: 8,
      viability: 9,
      teamDiversity: 10,
      trackFit: 9,
      total: 36,
      feedback: "Perfect alignment with UniLife ecosystem. Ready for seed deployment.",
    },
    prototypeUrl: "https://campusgig.unilife.ng",
    submittedAt: "2026-09-12T16:45:00Z",
  },
  {
    id: "v-105",
    title: "BioChar AgroPacks",
    track: "Waste-to-Wealth",
    leadName: "Samuel Ojo",
    leadEmail: "s.ojo@oouagoiwoye.edu.ng",
    leadPhone: "+234 705 443 2211",
    leadMatric: "OOU/2023/SCI/0401",
    leadFaculty: "Faculty of Science",
    leadCampus: "Ago-Iwoye Campus",
    teamMembers: [
      { name: "Samuel Ojo", faculty: "Biochemistry", role: "Formulation Lead" },
      { name: "Aisha Mohammed", faculty: "Agriculture", role: "Soil Testing" },
    ],
    problemStatement: "Farmers in Ogun dry soil lose nutrients rapidly, while sawdust from local mills burns openly causing air pollution.",
    solutionSummary: "Pyrolyzed sawdust infused with poultry manure biochar pellets boosting moisture retention by 45%.",
    stage: "idea",
    submittedAt: "2026-09-14T09:15:00Z",
  },
  {
    id: "v-106",
    title: "PharmaFind Sagamu & Ago",
    track: "Community Health",
    leadName: "David Chukwuma",
    leadEmail: "d.chukwuma@oouagoiwoye.edu.ng",
    leadPhone: "+234 814 990 1122",
    leadMatric: "OOU/2022/PHM/0114",
    leadFaculty: "Faculty of Pharmacy",
    leadCampus: "Sagamu Campus",
    teamMembers: [
      { name: "David Chukwuma", faculty: "Pharmacy", role: "Drug Regulatory" },
      { name: "Grace Adekunle", faculty: "Science", role: "Mobile App" },
    ],
    problemStatement: "Students walking 4km at night searching 7 different medicine stores for prescribed antimalarials and antibiotics.",
    solutionSummary: "Real-time stock query bot linking 22 registered pharmacies across Ago-Iwoye, Ijebu-Igbo, and Sagamu.",
    stage: "matchmaking",
    submittedAt: "2026-09-15T11:20:00Z",
  },
];

export const INITIAL_MATCHMAKING: MatchmakingProfile[] = [
  {
    id: "m-01",
    studentName: "Kehinde Sowemimo",
    matricNo: "OOU/2022/ENG/0199",
    faculty: "Engineering (Ibogun)",
    department: "Computer Engineering",
    campus: "Ibogun",
    skills: ["Embedded C++", "Arduino IoT", "3D Printing"],
    lookingFor: "Agronomy or Animal Science student for smart incubator venture",
    trackPreference: "Digital Agriculture",
    contactEmail: "k.sowemimo@oouagoiwoye.edu.ng",
    status: "open",
    joinedAt: "2026-09-13T10:00:00Z",
  },
  {
    id: "m-02",
    studentName: "Morayo Adele",
    matricNo: "OOU/2021/SMS/3100",
    faculty: "Administration & Management",
    department: "Accounting & Finance",
    campus: "Ago-Iwoye",
    skills: ["Financial Modeling", "Business Pitching", "Unit Economics"],
    lookingFor: "Health sciences or biochemistry builder with clinical solution",
    trackPreference: "Community Health",
    contactEmail: "morayo.adele@oouagoiwoye.edu.ng",
    status: "open",
    joinedAt: "2026-09-14T08:30:00Z",
  },
  {
    id: "m-03",
    studentName: "Tobiloba Shittu",
    matricNo: "OOU/2022/AGR/0045",
    faculty: "Agricultural Sciences",
    department: "Crop Production",
    campus: "Ayetoro",
    skills: ["Post-harvest Storage", "Organic Farming", "Field Research"],
    lookingFor: "Software engineer to build cold chain logistics portal",
    trackPreference: "Digital Agriculture",
    contactEmail: "tobi.shittu@oouagoiwoye.edu.ng",
    status: "matched",
    matchedWith: "AgroLink Team",
    joinedAt: "2026-09-10T14:00:00Z",
  },
];

export const INITIAL_ANNOUNCEMENTS: ChallengeAnnouncement[] = [
  {
    id: "ann-01",
    title: "Directorate Orientation & Cross-Faculty Matchmaking Session",
    content: "All registered team leads and individual innovators are invited to the virtual pitch clinic with Dr. Ogunkoya this Friday via Google Meet. Link dispatched to registered emails.",
    author: "Directorate of Entrepreneurship & Innovation (DEI)",
    date: "Sept 18, 2026",
    isUrgent: true,
    tag: "Event",
  },
  {
    id: "ann-02",
    title: "Prototype Lab Access Granted at Ibogun & Ago-Iwoye",
    content: "Teams with approved Waste-to-Wealth and AgTech concepts can now book fabrication hours at the Ibogun Engineering workshop and Ayetoro Ag-Farm.",
    author: "Dr. O. Ogunkoya",
    date: "Sept 15, 2026",
    isUrgent: false,
    tag: "Resources",
  },
  {
    id: "ann-03",
    title: "₦5,000,000 Total Seed Grant Pool Confirmed for 2026/2027",
    content: "The University Senate and external industry partners have locked in the seed fund disbursement schedule: ₦1,250,000 allocated per innovation track.",
    author: "DEI Executive Committee",
    date: "Sept 12, 2026",
    isUrgent: false,
    tag: "Funding",
  },
];

// Helper functions for persistent storage with fallback
export function getStoredKPIs(): ChallengeKPIs {
  if (typeof window === "undefined") return INITIAL_KPIS;
  try {
    const data = localStorage.getItem("oou_challenge_kpis");
    return data ? JSON.parse(data) : INITIAL_KPIS;
  } catch {
    return INITIAL_KPIS;
  }
}

export function saveStoredKPIs(kpis: ChallengeKPIs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("oou_challenge_kpis", JSON.stringify(kpis));
  } catch (e) {
    console.error("Failed to save KPIs", e);
  }
}

export function getStoredVentures(): VentureSubmission[] {
  if (typeof window === "undefined") return INITIAL_VENTURES;
  try {
    const data = localStorage.getItem("oou_challenge_ventures");
    return data ? JSON.parse(data) : INITIAL_VENTURES;
  } catch {
    return INITIAL_VENTURES;
  }
}

export function saveStoredVentures(ventures: VentureSubmission[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("oou_challenge_ventures", JSON.stringify(ventures));
  } catch (e) {
    console.error("Failed to save ventures", e);
  }
}

export function getStoredAnnouncements(): ChallengeAnnouncement[] {
  if (typeof window === "undefined") return INITIAL_ANNOUNCEMENTS;
  try {
    const data = localStorage.getItem("oou_challenge_announcements");
    return data ? JSON.parse(data) : INITIAL_ANNOUNCEMENTS;
  } catch {
    return INITIAL_ANNOUNCEMENTS;
  }
}

export function saveStoredAnnouncements(announcements: ChallengeAnnouncement[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("oou_challenge_announcements", JSON.stringify(announcements));
  } catch (e) {
    console.error("Failed to save announcements", e);
  }
}
