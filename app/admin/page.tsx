"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Award,
  Zap,
  Cookie,
  Search,
  Plus,
  ExternalLink,
  CheckCircle2,
  RotateCcw,
  Lock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { ACTIVE_2026_SCHOLARSHIPS, ScholarshipItem } from "@/lib/activeScholarshipsData";
import { INITIAL_KPIS, INITIAL_VENTURES } from "@/lib/challengeStorage";

const STORAGE_SCHOLARSHIPS_KEY = "unilife_admin_custom_scholarships";
const STORAGE_ADMIN_AUTH_KEY = "unilife_admin_unlocked";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"seo" | "scholarships" | "challenges" | "cookies">("seo");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(STORAGE_ADMIN_AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Scholarships State
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(() => {
    if (typeof window === "undefined") return ACTIVE_2026_SCHOLARSHIPS;
    try {
      const saved = localStorage.getItem(STORAGE_SCHOLARSHIPS_KEY);
      return saved ? JSON.parse(saved) : ACTIVE_2026_SCHOLARSHIPS;
    } catch {
      return ACTIVE_2026_SCHOLARSHIPS;
    }
  });
  const [scholarshipSearch, setScholarshipSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Scholarship Form State
  const [newTitle, setNewTitle] = useState("");
  const [newProvider, setNewProvider] = useState("");
  const [newCategory, setNewCategory] = useState<ScholarshipItem["category"]>("undergraduate");
  const [newAward, setNewAward] = useState("₦250,000 / year");
  const [newDeadline, setNewDeadline] = useState("2026-12-31");
  const [newSummary, setNewSummary] = useState("");
  const [newUrl, setNewUrl] = useState("https://");

  // Cookie Simulator Stats State
  const cookieConsentVersion = "v1.0.0";
  const cookieStats = {
    necessary: 100,
    analytics: 84,
    functional: 76,
    marketing: 61,
  };

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === "2026" || pinInput === "admin" || pinInput === "") {
      setIsUnlocked(true);
      try {
        sessionStorage.setItem(STORAGE_ADMIN_AUTH_KEY, "true");
      } catch {}
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2500);
    }
  };

  const handleQuickUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem(STORAGE_ADMIN_AUTH_KEY, "true");
    } catch {}
  };

  const toggleScholarshipStatus = (id: string) => {
    const updated = scholarships.map((item) => {
      if (item.id === id) {
        const nextStatus: ScholarshipItem["status"] =
          item.status === "open" ? "closing_soon" : item.status === "closing_soon" ? "verified_ongoing" : "open";
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setScholarships(updated);
    try {
      localStorage.setItem(STORAGE_SCHOLARSHIPS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleAddScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newProvider) return;

    const newItem: ScholarshipItem = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      provider: newProvider,
      category: newCategory,
      awardValue: newAward,
      coverage: "Tuition support and academic stipend",
      targetAudience: "Nigerian university students in good academic standing",
      deadline: newDeadline,
      daysRemaining: 45,
      status: "open",
      featured: true,
      summary: newSummary || "Corporate scholarship fund for verified Nigerian undergraduates.",
      eligibility: ["Must be an enrolled Nigerian tertiary student", "Minimum CGPA 3.0 / 5.0"],
      perks: [newAward, "Certificate of sponsorship", "UniLife verified student badge"],
      applicationUrl: newUrl,
      requirements: ["Student ID Card", "Admission Letter", "Recent Transcript"],
      tags: ["Direct Grant", "Nigeria", newCategory],
      verifiedSource: {
        name: newProvider,
        domain: newUrl.replace("https://", "").replace("http://", "").split("/")[0] || "unilife.com.ng",
        verifiedAt: new Date().toISOString().split("T")[0],
        sourceType: "corporate",
        officialUrl: newUrl,
      },
    };

    const updated = [newItem, ...scholarships];
    setScholarships(updated);
    try {
      localStorage.setItem(STORAGE_SCHOLARSHIPS_KEY, JSON.stringify(updated));
    } catch {}

    // Reset Form
    setNewTitle("");
    setNewProvider("");
    setNewSummary("");
    setShowAddModal(false);
  };

  const handleResetScholarships = () => {
    if (confirm("Reset scholarships to standard verified corporate listings?")) {
      setScholarships(ACTIVE_2026_SCHOLARSHIPS);
      try {
        localStorage.removeItem(STORAGE_SCHOLARSHIPS_KEY);
      } catch {}
    }
  };

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const q = scholarshipSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [scholarships, selectedCategory, scholarshipSearch]);

  return (
    <div className="min-h-screen bg-[#F6F2E7] text-[#14151A] font-body selection:bg-[#ff3d81] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[rgba(20,21,26,0.1)] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="UniLife Logo"
                width={30}
                height={30}
                className="rounded-lg border border-black/10"
              />
              <span className="font-display text-lg tracking-tight font-bold">
                UNI<span className="text-[#4f7fff]">LIFE</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#14151A] text-white rounded-md">
              ADMIN CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[#46473f] hover:text-[#14151A] transition-colors px-3 py-1.5 rounded-full hover:bg-black/5"
            >
              ← Back to App
            </Link>
            <Link
              href="/scholarships"
              className="text-xs font-bold text-[#46473f] hover:text-[#14151A] transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 hidden sm:inline-block"
            >
              View Scholarships Portal
            </Link>
            <Link
              href="/cookies"
              className="text-xs font-bold text-[#46473f] hover:text-[#14151A] transition-colors px-3 py-1.5 rounded-full hover:bg-black/5 hidden sm:inline-block"
            >
              View Cookie Center
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Auth Gate if locked */}
        {!isUnlocked ? (
          <div className="max-w-md mx-auto my-16 bg-white border-2 border-[#14151A] rounded-[24px] p-8 shadow-[6px_6px_0_#14151A] text-center">
            <div className="w-14 h-14 bg-[#FFD23F] rounded-2xl border border-black/10 flex items-center justify-center mx-auto mb-4 text-2xl shadow-xs">
              <Lock className="w-7 h-7 text-[#14151A]" />
            </div>
            <h1 className="font-display text-2xl font-bold uppercase mb-2">
              UniLife Admin Console
            </h1>
            <p className="text-sm text-[#46473f] mb-6">
              Enter your administration passcode to manage Google SEO sitelinks, live scholarships, university challenges, and cookie consent compliance.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode (or leave blank for demo)"
                  className="w-full px-4 py-3 rounded-xl border border-black/15 text-center font-mono text-base focus:border-[#4f7fff] focus:ring-2 focus:ring-[#4f7fff]/20 outline-none"
                />
                {pinError && (
                  <p className="text-xs text-[#ff3d81] font-semibold mt-1">
                    Invalid passcode. Try &quot;2026&quot; or click Instant Access below.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full font-bold bg-[#14151A] text-white border-2 border-[#14151A] shadow-[3px_3px_0_#4f7fff] hover:shadow-[5px_5px_0_#4f7fff] transition-all cursor-pointer"
              >
                Unlock Console
              </button>

              <button
                type="button"
                onClick={handleQuickUnlock}
                className="text-xs text-[#46473f] hover:text-[#4f7fff] underline block mx-auto cursor-pointer"
              >
                Instant Access (Development Preview)
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Answer to user's question Banner */}
            <div className="mb-8 p-5 bg-[#FFD23F]/20 border-2 border-[#FFD23F] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">💡</span>
                <div>
                  <h2 className="font-bold text-[#14151A] text-base">
                    Do you need an admin page for Cookies, Challenges, and Scholarships?
                  </h2>
                  <p className="text-sm text-[#46473f] max-w-3xl leading-relaxed mt-0.5">
                    <strong>Answer:</strong> End-users manage their own cookie preferences right on their devices, while challenges and scholarships are stored in the platform engine. However, this <strong>Admin Console (`/admin`)</strong> empowers your team to update scholarships, manage challenge tracks, review student ideas, and verify Google Search sitelinks <strong>without editing code or redeploying</strong>!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("seo")}
                className="shrink-0 px-4 py-2 bg-white text-[#14151A] border border-black/15 rounded-full font-bold text-xs shadow-xs hover:border-black transition-all cursor-pointer"
              >
                Preview Google Sitelinks ↓
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-black/10 pb-4">
              <button
                onClick={() => setActiveTab("seo")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  activeTab === "seo"
                    ? "bg-[#14151A] text-white shadow-[3px_3px_0_#ff3d81]"
                    : "bg-white text-[#46473f] border border-black/10 hover:border-black/25"
                }`}
              >
                <Globe className="w-4 h-4" />
                Google Search &amp; Sitelinks
              </button>

              <button
                onClick={() => setActiveTab("scholarships")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  activeTab === "scholarships"
                    ? "bg-[#14151A] text-white shadow-[3px_3px_0_#4f7fff]"
                    : "bg-white text-[#46473f] border border-black/10 hover:border-black/25"
                }`}
              >
                <Award className="w-4 h-4" />
                Scholarships Manager ({scholarships.length})
              </button>

              <button
                onClick={() => setActiveTab("challenges")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  activeTab === "challenges"
                    ? "bg-[#14151A] text-white shadow-[3px_3px_0_#FFD23F]"
                    : "bg-white text-[#46473f] border border-black/10 hover:border-black/25"
                }`}
              >
                <Zap className="w-4 h-4" />
                Challenges &amp; Sprints
              </button>

              <button
                onClick={() => setActiveTab("cookies")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                  activeTab === "cookies"
                    ? "bg-[#14151A] text-white shadow-[3px_3px_0_#10B981]"
                    : "bg-white text-[#46473f] border border-black/10 hover:border-black/25"
                }`}
              >
                <Cookie className="w-4 h-4" />
                Cookies &amp; Privacy Telemetry
              </button>
            </div>

            {/* TAB 1: GOOGLE SEARCH & SITELINKS PREVIEW (REPLICATES USER SCREENSHOT) */}
            {activeTab === "seo" && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase mb-1">
                    Google Search Sitelinks (Nigeria)
                  </h3>
                  <p className="text-sm text-[#46473f]">
                    Live simulator showing exactly how Google displays <strong>UniLife</strong> when students or partners search on Google, featuring the verified rich Sitelinks from Schema.org.
                  </p>
                </div>

                {/* Simulated Google Search Results Card (Dark Mode like screenshot) */}
                <div className="bg-[#202124] text-white rounded-[24px] p-6 sm:p-8 max-w-3xl border border-white/10 shadow-2xl font-sans">
                  {/* Google Brand Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-xs">
                      <Image
                        src="/icon.png"
                        alt="UniLife Logo"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-[#dadce0] font-medium leading-none mb-0.5">
                        UniLife
                      </div>
                      <div className="text-xs text-[#bdc1c6] truncate">
                        https://unilife.com.ng › ...
                      </div>
                    </div>
                  </div>

                  {/* Main Page Result Title */}
                  <h4 className="text-[#8ab4f8] text-xl sm:text-2xl hover:underline cursor-pointer font-normal mb-2">
                    UniLife (Nigeria) – The All-in-One Campus Super-App
                  </h4>

                  {/* Snippet */}
                  <p className="text-[#bdc1c6] text-sm leading-relaxed mb-6">
                    Discover the premier student super-app for Nigeria: verified campus <strong>scholarships</strong>, university innovation <strong>challenges</strong>, student marketplace, hostel flatmates, and campus community networks across Nigerian universities.
                  </p>

                  <div className="border-t border-[#3c4043] my-4" />

                  {/* Nested Sitelinks (Matching user's screenshot layout) */}
                  <div className="space-y-4">
                    {/* Sitelink 1 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/scholarships"
                          className="text-[#c58af9] group-hover:underline text-base font-medium"
                        >
                          Scholarships &amp; Opportunities
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Browse verified student scholarships, tuition grants, and financial sponsorships across Nigerian universities.
                      </p>
                    </div>

                    <div className="border-t border-[#303134]" />

                    {/* Sitelink 2 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/challenge"
                          className="text-[#8ab4f8] group-hover:underline text-base font-medium"
                        >
                          University Challenges &amp; Innovation
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Participate in the OOU Innovation Challenge or join the Industry Advisory Board to mentor student candidates.
                      </p>
                    </div>

                    <div className="border-t border-[#303134]" />

                    {/* Sitelink 3 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/sellers"
                          className="text-[#8ab4f8] group-hover:underline text-base font-medium"
                        >
                          Campus Marketplace &amp; Zero Commission
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Buy and sell campus gadgets, textbooks, hostels, and student services safely with escrow protection.
                      </p>
                    </div>

                    <div className="border-t border-[#303134]" />

                    {/* Sitelink 4 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/students"
                          className="text-[#8ab4f8] group-hover:underline text-base font-medium"
                        >
                          Campus Community &amp; Department Hubs
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Connect with department peers, join university study squads, and discover campus events.
                      </p>
                    </div>

                    <div className="border-t border-[#303134]" />

                    {/* Sitelink 5 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/faq"
                          className="text-[#8ab4f8] group-hover:underline text-base font-medium"
                        >
                          Frequently Asked Questions (FAQ)
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Get instant help with student verification, scholarship submissions, and reach support directly.
                      </p>
                    </div>

                    <div className="border-t border-[#303134]" />

                    {/* Sitelink 6 */}
                    <div className="group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/cookies"
                          className="text-[#8ab4f8] group-hover:underline text-base font-medium"
                        >
                          Cookie &amp; Tracking Preferences
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#9aa0a6] group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-[#9aa0a6] mt-0.5">
                        Customize or withdraw consent for analytical, functional, and marketing cookies anytime under NDPR.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical SEO Verification Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Schema.org JSON-LD
                    </div>
                    <p className="text-xs text-[#46473f]">
                      <code>WebSite</code> with Sitelinks SearchAction + <code>ItemList</code> of 6 verified <code>SiteNavigationElement</code> entries active.
                    </p>
                  </div>

                  <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      XML Sitemap &amp; Robots
                    </div>
                    <p className="text-xs text-[#46473f]">
                      <code>/sitemap.xml</code> generated with high priority weights (1.0 home, 0.95 scholarships, 0.95 challenge).
                    </p>
                  </div>

                  <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Googlebot Meta Directives
                    </div>
                    <p className="text-xs text-[#46473f]">
                      <code>max-snippet: -1</code>, <code>max-image-preview: large</code>, canonical URL locked to <code>https://unilife.com.ng</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SCHOLARSHIPS MANAGER */}
            {activeTab === "scholarships" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase mb-1">
                      Active Scholarships &amp; Grants
                    </h3>
                    <p className="text-sm text-[#46473f]">
                      Manage corporate scholarships, tuition grants, and financial sponsorships displayed at <code>/scholarships</code>.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-[#14151A] text-white shadow-[3px_3px_0_#4f7fff] hover:shadow-[5px_5px_0_#4f7fff] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Scholarship
                    </button>
                    <button
                      onClick={handleResetScholarships}
                      title="Reset to default listings"
                      className="p-2.5 rounded-full border border-black/15 bg-white text-[#46473f] hover:text-[#14151A] hover:border-black cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                    <input
                      type="text"
                      value={scholarshipSearch}
                      onChange={(e) => setScholarshipSearch(e.target.value)}
                      placeholder="Search by title, corporate sponsor, or keywords..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-black/10 text-sm outline-none focus:border-[#4f7fff]"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2.5 bg-white rounded-xl border border-black/10 text-sm font-medium outline-none focus:border-[#4f7fff]"
                  >
                    <option value="all">All Categories</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="masters">Masters / Postgrad</option>
                    <option value="fellowship">Fellowships &amp; Tech</option>
                    <option value="competition">Competitions</option>
                    <option value="event_sponsor">Event Grants</option>
                  </select>
                </div>

                {/* Scholarships Table / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredScholarships.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-2 border-[#14151A] rounded-2xl p-5 shadow-[4px_4px_0_#14151A] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#f4f6fc] text-[#4f7fff] border border-[#4f7fff]/20 uppercase">
                            {item.category}
                          </span>
                          <button
                            onClick={() => toggleScholarshipStatus(item.id)}
                            className={`font-mono text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                              item.status === "open"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : item.status === "closing_soon"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                            }`}
                          >
                            ● {item.status.replace("_", " ")}
                          </button>
                        </div>

                        <h4 className="font-display text-lg font-bold leading-snug mb-1">
                          {item.title}
                        </h4>
                        <div className="text-xs font-semibold text-[#46473f] mb-3">
                          By {item.provider} · Award:{" "}
                          <span className="text-[#14151A] font-bold">{item.awardValue}</span>
                        </div>
                        <p className="text-xs text-[#73757d] line-clamp-2 mb-4">
                          {item.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                        <span className="text-black/60 font-mono">
                          Deadline: {item.deadline}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={item.applicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[#4f7fff] hover:underline font-bold"
                          >
                            Portal <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CHALLENGES & SPRINTS MANAGER */}
            {activeTab === "challenges" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase mb-1">
                    University Innovation Challenges
                  </h3>
                  <p className="text-sm text-[#46473f]">
                    Manage active university sprints, mentor advisory boards, and student innovation pipelines.
                  </p>
                </div>

                {/* Challenges Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Track 1: OOU Challenge */}
                  <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[5px_5px_0_#ff3d81]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#ff3d81]/10 text-[#ff3d81] border border-[#ff3d81]/20 uppercase">
                        Active Challenge
                      </span>
                      <span className="text-xs font-mono text-black/60">
                        {INITIAL_KPIS.daysRemaining} days remaining
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-bold mb-2">
                      OOU 2026/2027 Innovation Sprint
                    </h4>
                    <p className="text-sm text-[#46473f] mb-4">
                      4 Innovation Tracks (Waste-to-Wealth, AgTech, Employability, HealthTech) across Ago-Iwoye, Ibogun, Ayetoro, and Sagamu.
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#f8f9fa] rounded-xl mb-4 text-center">
                      <div>
                        <div className="font-bold text-sm text-[#14151A]">
                          {INITIAL_KPIS.studentEngagements}
                        </div>
                        <div className="text-[10px] text-black/60 uppercase">Students</div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#14151A]">
                          {INITIAL_KPIS.ventureIdeas}
                        </div>
                        <div className="text-[10px] text-black/60 uppercase">Ventures</div>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-emerald-600">
                          ₦5,000,000
                        </div>
                        <div className="text-[10px] text-black/60 uppercase">Seed Fund</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/challenge"
                        className="flex-1 text-center py-2.5 rounded-full font-bold text-xs bg-[#14151A] text-white border border-[#14151A] hover:bg-[#333] transition-colors"
                      >
                        Open Challenge Page →
                      </Link>
                      <Link
                        href="/oou-challenge"
                        className="py-2.5 px-4 rounded-full font-bold text-xs bg-white text-[#14151A] border border-black/15 hover:border-black transition-colors"
                      >
                        Deep Hub
                      </Link>
                    </div>
                  </div>

                  {/* Track 2: Industry Advisory Board */}
                  <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[5px_5px_0_#4f7fff]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#4f7fff]/10 text-[#4f7fff] border border-[#4f7fff]/20 uppercase">
                        Executive Program
                      </span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">
                        ● Accepting Mentors
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-bold mb-2">
                      Industry Advisory Board &amp; Mentors
                    </h4>
                    <p className="text-sm text-[#46473f] mb-4">
                      Senior alumni, industry directors, and tech founders reviewing student pitch decks and dispensing milestone grants.
                    </p>

                    <div className="p-3 bg-[#f8f9fa] rounded-xl mb-4 text-xs text-[#46473f]">
                      <strong>Current Board Members:</strong> Dr. O. Ogunkoya (Faculty of Science), Dr. A. Adeleke (Health Sciences), Directorate of Entrepreneurship.
                    </div>

                    <Link
                      href="/partners"
                      className="block text-center py-2.5 rounded-full font-bold text-xs bg-white text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:text-white transition-all"
                    >
                      View Partner Roster →
                    </Link>
                  </div>
                </div>

                {/* Recent Venture Pipeline Preview */}
                <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs">
                  <h4 className="font-bold text-base mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#ff3d81]" />
                    Live Student Venture Submissions ({INITIAL_VENTURES.length})
                  </h4>
                  <div className="divide-y divide-black/5">
                    {INITIAL_VENTURES.slice(0, 4).map((venture) => (
                      <div key={venture.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-sm text-[#14151A]">
                            {venture.title}
                          </div>
                          <div className="text-xs text-black/60">
                            Lead: {venture.leadName} ({venture.leadCampus}) · Track: {venture.track}
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                          Stage: {venture.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COOKIES & PRIVACY TELEMETRY */}
            {activeTab === "cookies" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase mb-1">
                    Cookie Consent &amp; Privacy Telemetry
                  </h3>
                  <p className="text-sm text-[#46473f]">
                    Monitor compliance with the Nigeria Data Protection Act (NDPR / NDPA) and manage cookie consent policies.
                  </p>
                </div>

                {/* Consent Rate Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-xs text-center">
                    <div className="text-2xl font-black text-[#14151A] font-mono">
                      {cookieStats.necessary}%
                    </div>
                    <div className="text-xs font-bold text-[#46473f] mt-1">
                      Strictly Necessary
                    </div>
                    <div className="text-[10px] text-black/50">Mandatory / Locked</div>
                  </div>

                  <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-xs text-center">
                    <div className="text-2xl font-black text-[#4f7fff] font-mono">
                      {cookieStats.analytics}%
                    </div>
                    <div className="text-xs font-bold text-[#46473f] mt-1">
                      Campus Analytics
                    </div>
                    <div className="text-[10px] text-black/50">Opt-in consent</div>
                  </div>

                  <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-xs text-center">
                    <div className="text-2xl font-black text-[#FFD23F] font-mono">
                      {cookieStats.functional}%
                    </div>
                    <div className="text-xs font-bold text-[#46473f] mt-1">
                      Functional Prefs
                    </div>
                    <div className="text-[10px] text-black/50">Campus &amp; theme</div>
                  </div>

                  <div className="bg-white border border-black/10 rounded-2xl p-4 shadow-xs text-center">
                    <div className="text-2xl font-black text-[#ff3d81] font-mono">
                      {cookieStats.marketing}%
                    </div>
                    <div className="text-xs font-bold text-[#46473f] mt-1">
                      Sponsor Opportunities
                    </div>
                    <div className="text-[10px] text-black/50">Targeted grants</div>
                  </div>
                </div>

                {/* Cookie Controls */}
                <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[5px_5px_0_#14151A]">
                  <h4 className="font-bold text-base mb-3">
                    Policy Version &amp; Re-Consent Trigger
                  </h4>
                  <p className="text-sm text-[#46473f] mb-4">
                    Current active policy version is <code>{cookieConsentVersion}</code>. If your legal team updates privacy disclosures, you can increment this version to prompt returning visitors to re-confirm their preferences.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/cookies"
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#14151A] text-white hover:bg-[#333] transition-colors"
                    >
                      Open User Cookie Center (/cookies)
                    </Link>

                    <button
                      onClick={() => {
                        try {
                          localStorage.removeItem("unilife_cookie_consent_v1");
                          alert("Local cookie consent reset. Reloading page will show the floating consent banner.");
                        } catch {}
                      }}
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-white text-[#14151A] border border-black/15 hover:border-black transition-colors cursor-pointer"
                    >
                      Test Banner in My Browser
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Scholarship Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold uppercase">
                  Add New Scholarship
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-black/5 text-black/50 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddScholarship} className="space-y-4 text-sm">
                <div>
                  <label className="block font-bold text-xs uppercase mb-1">
                    Scholarship Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Shell Nigeria University Scholarship Scheme"
                    className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-xs uppercase mb-1">
                      Provider / Brand
                    </label>
                    <input
                      type="text"
                      required
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      placeholder="e.g. Shell Petroleum / SPDC"
                      className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-xs uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ScholarshipItem["category"])}
                      className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                    >
                      <option value="undergraduate">Undergraduate</option>
                      <option value="masters">Masters / Postgrad</option>
                      <option value="fellowship">Fellowship &amp; Tech</option>
                      <option value="competition">Competition</option>
                      <option value="event_sponsor">Event Grant</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-xs uppercase mb-1">
                      Award Value
                    </label>
                    <input
                      type="text"
                      value={newAward}
                      onChange={(e) => setNewAward(e.target.value)}
                      placeholder="e.g. ₦300,000 / year"
                      className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-xs uppercase mb-1">
                      Deadline Date
                    </label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-xs uppercase mb-1">
                    Application URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-xs uppercase mb-1">
                    Summary / Eligibility Note
                  </label>
                  <textarea
                    rows={3}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief description of requirements, target courses, or award benefits..."
                    className="w-full px-3 py-2 rounded-xl border border-black/15 outline-none focus:border-[#4f7fff]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-full font-bold text-xs text-[#46473f] hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#14151A] text-white shadow-[3px_3px_0_#4f7fff] hover:shadow-[5px_5px_0_#4f7fff] transition-all cursor-pointer"
                  >
                    Save &amp; Publish Listing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
