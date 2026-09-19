export interface ChallengeItem {
  id: string; // e.g. "oou-venture-2026"
  slug: string; // url slug e.g. "oou-venture-2026"
  title: string;
  subtitle: string;
  tagline: string;
  category: "Entrepreneurship" | "Tech & Hackathon" | "Creative & Media" | "Commerce" | "Research & Grants" | "Social Impact";
  institution: string; // e.g. "Olabisi Onabanjo University"
  campusScope: string; // e.g. "OOU (Ago-Iwoye, Sagamu, Ayetoro, Ibogun)" or "All Nigerian Universities"
  status: "Open" | "Active Sprint" | "Judging" | "Coming Soon";
  statusColor: string;
  badge: string;
  badgeAccent: string;
  badgeBg: string;
  prizePool: string;
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
  prizes?: {
    rank: string;
    reward: string;
    perks: string;
  }[];
}

export const ALL_CHALLENGES: ChallengeItem[] = [
  {
    id: "oou-venture-2026",
    slug: "oou-venture-2026",
    title: "OOU Entrepreneurship Challenge",
    subtitle: "Directorate of Entrepreneurship & Innovation (DEI) Sprint 2026/2027",
    tagline: "Form cross-faculty teams across Ago-Iwoye, Sagamu, Ayetoro, and Ibogun to prototype solutions and access seed capital.",
    category: "Entrepreneurship",
    institution: "Olabisi Onabanjo University",
    campusScope: "OOU (Ago-Iwoye, Sagamu, Ayetoro, Ibogun)",
    status: "Open",
    statusColor: "#10b981",
    badge: "Flagship Sprint • 2026/2027",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    prizePool: "₦5,000,000",
    deadline: "October 30, 2026",
    participantsCount: "640+ students registered",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so/r/q4yGqY",
    externalLinkText: "Open Official Tally Form",
    partner: "OOU Directorate of Entrepreneurship & Innovation",
    partnerRole: "Led by Dr. Ogunkoya (Director of DEI)",
    eligibility: "All matriculated OOU undergraduate and postgraduate students across all four campuses.",
    description: "The official Olabisi Onabanjo University Entrepreneurship Challenge, spearheaded by the Directorate of Entrepreneurship & Innovation (DEI) under Dr. Ogunkoya. The challenge empowers interdisciplinary student teams to turn lecture-hall concepts and campus laboratory discoveries into commercially viable, market-tested ventures.",
    tracksOrPillars: [
      {
        icon: "♻️",
        title: "Waste-to-Wealth",
        desc: "Upcycle campus plastic, organic ag-waste, and scrap into revenue-generating commodities.",
        details: "Focuses on repurposing PET bottles, cassava peels, and sawdust into interlocking construction pavers, eco-briquettes, and bio-fertilizer."
      },
      {
        icon: "🌱",
        title: "Digital Agriculture",
        desc: "Empower Ayetoro smallholders, poultry clusters, and campus farm plots with telemetry and direct market channels.",
        details: "Eliminating middleman exploitation and post-harvest storage losses with IoT temperature bins and SMS clearinghouses."
      },
      {
        icon: "💼",
        title: "Student Employability",
        desc: "Peer escrow freelance syndicates, campus micro-agencies, and verified credential portfolios.",
        details: "Building decentralized platforms for students to monetize coding, design, translation, and tutoring skills safely."
      },
      {
        icon: "🩺",
        title: "Community Health",
        desc: "Emergency student blood matching networks for Sagamu Teaching Hospital and nighttime dispensary locators.",
        details: "Rapid responder dispatch and cold-chain vaccine tracking for university hostels and surrounding rural health centers."
      }
    ],
    schedule: [
      { phase: "Phase 1: Concept & Team Submission", timeline: "Sep 01 - Oct 30, 2026", desc: "Submit your team via Tally with problem statement, target beneficiaries, and campus track." },
      { phase: "Phase 2: Fabrication & Lab Prototyping", timeline: "Nov 01 - Nov 20, 2026", desc: "Access to university engineering workshops and Ayetoro research plots." },
      { phase: "Phase 3: Campus Market Validation", timeline: "Nov 21 - Dec 10, 2026", desc: "Testing real student pilot orders and peer escrow transactions on UniLife." },
      { phase: "Phase 4: Senate Grand Pitch & Awards", timeline: "Dec 18, 2026", desc: "Live presentation in Ago-Iwoye before Directorate judges and seed disbursement." }
    ],
    prizes: [
      { rank: "1st Place (Grand Prize)", reward: "₦2,500,000", perks: "Full Directorate incubation, legal trademark support, and direct investor pitch" },
      { rank: "2nd Place", reward: "₦1,500,000", perks: "University fabrication access and 6 months mentor coaching" },
      { rank: "3rd Place", reward: "₦1,000,000", perks: "Seed capital for inventory rollout on UniLife Marketplace" }
    ]
  },
  {
    id: "campus-creator-2026",
    slug: "campus-creator-cup",
    title: "UniLife Campus Creator Cup",
    subtitle: "Student Storytelling, Micro-Docs & Visual Culture",
    tagline: "Showcase the raw, vibrant, and untold realities of Nigerian university life. Win camera gear, creator grants, and verified distribution.",
    category: "Creative & Media",
    institution: "National Inter-University Guild",
    campusScope: "All Accredited Nigerian Universities",
    status: "Open",
    statusColor: "#ff3d81",
    badge: "Media & Culture • Nationwide",
    badgeAccent: "#ff3d81",
    badgeBg: "rgba(255,61,129,0.12)",
    prizePool: "₦1,500,000 + Gear",
    deadline: "November 15, 2026",
    participantsCount: "210+ creators joined",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://docs.google.com/forms",
    externalLinkText: "Submit Creator Reel",
    partner: "UniLife Media Lab & Creator Guild",
    partnerRole: "Student Storytelling Collective",
    eligibility: "Students currently enrolled in any Nigerian federal, state, or private university.",
    description: "A national student media showcase celebrating raw university narratives. From late-night exam cramming sessions in lecture halls to vibrant hostel entrepreneurs and campus photojournalism.",
    tracksOrPillars: [
      { icon: "🎥", title: "Micro-Documentaries", desc: "3-minute cinematic films covering real campus stories, survival hustles, and community triumphs." },
      { icon: "🎙️", title: "Campus Audio & Podcasts", desc: "Episodic storytelling unpacking youth culture, mental health, and exam realities." },
      { icon: "📸", title: "Campus Photojournalism", desc: "Photo series chronicling university architectural history, town markets, and hostel life." }
    ],
    schedule: [
      { phase: "Submissions Window", timeline: "Oct 01 - Nov 15, 2026", desc: "Upload high-definition clips and portfolio links via the form." },
      { phase: "Community Screening", timeline: "Nov 16 - Nov 25, 2026", desc: "Streamed on UniLife media channels with student voting." },
      { phase: "Creator Gala & Awards", timeline: "Dec 05, 2026", desc: "Distribution of camera rigs, audio kits, and production grants." }
    ],
    prizes: [
      { rank: "Best Short Doc", reward: "₦750,000 + Sony Alpha Rig", perks: "Official broadcast on UniLife YouTube channel" },
      { rank: "Best Campus Podcast", reward: "₦450,000 + Rode PodMic Studio Kit", perks: "1-year podcast hosting & syndication sponsorship" },
      { rank: "Photojournalism Winner", reward: "₦300,000 + Lens Kit", perks: "Featured in annual UniLife Print Anthology" }
    ]
  },
  {
    id: "unishop-merchant-sprint",
    slug: "unishop-merchant-sprint",
    title: "The ₦1M Campus Merchant Sprint",
    subtitle: "UniShop Peer-to-Peer Student Commerce Sprint",
    tagline: "Turn your dorm-room thrift rack, food prep service, tech repair, or beauty brand into the highest-grossing campus shop.",
    category: "Commerce",
    institution: "UniLife Commerce Union",
    campusScope: "Multi-Campus (OOU, UNILAG, UI, FUTA)",
    status: "Active Sprint",
    statusColor: "#b8860b",
    badge: "Commerce & Small Business",
    badgeAccent: "#b8860b",
    badgeBg: "rgba(255,210,63,0.2)",
    prizePool: "₦1,000,000 Working Capital",
    deadline: "December 05, 2026",
    participantsCount: "380 active shops",
    heroImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so",
    externalLinkText: "Register Your UniShop",
    partner: "UniLife Marketplace Council",
    partnerRole: "Student Merchant Guild",
    eligibility: "Open to any student operating an active business, product line, or service within university campuses.",
    description: "Compete across 45 days of live sales on the UniLife Campus Marketplace with 0% commission fees, verified trust escrow badging, and access to inventory expansion credit.",
    tracksOrPillars: [
      { icon: "🛍️", title: "Thrift & Campus Fashion", desc: "Vintage styling, sneaker curation, and tailored custom student apparel." },
      { icon: "🍲", title: "Hostel Food & Culinary Prep", desc: "Healthy meal plans, late-night snack deliveries, and pastry boxes." },
      { icon: "🔧", title: "Gadget Repair & Tech Services", desc: "Screen fixes, laptop firmware flashing, and dorm-to-dorm hardware repairs." }
    ],
    prizes: [
      { rank: "Top Volume Merchant", reward: "₦500,000 Zero-Interest Credit", perks: "Permanent top-of-catalog placement on UniShop" },
      { rank: "Top Rated Customer Trust", reward: "₦300,000 Grant", perks: "Free packaging and logistics sponsorship" },
      { rank: "Rising Star Shop", reward: "₦200,000 Grant", perks: "POS toolkit & social banner spotlight" }
    ]
  },
  {
    id: "clean-tech-offgrid",
    slug: "clean-tech-offgrid-energy",
    title: "Clean Tech & Off-Grid Energy Sprint",
    subtitle: "Faculty of Engineering & Renewable Energy Alliance",
    tagline: "Designing decentralized solar charging stations, lithium battery refurbishing, and low-power hostel lighting systems.",
    category: "Tech & Hackathon",
    institution: "Engineering & Applied Sciences Alliance",
    campusScope: "Southwest Nigerian Universities",
    status: "Coming Soon",
    statusColor: "#4f7fff",
    badge: "Clean Energy & Eco-Design",
    badgeAccent: "#4f7fff",
    badgeBg: "rgba(79,127,255,0.12)",
    prizePool: "₦2,500,000 Lab Grant",
    deadline: "November 30, 2026",
    participantsCount: "Pre-registration Open",
    heroImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so",
    externalLinkText: "Pre-Register Team",
    partner: "Renewable Energy Research Group",
    partnerRole: "Applied Technology Lab",
    eligibility: "Undergraduate students in Engineering, Physics, Industrial Design, and Computer Science.",
    description: "Tackling the chronic electricity deficits across student off-campus residential belts by creating safe, modular, renewable power solutions fabricated from accessible local components.",
    tracksOrPillars: [
      { icon: "☀️", title: "Solar Study Kiosks", desc: "Daytime solar charge banks with integrated night study LED arrays." },
      { icon: "🔋", title: "E-Waste Lithium Packs", desc: "Testing and rebuilding discarded laptop 18650 cells into reliable backup packs." },
      { icon: "⚡", title: "Hostel Power Sharing", desc: "Peer-to-peer micro metering to share inverter capacity safely." }
    ],
    prizes: [
      { rank: "Grand Hardware Winner", reward: "₦1,500,000 Lab Grant", perks: "Components budget + university fabrication sponsorship" },
      { rank: "Runner-Up", reward: "₦1,000,000", perks: "6-month accelerator mentorship with energy firm" }
    ]
  },
  {
    id: "campus-health-hackathon",
    slug: "campus-health-hackathon",
    title: "Campus Health & Emergency Response Sprint",
    subtitle: "College of Medicine & Allied Health Sciences",
    tagline: "Building rapid blood donor matching, off-hours pharmacy locators, and student mental wellness triage lines.",
    category: "Social Impact",
    institution: "College of Health Sciences",
    campusScope: "Sagamu, Ibadan, and Lagos Medical Campuses",
    status: "Open",
    statusColor: "#10b981",
    badge: "Healthcare & MedTech",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    prizePool: "₦2,000,000",
    deadline: "November 25, 2026",
    participantsCount: "140+ medical & tech students",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://tally.so",
    externalLinkText: "Register MedTech Project",
    partner: "Student Medical Guild & Red Cross Alliance",
    partnerRole: "Clinical Validation Partner",
    eligibility: "Medical, nursing, pharmacy, computer science, and bio-engineering students.",
    description: "Bridging the gap between campus medical centers and off-campus student accommodation during emergencies, night hours, and critical shortage periods.",
    tracksOrPillars: [
      { icon: "🩸", title: "Emergency Blood Donor Network", desc: "Geolocated SMS broadcasts to verified student donors during hospital surgery shortages." },
      { icon: "💊", title: "Night Pharmacy Radar", desc: "Live stock tracker for prescription drugs and first-aid kits around campus neighborhoods." },
      { icon: "🧠", title: "Peer Mental Health Support", desc: "Confidential, stigma-free exam anxiety support channels with licensed volunteers." }
    ]
  },
  {
    id: "ai-study-companion-challenge",
    slug: "ai-study-companion-challenge",
    title: "AI Study & Campus Accessibility Sprint",
    subtitle: "Faculty of Science & Computer Students Association",
    tagline: "Build offline-first study assistants, audio exam readers for visually impaired students, and vernacular translation tools.",
    category: "Tech & Hackathon",
    institution: "Nigerian University Tech Alliance",
    campusScope: "Nationwide",
    status: "Open",
    statusColor: "#10b981",
    badge: "Artificial Intelligence",
    badgeAccent: "#4f7fff",
    badgeBg: "rgba(79,127,255,0.12)",
    prizePool: "₦3,000,000 + Cloud Credits",
    deadline: "December 15, 2026",
    participantsCount: "420+ developers registered",
    heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://tally.so",
    externalLinkText: "Join Hackathon Track",
    partner: "Campus AI Research Lab",
    partnerRole: "Compute & Cloud Partner",
    eligibility: "Open to all student software engineers, data science majors, and ML enthusiasts.",
    description: "Developing practical, low-latency, and offline-compatible artificial intelligence utilities that make higher education equitable, affordable, and accessible across Nigeria.",
    tracksOrPillars: [
      { icon: "📱", title: "Low-Bandwidth Document Summarizer", desc: "Summarizing heavy 80-page PDF course modules on 2G/3G campus connections." },
      { icon: "🎧", title: "Accessibility Audio Past Questions", desc: "Text-to-speech exam reading tools designed specifically for visually impaired scholars." },
      { icon: "🗣️", title: "Vernacular STEM Explainer", desc: "Translating abstract physics and organic chemistry concepts into Yoruba, Hausa, and Igbo audio notes." }
    ]
  },
  {
    id: "women-in-stem-fellowship",
    slug: "women-in-stem-fellowship",
    title: "Ada Lovelace Campus STEM Fellowship",
    subtitle: "Women in Engineering & Computer Science Guild",
    tagline: "Grant funding, hardware stipends, and senior industry mentorship for female student researchers in STEM fields.",
    category: "Research & Grants",
    institution: "Pan-African Women in Tech Foundation",
    campusScope: "All Nigerian Universities",
    status: "Open",
    statusColor: "#10b981",
    badge: "Fellowship & Grant",
    badgeAccent: "#ff3d81",
    badgeBg: "rgba(255,61,129,0.12)",
    prizePool: "₦4,000,000 in Grants",
    deadline: "January 10, 2027",
    participantsCount: "190+ applicants",
    heroImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://tally.so",
    externalLinkText: "Apply for Fellowship",
    partner: "Women in STEM Alliance",
    partnerRole: "Grant Sponsor",
    eligibility: "Female undergraduate students in Engineering, Maths, Physics, and Computer Science (Year 2 to 5).",
    description: "Accelerating female leadership in technical research through non-dilutive research stipends, laptop hardware subsidies, and direct 1-on-1 mentorship with global tech leaders.",
    tracksOrPillars: [
      { icon: "🔬", title: "Undergraduate Thesis Grants", desc: "Direct funding for final-year project laboratory consumables and reagents." },
      { icon: "💻", title: "Hardware Workstation Subsidy", desc: "MacBook/ThinkPad provisioning for software engineering and data modeling." },
      { icon: "🌐", title: "Global Conference Travel", desc: "Sponsorship to present papers at African and international computing symposiums." }
    ]
  },
  {
    id: "circular-campus-agro",
    slug: "circular-campus-agro-initiative",
    title: "Campus Agro-Ecology & Food Security Sprint",
    subtitle: "Faculty of Agricultural Sciences",
    tagline: "Deploying hydroponic student garden towers, mushroom cultivation from agro-residues, and smart fish ponds.",
    category: "Entrepreneurship",
    institution: "College of Agricultural Sciences, Ayetoro",
    campusScope: "Ogun & Oyo State Agriculture Campuses",
    status: "Active Sprint",
    statusColor: "#b8860b",
    badge: "Agri-Business & Food Security",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    prizePool: "₦1,800,000",
    deadline: "November 10, 2026",
    participantsCount: "95 student farmer clusters",
    heroImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so",
    externalLinkText: "Submit Agribusiness Plan",
    partner: "Ayetoro Commercial Farm Extension",
    partnerRole: "Plot & Infrastructure Sponsor",
    eligibility: "Agriculture, Agronomy, Animal Science, and Agribusiness students.",
    description: "Transforming under-utilized campus plots and hostel balconies into high-yield, organic food micro-enterprises supplying student cafeterias at affordable prices.",
    tracksOrPillars: [
      { icon: "🍄", title: "Mushroom Bio-Farming", desc: "Cultivating oyster mushrooms on discarded sawdust and agricultural stalks." },
      { icon: "🥬", title: "Vertical Hydroponic Greens", desc: "Growing leafy vegetables with 90% less water for campus cafeterias." },
      { icon: "🐟", title: "Recirculating Aquaculture", desc: "High-density catfish fingerling nursery tanks powered by small solar pumps." }
    ]
  },
  {
    id: "campus-legal-civic-sprint",
    slug: "campus-legal-civic-sprint",
    title: "Campus Justice & Civic Rights Initiative",
    subtitle: "Faculty of Law & Student Union Legal Aid Clinic",
    tagline: "Empowering student tenancy protection, dispute mediation, and transparent union elections via digital tools.",
    category: "Social Impact",
    institution: "Student Legal Defense Guild",
    campusScope: "All Public Tertiary Institutions",
    status: "Open",
    statusColor: "#10b981",
    badge: "Civic Tech & Law",
    badgeAccent: "#ff3d81",
    badgeBg: "rgba(255,61,129,0.12)",
    prizePool: "₦1,200,000",
    deadline: "December 20, 2026",
    participantsCount: "115 students registered",
    heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://tally.so",
    externalLinkText: "Submit Civic Project",
    partner: "University Legal Aid Society",
    partnerRole: "Advisory & Clinical Support",
    eligibility: "Law, political science, sociology, and software engineering students.",
    description: "Creating digital transparency systems for hostel rent tenancy agreements, fair student conduct tribunals, and verifiable campus association ballot audits.",
    tracksOrPillars: [
      { icon: "📜", title: "Standard Off-Campus Lease Builder", desc: "Protecting students from landlord exploitation with legally standardized bilingual contracts." },
      { icon: "⚖️", title: "Virtual Student Ombudsperson", desc: "Discreet grievance filing for unfair grade withholdings and harassment complaints." },
      { icon: "🗳️", title: "Verifiable Ballot Audit System", desc: "Open-source voting tally systems for credible faculty executive elections." }
    ]
  },
  {
    id: "campus-logistics-mobility",
    slug: "campus-logistics-mobility",
    title: "Intra-Campus Micro-Logistics & Commuter Sprint",
    subtitle: "Department of Transport & Urban Planning",
    tagline: "Optimizing campus shuttle schedules, peer parcel delivery across gates, and shared student transport pools.",
    category: "Commerce",
    institution: "Campus Mobility Collective",
    campusScope: "Campuses with 2+ Gate Zones",
    status: "Coming Soon",
    statusColor: "#4f7fff",
    badge: "Transport & Logistics",
    badgeAccent: "#b8860b",
    badgeBg: "rgba(255,210,63,0.2)",
    prizePool: "₦1,500,000",
    deadline: "January 15, 2027",
    participantsCount: "Waitlist open",
    heroImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so",
    externalLinkText: "Join Logistics Waitlist",
    partner: "Campus Commuter Association",
    partnerRole: "Operations Partner",
    eligibility: "Transport management, geography, logistics, and engineering students.",
    description: "Eliminating the friction of commuter shuttles, long bus stop queues during exams, and intra-campus parcel shipping between hostel gates and lecture theaters.",
    tracksOrPillars: [
      { icon: "🚐", title: "Live Shuttle Tracker", desc: "Crowdsourced bus ETA beacons for main campus transit stops." },
      { icon: "📦", title: "Student Walker Delivery", desc: "Earn pocket money carrying documents and meals while walking to class." },
      { icon: "🚲", title: "Bicycle Share Grid", desc: "Refurbished campus cruiser rentals between residential gates and libraries." }
    ]
  },
  {
    id: "fintech-peer-credit",
    slug: "fintech-peer-credit",
    title: "Campus Financial Literacy & Micro-Savings Sprint",
    subtitle: "Department of Banking & Finance",
    tagline: "Designing student rotating savings (Ajo/Esusu) tools, automated budget guards, and exam tuition escrow pots.",
    category: "Commerce",
    institution: "Student Finance Society",
    campusScope: "Nationwide",
    status: "Open",
    statusColor: "#10b981",
    badge: "FinTech & Financial Health",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    prizePool: "₦2,000,000",
    deadline: "November 18, 2026",
    participantsCount: "280+ students registered",
    heroImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    formType: "external",
    formUrl: "https://tally.so",
    externalLinkText: "Submit FinTech Proposal",
    partner: "UniLife Campus Finance Union",
    partnerRole: "Financial Education Sponsor",
    eligibility: "Banking, finance, accounting, economics, and software engineering students.",
    description: "Promoting financial discipline and preventing student loan distress with gamified emergency savings groups, textbook trade escrows, and tuition installment pools.",
    tracksOrPillars: [
      { icon: "💰", title: "Digital Campus Esusu", desc: "Automated, trusted peer contribution circles for student gadgets and projects." },
      { icon: "📊", title: "Monthly Allowance Budget Guard", desc: "Smart SMS receipt parsing that alerts students when spending runs too fast." },
      { icon: "🛡️", title: "Tuition Fee Lockbox", desc: "Locked savings pots with high yields ensuring school fee money is never misspent." }
    ]
  },
  {
    id: "game-design-interactive-culture",
    slug: "game-design-interactive-culture",
    title: "Nigerian Campus Game Jam & Interactive Media",
    subtitle: "Creative Computing & Digital Arts Collective",
    tagline: "Create mobile games, interactive fiction, and visual novels that capture African folk stories and campus experiences.",
    category: "Creative & Media",
    institution: "Game Developers Association of Nigeria",
    campusScope: "All Tertiary Institutions",
    status: "Coming Soon",
    statusColor: "#4f7fff",
    badge: "Gaming & Animation",
    badgeAccent: "#ff3d81",
    badgeBg: "rgba(255,61,129,0.12)",
    prizePool: "₦2,000,000 + Publishing Deal",
    deadline: "January 25, 2027",
    participantsCount: "Pre-registration Open",
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    formType: "tally",
    formUrl: "https://tally.so",
    externalLinkText: "Pre-Register Game Studio",
    partner: "African Game Developers Network",
    partnerRole: "Publishing Partner",
    eligibility: "Open to solo student developers, game designers, 2D/3D artists, and music composers.",
    description: "A 10-day sprint empowering student game creators to build lightweight mobile games running smoothly on affordable Android devices with local themes.",
    tracksOrPillars: [
      { icon: "🎮", title: "Campus Simulator", desc: "Interactive management games simulating surviving 4 years of university challenges." },
      { icon: "⚔️", title: "Mythology & Folklore", desc: "Action adventures rooted in Yoruba, Igbo, and Hausa legends." },
      { icon: "🧩", title: "Edu-Puzzles", desc: "Brain-teasers helping junior students master chemistry and mathematics formulas." }
    ]
  }
];

export function getChallengeBySlug(slug: string): ChallengeItem | undefined {
  return ALL_CHALLENGES.find((c) => c.slug === slug || c.id === slug);
}
