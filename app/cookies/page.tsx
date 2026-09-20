"use client";

import React, { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
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
} from "lucide-react";
import Link from "next/link";

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

  const handleSave = () => {
    saveCustomPreferences({
      analytics,
      marketing,
      preferences: prefsCookie,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    setPrefsCookie(true);
    acceptAll();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleRejectNonEssential = () => {
    setAnalytics(false);
    setMarketing(false);
    setPrefsCookie(false);
    rejectNonEssential();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F6F2E7] text-[#14151A] flex flex-col font-sans selection:bg-[#FFD23F] selection:text-[#14151A]">
      <Nav />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-14 max-w-[960px] mx-auto w-full">
        {/* Breadcrumb / Category Tag */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#8a8a7f] hover:text-[#14151A] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#8a8a7f] font-mono text-xs">/</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14151A] bg-[#FFD23F] px-2.5 py-0.5 rounded-full border border-[#14151A]/20">
            Cookie &amp; Storage Preferences
          </span>
        </div>

        {/* Hero Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#14151A] leading-tight mb-4">
            Cookie Settings &amp; Privacy Center
          </h1>
          <p className="text-[#46473f] text-base md:text-lg leading-relaxed max-w-[740px]">
            Manage how UniLife uses cookies, local device storage, and analytical tokens. Your campus data belongs to you, and we adhere strictly to the Nigerian Data Protection Regulation (NDPR) and international privacy benchmarks.
          </p>
        </div>

        {/* Status Card & Quick Controls */}
        <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 mb-8 shadow-[4px_4px_0_#14151A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14151A]">
                  Active Consent Status:
                </span>
                <span className="text-xs font-mono font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded">
                  {analytics && marketing && prefsCookie ? "All Enabled" : "Customized / Essential"}
                </span>
              </div>
              <p className="text-xs text-[#8a8a7f] mt-0.5 font-mono">
                {preferences.timestamp ? `Last updated: ${new Date(preferences.timestamp).toLocaleDateString()}` : "Using default configuration"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#14151A] text-white font-bold text-xs hover:bg-[#FFD23F] hover:text-[#14151A] transition-all cursor-pointer shadow-xs"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#14151A]/20 text-[#14151A] font-bold text-xs hover:bg-[#E5E4DC] transition-all cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-[#10b981]/15 border-2 border-[#10b981] text-[#0f5132] font-mono text-xs font-bold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#10b981]" />
              <span>Cookie preferences updated and saved to your device.</span>
            </div>
            <button
              onClick={() => setSavedSuccess(false)}
              className="text-[#0f5132] hover:opacity-75"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Detailed Categories Settings */}
        <div className="space-y-5 mb-10">
          {/* 1. Necessary */}
          <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[4px_4px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#14151A] text-[#FFD23F] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl uppercase text-[#14151A]">
                      1. Strictly Necessary Cookies
                    </h3>
                    <span className="font-mono text-[10px] font-bold uppercase text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded-full">
                      Always Active
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8a8a7f]">Essential for system integrity</p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={true}
                disabled={true}
                className="w-5 h-5 rounded accent-[#14151A] opacity-75 cursor-not-allowed mt-2"
                aria-label="Always active"
              />
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4">
              These files and tokens are technically required to provide the core services of UniLife. Without them, you cannot log into your student account, participate in verified challenges, or conduct safe escrow transactions on the campus marketplace.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>__session / token</strong>: Secure user authentication identifier.</div>
              <div><strong>unilife_csrf</strong>: Protection against Cross-Site Request Forgery.</div>
              <div><strong>unilife_cookie_consent_v1</strong>: Remembers your privacy settings choice.</div>
            </div>
          </div>

          {/* 2. Analytics */}
          <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[4px_4px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4f7fff]/15 text-[#4f7fff] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-[#14151A]">
                    2. Campus Analytics &amp; Telemetry
                  </h3>
                  <p className="font-mono text-xs text-[#8a8a7f]">Performance and page flow insights</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4">
              Help us understand which university departments use the platform most, identify slow page speeds on campus WiFi/cellular networks, and ensure application forms load reliably without crashes.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>_ga / _gid</strong>: Anonymized Google Analytics visitor count.</div>
              <div><strong>unilife_metric_perf</strong>: Tracks responsive load times across mobile devices.</div>
            </div>
          </div>

          {/* 3. Preferences */}
          <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[4px_4px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD23F]/30 text-[#14151A] flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-[#14151A]">
                    3. Functional &amp; Campus Preferences
                  </h3>
                  <p className="font-mono text-xs text-[#8a8a7f]">Remembers your view configurations</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={prefsCookie}
                  onChange={(e) => setPrefsCookie(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4">
              Stores your selected university campus (e.g. OOU Ago-Iwoye, UNILAG, UI), study category bookmark filters, collapsed FAQ drawers, and theme preferences so you don&apos;t have to reconfigure them every visit.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>unilife_campus_pref</strong>: Preserves your selected institution.</div>
              <div><strong>unilife_filter_state</strong>: Remembers your directory searches and filters.</div>
            </div>
          </div>

          {/* 4. Marketing */}
          <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[4px_4px_0_#14151A]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff3d81]/15 text-[#ff3d81] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-[#14151A]">
                    4. Sponsor Opportunities &amp; Grants
                  </h3>
                  <p className="font-mono text-xs text-[#8a8a7f]">Relevant career and grant highlights</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
              </label>
            </div>
            <p className="text-sm text-[#52534a] leading-relaxed mb-4">
              Allows our verified partner sponsors (e.g. NNPC, Indomie, Google Student Programs) to display curated grant and challenge notices relevant to your course of study without selling your personal identities.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#14151A]/10 font-mono text-xs text-[#60626a] space-y-1.5">
              <div><strong>unilife_campaign_src</strong>: Attribution for official scholarship opportunities.</div>
            </div>
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div className="bg-white border-2 border-[#14151A] rounded-2xl p-6 shadow-[6px_6px_0_#14151A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a7f]">
            <Cookie className="w-4 h-4 text-[#FFD23F]" />
            <span>Preferences are stored in your browser local storage.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={resetPreferences}
              className="px-4 py-2.5 rounded-xl border border-[#14151A]/20 bg-[#FAF9F5] hover:bg-[#E5E4DC] text-[#14151A] font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-7 py-3 rounded-xl bg-[#14151A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FFD23F] hover:text-[#14151A] transition-all shadow-[2px_2px_0_#14151A] cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Apply Choices</span>
            </button>
          </div>
        </div>

        {/* Legal Link Out */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#8a8a7f] font-mono">
            Have questions about how we handle personal identifiers? Read our{" "}
            <Link
              href="/policy"
              className="text-[#14151A] font-bold underline underline-offset-4 hover:text-[#4f7fff]"
            >
              Privacy Policy
            </Link>{" "}
            or view our{" "}
            <Link
              href="/terms"
              className="text-[#14151A] font-bold underline underline-offset-4 hover:text-[#4f7fff]"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
