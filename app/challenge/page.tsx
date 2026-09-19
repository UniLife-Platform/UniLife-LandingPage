"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Users,
  Lightbulb,
  Cpu,
  Target,
  ArrowUpRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Building2,
  Lock,
  ChevronRight,
  ExternalLink,
  Search
} from "lucide-react";
import {
  INNOVATION_TRACKS,
  INITIAL_KPIS,
  INITIAL_VENTURES,
  INITIAL_MATCHMAKING,
  INITIAL_ANNOUNCEMENTS,
  getStoredKPIs,
  getStoredVentures,
  getStoredAnnouncements,
  ChallengeKPIs,
  VentureSubmission,
  ChallengeAnnouncement
} from "@/lib/challengeStorage";

const TALLY_CHALLENGE_URL = "https://tally.so/r/q4yGqY";

export default function OOUChallengePage() {
  const [kpis, setKpis] = useState<ChallengeKPIs>(INITIAL_KPIS);
  const [ventures, setVentures] = useState<VentureSubmission[]>(INITIAL_VENTURES);
  const [announcements, setAnnouncements] = useState<ChallengeAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [selectedTrack, setSelectedTrack] = useState<typeof INNOVATION_TRACKS[number] | null>(null);
  const [activeTab, setActiveTab] = useState<"tracks" | "matchmaking" | "leaderboard" | "announcements">("tracks");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setKpis(getStoredKPIs());
      setVentures(getStoredVentures());
      setAnnouncements(getStoredAnnouncements());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Calculate percentages toward 2026/2027 KPIs
  const engagementPct = Math.min(100, Math.round((kpis.studentEngagements / kpis.targetStudentEngagements) * 100));
  const venturePct = Math.min(100, Math.round((kpis.ventureIdeas / kpis.targetVentureIdeas) * 100));
  const prototypePct = Math.min(100, Math.round((kpis.prototypesDeveloped / kpis.targetPrototypesDeveloped) * 100));
  const validatedPct = Math.min(100, Math.round((kpis.marketValidated / kpis.targetMarketValidated) * 100));

  const filteredVentures = ventures.filter((v) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.track.toLowerCase().includes(q) ||
      v.leadFaculty.toLowerCase().includes(q) ||
      v.leadCampus.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen selection:bg-[#10B981] selection:text-black font-body antialiased">
      {/* Top Banner: University Endorsement */}
      <div className="bg-[#0F172A] border-b border-white/10 text-xs font-mono py-2.5 px-4 text-center text-slate-300 flex items-center justify-center gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          Olabisi Onabanjo University (OOU)
        </span>
        <span className="text-white/30 hidden sm:inline">•</span>
        <span className="text-slate-300">
          Directorate of Entrepreneurship & Innovation (DEI)
        </span>
        <span className="text-white/30 hidden sm:inline">•</span>
        <span className="text-amber-400 font-semibold">
          Led by Dr. Ogunkoya • 2026/2027 Academic Year
        </span>
        <Link
          href="/challenge/admin"
          className="ml-2 inline-flex items-center gap-1 text-[11px] text-emerald-400/80 hover:text-emerald-300 underline font-mono"
        >
          <Lock className="w-3 h-3" />
          Directorate Portal
        </Link>
      </div>

      <Nav active="/challenge" />

      {/* ---- HERO SECTION ---- */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-6 md:px-16 max-w-[1240px] mx-auto overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Gamification Streak Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wide mb-6">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{kpis.currentStreakDays}-Day Innovation Sprint Streak Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.2rem] uppercase leading-[1.04] tracking-tight text-white mb-6">
              OOU Entrepreneurship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Challenge 2026
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-[620px]">
              A university-wide venture acceleration initiative managed by the{" "}
              <strong className="text-white">
                Directorate of Entrepreneurship and Innovation under Dr. Ogunkoya
              </strong>
              . Form cross-faculty teams across Ago-Iwoye, Sagamu, Ayetoro, and Ibogun to solve state-critical challenges, build prototypes, and access seed funding.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={TALLY_CHALLENGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span>Register Your Venture</span>
                <ArrowUpRight className="w-5 h-5 text-black" />
              </a>

              <a
                href="#kpis"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base bg-slate-800/80 text-white border border-white/15 hover:bg-slate-700/80 hover:border-emerald-500/40 transition-all whitespace-nowrap"
              >
                <span>View Live KPIs</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </a>

              <Link
                href="/challenge/admin"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-mono text-xs text-slate-400 border border-white/10 hover:text-white hover:border-white/20 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Directorate Admin</span>
              </Link>
            </div>

            {/* Quick badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-400 border-t border-white/10 pt-6">
              <div>
                <span className="text-white font-bold block text-sm">₦5,000,000</span>
                <span>Seed Pool</span>
              </div>
              <div>
                <span className="text-white font-bold block text-sm">4 Tracks</span>
                <span>Specialized Sprints</span>
              </div>
              <div>
                <span className="text-white font-bold block text-sm">4 Campuses</span>
                <span>Ago, Sagamu, Ayetoro, Ibogun</span>
              </div>
              <div>
                <span className="text-white font-bold block text-sm">Session 2026/27</span>
                <span>Senate Accredited</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual: KPI Radar / Live Pulse */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#131C31] to-[#0D1322] border border-white/15 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">DEI Challenge Matrix</h3>
                    <p className="font-mono text-xs text-slate-400">Institutional Targets 26/27</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Primary KPI 1: Student Engagements */}
              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    Student Engagements
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    <strong className="text-emerald-400 text-sm">{kpis.studentEngagements.toLocaleString()}</strong> / {kpis.targetStudentEngagements.toLocaleString()} ({engagementPct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${engagementPct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Primary KPI 2: Venture Ideas */}
              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    Venture Ideas (Cross-Faculty)
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    <strong className="text-amber-400 text-sm">{kpis.ventureIdeas}</strong> / {kpis.targetVentureIdeas} ({venturePct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${venturePct}%` }}
                    transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Primary KPI 3: Prototypes Developed */}
              <div className="mb-5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    Prototypes Developed
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    <strong className="text-blue-400 text-sm">{kpis.prototypesDeveloped}</strong> / {kpis.targetPrototypesDeveloped} ({prototypePct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${prototypePct}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Primary KPI 4: Market-Validated */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-pink-400" />
                    Market-Validated Ventures
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    <strong className="text-pink-400 text-sm">{kpis.marketValidated}</strong> / {kpis.targetMarketValidated} ({validatedPct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${validatedPct}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Bottom Callout inside Card */}
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-slate-400 block font-mono">Next Milestone Unlocks at:</span>
                  <strong className="text-emerald-300 font-mono">750 Students & 50 Venture Ideas</strong>
                </div>
                <a
                  href={TALLY_CHALLENGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-bold font-mono text-xs transition-colors shrink-0"
                >
                  Join Goal →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- TICKER TAPE: INSTITUTIONAL SPRINT ---- */}
      <div className="border-y border-white/10 bg-[#0F172A] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-widest text-slate-400 px-4"
            >
              <span className="text-emerald-400">★ OOU DIRECTORATE OF ENTREPRENEURSHIP & INNOVATION</span>
              <span>★ DR. OGUNKOYA LEADERSHIP</span>
              <span className="text-amber-400">★ 1,000 STUDENT TARGET</span>
              <span>★ 60 CROSS-FACULTY VENTURES</span>
              <span className="text-blue-400">★ 30 PROTOTYPE BENCHMARKS</span>
              <span className="text-pink-400">★ 10 COMMERCIAL VENTURES</span>
              <span>★ 2026/2027 ACADEMIC YEAR</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- LIVE GAMIFICATION KPI SECTION ---- */}
      <section id="kpis" className="py-20 px-6 md:px-16 max-w-[1240px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <span className="inline-block font-mono text-xs tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-full mb-4 uppercase font-bold">
            Real-Time Institutional Progress
          </span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Gamified KPI Mission Board
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every submission through the UniLife OOU Portal moves the needle toward Dr. Ogunkoya&apos;s institutional milestones for the 2026/2027 academic year.
          </p>
        </div>

        {/* 4 Big KPI Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs uppercase text-slate-400 mb-1">Target: 1,000 Students</div>
            <div className="font-display text-4xl sm:text-5xl text-white mb-3">
              {kpis.studentEngagements.toLocaleString()}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Registered participants, ideators, and attendees across 4 OOU campuses.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Progress</span>
                <span className="text-emerald-400 font-bold">{engagementPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${engagementPct}%` }} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs uppercase text-slate-400 mb-1">Target: 60 Venture Ideas</div>
            <div className="font-display text-4xl sm:text-5xl text-white mb-3">
              {kpis.ventureIdeas}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Cross-faculty teams formed linking tech, agriculture, health, and business.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Progress</span>
                <span className="text-amber-400 font-bold">{venturePct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${venturePct}%` }} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs uppercase text-slate-400 mb-1">Target: 30 Prototypes</div>
            <div className="font-display text-4xl sm:text-5xl text-white mb-3">
              {kpis.prototypesDeveloped}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Physical or software prototypes tested in OOU engineering labs and farms.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Progress</span>
                <span className="text-blue-400 font-bold">{prototypePct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${prototypePct}%` }} />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs uppercase text-slate-400 mb-1">Target: 10 Market-Validated</div>
            <div className="font-display text-4xl sm:text-5xl text-white mb-3">
              {kpis.marketValidated}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              Ventures with paying campus customers or external off-taker contracts.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Progress</span>
                <span className="text-pink-400 font-bold">{validatedPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-400 rounded-full" style={{ width: `${validatedPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Unlock Progression Tracker */}
        <div className="bg-gradient-to-r from-[#111827] via-[#161F33] to-[#111827] border border-white/15 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Institutional Incentive Unlocks
              </span>
              <h3 className="font-display text-2xl text-white uppercase">
                Tiered Achievement Roadmap
              </h3>
            </div>
            <div className="font-mono text-xs bg-black/40 px-3 py-1.5 rounded-full border border-white/10 text-slate-300">
              Campus Target: 2026/2027
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Phase 1: Mobilization (250)
              </div>
              <p className="text-slate-300">
                Unlocked: Virtual ideation clinics and campus-wide matchmaking on UniLife.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Phase 2: Venture Pool (500)
              </div>
              <p className="text-slate-300">
                Unlocked: Lab access at Ibogun & Ayetoro; ₦1.5M prototype grant tranche.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 text-xs relative">
              <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                IN PROGRESS
              </span>
              <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Phase 3: Validation (750)
              </div>
              <p className="text-slate-300">
                Pending: Industry mentor speed dating & external investor showcase.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2 font-bold mb-1 text-slate-300">
                <Trophy className="w-4 h-4 text-slate-500" />
                Phase 4: Grand Finale (1,000)
              </div>
              <p className="text-slate-400">
                Target: ₦5M disbursement, OOU Senate Innovation Exhibition, and patent grants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- INTERACTIVE TRACK DETAILS SECTION ---- */}
      <section id="tracks" className="py-16 px-6 md:px-16 max-w-[1240px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <span className="inline-block font-mono text-xs tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/25 px-3.5 py-1.5 rounded-full mb-4 uppercase font-bold">
            Specialized Innovation Tracks
          </span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Four Priority Problem Arenas
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Select a track below to inspect the challenge brief, local Ogun State problem statements, sample solution ideas, and mentor faculty allocations.
          </p>
        </div>

        {/* 4 Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {INNOVATION_TRACKS.map((track) => (
            <div
              key={track.id}
              className="bg-[#111827] border border-white/10 rounded-3xl p-7 hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedTrack(track)}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-3 rounded-2xl bg-slate-800/80 border border-white/10">
                      {track.icon}
                    </span>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider block text-slate-400">
                        {track.badge}
                      </span>
                      <h3 className="font-display text-2xl uppercase text-white group-hover:text-emerald-400 transition-colors">
                        {track.name}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    {track.allocatedSeed} Seed
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  {track.tagline}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="font-mono text-[11px] uppercase text-slate-400 font-bold block">
                    Core Target Challenges:
                  </span>
                  {track.problems.slice(0, 2).map((prob, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  Mentor: <strong className="text-white">{track.leadMentor}</strong>
                </span>
                <button
                  type="button"
                  className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Brief & Ideas</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Callout to Register for Track */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#111C2E] to-emerald-950/60 border border-emerald-500/30 rounded-3xl p-8 text-center sm:text-left sm:flex items-center justify-between gap-6">
          <div className="mb-6 sm:mb-0">
            <h4 className="font-display text-2xl uppercase text-white mb-2">
              Ready to submit your venture concept?
            </h4>
            <p className="text-slate-300 text-sm max-w-[620px]">
              Submissions are officially open on the UniLife OOU Portal. Multi-disciplinary teams spanning across different faculties earn a <strong>+10 bonus diversity score</strong> from Dr. Ogunkoya&apos;s evaluation committee.
            </p>
          </div>
          <a
            href={TALLY_CHALLENGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 text-black hover:bg-emerald-400 transition-all shrink-0 shadow-lg"
          >
            <span>Apply via Tally Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ---- TRACK DETAILS MODAL ---- */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111827] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-200"
            >
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedTrack.icon}</span>
                  <div>
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      {selectedTrack.badge}
                    </span>
                    <h3 className="font-display text-2xl uppercase text-white">
                      {selectedTrack.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {/* Tagline */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 text-sm text-slate-300">
                <strong className="block text-white mb-1">Track Thesis:</strong>
                {selectedTrack.tagline}
              </div>

              {/* Problems */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Verified Local Problems to Solve:
                </h4>
                <div className="space-y-2.5">
                  {selectedTrack.problems.map((prob, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="text-amber-400 font-bold shrink-0">→</span>
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Project Ideas */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                  High-Potential Project Directions:
                </h4>
                <div className="space-y-2">
                  {selectedTrack.projectIdeas.map((idea, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentorship & Grant */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-2xl bg-slate-900/80 border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block">Lead Mentorship:</span>
                  <span className="text-white font-bold">{selectedTrack.leadMentor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Track Grant Allocation:</span>
                  <span className="text-emerald-400 font-bold">{selectedTrack.allocatedSeed}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-mono text-white hover:bg-white/5"
                >
                  Close Brief
                </button>
                <a
                  href={TALLY_CHALLENGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 flex items-center gap-2"
                >
                  <span>Submit Venture for this Track</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---- CROSS-FACULTY MATCHMAKING & SHOWCASE SECTION ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1240px] mx-auto">
        <div className="bg-[#111827] border border-white/15 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Cross-Campus Synergy
              </span>
              <h2 className="font-display text-3xl uppercase text-white mt-1">
                Cross-Faculty Matchmaker & Submissions
              </h2>
              <p className="text-slate-300 text-sm max-w-[580px] mt-2">
                Dr. Ogunkoya&apos;s goal is <strong>60 venture teams</strong> bringing together engineers, agronomists, medics, and business leads. Browse current concepts or find collaborators.
              </p>
            </div>

            {/* Sub-nav tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("tracks")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "tracks"
                    ? "bg-emerald-500 text-black shadow-md"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                Venture Ideas ({ventures.length})
              </button>
              <button
                onClick={() => setActiveTab("matchmaking")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "matchmaking"
                    ? "bg-emerald-500 text-black shadow-md"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                Co-Founder Board ({INITIAL_MATCHMAKING.length})
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === "announcements"
                    ? "bg-emerald-500 text-black shadow-md"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                Directorate Bulletins ({announcements.length})
              </button>
            </div>
          </div>

          {/* TAB 1: VENTURE SUBMISSIONS PREVIEW */}
          {activeTab === "tracks" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search venture ideas, campus, track, or faculty..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <a
                  href={TALLY_CHALLENGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold hover:bg-emerald-500 hover:text-black transition-colors whitespace-nowrap"
                >
                  + Submit Your Idea
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVentures.map((v) => (
                  <div
                    key={v.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {v.track}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 capitalize bg-white/5 px-2 py-0.5 rounded">
                          ● {v.stage}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-white mb-1.5 leading-snug">
                        {v.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                        {v.solutionSummary}
                      </p>

                      <div className="text-[11px] font-mono text-slate-300 bg-white/5 p-2.5 rounded-xl mb-4 space-y-1">
                        <div>
                          <span className="text-slate-400">Lead:</span> {v.leadName}
                        </div>
                        <div>
                          <span className="text-slate-400">Campus:</span> {v.leadCampus}
                        </div>
                        <div>
                          <span className="text-slate-400">Faculty:</span> {v.leadFaculty}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">
                        Team: <strong>{v.teamMembers.length} co-founders</strong>
                      </span>
                      {v.score ? (
                        <span className="text-amber-400 font-bold">
                          Score: {v.score.total}/40
                        </span>
                      ) : (
                        <span className="text-slate-400">Pending Review</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MATCHMAKING */}
          {activeTab === "matchmaking" && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <p className="text-xs font-mono text-slate-400">
                  Students seeking cross-faculty collaborators across OOU campuses:
                </p>
                <a
                  href={TALLY_CHALLENGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black font-mono text-xs font-bold hover:bg-amber-300 transition-colors"
                >
                  + Post Co-Founder Request
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {INITIAL_MATCHMAKING.map((profile) => (
                  <div
                    key={profile.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {profile.campus} Campus
                        </span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                            profile.status === "matched"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {profile.status === "matched" ? "Matched" : "Seeking Team"}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-white mb-0.5">
                        {profile.studentName}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 mb-3">
                        {profile.department} ({profile.faculty})
                      </p>

                      <div className="mb-4">
                        <span className="text-[11px] font-mono text-slate-400 block mb-1.5 font-bold">
                          Offering Skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl mb-4">
                        <span className="text-amber-400 font-bold block mb-1">Looking for:</span>
                        {profile.lookingFor}
                      </div>
                    </div>

                    <a
                      href={`mailto:${profile.contactEmail}?subject=OOU%20Challenge%20Matchmaking%20Collaboration`}
                      className="w-full text-center py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors block"
                    >
                      Connect with {profile.studentName.split(" ")[0]}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        {ann.tag}
                      </span>
                      {ann.isUrgent && (
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 animate-pulse">
                          Urgent
                        </span>
                      )}
                      <span className="font-mono text-xs text-slate-500">{ann.date}</span>
                    </div>
                    <h4 className="font-bold text-base text-white">{ann.title}</h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-[780px]">
                      {ann.content}
                    </p>
                    <span className="font-mono text-[11px] text-slate-400 block pt-1">
                      Posted by: {ann.author}
                    </span>
                  </div>

                  <a
                    href={TALLY_CHALLENGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                  >
                    Action Link →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---- DIRECTORATE NOTE / FAQS ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Dr. Ogunkoya Note */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#151F33] to-[#0F172A] border border-white/15 rounded-3xl p-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6">
              <Building2 className="w-6 h-6" />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Directorate Charge 2026/2027
            </span>

            <h3 className="font-display text-2xl uppercase text-white mb-4 leading-snug">
              &ldquo;We Are Not Grading Theories. We Are Funding Tested Solutions.&rdquo;
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              &ldquo;Our vision at the Directorate of Entrepreneurship & Innovation is to move OOU students beyond theoretical dissertations. Ogun State is the industrial engine of Nigeria; our students must build the supply chains, agritech pipelines, and digital marketplaces that power it.&rdquo;
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 font-display text-lg">
                DO
              </div>
              <div>
                <strong className="block text-white text-sm">Dr. Ogunkoya</strong>
                <span className="text-slate-400 font-mono text-xs">
                  Director, Directorate of Entrepreneurship & Innovation
                </span>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-2">
              Common Questions
            </span>
            <h3 className="font-display text-3xl uppercase text-white mb-6">
              Challenge Guidelines & Eligibility
            </h3>

            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
              <h4 className="font-bold text-sm text-white">Who is eligible to participate?</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                All matriculated undergraduate and postgraduate students of Olabisi Onabanjo University across all campuses (Ago-Iwoye Main Campus, Sagamu, Ayetoro, and Ibogun). Cross-campus and cross-level teams are actively encouraged.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
              <h4 className="font-bold text-sm text-white">Do I need to already have a working prototype?</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                No. The challenge has three sequential phases: Ideation & Team Formation, Prototype Sprint (with lab access provided at Ibogun and Ayetoro), and Market Validation. You can register at the idea stage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
              <h4 className="font-bold text-sm text-white">Who retains the Intellectual Property (IP)?</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                The student team retains 100% ownership of their venture equity and IP. The Directorate provides legal filing mentorship, patent clinic support, and seed funding without claiming commercial royalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FINAL CTA BANNER ---- */}
      <section className="py-20 px-6 md:px-16 max-w-[1240px] mx-auto">
        <div className="rounded-[32px] p-10 md:p-14 bg-gradient-to-r from-emerald-950 via-[#10192A] to-slate-900 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          <span className="inline-block font-mono text-xs tracking-widest text-emerald-400 uppercase font-bold mb-4">
            Registration Closing Soon
          </span>
          <h2 className="font-display text-3xl sm:text-5xl uppercase text-white mb-4 max-w-[800px] mx-auto">
            Take Your Venture From Campus Concept to Seed-Funded Reality.
          </h2>
          <p className="text-slate-300 max-w-[580px] mx-auto text-base sm:text-lg mb-8 font-normal">
            Join over 640 ambitious OOU students building the next wave of high-impact companies in Ogun State.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={TALLY_CHALLENGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl transition-all"
            >
              <span>Submit on Tally Official Form</span>
              <ArrowUpRight className="w-5 h-5 text-black" />
            </a>

            <Link
              href="/challenge/admin"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-xs text-slate-300 bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Directorate Dashboard Access</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
