"use client";

import { useState, useId } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Flame,
  ArrowUpRight,
  ExternalLink,
  Users,
  Search,
  CheckCircle2,
  Lock,
  Plus,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Send,
  UserCheck
} from "lucide-react";
import {
  INNOVATION_TRACKS,
  INITIAL_KPIS,
  INITIAL_VENTURES,
  INITIAL_ANNOUNCEMENTS,
  getStoredKPIs,
  getStoredVentures,
  getStoredAnnouncements,
  getStoredMatchmaking,
  saveStoredMatchmaking,
  ChallengeKPIs,
  VentureSubmission,
  ChallengeAnnouncement,
  MatchmakingProfile
} from "@/lib/challengeStorage";

// Challenge Definitions
export interface ChallengeProgram {
  id: string;
  badge: string;
  badgeAccent: string;
  badgeBg: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: "Open" | "Coming Soon" | "Active Sprint" | "Judging";
  statusColor: string;
  deadline: string;
  prizePool: string;
  participantsCount: string;
  formType: "tally" | "google_form" | "in_app";
  formUrl: string;
  description: string;
  heroImage: string;
  keyPillars: { icon: string; title: string; desc: string }[];
  categories?: string[];
  partner: string;
  partnerRole: string;
  eligibility: string;
  externalLinkText: string;
}

const UNILIFE_CHALLENGES: ChallengeProgram[] = [
  {
    id: "oou-venture-2026",
    badge: "Flagship Sprint • 2026/2027",
    badgeAccent: "#10b981",
    badgeBg: "rgba(16,185,129,0.12)",
    title: "OOU Entrepreneurship Challenge",
    subtitle: "Directorate of Entrepreneurship & Innovation (DEI)",
    tagline: "Form cross-faculty teams across Ago-Iwoye, Sagamu, Ayetoro, and Ibogun to prototype solutions and access seed capital.",
    status: "Open",
    statusColor: "#10b981",
    deadline: "October 30, 2026",
    prizePool: "₦5,000,000",
    participantsCount: "640+ students registered",
    formType: "tally",
    formUrl: "https://tally.so/r/q4yGqY",
    description:
      "Spearheaded by Dr. Ogunkoya, Director of Entrepreneurship & Innovation at Olabisi Onabanjo University. Focused on taking real student prototypes from lecture halls and farm settlements directly into commercially validated ventures.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    partner: "OOU Directorate of Entrepreneurship & Innovation",
    partnerRole: "Led by Dr. Ogunkoya",
    eligibility: "All matriculated OOU students (Undergraduate & Postgraduate across all 4 campuses)",
    externalLinkText: "Open Tally Application Portal",
    keyPillars: [
      {
        icon: "♻️",
        title: "Waste-to-Wealth",
        desc: "Transforming single-use PET bottles, agricultural biochar, and agro-waste into salable paving bricks and bio-fertilizer.",
      },
      {
        icon: "🌱",
        title: "Digital Agriculture",
        desc: "Ayetoro smallholder market clearinghouses, poultry sensor telemetry, and cold-chain micro-logistics.",
      },
      {
        icon: "💼",
        title: "Student Employability",
        desc: "Peer escrow freelancing, student micro-agency syndicates, and verified portfolio builders.",
      },
      {
        icon: "🩺",
        title: "Community Health",
        desc: "Emergency student blood matching network for Sagamu Teaching Hospital and nighttime pharmacy locator.",
      },
    ],
  },
  {
    id: "campus-creator-2026",
    badge: "Media & Culture • All Nigerian Unis",
    badgeAccent: "#ff3d81",
    badgeBg: "rgba(255,61,129,0.12)",
    title: "UniLife Campus Creator Cup",
    subtitle: "Storytelling, Micro-Docs & Student Podcasts",
    tagline: "Showcase the raw, vibrant, and untold realities of Nigerian university life. Win camera gear, creator grants, and verified distribution.",
    status: "Open",
    statusColor: "#ff3d81",
    deadline: "November 15, 2026",
    prizePool: "₦1,500,000 + Gear",
    participantsCount: "210+ creators joined",
    formType: "google_form",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeU7yGqY_sample_creator/viewform",
    description:
      "A national storytelling competition inviting student documentary filmmakers, podcasters, visual journalists, and meme culture satirists to document student life in 2026. Top pieces get broadcast across UniLife channels and featured at our annual creator gala.",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    partner: "UniLife Media Lab & Creator Guild",
    partnerRole: "Student Storytelling Collective",
    eligibility: "Students at any Nigerian accredited federal, state, or private university",
    externalLinkText: "Submit on Google Forms",
    keyPillars: [
      {
        icon: "🎥",
        title: "Micro-Documentaries",
        desc: "3-minute cinematic glimpses of student hustle, hostel resilience, and late-night lecture theater study groups.",
      },
      {
        icon: "🎙️",
        title: "Campus Audio & Podcasts",
        desc: "Raw episodic discussions unpacking Nigerian youth culture, exam stress, and student relationships.",
      },
      {
        icon: "📸",
        title: "Street Photography",
        desc: "Photojournalism capturing the architectural texture, library corridors, and evening markets of campus towns.",
      },
    ],
  },
  {
    id: "unishop-seller-sprint",
    badge: "Commerce & Small Business",
    badgeAccent: "#b8860b",
    badgeBg: "rgba(255,210,63,0.2)",
    title: "The ₦1M Campus Merchant Sprint",
    subtitle: "UniShop Peer-to-Peer Marketplace",
    tagline: "Turn your dorm-room thrift rack, food prep service, tech repair, or beauty brand into the highest-grossing student shop.",
    status: "Active Sprint",
    statusColor: "#b8860b",
    deadline: "December 05, 2026",
    prizePool: "₦1,000,000 Zero-Interest Loan",
    participantsCount: "380 active shops",
    formType: "tally",
    formUrl: "https://tally.so/r/3yE12g",
    description:
      "Designed specifically for student entrepreneurs already trading on campus. Get zero seller commission on UniLife Marketplace, free point-of-sale branding kits, and pitch for ₦1,000,000 in zero-interest inventory expansion capital.",
    heroImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    partner: "UniLife Student Commerce Union",
    partnerRole: "Campus Marketplace Network",
    eligibility: "Active student vendors with a live UniLife UniShop or campus catalog",
    externalLinkText: "Open Merchant Sprint Form",
    keyPillars: [
      {
        icon: "🛍️",
        title: "Zero Marketplace Commission",
        desc: "Keep 100% of all peer-to-peer customer sales throughout the 45-day challenge window.",
      },
      {
        icon: "📦",
        title: "Escrow Trust Badging",
        desc: "Instant verified badge protecting buyer payments until physical delivery on campus grounds.",
      },
      {
        icon: "💰",
        title: "Inventory Refill Grant",
        desc: "Top 3 highest volume student merchants receive ₦1,000,000 zero-interest working capital credit.",
      },
    ],
  },
  {
    id: "green-campus-hackathon",
    badge: "Clean Energy & Eco-Design",
    badgeAccent: "#4f7fff",
    badgeBg: "rgba(79,127,255,0.12)",
    title: "Clean Tech & Off-Grid Energy Sprint",
    subtitle: "Engineering & Applied Sciences Alliance",
    tagline: "Designing decentralized solar charging stations, lithium battery refurbishing, and low-power hostel lighting systems.",
    status: "Coming Soon",
    statusColor: "#4f7fff",
    deadline: "Announcing Nov 2026",
    prizePool: "₦2,500,000 Lab Grant",
    participantsCount: "Pre-registration Open",
    formType: "tally",
    formUrl: "https://tally.so/r/q4yGqY",
    description:
      "Addressing the persistent energy bottleneck across off-campus student accommodation zones. Teams build functional solar generator conversions, pedal-assisted delivery bikes, and intelligent campus power banks.",
    heroImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    partner: "Faculty of Engineering & Renewable Energy Lab",
    partnerRole: "Applied Technology Consortium",
    eligibility: "Engineering, physics, computer science, and industrial design students",
    externalLinkText: "Join Waitlist / Pre-Register",
    keyPillars: [
      {
        icon: "☀️",
        title: "Solar Study Kiosks",
        desc: "Modular outdoor study seating with solar-charged battery lockers and nighttime reading LEDs.",
      },
      {
        icon: "🔋",
        title: "E-Waste Battery Cell Re-use",
        desc: "Testing and rebuilding discarded laptop lithium-ion 18650 cells into emergency hostel lighting packs.",
      },
      {
        icon: "⚡",
        title: "Low-Power Mesh Intranet",
        desc: "Solar-powered micro-routers sharing offline PDF past questions across hostels without cellular data.",
      },
    ],
  },
];

export default function ChallengesDirectoryPage() {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("oou-venture-2026");
  const [embeddedFormUrl, setEmbeddedFormUrl] = useState<string | null>(null);
  const [embeddedFormTitle, setEmbeddedFormTitle] = useState<string>("");
  const [embeddedFormType, setEmbeddedFormType] = useState<"tally" | "google_form">("tally");
  
  // Track status lookup state
  const [trackQuery, setTrackQuery] = useState<string>("");
  const [trackResult, setTrackResult] = useState<VentureSubmission | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Co-founder request modal
  const [isCoFounderModalOpen, setIsCoFounderModalOpen] = useState(false);
  const [coFounderForm, setCoFounderForm] = useState({
    studentName: "",
    matricNo: "",
    faculty: "",
    department: "",
    campus: "Ago-Iwoye",
    skills: "",
    lookingFor: "",
    trackPreference: "Digital Agriculture",
    contactEmail: "",
  });
  const [coFounderSuccess, setCoFounderSuccess] = useState(false);

  // Live stored data
  const [kpis, setKpis] = useState<ChallengeKPIs>(INITIAL_KPIS);
  const [ventures, setVentures] = useState<VentureSubmission[]>(INITIAL_VENTURES);
  const [announcements, setAnnouncements] = useState<ChallengeAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [matchmaking, setMatchmaking] = useState<MatchmakingProfile[]>([]);
  const [selectedTrackModal, setSelectedTrackModal] = useState<typeof INNOVATION_TRACKS[number] | null>(null);

  const searchInputId = useId();

  // Load storage once on client mount
  useState(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setKpis(getStoredKPIs());
        setVentures(getStoredVentures());
        setAnnouncements(getStoredAnnouncements());
        setMatchmaking(getStoredMatchmaking());
      }, 0);
    }
  });

  const activeChallenge = UNILIFE_CHALLENGES.find((c) => c.id === selectedChallengeId) || UNILIFE_CHALLENGES[0];

  // Open Form Handler
  const handleOpenForm = (challenge: ChallengeProgram) => {
    setEmbeddedFormUrl(challenge.formUrl);
    setEmbeddedFormTitle(challenge.title);
    setEmbeddedFormType(challenge.formType === "google_form" ? "google_form" : "tally");
  };

  // Team Lookup
  const handleLookupTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (!trackQuery.trim()) {
      setTrackResult(null);
      return;
    }
    const q = trackQuery.trim().toLowerCase();
    const match = ventures.find(
      (v) =>
        v.id.toLowerCase() === q ||
        v.leadMatric.toLowerCase() === q ||
        v.leadName.toLowerCase().includes(q) ||
        v.title.toLowerCase().includes(q)
    );
    setTrackResult(match || null);
  };

  // Co-founder submit
  const handlePostCoFounder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coFounderForm.studentName || !coFounderForm.contactEmail || !coFounderForm.lookingFor) return;

    const newProfile: MatchmakingProfile = {
      id: `m-${Date.now().toString().slice(-4)}`,
      studentName: coFounderForm.studentName,
      matricNo: coFounderForm.matricNo || "OOU/2026/REG",
      faculty: coFounderForm.faculty || "Faculty of Technology",
      department: coFounderForm.department || "General Engineering",
      campus: coFounderForm.campus,
      skills: coFounderForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
      lookingFor: coFounderForm.lookingFor,
      trackPreference: coFounderForm.trackPreference,
      contactEmail: coFounderForm.contactEmail,
      status: "open",
      joinedAt: new Date().toISOString(),
    };

    const updated = [newProfile, ...matchmaking];
    setMatchmaking(updated);
    saveStoredMatchmaking(updated);
    setCoFounderSuccess(true);
    setTimeout(() => {
      setCoFounderSuccess(false);
      setIsCoFounderModalOpen(false);
      setCoFounderForm({
        studentName: "",
        matricNo: "",
        faculty: "",
        department: "",
        campus: "Ago-Iwoye",
        skills: "",
        lookingFor: "",
        trackPreference: "Digital Agriculture",
        contactEmail: "",
      });
    }, 1400);
  };

  // Progress for OOU Flagship
  const engagementPct = Math.min(100, Math.round((kpis.studentEngagements / kpis.targetStudentEngagements) * 100));
  const venturePct = Math.min(100, Math.round((kpis.ventureIdeas / kpis.targetVentureIdeas) * 100));
  const prototypePct = Math.min(100, Math.round((kpis.prototypesDeveloped / kpis.targetPrototypesDeveloped) * 100));
  const validatedPct = Math.min(100, Math.round((kpis.marketValidated / kpis.targetMarketValidated) * 100));

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .challenge-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-family: var(--font-mono);
              font-size: 0.72rem;
              letter-spacing: 1.5px;
              padding: 6px 14px;
              border-radius: 9999px;
              text-transform: uppercase;
              font-weight: 700;
            }
          `,
        }}
      />

      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/challenge" />

        {/* ---- HERO SECTION ---- */}
        <header className="px-6 md:px-16 pt-16 md:pt-24 pb-14 max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[760px]"
            >
              <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[1.5px] text-[#14151A] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>UniLife Campus Challenge Engine • 2026/2027</span>
              </div>

              <h1 className="font-display text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.98] uppercase text-[#14151A] mb-6">
                Turn campus ideas into{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#14151A]">funded ventures</span>
                  <svg
                    viewBox="0 0 200 60"
                    fill="none"
                    aria-hidden="true"
                    className="absolute -left-[5%] -top-[15%] w-[112%] h-[140%] z-0 overflow-visible"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                      d="M8 34C22 12 90 4 130 10C165 15 190 24 188 36C186 50 130 56 90 54C48 52 6 44 10 30"
                      stroke="#FFD23F"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>

              <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[660px]">
                Explore active university challenges, multi-disciplinary innovation sprints, and creator grants. Apply
                through official forms, find cross-faculty co-founders, and track evaluation milestones.
              </p>
            </motion.div>

            {/* Quick Meta Card / Directorate badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-[rgba(20,21,26,0.12)] rounded-[24px] p-6 shadow-[8px_8px_0_rgba(20,21,26,0.06)] shrink-0 w-full sm:w-[320px]"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(20,21,26,0.08)]">
                <span className="font-mono text-xs text-[#8a8a7f] uppercase font-bold">Featured Sprint</span>
                <span className="font-mono text-[11px] text-[#10b981] font-bold bg-[#10b981]/10 px-2 py-0.5 rounded-full">
                  Senate Accredited
                </span>
              </div>
              <h3 className="font-bold text-base text-[#14151A] mb-1">OOU DEI Challenge 2026/27</h3>
              <p className="text-xs text-[#46473f] leading-snug mb-4">
                Directorate of Entrepreneurship & Innovation led by <strong>Dr. Ogunkoya</strong>.
              </p>
              <div className="flex items-center justify-between font-mono text-xs pt-2 border-t border-[rgba(20,21,26,0.08)]">
                <span className="text-[#8a8a7f]">Total Seed Pool:</span>
                <span className="font-bold text-[#14151A] text-sm">₦5,000,000</span>
              </div>
            </motion.div>
          </div>

          {/* ---- PROGRAM SELECTOR TABS ---- */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-[rgba(20,21,26,0.12)]">
            {UNILIFE_CHALLENGES.map((challenge) => {
              const isSelected = challenge.id === selectedChallengeId;
              return (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallengeId(challenge.id)}
                  className={`px-5 py-3 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? "bg-[#14151A] text-[#F6F2E7] border-[#14151A] shadow-[3px_3px_0_#ff3d81]"
                      : "bg-white text-[#46473f] border-[rgba(20,21,26,0.12)] hover:border-[#14151A] hover:text-[#14151A]"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: challenge.statusColor }}
                  />
                  <span>{challenge.title}</span>
                  <span className="font-mono text-[10px] opacity-75 font-normal">({challenge.prizePool})</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* ---- ACTIVE CHALLENGE DETAILED FEATURE PANEL ---- */}
        <section className="px-6 md:px-16 pb-16 max-w-[1200px] mx-auto">
          <div className="bg-white border-2 border-[#14151A] rounded-[32px] overflow-hidden shadow-[12px_12px_0_#14151A] transition-all">
            {/* Challenge Banner Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-[#14151A]">
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="challenge-badge"
                      style={{
                        backgroundColor: activeChallenge.badgeBg,
                        color: activeChallenge.badgeAccent,
                        border: `1px solid ${activeChallenge.badgeAccent}40`,
                      }}
                    >
                      {activeChallenge.badge}
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#f4f6fc] text-[#46473f] font-semibold border border-[rgba(20,21,26,0.1)]">
                      Deadline: {activeChallenge.deadline}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#14151A] mb-3">
                    {activeChallenge.title}
                  </h2>
                  <p className="font-mono text-sm text-[#8a8a7f] uppercase font-bold tracking-wider mb-5">
                    {activeChallenge.subtitle}
                  </p>
                  <p className="text-[#46473f] text-base md:text-lg leading-relaxed mb-6 font-normal">
                    {activeChallenge.tagline}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#F6F2E7] border border-[rgba(20,21,26,0.1)] mb-6 text-sm text-[#46473f] leading-relaxed">
                    <strong className="text-[#14151A] block mb-1">Challenge Brief:</strong>
                    {activeChallenge.description}
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(20,21,26,0.1)]">
                  <motion.button
                    onClick={() => handleOpenForm(activeChallenge)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm md:text-base bg-[#14151A] text-[#F6F2E7] border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] cursor-pointer"
                  >
                    <span>Register Now (Embedded Form)</span>
                    <ArrowUpRight className="w-5 h-5 text-[#FFD23F]" />
                  </motion.button>

                  <a
                    href={activeChallenge.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs md:text-sm bg-transparent text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:text-[#F6F2E7] transition-all"
                  >
                    <span>{activeChallenge.externalLinkText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {activeChallenge.id === "oou-venture-2026" && (
                    <Link
                      href="/challenge/admin"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8a8a7f] hover:text-[#14151A] px-3 py-2 rounded-lg hover:bg-[#F6F2E7] transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Directorate Admin</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Hero Image / Partner Info Column */}
              <div className="lg:col-span-5 relative bg-[#EFE9D9] border-t-2 lg:border-t-0 lg:border-l-2 border-[#14151A] min-h-[320px] flex flex-col justify-between overflow-hidden">
                <img
                  src={activeChallenge.heroImage}
                  alt={activeChallenge.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] via-[#14151A]/40 to-transparent" />

                <div className="relative z-10 p-6 flex justify-end">
                  <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 text-[#14151A] shadow">
                    Pool: {activeChallenge.prizePool}
                  </span>
                </div>

                <div className="relative z-10 p-6 md:p-8 text-white">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFD23F] block font-bold mb-1">
                    Institutional Sponsor & Partner
                  </span>
                  <h4 className="font-display text-xl uppercase leading-tight mb-2">
                    {activeChallenge.partner}
                  </h4>
                  <p className="text-xs text-white/80 leading-snug mb-3">
                    {activeChallenge.partnerRole}
                  </p>
                  <div className="inline-block text-[11px] font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-md">
                    {activeChallenge.participantsCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Pillars / Tracks Grid */}
            <div className="p-8 md:p-12 bg-[#FAF7F0]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs tracking-widest text-[#8a8a7f] uppercase font-bold block mb-1">
                    Core Focus Arenas
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl uppercase text-[#14151A]">
                    Key Challenge Pillars & Deliverables
                  </h3>
                </div>
                {activeChallenge.id === "oou-venture-2026" && (
                  <button
                    onClick={() => setIsCoFounderModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs shadow-[3px_3px_0_#FFD23F] hover:scale-105 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#FFD23F]" />
                    <span>Find a Co-Founder</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeChallenge.keyPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-[#14151A] rounded-[20px] p-6 shadow-[5px_5px_0_rgba(20,21,26,0.06)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-4 bg-[#F6F2E7] border border-[rgba(20,21,26,0.1)] w-12 h-12 flex items-center justify-center rounded-xl">
                        {pillar.icon}
                      </div>
                      <h4 className="font-bold text-base text-[#14151A] mb-2">{pillar.title}</h4>
                      <p className="text-xs text-[#46473f] leading-relaxed">{pillar.desc}</p>
                    </div>

                    {activeChallenge.id === "oou-venture-2026" && idx < INNOVATION_TRACKS.length && (
                      <button
                        onClick={() => setSelectedTrackModal(INNOVATION_TRACKS[idx])}
                        className="mt-4 pt-3 border-t border-[rgba(20,21,26,0.08)] text-[11px] font-mono text-[#ff3d81] hover:underline font-bold text-left flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Mentor Brief</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- IF OOU CHALLENGE: LIVE KPI TRACKER & MILESTONES (STYLIZED IN UNILIFE THEME) ---- */}
        {activeChallenge.id === "oou-venture-2026" && (
          <section className="px-6 md:px-16 pb-20 max-w-[1200px] mx-auto">
            <div className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-8 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FFD23F] font-mono text-xs font-bold mb-3">
                    <Flame className="w-4 h-4 text-[#ff3d81]" />
                    <span>{kpis.currentStreakDays}-Day Innovation Sprint Active</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl uppercase text-white">
                    Dr. Ogunkoya&apos;s Institutional Target Matrix
                  </h3>
                  <p className="text-white/70 text-sm max-w-[620px] mt-2">
                    Official real-time progress toward the 2026/2027 OOU Directorate KPIs across all 4 campuses.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/challenge/admin"
                    className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Directorate Gate</span>
                  </Link>
                </div>
              </div>

              {/* 4 Scorecard Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Metric 1 */}
                <div className="bg-white/5 border border-white/10 rounded-[20px] p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>Target: 1,000 Students</span>
                    <span className="text-[#10b981] font-bold">{engagementPct}%</span>
                  </div>
                  <div className="font-display text-4xl text-white mb-2">
                    {kpis.studentEngagements.toLocaleString()}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Student registrations and participants across Ago, Sagamu, Ayetoro, and Ibogun.
                  </p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${engagementPct}%` }} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/5 border border-white/10 rounded-[20px] p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>Target: 60 Ideas</span>
                    <span className="text-[#FFD23F] font-bold">{venturePct}%</span>
                  </div>
                  <div className="font-display text-4xl text-white mb-2">{kpis.ventureIdeas}</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Cross-faculty teams formed uniting science, engineering, and commerce leads.
                  </p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FFD23F] rounded-full" style={{ width: `${venturePct}%` }} />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/5 border border-white/10 rounded-[20px] p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>Target: 30 Prototypes</span>
                    <span className="text-[#4f7fff] font-bold">{prototypePct}%</span>
                  </div>
                  <div className="font-display text-4xl text-white mb-2">{kpis.prototypesDeveloped}</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Hardware or software prototypes tested in university fabrication workshops.
                  </p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4f7fff] rounded-full" style={{ width: `${prototypePct}%` }} />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white/5 border border-white/10 rounded-[20px] p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>Target: 10 Market Startups</span>
                    <span className="text-[#ff3d81] font-bold">{validatedPct}%</span>
                  </div>
                  <div className="font-display text-4xl text-white mb-2">{kpis.marketValidated}</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Commercial ventures with paying campus customers or external off-taker orders.
                  </p>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff3d81] rounded-full" style={{ width: `${validatedPct}%` }} />
                  </div>
                </div>
              </div>

              {/* 4-Phase Roadmap Steps */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-mono text-xs text-[#FFD23F] uppercase font-bold tracking-widest block mb-4">
                  Senate Milestone Progression Schedule
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#10b981] font-bold block mb-1">Phase 1: Ideation (Complete)</span>
                    <p className="text-white/60">Cross-faculty matchmaking and Tally concept registrations.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-[#FFD23F]/30">
                    <span className="text-[#FFD23F] font-bold block mb-1">Phase 2: Lab Sprint (Active)</span>
                    <p className="text-white/60">Fabrication access at Ibogun & Ayetoro research plots.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 font-bold block mb-1">Phase 3: Traction & Pilot</span>
                    <p className="text-white/60">Testing pilot revenue on UniLife campus marketplace.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/40 font-bold block mb-1">Phase 4: Senate Grand Pitch</span>
                    <p className="text-white/60">₦5,000,000 disbursement and patent documentation awards.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---- TRACK YOUR APPLICATION / TEAM STATUS LOOKUP ---- */}
        <section className="px-6 md:px-16 pb-20 max-w-[1200px] mx-auto">
          <div className="bg-[#FAF7F0] border-2 border-[#14151A] rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0_#14151A]">
            <div className="max-w-[700px] mb-8">
              <span className="font-mono text-xs font-bold tracking-widest text-[#ff3d81] uppercase block mb-2">
                Self-Service Lookup
              </span>
              <h3 className="font-display text-3xl uppercase text-[#14151A] mb-3">
                Check Your Team Review Status
              </h3>
              <p className="text-sm text-[#46473f] leading-relaxed">
                Already submitted via the Tally or Google Form? Enter your <strong>Matriculation Number</strong>,{" "}
                <strong>Team ID</strong> (e.g., <code>v-101</code>), or <strong>Project Title</strong> to inspect your
                approval phase, mentor review notes, and prototype lab pass.
              </p>
            </div>

            <form onSubmit={handleLookupTeam} className="flex flex-col sm:flex-row items-center gap-3 mb-8">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-5 h-5 text-[#8a8a7f] absolute left-4 top-1/2 -translate-y-1/2" />
                <label htmlFor={searchInputId} className="sr-only">Matric number, Team ID, or Venture title</label>
                <input
                  id={searchInputId}
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="e.g. OOU/2021/ENG/0482 or PlastiPave"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border-2 border-[#14151A] text-sm text-[#14151A] placeholder:text-[#8a8a7f] focus:outline-none focus:ring-2 focus:ring-[#FFD23F]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-sm hover:bg-[#ff3d81] transition-colors cursor-pointer shadow-[3px_3px_0_#FFD23F]"
              >
                Track Status
              </button>
            </form>

            {/* Result Box */}
            <AnimatePresence>
              {hasSearched && trackResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-8 rounded-[24px] bg-white border-2 border-[#14151A] shadow-[6px_6px_0_#10b981]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-[rgba(20,21,26,0.1)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
                          {trackResult.id}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#f4f6fc] text-[#14151A] font-bold">
                          {trackResult.track}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl uppercase text-[#14151A]">
                        {trackResult.title}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs text-[#8a8a7f] block">Current Review Stage:</span>
                      <span className="font-bold text-sm uppercase px-3 py-1 rounded-full bg-[#14151A] text-[#FFD23F] font-mono">
                        ● {trackResult.stage}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono mb-6">
                    <div className="p-3 rounded-xl bg-[#F6F2E7]">
                      <span className="text-[#8a8a7f] block">Team Lead:</span>
                      <strong className="text-[#14151A]">{trackResult.leadName}</strong>
                      <span className="text-[#8a8a7f] block mt-1">{trackResult.leadMatric}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F6F2E7]">
                      <span className="text-[#8a8a7f] block">Campus & Faculty:</span>
                      <strong className="text-[#14151A]">{trackResult.leadCampus}</strong>
                      <span className="text-[#8a8a7f] block mt-1">{trackResult.leadFaculty}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F6F2E7]">
                      <span className="text-[#8a8a7f] block">Directorate Score:</span>
                      <strong className="text-[#10b981] text-sm">
                        {trackResult.score ? `${trackResult.score.total}/40 Points` : "Under Committee Review"}
                      </strong>
                    </div>
                  </div>

                  {trackResult.score?.feedback && (
                    <div className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#14151A] leading-relaxed mb-4">
                      <strong className="font-bold block mb-1 text-[#10b981]">
                        Dr. Ogunkoya&apos;s Reviewer Notes:
                      </strong>
                      {trackResult.score.feedback}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between text-xs text-[#8a8a7f] pt-2">
                    <span>Submitted on: {new Date(trackResult.submittedAt).toLocaleDateString()}</span>
                    <span className="text-[#10b981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Official OOU DEI Registry Record
                    </span>
                  </div>
                </motion.div>
              )}

              {hasSearched && !trackResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 rounded-2xl bg-white border border-red-300 text-center text-sm text-[#46473f]"
                >
                  <p className="font-bold text-red-600 mb-1">No matching submission found.</p>
                  <p className="text-xs">
                    Please ensure you entered the exact matriculation number (e.g. <code>OOU/2021/ENG/0482</code>) or
                    complete your entry on the official Tally registration form.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ---- CO-FOUNDER MATCHMAKER BOARD & BULLETINS ---- */}
        <section className="px-6 md:px-16 pb-20 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Co-Founder Wanted Noticeboard */}
            <div className="lg:col-span-8 bg-white border-2 border-[#14151A] rounded-[32px] p-8 shadow-[8px_8px_0_#14151A]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[rgba(20,21,26,0.1)]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-bold">
                    Cross-Campus Synergy (+10 Bonus)
                  </span>
                  <h3 className="font-display text-2xl uppercase text-[#14151A] mt-1">
                    Student Co-Founder Directory
                  </h3>
                </div>
                <button
                  onClick={() => setIsCoFounderModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs shadow hover:bg-[#ff3d81] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FFD23F]" />
                  <span>Post Your Profile</span>
                </button>
              </div>

              <div className="space-y-4">
                {matchmaking.map((profile) => (
                  <div
                    key={profile.id}
                    className="p-5 rounded-2xl bg-[#FAF7F0] border border-[rgba(20,21,26,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <strong className="text-sm text-[#14151A]">{profile.studentName}</strong>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-[#8a8a7f] border border-[rgba(20,21,26,0.1)]">
                          {profile.campus} • {profile.department}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] font-bold">
                          {profile.trackPreference}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {profile.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-[rgba(20,21,26,0.08)] text-[#46473f]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#46473f]">
                        <strong className="text-[#14151A]">Seeking:</strong> {profile.lookingFor}
                      </p>
                    </div>

                    <a
                      href={`mailto:${profile.contactEmail}?subject=UniLife%20Challenge%20Co-Founder%20Inquiry`}
                      className="px-4 py-2 rounded-full bg-white border border-[#14151A] text-xs font-bold text-[#14151A] hover:bg-[#14151A] hover:text-white transition-colors shrink-0 text-center"
                    >
                      Connect →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Official Directorate Bulletins */}
            <div className="lg:col-span-4 bg-[#FAF7F0] border-2 border-[#14151A] rounded-[32px] p-6 shadow-[8px_8px_0_#14151A]">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[rgba(20,21,26,0.1)]">
                <Building2 className="w-5 h-5 text-[#ff3d81]" />
                <h4 className="font-display text-lg uppercase text-[#14151A]">Directorate Bulletins</h4>
              </div>

              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-xl bg-white border border-[rgba(20,21,26,0.1)]">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-[#10b981] font-bold uppercase">{ann.tag}</span>
                      <span className="text-[#8a8a7f] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ann.date}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-[#14151A] mb-1.5 leading-snug">{ann.title}</h5>
                    <p className="text-[11px] text-[#46473f] leading-relaxed mb-2">{ann.content}</p>
                    <span className="font-mono text-[10px] text-[#8a8a7f] block">By: {ann.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- EMBEDDED FORM MODAL (TALLY / GOOGLE FORM) ---- */}
        <AnimatePresence>
          {embeddedFormUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEmbeddedFormUrl(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-white border-2 border-[#14151A] rounded-[28px] overflow-hidden shadow-2xl z-10 h-[90vh] flex flex-col"
              >
                {/* Modal Title Bar */}
                <div className="px-6 py-4 bg-[#14151A] text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#FFD23F] font-bold uppercase px-2 py-0.5 rounded bg-white/10">
                      {embeddedFormType === "google_form" ? "Google Form" : "Tally Official"}
                    </span>
                    <h4 className="font-bold text-sm truncate max-w-[320px] sm:max-w-md">
                      {embeddedFormTitle}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={embeddedFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1"
                    >
                      <span>New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setEmbeddedFormUrl(null)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form iFrame */}
                <div className="flex-1 w-full bg-[#f4f6fc] relative">
                  <iframe
                    src={embeddedFormUrl}
                    title={embeddedFormTitle}
                    className="w-full h-full border-none"
                    allow="geolocation; microphone; camera"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ---- POST CO-FOUNDER REQUEST MODAL ---- */}
        <AnimatePresence>
          {isCoFounderModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCoFounderModalOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-[#F6F2E7] border-2 border-[#14151A] rounded-[28px] p-6 sm:p-8 shadow-2xl z-10"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(20,21,26,0.1)]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#10b981] uppercase">
                      Cross-Campus Synergy
                    </span>
                    <h4 className="font-display text-xl uppercase text-[#14151A]">
                      Post Co-Founder Notice
                    </h4>
                  </div>
                  <button
                    onClick={() => setIsCoFounderModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-white border border-[#14151A] flex items-center justify-center text-[#14151A] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {coFounderSuccess ? (
                  <div className="py-10 text-center">
                    <UserCheck className="w-12 h-12 text-[#10b981] mx-auto mb-3" />
                    <h5 className="font-bold text-base text-[#14151A] mb-1">
                      Co-Founder Profile Published!
                    </h5>
                    <p className="text-xs text-[#46473f]">
                      Your request is now live in the student directory.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePostCoFounder} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={coFounderForm.studentName}
                        onChange={(e) => setCoFounderForm({ ...coFounderForm, studentName: e.target.value })}
                        placeholder="e.g. Samuel Adekunle"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)] focus:outline-none focus:border-[#14151A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                          Matric No:
                        </label>
                        <input
                          type="text"
                          value={coFounderForm.matricNo}
                          onChange={(e) => setCoFounderForm({ ...coFounderForm, matricNo: e.target.value })}
                          placeholder="e.g. OOU/2022/ENG/019"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                          Campus:
                        </label>
                        <select
                          value={coFounderForm.campus}
                          onChange={(e) => setCoFounderForm({ ...coFounderForm, campus: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)] font-mono"
                        >
                          <option value="Ago-Iwoye">Ago-Iwoye Main</option>
                          <option value="Sagamu">Sagamu (Health)</option>
                          <option value="Ayetoro">Ayetoro (Agric)</option>
                          <option value="Ibogun">Ibogun (Engr)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                          Department:
                        </label>
                        <input
                          type="text"
                          value={coFounderForm.department}
                          onChange={(e) => setCoFounderForm({ ...coFounderForm, department: e.target.value })}
                          placeholder="e.g. Agronomy"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                          Track Fit:
                        </label>
                        <select
                          value={coFounderForm.trackPreference}
                          onChange={(e) => setCoFounderForm({ ...coFounderForm, trackPreference: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)] font-mono"
                        >
                          <option value="Waste-to-Wealth">Waste-to-Wealth</option>
                          <option value="Digital Agriculture">Digital Agriculture</option>
                          <option value="Student Employability">Student Employability</option>
                          <option value="Community Health">Community Health</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                        Your Skills (comma-separated):
                      </label>
                      <input
                        type="text"
                        value={coFounderForm.skills}
                        onChange={(e) => setCoFounderForm({ ...coFounderForm, skills: e.target.value })}
                        placeholder="e.g. Python, PCB Design, Financial Modeling"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                        Who are you looking for?
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={coFounderForm.lookingFor}
                        onChange={(e) => setCoFounderForm({ ...coFounderForm, lookingFor: e.target.value })}
                        placeholder="e.g. Need a medical student from Sagamu to validate patient intake protocol"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#14151A] mb-1">
                        Contact Email:
                      </label>
                      <input
                        type="email"
                        required
                        value={coFounderForm.contactEmail}
                        onChange={(e) => setCoFounderForm({ ...coFounderForm, contactEmail: e.target.value })}
                        placeholder="e.g. lead@oouagoiwoye.edu.ng"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[rgba(20,21,26,0.2)]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs shadow-[3px_3px_0_#ff3d81] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post to Co-Founder Noticeboard</span>
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ---- TRACK DETAIL MODAL ---- */}
        <AnimatePresence>
          {selectedTrackModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTrackModal(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-white border-2 border-[#14151A] rounded-[28px] p-6 sm:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(20,21,26,0.1)]">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedTrackModal.icon}</span>
                    <div>
                      <span className="font-mono text-xs uppercase text-[#10b981] font-bold">
                        {selectedTrackModal.badge}
                      </span>
                      <h4 className="font-display text-2xl uppercase text-[#14151A]">
                        {selectedTrackModal.name}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTrackModal(null)}
                    className="w-8 h-8 rounded-full bg-[#F6F2E7] border border-[#14151A] flex items-center justify-center text-[#14151A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F6F2E7] border border-[rgba(20,21,26,0.1)] mb-4 text-xs text-[#46473f]">
                  <strong className="text-[#14151A] block mb-1">Thesis:</strong>
                  {selectedTrackModal.tagline}
                </div>

                <div className="mb-4">
                  <h5 className="font-mono text-xs font-bold text-[#14151A] uppercase mb-2">
                    Verified Ogun State Problems:
                  </h5>
                  <div className="space-y-1.5">
                    {selectedTrackModal.problems.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#46473f]">
                        <span className="text-[#ff3d81] font-bold">•</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-mono text-xs font-bold text-[#14151A] uppercase mb-2">
                    High-Potential Directions:
                  </h5>
                  <div className="space-y-1.5">
                    {selectedTrackModal.projectIdeas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[#FAF7F0] border border-[rgba(20,21,26,0.08)] text-xs text-[#14151A] flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[rgba(20,21,26,0.1)]">
                  <span className="font-mono text-xs text-[#8a8a7f]">
                    Pool: <strong className="text-[#14151A]">{selectedTrackModal.allocatedSeed}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTrackModal(null);
                      handleOpenForm(activeChallenge);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs shadow-[3px_3px_0_#ff3d81]"
                  >
                    Apply for this Track →
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}
