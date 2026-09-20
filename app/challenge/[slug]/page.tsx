"use client";

import { use, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Award,
  Users,
  Building,
  Share2,
  X
} from "lucide-react";
import { getChallengeBySlug } from "@/lib/challengesData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const challenge = getChallengeBySlug(resolvedParams.slug);

  if (!challenge) {
    notFound();
  }

  // Embedded Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased flex flex-col justify-between">
      <div>
        <Nav active="/challenge" />

        {/* Breadcrumb / Top Bar */}
        <div className="px-6 md:px-16 pt-8 max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between py-3 border-b border-[rgba(20,21,26,0.1)]">
            <Link
              href="/challenge"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#14151A] hover:text-[#ff3d81] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Challenges</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(20,21,26,0.12)] text-xs font-mono text-[#14151A] hover:bg-[#14151A] hover:text-white transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Link Copied!" : "Share Challenge"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Header */}
        <header className="px-6 md:px-16 pt-10 pb-12 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full"
                  style={{
                    backgroundColor: challenge.badgeBg,
                    color: challenge.badgeAccent,
                    border: `1px solid ${challenge.badgeAccent}40`,
                  }}
                >
                  {challenge.badge}
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white border border-[rgba(20,21,26,0.12)] text-[#46473f] font-semibold">
                  {challenge.category}
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white border border-[rgba(20,21,26,0.12)] text-[#46473f]">
                  Scope: {challenge.campusScope}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#14151A] leading-[1.02] mb-4">
                {challenge.title}
              </h1>
              <p className="font-mono text-sm sm:text-base text-[#8a8a7f] uppercase font-bold tracking-wider mb-5">
                {challenge.subtitle}
              </p>
              <p className="text-lg md:text-xl text-[#46473f] leading-relaxed max-w-[720px] mb-8">
                {challenge.tagline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {challenge.formType === "google_form" || challenge.formType === "external" ? (
                  <a
                    href={challenge.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full font-bold text-sm md:text-base bg-[#14151A] text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <span>{challenge.externalLinkText}</span>
                    <ExternalLink className="w-5 h-5 text-[#FFD23F]" />
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="px-8 py-4 rounded-full font-bold text-sm md:text-base bg-[#14151A] text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <span>Apply via Form</span>
                      <ArrowUpRight className="w-5 h-5 text-[#FFD23F]" />
                    </button>

                    <a
                      href={challenge.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full font-bold text-xs md:text-sm bg-white text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:text-white transition-all flex items-center gap-2"
                    >
                      <span>{challenge.externalLinkText}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats Sidebar Card */}
            <div className="lg:col-span-4 bg-white border-2 border-[#14151A] rounded-[28px] p-6 shadow-[8px_8px_0_#14151A]">
              {challenge.prizePool && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(20,21,26,0.1)]">
                  <span className="font-mono text-xs uppercase font-bold text-[#8a8a7f]">Total Seed Pool</span>
                  <span className="font-mono text-base font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-0.5 rounded-full">
                    {challenge.prizePool}
                  </span>
                </div>
              )}

              <div className="space-y-4 text-xs font-mono mb-6">
                <div className="flex items-center justify-between py-2 border-b border-[rgba(20,21,26,0.06)]">
                  <span className="text-[#8a8a7f] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#14151A]" />
                    Deadline
                  </span>
                  <strong className="text-[#14151A]">{challenge.deadline}</strong>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[rgba(20,21,26,0.06)]">
                  <span className="text-[#8a8a7f] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#14151A]" />
                    Status
                  </span>
                  <span
                    className="font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${challenge.statusColor}20`,
                      color: challenge.statusColor,
                    }}
                  >
                    ● {challenge.status}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[rgba(20,21,26,0.06)]">
                  <span className="text-[#8a8a7f] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#14151A]" />
                    Engagement
                  </span>
                  <strong className="text-[#14151A]">{challenge.participantsCount}</strong>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#8a8a7f] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#14151A]" />
                    Host
                  </span>
                  <strong className="text-[#14151A] text-right truncate max-w-[180px]">
                    {challenge.institution}
                  </strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[rgba(20,21,26,0.1)]">
                <span className="font-mono text-[11px] text-[#8a8a7f] uppercase font-bold block mb-1">
                  Institutional Sponsor
                </span>
                <strong className="text-xs text-[#14151A] block">{challenge.partner}</strong>
                <p className="text-[11px] text-[#46473f] mt-0.5">{challenge.partnerRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 md:px-16 pb-20 max-w-[1200px] mx-auto space-y-12">
          {/* About & Eligibility Box */}
          <div className="bg-white border-2 border-[#14151A] rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0_#14151A]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff3d81] font-bold block mb-2">
              Overview & Guidelines
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase text-[#14151A] mb-4">
              About This Challenge
            </h2>
            <p className="text-[#46473f] text-base md:text-lg leading-relaxed mb-6">
              {challenge.description}
            </p>

            {challenge.highlights && challenge.highlights.length > 0 && (
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {challenge.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-4 rounded-xl bg-[#FAF7F0] border border-[#14151A]/10 font-mono text-xs text-[#14151A] flex items-start gap-2"
                  >
                    <span className="text-[#10b981] font-bold">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[rgba(20,21,26,0.1)]">
              <strong className="text-xs font-mono uppercase text-[#14151A] tracking-wider block mb-1">
                Who is Eligible to Enter:
              </strong>
              <p className="text-sm text-[#46473f] leading-relaxed">{challenge.eligibility}</p>
            </div>
          </div>

          {/* Tracks / Challenge Pillars */}
          <div className="bg-white border-2 border-[#14151A] rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0_#14151A]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-bold block mb-2">
              Innovation Arenas
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase text-[#14151A] mb-6">
              Challenge Focus Tracks & Deliverables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenge.tracksOrPillars.map((track, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F0] border-2 border-[#14151A] rounded-[24px] p-6 shadow-[4px_4px_0_rgba(20,21,26,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl bg-white border border-[rgba(20,21,26,0.1)] w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm">
                        {track.icon}
                      </span>
                      <h3 className="font-display text-xl uppercase text-[#14151A]">{track.title}</h3>
                    </div>
                    <p className="text-sm text-[#46473f] leading-relaxed mb-3">{track.desc}</p>
                    {track.details && (
                      <p className="text-xs text-[#8a8a7f] leading-relaxed border-t border-[rgba(20,21,26,0.08)] pt-2.5">
                        {track.details}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-2">
                    {challenge.formType === "google_form" || challenge.formType === "external" ? (
                      <a
                        href={challenge.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-[#14151A] hover:text-[#ff3d81] flex items-center gap-1 cursor-pointer"
                      >
                        <span>
                          {challenge.id === "alumni-mentorship-board" ? "Fill Google Form" : "Submit for this Track"}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setIsFormOpen(true)}
                        className="text-xs font-mono font-bold text-[#14151A] hover:text-[#ff3d81] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Submit for this Track</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Milestones (If Available) */}
          {challenge.schedule && challenge.schedule.length > 0 && (
            <div className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-8 md:p-12 shadow-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FFD23F] font-bold block mb-2">
                Timeline & Delivery
              </span>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-white mb-6">
                Milestone Schedule
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {challenge.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[11px] text-[#10b981] font-bold block mb-1">
                        {item.timeline}
                      </span>
                      <h4 className="font-bold text-sm text-white mb-2 leading-snug">{item.phase}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-white/10 font-mono text-[10px] text-[#FFD23F]">
                      Step 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Embedded Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white border-2 border-[#14151A] rounded-[28px] overflow-hidden shadow-2xl z-10 h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 bg-[#14151A] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#FFD23F] font-bold uppercase px-2 py-0.5 rounded bg-white/10">
                    Registration Portal
                  </span>
                  <h4 className="font-bold text-sm truncate max-w-[320px] sm:max-w-md">
                    {challenge.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={challenge.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full bg-[#f4f6fc] relative">
                <iframe
                  src={challenge.formUrl}
                  title={challenge.title}
                  className="w-full h-full border-none"
                  allow="geolocation; microphone; camera"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
