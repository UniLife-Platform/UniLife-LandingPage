"use client";

import React, { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Vote,
  Users,
  Share2,
  CheckCircle2,
  ArrowUpRight,
  Award,
  Check,
  Zap,
  MessageCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

const TALLY_REQUEST_URL = "https://tally.so/r/EkpgAl";

const FAQS = [
  {
    q: "How does requesting UniLife for my campus work?",
    a: "Submit a request for your university using the official form. Our expansion team monitors student demand volume by campus, faculty, and state to prioritize which institutions receive our dedicated local launch teams next.",
  },
  {
    q: "Are polytechnics, colleges of education, and private universities eligible?",
    a: "Yes! Any accredited tertiary institution across Nigeria is eligible. The roadmap is 100% student demand-driven regardless of federal, state, or private status.",
  },
  {
    q: "What perks do students get by requesting early?",
    a: "All students who request their campus early receive the exclusive 'Founding Member' profile badge, 500 bonus SP points on launch day, and 6 months of 0% seller commission on all campus marketplace transactions.",
  },
  {
    q: "How can I fast-track my school's rollout?",
    a: "Share this page to your departmental WhatsApp groups, student union forums, and faculty associations. Higher student density accelerates our deployment timeline and local merchant onboarding.",
  },
  {
    q: "How do I become the Campus Lead or Ambassador for my school?",
    a: "When filling out the Tally form, indicate your interest in student leadership, or visit our Join page (/join) to apply for the official UniLife Campus Ambassador Guild.",
  },
];

export default function RequestCampusPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://unilife.com.ng/request");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      "🔥 Guys, let's bring UniLife to our campus! Vote now so we can get campus escrow marketplace, verified past questions, hostel discovery & campus delivery: https://unilife.com.ng/request"
    );
    return `https://wa.me/?text=${text}`;
  };

  const getTwitterShareUrl = () => {
    const text = encodeURIComponent(
      "We need @UniLifeNG on our campus! Students, let's vote to bring peer escrow trading, verified past questions & student food delivery to our school: https://unilife.com.ng/request"
    );
    return `https://twitter.com/intent/tweet?text=${text}`;
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
            We are currently live and scaling across OOU. Want seamless peer-to-peer campus deliveries, escrow student marketplace, verified past questions, and event ticketing at your institution next? Request your campus and rally your coursemates.
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
              <span>Request Your Campus</span>
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
                Fast-Track
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                Demand-Driven Rollout
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-[#4f7fff] mb-1">
                All 36
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#a1a1aa]">
                States &amp; FCT Eligible
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

        {/* 2. RALLY YOUR COURSEMATES (VIRAL SHARE HUB) */}
        <section className="mb-24 md:mb-32">
          <div className="rounded-[32px] p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#1c1d25] to-[#15161D] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]"
            />

            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#FFD23F] mb-3">
                <Share2 className="w-3.5 h-3.5" />
                Amplify Your Campus Demand
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#F6F2E7] mb-3">
                Rally Your Coursemates &amp; Department
              </h2>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
                The faster student requests come in from your institution, faculty, and hostels, the higher your campus ranks on our expansion roadmap. One share in your departmental WhatsApp group can bring UniLife to your university.
              </p>
            </div>

            {/* Share Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* WhatsApp */}
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7] group-hover:text-emerald-300 transition-colors">
                    Share on WhatsApp
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Course &amp; hostel groups
                  </div>
                </div>
              </a>

              {/* Twitter / X */}
              <a
                href={getTwitterShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#4f7fff]/10 border border-[#4f7fff]/25 hover:bg-[#4f7fff]/20 hover:border-[#4f7fff]/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4f7fff]/20 text-[#4f7fff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7] group-hover:text-blue-300 transition-colors">
                    Post on X (Twitter)
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Tag campus community
                  </div>
                </div>
              </a>

              {/* Copy Direct Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F6F2E7]">
                    {copiedLink ? "Link Copied!" : "Copy Request Link"}
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    {copiedLink ? "Ready to paste anywhere" : "Paste in your bio or chat"}
                  </div>
                </div>
              </button>
            </div>

            {/* Direct Form Fallback */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#a1a1aa]">
                Looking to submit your university directly? It takes under 60 seconds on Tally.
              </span>
              <a
                href={TALLY_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD23F] hover:underline flex items-center gap-1.5 shrink-0"
              >
                <span>Open Request Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
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
                Student Requests Logged
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Students rally their coursemates and submit requests via Tally. High student density puts your university directly in our next deployment window.
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
                Official Campus Drop
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                UniLife unlocks geofenced past questions, hostel discovery maps, peer escrow commerce, and food vendor delivery rails for all active departments.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FOUNDING MEMBER PERKS */}
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
              The Founding Member Club
            </h2>
            <p className="text-sm sm:text-base text-[rgba(246,242,231,0.7)] leading-relaxed mb-8">
              Students who request early don&apos;t just bring UniLife to their campus—they get permanent VIP status locked to their verified matric profile when the app goes live.
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
                    Permanent Founding Member Badge
                  </div>
                  <div className="text-xs text-[#a1a1aa] mt-0.5">
                    Exclusive Founding Member badge displayed next to your verified student name.
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
                <span>Claim Founding Member Perks &amp; Request</span>
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
            It takes less than 60 seconds to submit. Rally your coursemates and make your campus the next official launch hub.
          </p>

          <a
            href={TALLY_REQUEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#FFD23F] text-[#14151A] border-2 border-[#FFD23F] shadow-[4px_4px_0_#ff3d81] hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff3d81] active:translate-y-0 active:shadow-[2px_2px_0_#ff3d81] transition-all cursor-pointer"
          >
            <Vote className="w-4 h-4 stroke-[2.5]" />
            <span>Request Your Campus</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
