"use client";

import React, { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Vote,
  MapPin,
  TrendingUp,
  Users,
  Share2,
  CheckCircle2,
  ArrowUpRight,
  Award,
  Search,
  Building2,
  ExternalLink,
  Check,
  Zap,
} from "lucide-react";

const TALLY_REQUEST_URL = "https://tally.so/r/EkpgAl";

interface CampusEntry {
  id: string;
  name: string;
  shortName: string;
  state: string;
  votes: number;
  target: number;
  status: "surging" | "review" | "queue" | "active";
  statusText: string;
  badgeColor: string;
}

const INITIAL_CAMPUSES: CampusEntry[] = [
  {
    id: "unilag",
    name: "University of Lagos",
    shortName: "UNILAG",
    state: "Akoka, Lagos State",
    votes: 472,
    target: 500,
    status: "surging",
    statusText: "94% · Launching Soon",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "ui",
    name: "University of Ibadan",
    shortName: "UI",
    state: "Ibadan, Oyo State",
    votes: 394,
    target: 500,
    status: "surging",
    statusText: "78% · Phase 2 Queue",
    badgeColor: "bg-[#FFD23F]/15 text-[#FFD23F] border-[#FFD23F]/30",
  },
  {
    id: "oau",
    name: "Obafemi Awolowo University",
    shortName: "OAU",
    state: "Ile-Ife, Osun State",
    votes: 341,
    target: 500,
    status: "review",
    statusText: "68% · Gathering Signatures",
    badgeColor: "bg-[#4f7fff]/15 text-[#4f7fff] border-[#4f7fff]/30",
  },
  {
    id: "lasu",
    name: "Lagos State University",
    shortName: "LASU",
    state: "Ojo, Lagos State",
    votes: 298,
    target: 500,
    status: "review",
    statusText: "59% · Gathering Signatures",
    badgeColor: "bg-[#4f7fff]/15 text-[#4f7fff] border-[#4f7fff]/30",
  },
  {
    id: "futa",
    name: "Federal University of Technology, Akure",
    shortName: "FUTA",
    state: "Akure, Ondo State",
    votes: 226,
    target: 500,
    status: "queue",
    statusText: "45% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
  {
    id: "uniben",
    name: "University of Benin",
    shortName: "UNIBEN",
    state: "Benin City, Edo State",
    votes: 198,
    target: 500,
    status: "queue",
    statusText: "39% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
  {
    id: "unilorin",
    name: "University of Ilorin",
    shortName: "UNILORIN",
    state: "Ilorin, Kwara State",
    votes: 165,
    target: 500,
    status: "queue",
    statusText: "33% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
  {
    id: "covenant",
    name: "Covenant University",
    shortName: "CU",
    state: "Ota, Ogun State",
    votes: 142,
    target: 500,
    status: "queue",
    statusText: "28% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
  {
    id: "delsu",
    name: "Delta State University",
    shortName: "DELSU",
    state: "Abraka, Delta State",
    votes: 118,
    target: 500,
    status: "queue",
    statusText: "23% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
  {
    id: "futo",
    name: "Federal University of Technology, Owerri",
    shortName: "FUTO",
    state: "Owerri, Imo State",
    votes: 104,
    target: 500,
    status: "queue",
    statusText: "20% · Petition Active",
    badgeColor: "bg-white/10 text-white/80 border-white/20",
  },
];

const FAQS = [
  {
    q: "How many votes does my campus need to get UniLife?",
    a: "Once a university logs 500 verified student petitions, our expansion team initiates ground mapping, begins student ambassador interviews, and prepares local merchant onboarding for your campus.",
  },
  {
    q: "Are polytechnics, colleges of education, and private universities eligible?",
    a: "Yes! Any accredited tertiary institution across Nigeria is eligible. The roadmap is 100% student demand-driven regardless of federal, state, or private status.",
  },
  {
    q: "What perks do students get by voting early?",
    a: "All students who vote receive the exclusive 'Genesis Early Believer' profile badge, 500 bonus SP points on launch day, and 6 months of 0% seller commission on all campus marketplace transactions.",
  },
  {
    q: "How can I fast-track my school's rollout?",
    a: "Share this page to your departmental WhatsApp groups, student union forums, and faculty associations. Higher student density accelerates our deployment timeline.",
  },
  {
    q: "How do I become the Campus Lead or Ambassador for my school?",
    a: "When filling out the Tally form, indicate your interest in student leadership, or visit our Join page (/join) to apply for the official UniLife Campus Ambassador Guild.",
  },
];

export default function RequestCampusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredCampuses = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_CAMPUSES;
    const q = searchQuery.toLowerCase();
    return INITIAL_CAMPUSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://unilife.com.ng/request");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getWhatsAppShareUrl = (campusName: string = "our campus") => {
    const text = encodeURIComponent(
      `🔥 Guys, let's bring UniLife to ${campusName}! Vote now so we can get campus escrow marketplace, verified past questions, hostel discovery & campus delivery: https://unilife.com.ng/request`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="bg-[#14151A] text-[#F6F2E7] min-h-screen overflow-x-clip font-body antialiased selection:bg-[#FFD23F] selection:text-[#14151A]">
      <Nav active="/request" theme="dark" />

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 md:pb-32 px-6 md:px-16 max-w-[1240px] mx-auto">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-[#10b981]/15 via-[#FFD23F]/10 to-transparent rounded-full blur-[130px] -z-10"
        />

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-[920px] mx-auto mb-20 md:mb-28">
          {/* Radar Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-6 text-emerald-400 font-mono text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Campus Expansion Initiative · Nigeria 2026/2027
          </div>

          <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.2rem)] uppercase leading-[0.98] tracking-tight text-[#F6F2E7] mb-6">
            Bring UniLife to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD23F] via-emerald-400 to-[#4f7fff]">
              Your Campus.
            </span>
          </h1>

          <p className="text-[rgba(246,242,231,0.75)] text-lg md:text-xl leading-relaxed max-w-[760px] mx-auto font-normal mb-10">
            We are currently live and scaling across OOU. Want seamless peer-to-peer campus deliveries, escrow student marketplace, verified past questions, and event ticketing at your institution next? Vote your campus onto our launch queue.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={TALLY_REQUEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#FFD23F] text-[#14151A] border-2 border-[#FFD23F] shadow-[4px_4px_0_#ff3d81] hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff3d81] active:translate-y-0 active:shadow-[2px_2px_0_#ff3d81] transition-all cursor-pointer"
            >
              <Vote className="w-4 h-4 stroke-[2.5]" />
              <span>Vote for Your Campus</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-white/5 text-[#F6F2E7] border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Share Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Rally Your Coursemates</span>
                </>
              )}
            </button>
          </div>

          {/* Key Metric Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-display text-3xl md:text-4xl text-[#FFD23F] mb-1">
                10,000+
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                Active Students at OOU
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-emerald-400 mb-1">
                500
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                Votes to Trigger Launch
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-[#4f7fff] mb-1">
                12+
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                Campuses Petitioning
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-white mb-1">
                100%
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                Free Student Access
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE LIVE CAMPUS EXPANSION LEADERBOARD */}
        <section id="leaderboard" className="mb-24 md:mb-32">
          <div className="rounded-[32px] p-6 sm:p-10 md:p-12 bg-gradient-to-b from-[#1c1d25] to-[#15161D] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#FFD23F] mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Live Petition Tracker
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#F6F2E7]">
                  Campus Expansion Leaderboard
                </h2>
                <p className="text-sm text-[#a1a1aa] mt-1 max-w-xl">
                  Universities that reach 500 signatures unlock priority campus onboarding, student ambassador appointments, and local vendor mapping.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search university or city..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-[#F6F2E7] placeholder:text-white/30 focus:outline-none focus:border-[#FFD23F] transition-colors font-body"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredCampuses.map((campus, idx) => {
                const percentage = Math.min(100, Math.round((campus.votes / campus.target) * 100));
                return (
                  <div
                    key={campus.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                  >
                    {/* Rank & School Details */}
                    <div className="flex items-start sm:items-center gap-4 min-w-[280px]">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm font-bold text-white/70 group-hover:text-[#FFD23F] group-hover:border-[#FFD23F]/30 transition-colors shrink-0">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-display text-lg uppercase tracking-wide text-[#F6F2E7]">
                            {campus.shortName}
                          </span>
                          <span className="text-xs text-white/40">·</span>
                          <span className="text-xs text-[#a1a1aa] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-white/40" />
                            {campus.state}
                          </span>
                        </div>
                        <div className="text-xs text-white/60 font-medium">
                          {campus.name}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Signature Count */}
                    <div className="flex-1 max-w-md">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-white/70">
                          <b className="text-white font-bold">{campus.votes}</b> / {campus.target} votes
                        </span>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${campus.badgeColor}`}>
                          {campus.statusText}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            percentage >= 90
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : percentage >= 60
                              ? "bg-gradient-to-r from-[#FFD23F] to-amber-400"
                              : "bg-gradient-to-r from-[#4f7fff] to-cyan-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                      <a
                        href={getWhatsAppShareUrl(campus.shortName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Rally</span>
                      </a>

                      <a
                        href={TALLY_REQUEST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FFD23F] text-[#14151A] hover:bg-[#ffe066] transition-all flex items-center gap-1 shadow-sm"
                      >
                        <span>Vote</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                );
              })}

              {filteredCampuses.length === 0 && (
                <div className="text-center py-12 px-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
                  <Building2 className="w-10 h-10 text-white/30 mx-auto mb-3" />
                  <h3 className="font-display text-lg uppercase text-white mb-1">
                    University Not Listed?
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mb-4 max-w-md mx-auto">
                    Be the very first student from your institution to submit a petition and put your campus on the national radar!
                  </p>
                  <a
                    href={TALLY_REQUEST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD23F] text-[#14151A]"
                  >
                    <span>Submit New Campus Petition</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Form Banner */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#a1a1aa]">
                Every student vote is cryptographically verified to prevent spam and duplicates.
              </span>
              <a
                href={TALLY_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD23F] hover:underline flex items-center gap-1.5"
              >
                <span>Direct Tally Submission Form</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* 3. HOW THE EXPANSION WORKS (3-STAGE PROTOCOL) */}
        <section className="mb-24 md:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#4f7fff] bg-[#4f7fff]/10 border border-[#4f7fff]/25 px-3.5 py-1.5 rounded-full">
              Rollout Blueprint
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase text-[#F6F2E7] mt-4 mb-3">
              How Your Campus Gets Unlocked
            </h2>
            <p className="text-sm text-[#a1a1aa]">
              Our three-stage protocol ensures every campus launch has verified institutional data, active student leaders, and instant utility from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-[28px] bg-gradient-to-b from-[#1a1b22] to-[#14151A] border border-white/10 relative overflow-hidden group hover:border-[#FFD23F]/50 transition-all">
              <div className="font-mono text-4xl font-bold text-white/15 mb-4 group-hover:text-[#FFD23F]/30 transition-colors">
                01
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl uppercase text-[#F6F2E7] mb-2.5">
                500 Verified Petitions
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Students rally their coursemates and cast votes via Tally. Crossing 500 signatures formally locks your university into the deployment queue.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-[28px] bg-gradient-to-b from-[#1a1b22] to-[#14151A] border border-white/10 relative overflow-hidden group hover:border-emerald-400/50 transition-all">
              <div className="font-mono text-4xl font-bold text-white/15 mb-4 group-hover:text-emerald-400/30 transition-colors">
                02
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl uppercase text-[#F6F2E7] mb-2.5">
                Ambassador Guild Formed
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                We recruit 3–5 exceptional student leaders on your campus as UniLife Campus Directors with monthly stipends, branded merchandise, and launch authority.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-[28px] bg-gradient-to-b from-[#1a1b22] to-[#14151A] border border-white/10 relative overflow-hidden group hover:border-[#4f7fff]/50 transition-all">
              <div className="font-mono text-4xl font-bold text-white/15 mb-4 group-hover:text-[#4f7fff]/30 transition-colors">
                03
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#4f7fff]/10 border border-[#4f7fff]/25 text-[#4f7fff] flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl uppercase text-[#F6F2E7] mb-2.5">
                Genesis Campus Drop
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                UniLife unlocks geofenced past questions, hostel discovery maps, peer escrow commerce, and food vendor delivery rails for all active departments.
              </p>
            </div>
          </div>
        </section>

        {/* 4. GENESIS EARLY BELIEVER PERKS */}
        <section className="mb-24 md:mb-32 rounded-[32px] p-8 sm:p-12 bg-gradient-to-r from-[#1c1d25] via-[#1a1926] to-[#15161D] border border-white/15 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#FFD23F]/10 blur-[100px]"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/25 px-3 py-1 rounded-full">
              Founding Voter Benefits
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#F6F2E7] mt-4 mb-4">
              The &quot;Genesis Believer&quot; Club
            </h2>
            <p className="text-sm sm:text-base text-[rgba(246,242,231,0.7)] leading-relaxed mb-8">
              Students who petition early don&apos;t just bring UniLife to their campus—they get permanent VIP status locked to their verified matric profile when the app goes live.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7]">
                    0% Seller Fees for 6 Months
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Sell textbooks, thrift fashion, food, and gadgets with zero commission.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#FFD23F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7]">
                    Exclusive Profile Badge
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Permanent Genesis Believer badge displayed next to your verified student name.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#4f7fff] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7]">
                    500 Bonus SP Points
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Free spendable campus points credited instantly upon account creation.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#ff3d81] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7]">
                    Priority Ambassador Fast-Track
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    First pick for paid student leadership and campus representative roles.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={TALLY_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#FFD23F] text-[#14151A] hover:bg-[#ffe066] transition-all shadow-[4px_4px_0_#ff3d81]"
              >
                <span>Claim Genesis Perks &amp; Vote</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white/5 text-[#F6F2E7] border border-white/15 hover:bg-white/10 transition-colors"
              >
                <span>Apply as Campus Lead</span>
                <Users className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-20 md:mb-28 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#a1a1aa]">
              Got Questions?
            </span>
            <h2 className="font-display text-3xl uppercase text-[#F6F2E7] mt-2">
              Campus Expansion FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-body font-bold text-sm sm:text-base text-[#F6F2E7] hover:text-[#FFD23F] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono text-white/50 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. FINAL BOTTOM CTA BANNER */}
        <section className="text-center rounded-[32px] p-10 sm:p-14 bg-gradient-to-b from-[#1e202a] to-[#14151A] border border-white/15 relative overflow-hidden">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#F6F2E7] mb-4 max-w-xl mx-auto leading-tight">
            Ready to bring UniLife to your university?
          </h2>
          <p className="text-sm sm:text-base text-[rgba(246,242,231,0.7)] max-w-lg mx-auto mb-8">
            It takes less than 60 seconds to vote. Rally your coursemates and make your campus the next official launch hub.
          </p>

          <a
            href={TALLY_REQUEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#FFD23F] text-[#14151A] border-2 border-[#FFD23F] shadow-[4px_4px_0_#ff3d81] hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff3d81] active:translate-y-0 active:shadow-[2px_2px_0_#ff3d81] transition-all cursor-pointer"
          >
            <Vote className="w-4 h-4 stroke-[2.5]" />
            <span>Cast Your Campus Vote</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
