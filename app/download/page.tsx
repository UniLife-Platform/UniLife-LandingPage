"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  Smartphone,
  QrCode,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  MessageCircle,
  X,
  ExternalLink,
} from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=ng.com.unilife.app";
const WHATSAPP_URL = "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl";

export default function DownloadPage() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsWaitlisted(true);
    }, 900);
  };

  return (
    <div className="bg-[#F6F2E7] dark:bg-[#14151A] text-[#14151A] dark:text-[#F6F2E7] min-h-screen overflow-x-clip font-body antialiased transition-colors duration-200">
      
      {/* QR ZOOM MODAL */}
      <AnimatePresence>
        {isQrZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setIsQrZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white dark:bg-[#1c1d24] border border-[rgba(20,21,26,0.12)] dark:border-white/15 p-8 sm:p-10 rounded-[28px] max-w-sm w-full flex flex-col items-center shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsQrZoomed(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-sm transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 bg-[#10b981]/15 text-[#10b981] rounded-2xl flex items-center justify-center mb-4">
                <QrCode size={28} />
              </div>

              <h3 className="font-display text-2xl uppercase tracking-wide mb-1 text-center text-[#14151A] dark:text-white">
                Scan to Install
              </h3>
              <p className="font-mono text-xs text-[#73757d] dark:text-[#a1a1aa] uppercase tracking-wider mb-6">
                Android Edition • Play Store
              </p>

              <div className="relative bg-white p-4 rounded-2xl border border-[rgba(20,21,26,0.1)] shadow-inner mb-6 flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(PLAYSTORE_URL)}`}
                  alt="UniLife App Download QR Code"
                  width={240}
                  height={240}
                  className="rounded-xl block"
                />
              </div>

              <a
                href={PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm text-[#4f7fff] hover:underline"
              >
                Open Google Play directly <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Nav active="/download" />

      {/* ---- HERO SECTION ---- */}
      <section className="pt-20 sm:pt-24 pb-14 px-6 md:px-12 max-w-[1240px] mx-auto">
        <div className="text-center max-w-[850px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/10 border border-[rgba(20,21,26,0.12)] dark:border-white/15 text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>Official Apps &amp; Downloads</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.8rem)] uppercase mb-6 leading-[1.02] tracking-tight">
              The Campus Super-App <br />
              <span className="text-[#4f7fff]">In Your Pocket.</span>
            </h1>

            <p className="text-[#46473f] dark:text-[#a1a1aa] text-lg sm:text-xl leading-relaxed max-w-[680px] mx-auto mb-8 font-medium">
              Verified past questions with AI explanations, campus peer-to-peer marketplace,
              anonymous university discussions, and SP rewards. Download UniLife today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2">
                <div className="flex text-[#FFD23F] text-base gap-0.5">★★★★★</div>
                <span className="font-bold text-sm">4.8 / 5.0 Rating</span>
              </div>
              <div className="h-4 w-px bg-black/15 dark:bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#46473f] dark:text-[#a1a1aa]">
                <Users size={16} className="text-[#4f7fff]" />
                <span className="font-bold text-[#14151A] dark:text-white">400+ Verified Students</span>
              </div>
              <div className="h-4 w-px bg-black/15 dark:bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#46473f] dark:text-[#a1a1aa]">
                <ShieldCheck size={16} className="text-[#10b981]" />
                <span className="font-bold text-[#14151A] dark:text-white">100% Free For Students</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- PRIMARY DOWNLOAD GRID ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* ANDROID CARD (MAIN DOWNLOAD) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-white dark:bg-[#1c1d24] border-2 border-[#14151A] dark:border-white/15 rounded-[32px] p-8 sm:p-10 shadow-[8px_8px_0_#14151A] dark:shadow-[8px_8px_0_#FFD23F] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Badge */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  Live on Google Play • V1.0
                </div>
                <span className="font-mono text-xs text-[#73757d] dark:text-[#a1a1aa]">
                  Android 7.0+
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl uppercase mb-3">
                Android Edition
              </h2>
              <p className="text-[#46473f] dark:text-[#a1a1aa] leading-relaxed mb-6">
                Access your campus feed, practice past questions with AI breakdown, list items on UniShop, and climb the student leaderboard.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Offline Past Questions & AI PDF Tutor",
                  "Peer-to-Peer Campus Marketplace",
                  "Anonymous Campus Confessions Feed",
                  "Earn Status Points (SP) & Rewards",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-sm font-medium">
                    <CheckCircle2 size={17} className="text-[#10b981] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CTA + QR Box */}
            <div className="pt-6 border-t border-[rgba(20,21,26,0.08)] dark:border-white/10 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="w-full sm:w-auto">
                <motion.a
                  href={PLAYSTORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#14151A] text-white dark:bg-[#FFD23F] dark:text-[#14151A] font-bold text-base shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] transition-all"
                >
                  <Smartphone size={20} />
                  <span>Get on Google Play</span>
                  <ArrowRight size={18} />
                </motion.a>
                <div className="mt-2 text-center sm:text-left">
                  <a
                    href={PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#73757d] dark:text-[#a1a1aa] hover:underline"
                  >
                    Direct Store Link →
                  </a>
                </div>
              </div>

              {/* QR Code Quick Scanner Box */}
              <div
                onClick={() => setIsQrZoomed(true)}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-[rgba(20,21,26,0.08)] dark:border-white/10 hover:border-[#10b981] transition-colors cursor-pointer group shrink-0"
                title="Click to expand QR Code"
              >
                <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(PLAYSTORE_URL)}`}
                    alt="QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="block font-mono text-[0.68rem] uppercase font-bold text-[#10b981] tracking-wider">
                    Scan From PC
                  </span>
                  <span className="block text-xs font-semibold text-[#14151A] dark:text-white group-hover:underline">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: iOS WAITLIST + EXPANSION */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* iOS WAITLIST CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-[#1c1d24] border-2 border-[rgba(20,21,26,0.12)] dark:border-white/15 rounded-[32px] p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4f7fff]/15 text-[#4f7fff] font-mono text-xs font-bold uppercase tracking-wider">
                    <Sparkles size={13} />
                    <span>In Active Dev</span>
                  </div>
                  <span className="font-mono text-xs text-[#73757d] dark:text-[#a1a1aa]">
                    TestFlight Beta
                  </span>
                </div>

                <h3 className="font-display text-2xl uppercase mb-2">
                  iPhone / iOS Edition
                </h3>
                <p className="text-sm text-[#46473f] dark:text-[#a1a1aa] leading-relaxed mb-6">
                  Finalizing the iOS build for Apple App Store. Join the waitlist and get direct early TestFlight invite access.
                </p>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  {!isWaitlisted ? (
                    <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
                      <input
                        type="email"
                        required
                        placeholder="Enter your student email..."
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3.5 rounded-xl border border-[rgba(20,21,26,0.15)] dark:border-white/15 bg-black/[0.02] dark:bg-white/5 text-sm focus:outline-none focus:border-[#4f7fff] dark:focus:border-[#4f7fff] transition-all"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#14151A] text-white dark:bg-white dark:text-[#14151A] font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Adding you..." : "Join iOS Waitlist →"}
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#10b981]">You&apos;re on the list!</p>
                        <p className="text-xs text-[#46473f] dark:text-[#a1a1aa]">We will alert {waitlistEmail} on beta release.</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* REQUEST YOUR CAMPUS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-[#1c1d24] border-2 border-[rgba(20,21,26,0.12)] dark:border-white/15 rounded-[32px] p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.7rem] bg-[#FFD23F]/20 text-[#14151A] dark:text-[#FFD23F] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Campus Expansion
                  </span>
                  <span className="font-mono text-xs text-[#10b981] font-bold">Vote Open</span>
                </div>

                <h3 className="font-display text-2xl uppercase mb-2">
                  Not at your campus yet?
                </h3>
                <p className="text-sm text-[#46473f] dark:text-[#a1a1aa] leading-relaxed mb-4">
                  Vote to bring UniLife to your university next. Rally your coursemates and faculties to speed up launch.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["UNILAG", "UI", "OAU", "LASU", "FUTA", "UNIBEN"].map((uni) => (
                    <span
                      key={uni}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-bold"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/request"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#FFD23F] text-[#14151A] font-bold text-sm hover:brightness-105 transition-all shadow-[2px_2px_0_#14151A]"
              >
                <span>Request Your Campus</span>
                <span>→</span>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ---- WHATSAPP & COMMUNITY BANNER ---- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="rounded-[32px] bg-[#14151A] text-[#F6F2E7] border-2 border-[#14151A] dark:border-white/15 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <MessageCircle size={14} />
              <span>Campus Community</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase mb-3">
              Join The Official UniLife Group
            </h2>
            <p className="text-[rgba(246,242,231,0.8)] text-base leading-relaxed">
              Get immediate announcements, report feedback directly to the developer team,
              and connect with student ambassadors across campuses.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20b858] hover:-translate-y-0.5 transition-all shadow-[4px_4px_0_#fff] dark:shadow-[4px_4px_0_#FFD23F] shrink-0"
          >
            <MessageCircle size={20} />
            <span>Join WhatsApp Community →</span>
          </a>
        </motion.div>

      </section>

      <Footer />
    </div>
  );
}
