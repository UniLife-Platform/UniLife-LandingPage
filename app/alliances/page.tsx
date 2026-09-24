"use client";

import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Megaphone,
  Network,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const SPONSORSHIP_TALLY_URL = "https://tally.so/r/LZlKzO";
const PARTNERSHIP_TALLY_URL = "https://tally.so/r/gD2qjd";

const TRUSTED_PARTNERS = [
  {
    name: "Olabisi Onabanjo University",
    label: "Olabisi Onabanjo University",
    src: "/partner-oou.png",
    width: 140,
    height: 48,
  },
  {
    name: "NUESA Engineering",
    label: "NUESA Faculty of Engineering",
    src: "/partner-nuesa.png",
    width: 130,
    height: 48,
  },
  {
    name: "SDG Youth Connect",
    label: "SDG Youth Connect West Africa",
    src: "/partner-sdg-youth-connect.png",
    width: 140,
    height: 48,
  },
  {
    name: "KinStek Innovations",
    label: "KinStek Innovation Lab",
    src: "/partner-kinstek.png",
    width: 120,
    height: 44,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function AlliancesPage() {
  return (
    <div className="bg-[#14151A] text-[#F6F2E7] min-h-screen overflow-x-clip font-body antialiased selection:bg-[#FFD23F] selection:text-[#14151A]">
      <Nav active="/alliances" theme="dark" />

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 md:pb-32 px-6 md:px-16 max-w-[1160px] mx-auto">
        {/* Subtle Ambient Background Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-b from-[#4f7fff]/12 via-[#ff3d81]/8 to-transparent rounded-full blur-[120px] -z-10"
        />

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-[900px] mx-auto mb-16 md:mb-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6.8vw,5rem)] uppercase leading-[0.98] tracking-tight text-[#F6F2E7] mb-6"
            >
              Shape the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD23F] via-[#ff3d81] to-[#4f7fff]">
                Digital Heartbeat
              </span>{" "}
              of the Campus.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[rgba(246,242,231,0.7)] text-lg md:text-xl leading-relaxed max-w-[740px] mx-auto font-normal"
            >
              Forward-thinking brands can either integrate their services or amplify their reach across the OOU student ecosystem. Choose your path below.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. THE "FORK IN THE ROAD" (TWO ACTION CARDS) */}
        <section className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
          >
            {/* CARD A: SPONSORSHIP & BACKING */}
            <div className="relative group rounded-[32px] p-8 sm:p-10 md:p-12 bg-gradient-to-b from-[#1c1d25] to-[#15161D] border border-[rgba(246,242,231,0.12)] hover:border-[#FFD23F]/60 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.45)] flex flex-col justify-between overflow-hidden">
              {/* Subtle accent glow at corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FFD23F]/10 blur-[80px] group-hover:bg-[#FFD23F]/18 transition-all duration-500"
              />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD23F]/15 border border-[#FFD23F]/30 text-[#FFD23F] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Megaphone className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/25 px-3.5 py-1.5 rounded-full">
                    Amplify &amp; Underwrite
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] uppercase leading-tight text-[#F6F2E7] mb-4">
                  Sponsorship &amp; Corporate Backing
                </h2>

                {/* Description */}
                <p className="text-[rgba(246,242,231,0.7)] text-[0.98rem] leading-relaxed mb-8">
                  Direct brand amplification, programmatic banner placements, and campus event co-sponsorships across 10,000+ verified undergraduate accounts. Perfect for FMCGs, fintech apps, telecom, and consumer tech.
                </p>

                {/* Deliverables / Scope Checklist */}
                <div className="space-y-3 mb-10 pt-4 border-t border-white/5">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8a8a7f]">
                    Scope Highlights:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD23F] shrink-0 mt-0.5" />
                    <span>Prime Real Estate on Live Campus Interactive Map</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD23F] shrink-0 mt-0.5" />
                    <span>Exclusive Title Sponsorship of OOU Tech Sprints &amp; Hackathons</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD23F] shrink-0 mt-0.5" />
                    <span>Gamified SP Reward Missions &amp; Leaderboard Banners</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={SPONSORSHIP_TALLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#FFD23F] text-[#14151A] border-2 border-[#FFD23F] shadow-[4px_4px_0_#ff3d81] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff3d81] active:translate-y-0 active:shadow-[2px_2px_0_#ff3d81] transition-all cursor-pointer"
                >
                  <span>View Sponsorship Tiers</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* CARD B: STRATEGIC PARTNERSHIPS */}
            <div className="relative group rounded-[32px] p-8 sm:p-10 md:p-12 bg-gradient-to-b from-[#1c1d25] to-[#15161D] border border-[rgba(246,242,231,0.12)] hover:border-[#4f7fff]/60 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.45)] flex flex-col justify-between overflow-hidden">
              {/* Subtle accent glow at corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#4f7fff]/10 blur-[80px] group-hover:bg-[#4f7fff]/18 transition-all duration-500"
              />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#4f7fff]/15 border border-[#4f7fff]/30 text-[#4f7fff] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Network className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#4f7fff] bg-[#4f7fff]/10 border border-[#4f7fff]/25 px-3.5 py-1.5 rounded-full">
                    Integrate &amp; Connect
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] uppercase leading-tight text-[#F6F2E7] mb-4">
                  Strategic Integrations
                </h2>

                {/* Description */}
                <p className="text-[rgba(246,242,231,0.7)] text-[0.98rem] leading-relaxed mb-8">
                  Integrate your platform&apos;s services directly into the UniLife app to create frictionless experiences for thousands of daily active students. Ideal for tech infrastructure, payment gateways, and local service providers.
                </p>

                {/* Deliverables / Scope Checklist */}
                <div className="space-y-3 mb-10 pt-4 border-t border-white/5">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8a8a7f]">
                    Integration Surfaces:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#4f7fff] shrink-0 mt-0.5" />
                    <span>In-App Campus Checkout &amp; Escrow Payment Rails</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#4f7fff] shrink-0 mt-0.5" />
                    <span>Student Verification, Single Sign-On &amp; API Webhooks</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[rgba(246,242,231,0.85)]">
                    <CheckCircle2 className="w-4 h-4 text-[#4f7fff] shrink-0 mt-0.5" />
                    <span>Hostel Accommodations, Study Tools &amp; Local Deliveries</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={PARTNERSHIP_TALLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#4f7fff] text-white border-2 border-[#4f7fff] shadow-[4px_4px_0_#14151A] hover:bg-[#3d6fe8] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14151A] active:translate-y-0 active:shadow-[2px_2px_0_#14151A] transition-all cursor-pointer"
                >
                  <span>Propose an Integration</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. TRUST STRIP / SOCIAL PROOF */}
        <section className="pt-6 border-t border-[rgba(246,242,231,0.08)]">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8a8a7f]">
              Ecosystem Partners &amp; Institutional Alliances
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 hover:opacity-100 transition-opacity">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5"
                title={partner.label}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-9 w-auto object-contain"
                />
              </div>
            ))}
            <div
              className="grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 font-display text-sm tracking-wider uppercase text-[#F6F2E7]"
              title="OOU Student Union Government"
            >
              <span>🏛️ OOU SUG Official</span>
            </div>
          </div>
        </section>

        {/* 4. VALUE PROPOSITION STRIP */}
        <section className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 text-[#FFD23F] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg uppercase text-[#F6F2E7] mb-2">
              High Density Engagement
            </h3>
            <p className="text-xs text-[rgba(246,242,231,0.65)] leading-relaxed">
              Target students precisely during active campus hours when daily academic and transactional volume peak.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#4f7fff]/10 border border-[#4f7fff]/20 text-[#4f7fff] flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg uppercase text-[#F6F2E7] mb-2">
              Developer-First APIs
            </h3>
            <p className="text-xs text-[rgba(246,242,231,0.65)] leading-relaxed">
              Fast, well-documented webhook and authentication endpoints built to plug directly into existing infrastructure.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#ff3d81]/10 border border-[#ff3d81]/20 text-[#ff3d81] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg uppercase text-[#F6F2E7] mb-2">
              Verified Undergraduate Base
            </h3>
            <p className="text-xs text-[rgba(246,242,231,0.65)] leading-relaxed">
              Zero bot traffic or ghost metrics. Every active user profile is authenticated against student identification.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
