"use client";

import React, { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { useCookieConsent } from "@/components/CookieContext";
import {
  Cookie,
  ShieldCheck,
  Lock,
  BarChart3,
  Sliders,
  Sparkles,
  Check,
  RotateCcw,
  Info,
  ChevronDown,
  Copy,
  CheckCheck,
  RefreshCw,
  ExternalLink,
  Calendar,
  Database,
} from "lucide-react";
import Link from "next/link";

interface CookieInventoryItem {
  name: string;
  provider: string;
  type: "Session Cookie" | "Persistent Cookie" | "Local Storage";
  duration: string;
  category: "necessary" | "analytics" | "preferences" | "marketing";
  purpose: string;
}

const COOKIE_INVENTORY: CookieInventoryItem[] = [
  {
    name: "unilife_session_token",
    provider: "UniLife (First-party)",
    type: "Session Cookie",
    duration: "Browser Session",
    category: "necessary",
    purpose: "Authenticates your student identity and keeps you securely logged into marketplace and squads.",
  },
  {
    name: "unilife_csrf",
    provider: "UniLife (First-party)",
    type: "Session Cookie",
    duration: "Browser Session",
    category: "necessary",
    purpose: "Cryptographic defense preventing Cross-Site Request Forgery during application and listing submissions.",
  },
  {
    name: "unilife_cookie_consent_v1",
    provider: "UniLife (First-party)",
    type: "Local Storage",
    duration: "1 Year",
    category: "necessary",
    purpose: "Stores your personal cookie and privacy consent preferences as required by NDPR.",
  },
  {
    name: "unilife_campus_pref",
    provider: "UniLife (First-party)",
    type: "Local Storage",
    duration: "Persistent (until cleared)",
    category: "preferences",
    purpose: "Remembers your selected tertiary campus (e.g. OOU Ago-Iwoye, UNILAG, UI) for filtered campus feeds.",
  },
  {
    name: "unilife_filter_state",
    provider: "UniLife (First-party)",
    type: "Local Storage",
    duration: "30 Days",
    category: "preferences",
    purpose: "Maintains your search queries, hostel price filters, and scholarship department preferences.",
  },
  {
    name: "_ga, _gid",
    provider: "Google Analytics (First-party proxy)",
    type: "Persistent Cookie",
    duration: "2 Years / 24 Hours",
    category: "analytics",
    purpose: "Measures aggregate page views, bounce rates, and traffic trends without identifying individual students.",
  },
  {
    name: "unilife_perf_metrics",
    provider: "UniLife (First-party)",
    type: "Local Storage",
    duration: "7 Days",
    category: "analytics",
    purpose: "Diagnoses network latency and page load speeds across Nigerian cellular networks (MTN, Airtel, Glo).",
  },
  {
    name: "unilife_campaign_src",
    provider: "UniLife Partners",
    type: "Local Storage",
    duration: "60 Days",
    category: "marketing",
    purpose: "Measures scholarship grant discovery and partner challenge applications without selling user data.",
  },
];

interface FAQItem {
  q: string;
  a: string;
}

const COOKIE_FAQS: FAQItem[] = [
  {
    q: "What are cookies and browser storage tokens?",
    a: "Cookies and local storage are small, secure data files stored in your web browser. They help UniLife remember that you are logged in, retain your preferred university campus (such as OOU Ago-Iwoye, UNILAG, or UI), and keep your marketplace items safe from fraudulent attacks.",
  },
  {
    q: "Does UniLife sell or share my student data with third-party brokers?",
    a: "Never. Under the Nigeria Data Protection Act (NDPR/NDPA) and our core student charter, UniLife does not sell, lease, or syndicate student phone numbers, academic transcripts, or personal profiles to external advertising brokers.",
  },
  {
    q: "What happens if I reject analytics and preference cookies?",
    a: "You can still browse verified scholarships, submit applications, use the campus marketplace, and enter student innovation challenges. However, your campus selection won't be remembered between visits, and you may see generic rather than course-specific sponsorship alerts.",
  },
  {
    q: "Can I change or withdraw my consent at any time?",
    a: "Yes. You have complete sovereignty over your data. Simply revisit this page (/cookies) at any point, toggle your desired categories, and tap 'Save & Apply Choices'. Changes take effect immediately in your current browser session.",
  },
  {
    q: "How does UniLife comply with NDPR and international privacy laws?",
    a: "We practice strict privacy-by-design: all sensitive authentication tokens are encrypted, cookie consent is explicitly collected prior to non-essential script execution, and students have full rights to export or delete their accounts at any time.",
  },
];

export default function CookieSettingsPage() {
  const {
    preferences,
    saveCustomPreferences,
    acceptAll,
    rejectNonEssential,
    resetPreferences,
  } = useCookieConsent();

  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);
  const [prefsCookie, setPrefsCookie] = useState(preferences.preferences);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedTableTab, setSelectedTableTab] = useState<string>("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [copiedConsentId, setCopiedConsentId] = useState(false);

  // Generate a reproducible pseudo-consent ID from timestamp
  const consentId = preferences.timestamp
    ? `NDPR-${new Date(preferences.timestamp).getTime().toString(36).toUpperCase()}`
    : "NDPR-DEFAULT-SESSION";

  const handleSave = () => {
    saveCustomPreferences({
      analytics,
      marketing,
      preferences: prefsCookie,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    setPrefsCookie(true);
    acceptAll();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleRejectNonEssential = () => {
    setAnalytics(false);
    setMarketing(false);
    setPrefsCookie(false);
    rejectNonEssential();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = () => {
    setAnalytics(false);
    setMarketing(false);
    setPrefsCookie(false);
    resetPreferences();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCopyConsentId = () => {
    try {
      navigator.clipboard.writeText(consentId);
      setCopiedConsentId(true);
      setTimeout(() => setCopiedConsentId(false), 2500);
    } catch {}
  };

  const handleTestBanner = () => {
    try {
      localStorage.removeItem("unilife_cookie_consent_v1");
      alert("Local cookie preference reset! When you navigate or refresh, the interactive consent banner will reappear.");
      window.location.reload();
    } catch {}
  };

  const filteredInventory = COOKIE_INVENTORY.filter((item) => {
    if (selectedTableTab === "all") return true;
    return item.category === selectedTableTab;
  });

  return (
    <div className="min-h-screen bg-[#F6F2E7] text-[#14151A] flex flex-col font-sans selection:bg-[#FFD23F] selection:text-[#14151A]">
      <Nav active="/cookies" />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-14 max-w-[1040px] mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#8a8a7f] hover:text-[#14151A] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#8a8a7f] font-mono text-xs">/</span>
          <Link
            href="/policy"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#8a8a7f] hover:text-[#14151A] transition-colors"
          >
            Privacy
          </Link>
          <span className="text-[#8a8a7f] font-mono text-xs">/</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14151A] bg-[#FFD23F] px-3 py-1 rounded-full border border-[#14151A]/20">
            Cookie Preference Center
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10b981]/15 text-[#047857] border border-[#10b981]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              NDPR &amp; NDPA Compliant
            </span>
            <span className="text-xs font-mono text-[#8a8a7f]">
              Version 2026.1
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#14151A] leading-[1.05] mb-4">
            Cookie Preferences &amp; Privacy Center
          </h1>
          <p className="text-[#46473f] text-base md:text-lg leading-relaxed max-w-[780px]">
            Configure exactly which data tokens UniLife is allowed to store on your device. We respect student autonomy and enforce strict data minimization across all Nigerian university campus networks.
          </p>
        </div>

        {/* Live Consent Diagnostics Card */}
        <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-7 mb-8 shadow-[5px_5px_0_#14151A]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14151A]">
                      Current Consent Status:
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {analytics && marketing && prefsCookie
                        ? "Full Consent Granted"
                        : !analytics && !marketing && !prefsCookie
                        ? "Essential Cookies Only"
                        : "Customized Preferences"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#8a8a7f] mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {preferences.timestamp
                        ? `Last verified: ${new Date(preferences.timestamp).toLocaleDateString()}`
                        : "Default baseline"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" />
                      Encrypted in LocalStorage
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-xl bg-[#14151A] text-white font-bold text-xs hover:bg-[#4f7fff] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#14151A]/20 text-[#14151A] font-bold text-xs hover:bg-[#E5E4DC] transition-all cursor-pointer"
              >
                Essential Only
              </button>
              <button
                onClick={handleReset}
                title="Reset to default choices"
                className="p-2.5 rounded-xl border border-[#14151A]/20 bg-[#FAF9F5] hover:bg-[#E5E4DC] text-[#46473f] hover:text-[#14151A] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Audit ID & Tester Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8a8a7f]">
            <div className="flex items-center gap-2">
              <span>Audit Identifier:</span>
              <code className="px-2 py-0.5 bg-[#FAF9F5] border border-black/10 rounded font-bold text-[#14151A]">
                {consentId}
              </code>
              <button
                onClick={handleCopyConsentId}
                className="inline-flex items-center gap-1 text-[#4f7fff] hover:underline font-bold cursor-pointer"
              >
                {copiedConsentId ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleTestBanner}
              className="inline-flex items-center gap-1.5 text-xs text-[#46473f] hover:text-[#14151A] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset &amp; Trigger Floating Banner
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-mono text-xs font-bold flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Preferences successfully saved and applied to your current device session.</span>
              </div>
              <button
                onClick={() => setSavedSuccess(false)}
                className="text-emerald-800 hover:text-emerald-950 cursor-pointer p-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 Interactive Category Settings Cards */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl uppercase tracking-tight text-[#14151A]">
              Consent Categories
            </h2>
            <span className="text-xs font-mono text-[#8a8a7f]">
              Toggle switches and click Save below
            </span>
          </div>

          {/* 1. Necessary */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-7 shadow-[5px_5px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#14151A] text-[#FFD23F] flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl uppercase text-[#14151A]">
                      1. Strictly Necessary &amp; Security Tokens
                    </h3>
                    <span className="font-mono text-[10px] font-bold uppercase text-[#047857] bg-[#10b981]/15 border border-[#10b981]/30 px-3 py-0.5 rounded-full">
                      Always Active / Required
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8a8a7f] mt-0.5">
                    Mandatory for secure student authentication and escrow protection
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-xs font-bold text-black/40 bg-black/5 px-3 py-1.5 rounded-lg border border-black/10">
                  Locked On
                </span>
              </div>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4 pl-0 sm:pl-16">
              These cookies and tokens are technically required to provide the core services of UniLife. Without them, you cannot log into your student account, enter verified innovation challenges, or conduct safe peer-to-peer transactions on the campus marketplace.
            </p>
            <div className="sm:ml-16 p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>unilife_session_token</strong>: Secure user authentication identifier.</div>
              <div><strong>unilife_csrf</strong>: Protection against Cross-Site Request Forgery.</div>
              <div><strong>unilife_cookie_consent_v1</strong>: Records your privacy choices under NDPR.</div>
            </div>
          </div>

          {/* 2. Analytics */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-7 shadow-[5px_5px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4f7fff]/15 text-[#4f7fff] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl uppercase text-[#14151A]">
                      2. Campus Analytics &amp; Network Telemetry
                    </h3>
                    <span className={`font-mono text-[10px] font-bold uppercase px-3 py-0.5 rounded-full border ${
                      analytics
                        ? "text-[#4f7fff] bg-[#4f7fff]/10 border-[#4f7fff]/30"
                        : "text-[#8a8a7f] bg-black/5 border-black/10"
                    }`}>
                      {analytics ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8a8a7f] mt-0.5">
                    Anonymous speed measurements across university networks
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle Campus Analytics"
                />
                <div className="w-13 h-7 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#4f7fff]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4 pl-0 sm:pl-16">
              Help us understand which university departments use the platform most, identify slow page speeds on campus WiFi and cellular networks, and ensure scholarship forms load smoothly without freezing.
            </p>
            <div className="sm:ml-16 p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>_ga, _gid</strong>: Anonymized visitor counts via Google Analytics.</div>
              <div><strong>unilife_perf_metrics</strong>: Diagnoses connection stability on MTN/Airtel/Glo campus cells.</div>
            </div>
          </div>

          {/* 3. Preferences */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-7 shadow-[5px_5px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD23F]/30 text-[#14151A] flex items-center justify-center shrink-0">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl uppercase text-[#14151A]">
                      3. Functional &amp; Campus Preferences
                    </h3>
                    <span className={`font-mono text-[10px] font-bold uppercase px-3 py-0.5 rounded-full border ${
                      prefsCookie
                        ? "text-[#B45309] bg-[#FFD23F]/30 border-[#FFD23F]"
                        : "text-[#8a8a7f] bg-black/5 border-black/10"
                    }`}>
                      {prefsCookie ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8a8a7f] mt-0.5">
                    Remembers your university institution and filter bookmarks
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={prefsCookie}
                  onChange={(e) => setPrefsCookie(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle Functional Preferences"
                />
                <div className="w-13 h-7 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#FFD23F]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4 pl-0 sm:pl-16">
              Stores your selected university campus (e.g. OOU Ago-Iwoye, UNILAG, UI), study category bookmark filters, collapsed FAQ drawers, and theme preferences so you don&apos;t have to re-select them on every page reload.
            </p>
            <div className="sm:ml-16 p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>unilife_campus_pref</strong>: Preserves your selected institution.</div>
              <div><strong>unilife_filter_state</strong>: Remembers your directory searches and filters.</div>
            </div>
          </div>

          {/* 4. Marketing / Opportunities */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] p-6 sm:p-7 shadow-[5px_5px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ff3d81]/15 text-[#ff3d81] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl uppercase text-[#14151A]">
                      4. Sponsor Grants &amp; Career Opportunities
                    </h3>
                    <span className={`font-mono text-[10px] font-bold uppercase px-3 py-0.5 rounded-full border ${
                      marketing
                        ? "text-[#BE185D] bg-[#ff3d81]/15 border-[#ff3d81]/30"
                        : "text-[#8a8a7f] bg-black/5 border-black/10"
                    }`}>
                      {marketing ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8a8a7f] mt-0.5">
                    Curated tuition grants and corporate challenge notifications
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle Sponsor Opportunities"
                />
                <div className="w-13 h-7 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#ff3d81]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4 pl-0 sm:pl-16">
              Allows our verified partner sponsors (e.g. NNPC, Indomie, Google Student Programs) to display curated grant and challenge notices relevant to your course of study without selling your personal identifiers.
            </p>
            <div className="sm:ml-16 p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>unilife_campaign_src</strong>: Attribution for official scholarship opportunities.</div>
            </div>
          </div>
        </div>

        {/* Save Bar (Prominent and clear) */}
        <div className="sticky bottom-6 z-30 bg-[#14151A] text-white rounded-[24px] p-5 sm:p-6 shadow-[0_15px_35px_rgba(20,21,26,0.35)] border-2 border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD23F] text-[#14151A] flex items-center justify-center font-bold shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Ready to save your custom privacy settings?
              </div>
              <div className="text-xs text-white/60">
                Your selections will be permanently respected until you update them again.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all cursor-pointer text-center"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-8 py-3 rounded-full bg-[#FFD23F] text-[#14151A] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[2px_2px_0_#4f7fff] cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Apply Choices</span>
            </button>
          </div>
        </div>

        {/* Concrete Cookie Inventory Table (NDPR Transparency) */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-[#14151A]">
                Official Storage &amp; Cookie Inventory
              </h2>
              <p className="text-sm text-[#46473f]">
                Full technical disclosure of all tokens and identifiers stored by UniLife.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-black/10">
              {["all", "necessary", "analytics", "preferences", "marketing"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTableTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-colors cursor-pointer ${
                    selectedTableTab === tab
                      ? "bg-[#14151A] text-white"
                      : "text-[#46473f] hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border-2 border-[#14151A] rounded-[24px] overflow-hidden shadow-[4px_4px_0_#14151A]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF9F5] border-b border-black/10 font-mono uppercase tracking-wider text-[#8a8a7f]">
                    <th className="py-3.5 px-4 font-bold">Identifier Name</th>
                    <th className="py-3.5 px-4 font-bold">Provider</th>
                    <th className="py-3.5 px-4 font-bold">Storage Type</th>
                    <th className="py-3.5 px-4 font-bold">Duration</th>
                    <th className="py-3.5 px-4 font-bold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-sans">
                  {filteredInventory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#14151A]">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#46473f] whitespace-nowrap">
                        {item.provider}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/5 text-[#14151A]">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#8a8a7f] whitespace-nowrap">
                        {item.duration}
                      </td>
                      <td className="py-3.5 px-4 text-[#46473f] max-w-xs">
                        {item.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Interactive Privacy FAQ Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl uppercase tracking-tight text-[#14151A] mb-6">
            Frequently Asked Privacy Questions
          </h2>
          <div className="space-y-3">
            {COOKIE_FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white border-2 border-[#14151A] rounded-2xl overflow-hidden shadow-[3px_3px_0_#14151A]"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#14151A] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-black/60 transition-transform duration-200 shrink-0 ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-[#52534a] leading-relaxed border-t border-black/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Reference Links */}
        <div className="p-6 bg-white border border-black/10 rounded-2xl text-center">
          <p className="text-xs text-[#8a8a7f] font-mono leading-relaxed">
            Need comprehensive legal disclosures? Review our{" "}
            <Link
              href="/policy"
              className="text-[#14151A] font-bold underline underline-offset-4 hover:text-[#4f7fff]"
            >
              Privacy Policy
            </Link>
            , explore our{" "}
            <Link
              href="/terms"
              className="text-[#14151A] font-bold underline underline-offset-4 hover:text-[#4f7fff]"
            >
              Terms of Service
            </Link>
            , or reach our Data Protection Officer at{" "}
            <a
              href="mailto:dpo@unilife.com.ng"
              className="text-[#4f7fff] font-bold hover:underline"
            >
              dpo@unilife.com.ng
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
