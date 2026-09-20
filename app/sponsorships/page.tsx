"use client";

import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { VERIFIED_SPONSORSHIPS, SponsorshipOpportunity } from "@/lib/sponsorshipsData";
import { SCHOLARSHIP_PORTAL_CATEGORIES } from "@/lib/scholarshipCategories";
import {
  ShieldCheck,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  X,
  AlertCircle
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Opportunities" },
  { id: "undergraduate", label: "Undergrad" },
  { id: "masters", label: "Masters / Postgrad" },
  { id: "fellowship", label: "Fellowships & Tech" },
  { id: "competition", label: "Competitions" },
  { id: "event_sponsor", label: "Event Grants" },
];

export default function SponsorshipPageContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<SponsorshipOpportunity | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: VERIFIED_SPONSORSHIPS.length };
    VERIFIED_SPONSORSHIPS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredOpportunities = useMemo(() => {
    return VERIFIED_SPONSORSHIPS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyLink = (id: string, url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased selection:bg-[#ff3d81] selection:text-white">
      <Nav active="/sponsorships" />

      {/* ---- HERO SECTION (Consistent with /students and /sellers) ---- */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase font-bold">
              2026 Student Financial Aid & Grants
            </span>

            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              Fuel your degree. <br />
              <span className="text-[#ff3d81]">Zero fees.</span>
            </h1>

            <p className="text-[#46473f] text-base sm:text-lg leading-relaxed mb-8 max-w-[500px]">
              Direct corporate scholarships, tuition stipends, and campus grants for verified Nigerian undergraduates and postgraduates. Verified ongoing deadlines — zero middleman charges.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#portals"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Explore Portals ↓
              </a>
              <a
                href="#opportunities"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-[#F6F2E7] transition-all whitespace-nowrap"
              >
                Browse Scholarships ({VERIFIED_SPONSORSHIPS.length})
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full h-auto aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl bg-[#EFE9D9] relative border border-[rgba(20,21,26,0.1)]"
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              alt="Nigerian university students studying together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-[rgba(20,21,26,0.12)] rounded-2xl p-4 shadow-lg flex gap-3.5 items-center">
              <div className="w-11 h-11 bg-[#FFD23F] rounded-xl shrink-0 flex items-center justify-center text-xl border border-[#14151A]/10">
                🎓
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <b className="text-[0.92rem] font-bold text-[#14151A] truncate">
                    ₦45,000,000+ Active Pool
                  </b>
                  <span className="shrink-0 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="font-mono text-[0.72rem] text-black/60 block truncate">
                  Direct portals via Scholarship Region & Foundations
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- EDITORIAL TICKER TAPE ---- */}
      <div className="border-y border-[#14151A]/10 bg-white py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-widest text-[#14151A]/70 px-4">
              <span>★ VERIFIED 2026 SCHOLARSHIPS</span>
              <span className="text-[#ff3d81]">★ DIRECT APPLICATION PORTALS</span>
              <span>★ ZERO AGENT CHARGES</span>
              <span className="text-[#4f7fff]">★ SCHOLARSHIP REGION AUDITED</span>
              <span>★ UNDERGRADUATE, MASTERS & TECH FELLOWSHIPS</span>
              <span className="text-emerald-600">★ 100% FREE TO APPLY</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- SECTION: EXPLORE BY LEVEL OF STUDY ---- */}
      <section id="portals" className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center mb-14 max-w-[720px] mx-auto">
          <span className="inline-block font-mono text-xs tracking-widest text-[#059669] bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
            Curated Academic Portals
          </span>
          <h2 className="font-display text-3xl md:text-5xl uppercase mb-4 text-[#14151A]">
            Verified Portals by Level of Study.
          </h2>
          <p className="text-[#46473f] text-base sm:text-lg leading-relaxed">
            Direct directories maintained with official partner portals and <strong>Scholarship Region</strong>:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOLARSHIP_PORTAL_CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] rounded-xl flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/60 bg-[#F6F2E7] px-3 py-1 rounded-full border border-black/10 group-hover:bg-[#FFD23F] group-hover:text-black transition-colors">
                    {cat.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-black/50 mb-1">{cat.level}</div>
                <h3 className="font-bold text-lg text-[#14151A] mb-2 group-hover:text-[#4f7fff] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[#46473f] text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(20,21,26,0.08)] flex items-center justify-between text-xs font-bold text-[#14151A] group-hover:text-[#ff3d81] transition-colors">
                <span>Browse Portals</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ---- SECTION: VERIFIED SCHOLARSHIPS DIRECTORY ---- */}
      <section id="opportunities" className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-block font-mono text-xs tracking-widest text-[#4f7fff] bg-[rgba(79,127,255,0.1)] border border-[rgba(79,127,255,0.25)] px-3 py-1 rounded-full mb-3 uppercase font-bold">
              Active Deadlines
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-[#14151A] leading-tight">
              Featured 2026 Scholarships & Grants
            </h2>
          </div>

          <div className="text-xs font-mono text-black/60">
            Showing {filteredOpportunities.length} of {VERIFIED_SPONSORSHIPS.length} active opportunities
          </div>
        </div>

        {/* SEARCH & CATEGORY CHIPS */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. MTN, Selar, STEM, Undergrad, ₦300,000, TotalEnergies)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[rgba(20,21,26,0.15)] rounded-2xl text-base placeholder:text-black/40 focus:outline-none focus:border-[#14151A] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-black/50 hover:text-black uppercase"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 border ${
                    isSelected
                      ? "bg-[#14151A] text-white border-[#14151A] shadow-sm"
                      : "bg-white text-[#14151A] border-[rgba(20,21,26,0.12)] hover:bg-black/5"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-[#ff3d81] text-white" : "bg-black/10 text-black/70"
                    }`}
                  >
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARDS GRID */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white border border-dashed border-[rgba(20,21,26,0.2)] rounded-2xl p-12 text-center my-8">
            <AlertCircle className="w-10 h-10 text-black/40 mx-auto mb-3" />
            <h3 className="font-display text-2xl uppercase tracking-tight text-[#14151A] mb-2">
              No matching scholarships found
            </h3>
            <p className="text-black/60 max-w-md mx-auto text-sm mb-6">
              Couldn&apos;t find opportunities matching &ldquo;{searchQuery}&rdquo;. Try broader keywords like &ldquo;Undergrad&rdquo;, &ldquo;STEM&rdquo;, or &ldquo;Nigeria&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="bg-[#14151A] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#059669] bg-[rgba(52,211,153,0.12)] border border-[rgba(52,211,153,0.25)] px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {opp.provider}
                    </span>

                    <span className="font-mono text-xs text-black/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {opp.daysRemaining} days left
                    </span>
                  </div>

                  {/* Title & Value */}
                  <h3 className="font-bold text-xl text-[#14151A] leading-snug mb-3">
                    {opp.title}
                  </h3>

                  <div className="inline-block bg-[#FFD23F] text-[#14151A] font-bold font-mono text-xs px-3 py-1 rounded-md mb-4 border border-[#14151A]/10">
                    💰 {opp.awardValue}
                  </div>

                  <p className="text-[#46473f] text-sm leading-relaxed mb-5 line-clamp-2">
                    {opp.summary}
                  </p>

                  {/* Target Audience */}
                  <div className="text-xs font-mono text-black/60 bg-[#F6F2E7] p-2.5 rounded-xl border border-black/5 mb-6">
                    <span className="font-bold text-black/80">Eligibility: </span>
                    {opp.targetAudience}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[rgba(20,21,26,0.08)] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedOpportunity(opp)}
                    className="inline-flex items-center gap-2 font-bold text-sm text-[#14151A] hover:text-[#ff3d81] transition-colors"
                  >
                    <span>View Requirements & Tips</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-[#14151A] text-white hover:bg-[#ff3d81] hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span className="text-white font-bold">Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---- DETAILS MODAL ---- */}
      <AnimatePresence>
        {selectedOpportunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOpportunity(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-3xl border border-[rgba(20,21,26,0.15)] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F6F2E7] border border-black/10 flex items-center justify-center text-black/60 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#059669] bg-[rgba(52,211,153,0.15)] px-3 py-1 rounded-full uppercase mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {selectedOpportunity.provider}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl uppercase text-[#14151A] leading-snug mb-3">
                  {selectedOpportunity.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#FFD23F] text-[#14151A] font-mono font-bold text-xs px-3 py-1 rounded-md">
                    💰 {selectedOpportunity.awardValue}
                  </span>
                  <span className="font-mono text-xs text-black/60">
                    Deadline: <strong>{selectedOpportunity.deadline}</strong> ({selectedOpportunity.daysRemaining} days remaining)
                  </span>
                </div>
              </div>

              {/* Coverage & Description */}
              <div className="mb-6 p-4 rounded-2xl bg-[#F6F2E7] border border-black/5 text-sm text-[#333] leading-relaxed">
                <b className="block text-black mb-1">Benefit & Coverage:</b>
                {selectedOpportunity.coverage}
              </div>

              {/* Eligibility Criteria */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-black/60 font-bold mb-3">
                  Who Qualifies:
                </h4>
                <div className="space-y-2">
                  {selectedOpportunity.eligibility.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#333]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks */}
              {selectedOpportunity.perks && selectedOpportunity.perks.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-black/60 font-bold mb-3">
                    Scholarship Privileges:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.perks.map((perk, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white border border-black/10 px-3 py-1.5 rounded-lg text-black/80 font-medium"
                      >
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-6 border-t border-[rgba(20,21,26,0.1)] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleCopyLink(selectedOpportunity.id, selectedOpportunity.applicationUrl)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/20 text-xs font-mono text-black hover:bg-[#F6F2E7] transition-colors"
                >
                  {copiedId === selectedOpportunity.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Portal Link</span>
                    </>
                  )}
                </button>

                <a
                  href={selectedOpportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-sm bg-[#14151A] text-white hover:bg-[#ff3d81] shadow-lg transition-all"
                >
                  <span>Open Official Application Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---- BOTTOM BANNER: DIRECT WHATSAPP ALERTS ---- */}
      <section className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <span className="inline-block font-mono text-xs tracking-widest text-[#FFD23F] uppercase font-bold mb-4">
            Never Miss An Opening
          </span>
          <h2 className="font-display text-3xl md:text-5xl uppercase mb-4 text-[#F6F2E7]">
            Get 2026 Scholarship Alerts First.
          </h2>
          <p className="text-[rgba(246,242,231,0.75)] mb-8 max-w-[540px] mx-auto text-base md:text-lg leading-relaxed font-normal">
            New corporate tuition schemes drop throughout the semester. Join our student WhatsApp dispatch for deadline reminders and essay tips.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348164670694?text=Hi%20UniLife%2C%20please%20add%20me%20to%20the%202026%20Scholarship%20Alerts%20broadcast."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-[#FFD23F] text-[#14151A] border-2 border-[#14151A] shadow-[3px_3px_0px_#14151A] hover:scale-105 active:scale-95 transition-all"
            >
              Join WhatsApp Alerts →
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#14151A] transition-all"
            >
              List a Campus Grant
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
