"use client";

import { useState, useId, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Award,
  Search,
  Sparkles,
  X,
  Building,
  ChevronRight
} from "lucide-react";
import { ALL_CHALLENGES } from "@/lib/challengesData";

const CATEGORIES = [
  "All",
  "Entrepreneurship",
  "Tech & Hackathon",
  "Creative & Media",
  "Commerce",
  "Research & Grants",
  "Social Impact",
] as const;

export default function ChallengesDirectoryPage() {
  const searchInputId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Modal for viewing or directly applying to a challenge form
  const [activeFormModal, setActiveFormModal] = useState<{
    title: string;
    url: string;
  } | null>(null);

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    return ALL_CHALLENGES.filter((ch) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.campusScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || ch.category === selectedCategory;

      const matchesStatus =
        statusFilter === "All" || ch.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, statusFilter]);

  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased flex flex-col justify-between">
      <div>
        <Nav active="/challenge" />

        {/* ---- HERO HEADER ---- */}
        <header className="px-6 md:px-16 pt-14 md:pt-20 pb-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[760px]"
            >
              <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[1.5px] text-[#14151A] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>UniLife Challenge Directory • 2026/2027</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] uppercase text-[#14151A] mb-5">
                Explore campus challenges &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#14151A]">innovation sprints</span>
                  <svg
                    viewBox="0 0 200 60"
                    fill="none"
                    aria-hidden="true"
                    className="absolute -left-[5%] -top-[15%] w-[112%] h-[140%] z-0 overflow-visible"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                      d="M8 34C22 12 90 4 130 10C165 15 190 24 188 36C186 50 130 56 90 54C48 52 6 44 10 30"
                      stroke="#FFD23F"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>

              <p className="text-[#46473f] text-base md:text-lg leading-relaxed max-w-[660px]">
                Discover verified entrepreneurship programs, hackathons, creative showcases, and research grants across Nigerian universities. Apply directly through official Tally or Google Forms, and view individual challenge pages for criteria, timelines, and prize pools.
              </p>
            </motion.div>

            {/* Featured Highlight Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 shadow-[6px_6px_0_#14151A] shrink-0 w-full sm:w-[320px]"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(20,21,26,0.08)]">
                <span className="font-mono text-xs text-[#8a8a7f] uppercase font-bold">Featured Sprint</span>
                <span className="font-mono text-[11px] text-[#10b981] font-bold bg-[#10b981]/10 px-2 py-0.5 rounded-full">
                  Flagship
                </span>
              </div>
              <h3 className="font-bold text-base text-[#14151A] mb-1">
                OOU Entrepreneurship Challenge
              </h3>
              <p className="text-xs text-[#46473f] leading-snug mb-3">
                Spearheaded by Dr. Ogunkoya, Director of DEI at Olabisi Onabanjo University.
              </p>
              <div className="flex items-center justify-between font-mono text-xs pt-2 border-t border-[rgba(20,21,26,0.08)]">
                <span className="text-[#8a8a7f]">Seed Capital:</span>
                <span className="font-bold text-[#14151A] text-sm">₦5,000,000</span>
              </div>
              <Link
                href="/challenge/oou-venture-2026"
                className="mt-3.5 w-full py-2 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#ff3d81] transition-colors"
              >
                <span>View Full OOU Page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* ---- FILTER & SEARCH BAR ---- */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-4 sm:p-5 shadow-[6px_6px_0_#14151A] space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#8a8a7f] absolute left-4 top-1/2 -translate-y-1/2" />
                <label htmlFor={searchInputId} className="sr-only">
                  Search challenges by university, domain, or title
                </label>
                <input
                  id={searchInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, university (e.g. OOU), or topic..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[rgba(20,21,26,0.15)] text-sm text-[#14151A] placeholder:text-[#8a8a7f] focus:outline-none focus:ring-2 focus:ring-[#FFD23F]"
                />
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[rgba(20,21,26,0.15)] text-xs font-mono font-bold text-[#14151A] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="Active Sprint">Active Sprint</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
              <span className="text-[#8a8a7f] font-bold text-[11px] uppercase tracking-wider shrink-0 mr-1">
                Category:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full shrink-0 transition-all font-semibold cursor-pointer ${
                      isActive
                        ? "bg-[#14151A] text-[#F6F2E7] shadow-[2px_2px_0_#FFD23F]"
                        : "bg-[#FAF7F0] border border-[rgba(20,21,26,0.12)] text-[#46473f] hover:bg-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ---- CHALLENGES GRID ---- */}
        <main className="px-6 md:px-16 pb-24 max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-[#8a8a7f] uppercase font-bold">
              Showing {filteredChallenges.length} {filteredChallenges.length === 1 ? "Challenge" : "Challenges"}
            </span>

            {(searchQuery || selectedCategory !== "All" || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setStatusFilter("All");
                }}
                className="font-mono text-xs text-[#ff3d81] hover:underline cursor-pointer font-bold"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredChallenges.length === 0 ? (
            <div className="text-center py-20 bg-white border-2 border-[#14151A] rounded-[32px] p-8 shadow-[6px_6px_0_#14151A]">
              <Sparkles className="w-10 h-10 text-[#8a8a7f] mx-auto mb-3" />
              <h3 className="font-display text-2xl uppercase text-[#14151A] mb-2">
                No matching challenges found
              </h3>
              <p className="text-sm text-[#46473f] max-w-md mx-auto mb-5">
                Try searching for a different keyword or reset your category and status filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setStatusFilter("All");
                }}
                className="px-6 py-2.5 rounded-full bg-[#14151A] text-[#F6F2E7] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge, idx) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white border-2 border-[#14151A] rounded-[24px] overflow-hidden flex flex-col justify-between shadow-[6px_6px_0_#14151A] hover:translate-y-[-2px] transition-transform group"
                >
                  <div className="p-6">
                    {/* Top Row: Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: challenge.badgeBg,
                          color: challenge.badgeAccent,
                        }}
                      >
                        {challenge.badge}
                      </span>

                      <span
                        className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${challenge.statusColor}15`,
                          color: challenge.statusColor,
                        }}
                      >
                        ● {challenge.status}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className="font-display text-2xl uppercase text-[#14151A] mb-1 group-hover:text-[#ff3d81] transition-colors leading-snug">
                      <Link href={`/challenge/${challenge.slug}`}>
                        {challenge.title}
                      </Link>
                    </h2>
                    <p className="font-mono text-[11px] text-[#8a8a7f] uppercase font-bold tracking-wider mb-3">
                      {challenge.institution}
                    </p>

                    {/* Tagline */}
                    <p className="text-xs text-[#46473f] leading-relaxed line-clamp-3 mb-5">
                      {challenge.tagline}
                    </p>

                    {/* Key Attributes */}
                    <div className="space-y-2 pt-3 border-t border-[rgba(20,21,26,0.08)] font-mono text-xs">
                      <div className="flex items-center justify-between text-[#8a8a7f]">
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#14151A]" />
                          Prize Pool:
                        </span>
                        <strong className="text-[#10b981] font-bold">{challenge.prizePool}</strong>
                      </div>

                      <div className="flex items-center justify-between text-[#8a8a7f]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#14151A]" />
                          Deadline:
                        </span>
                        <strong className="text-[#14151A]">{challenge.deadline}</strong>
                      </div>

                      <div className="flex items-center justify-between text-[#8a8a7f]">
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[#14151A]" />
                          Scope:
                        </span>
                        <strong className="text-[#14151A] truncate max-w-[150px]">{challenge.campusScope}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="p-4 bg-[#FAF7F0] border-t-2 border-[#14151A] flex items-center justify-between gap-3">
                    <Link
                      href={`/challenge/${challenge.slug}`}
                      className="font-bold text-xs text-[#14151A] hover:text-[#ff3d81] flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() =>
                        setActiveFormModal({
                          title: challenge.title,
                          url: challenge.formUrl,
                        })
                      }
                      className="px-3.5 py-1.5 rounded-full bg-[#14151A] text-[#F6F2E7] font-bold text-xs hover:bg-[#ff3d81] transition-colors flex items-center gap-1 cursor-pointer shadow-[2px_2px_0_#FFD23F]"
                    >
                      <span>Apply</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD23F]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ---- EMBEDDED APPLICATION FORM MODAL ---- */}
      <AnimatePresence>
        {activeFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFormModal(null)}
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
                    Application Form
                  </span>
                  <h4 className="font-bold text-sm truncate max-w-[280px] sm:max-w-md">
                    {activeFormModal.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeFormModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveFormModal(null)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full bg-[#f4f6fc] relative">
                <iframe
                  src={activeFormModal.url}
                  title={activeFormModal.title}
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
