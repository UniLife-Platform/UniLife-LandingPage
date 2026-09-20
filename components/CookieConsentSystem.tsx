"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useCookieConsent } from "./CookieContext";
import {
  Cookie,
  ShieldCheck,
  Settings,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Lock,
} from "lucide-react";

export default function CookieConsentSystem() {
  const {
    hasDecided,
    preferences,
    isSettingsOpen,
    openSettings,
    closeSettings,
    acceptAll,
    rejectNonEssential,
    saveCustomPreferences,
  } = useCookieConsent();

  // Local state for modal toggles
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);
  const [prefsCookie, setPrefsCookie] = useState(preferences.preferences);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Sync state whenever modal opens
  const handleOpenModal = () => {
    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setPrefsCookie(preferences.preferences);
    openSettings();
  };

  const handleSaveModal = () => {
    saveCustomPreferences({
      analytics,
      marketing,
      preferences: prefsCookie,
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* ========================================================
          1. FLOATING BOTTOM BANNER (Shows until user decides)
          ======================================================== */}
      <AnimatePresence>
        {!hasDecided && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[490px] z-[9999]"
            role="region"
            aria-label="Cookie Consent Banner"
          >
            <div className="bg-[#14151A] text-[#F6F2E7] border-2 border-[#14151A] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#FFD23F] relative overflow-hidden">
              {/* Subtle ambient pattern */}
              <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#4f7fff]/20 blur-2xl" />

              <div className="relative">
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFD23F] text-[#14151A] flex items-center justify-center font-bold">
                      <Cookie className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#FFD23F]">
                      Cookie &amp; Privacy Choices
                    </span>
                  </div>

                  <button
                    onClick={rejectNonEssential}
                    className="text-[rgba(246,242,231,0.5)] hover:text-white p-1 transition-colors"
                    title="Dismiss and use essential only"
                    aria-label="Dismiss and use essential only"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Message */}
                <h4 className="font-display text-lg uppercase tracking-tight text-white mb-1.5">
                  We respect your campus data
                </h4>
                <p className="text-xs text-[rgba(246,242,231,0.75)] leading-relaxed mb-4">
                  We use cookies and local storage to keep your session authenticated, remember your university filters, measure traffic, and protect your student transactions.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={acceptAll}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#FFD23F] text-[#14151A] font-bold text-xs hover:bg-white transition-all shadow-[2px_2px_0_#ffffff] active:translate-y-0.5 cursor-pointer text-center"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={rejectNonEssential}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[rgba(246,242,231,0.08)] border border-[rgba(246,242,231,0.2)] text-white font-bold text-xs hover:bg-[rgba(246,242,231,0.16)] transition-all active:translate-y-0.5 cursor-pointer text-center"
                    >
                      Essential Only
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleOpenModal}
                      className="text-[11px] font-mono font-medium text-[rgba(246,242,231,0.7)] hover:text-[#FFD23F] flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
                    >
                      <Settings className="w-3 h-3" />
                      <span>Customize Preferences</span>
                    </button>

                    <Link
                      href="/policy"
                      className="text-[11px] font-mono text-[rgba(246,242,231,0.5)] hover:text-white transition-colors"
                    >
                      Privacy Policy →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          2. FLOATING BADGE (Allows reopening anytime)
          ======================================================== */}
      {hasDecided && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenModal}
          className="fixed bottom-4 left-4 z-40 bg-[#14151A] text-white p-2.5 rounded-full border-2 border-[#14151A] shadow-[3px_3px_0_#FFD23F] flex items-center gap-2 cursor-pointer group transition-all"
          title="Cookie & Privacy Settings"
          aria-label="Open Cookie & Privacy Settings"
        >
          <div className="w-5 h-5 rounded-full bg-[#FFD23F] text-[#14151A] flex items-center justify-center">
            <Cookie className="w-3 h-3" />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider pr-1.5 hidden group-hover:inline-block">
            Cookies
          </span>
        </motion.button>
      )}

      {/* ========================================================
          3. COMPREHENSIVE SETTINGS MODAL
          ======================================================== */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSettings}
              className="fixed inset-0 bg-[#14151A]/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white text-[#14151A] border-2 border-[#14151A] rounded-2xl sm:rounded-3xl shadow-[8px_8px_0_#14151A] w-full max-w-[620px] max-h-[90vh] flex flex-col overflow-hidden my-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
            >
              {/* Modal Header */}
              <div className="p-6 pb-4 border-b border-[#14151A]/10 bg-[#FAF9F5] flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#14151A] bg-[#FFD23F] px-2.5 py-0.5 rounded-full border border-[#14151A]/20">
                      Privacy Preferences
                    </span>
                    <span className="font-mono text-[10px] text-[#8a8a7f] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#10b981]" /> NDPR &amp; GDPR Compliant
                    </span>
                  </div>
                  <h3
                    id="cookie-settings-title"
                    className="font-display text-2xl uppercase tracking-tight text-[#14151A]"
                  >
                    Cookie &amp; Storage Settings
                  </h3>
                  <p className="text-xs text-[#52534a] mt-1 leading-relaxed">
                    Decide which cookies and local storage tokens UniLife can save on your device. Essential tokens cannot be switched off as they keep your student authentication and security safe.
                  </p>
                </div>

                <button
                  onClick={closeSettings}
                  className="w-8 h-8 rounded-full border border-[#14151A]/15 bg-white flex items-center justify-center text-[#14151A] hover:bg-[#14151A] hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Categories List */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* 1. Strictly Necessary */}
                <div className="p-4 rounded-xl border-2 border-[#14151A]/10 bg-[#FAF9F5] transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#14151A] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Lock className="w-4 h-4 text-[#FFD23F]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base uppercase text-[#14151A]">
                            Strictly Necessary
                          </h4>
                          <span className="text-[10px] font-mono font-bold uppercase text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded">
                            Always Active
                          </span>
                        </div>
                        <p className="text-xs text-[#52534a] mt-0.5 leading-relaxed">
                          Core session tokens, CSRF tokens, student verification locks, and security cookies required for UniLife to operate.
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled={true}
                        className="w-5 h-5 rounded accent-[#14151A] cursor-not-allowed opacity-80"
                        aria-label="Strictly necessary cookies always active"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand("necessary")}
                    className="mt-3 text-[11px] font-mono font-bold text-[#8a8a7f] hover:text-[#14151A] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{expandedSection === "necessary" ? "Hide details" : "Show technical details"}</span>
                    {expandedSection === "necessary" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {expandedSection === "necessary" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 pt-2 border-t border-[#14151A]/10 text-[11px] font-mono text-[#60626a] space-y-1"
                    >
                      <p>• <strong>__session / token</strong>: Authenticated student login identifier.</p>
                      <p>• <strong>unilife_csrf</strong>: Anti-forgery protection for forms.</p>
                      <p>• <strong>unilife_cookie_consent_v1</strong>: Your privacy state saved locally.</p>
                    </motion.div>
                  )}
                </div>

                {/* 2. Campus Analytics & Performance */}
                <div className="p-4 rounded-xl border-2 border-[#14151A]/10 bg-white hover:border-[#14151A]/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#4f7fff]/15 text-[#4f7fff] flex items-center justify-center shrink-0 mt-0.5">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-base uppercase text-[#14151A]">
                          Analytics &amp; Performance
                        </h4>
                        <p className="text-xs text-[#52534a] mt-0.5 leading-relaxed">
                          Helps us measure university page visits, track which scholarships or challenges are most viewed, and fix broken flows.
                        </p>
                      </div>
                    </div>

                    <label className="shrink-0 relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
                    </label>
                  </div>

                  <button
                    onClick={() => toggleExpand("analytics")}
                    className="mt-3 text-[11px] font-mono font-bold text-[#8a8a7f] hover:text-[#14151A] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{expandedSection === "analytics" ? "Hide details" : "Show technical details"}</span>
                    {expandedSection === "analytics" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {expandedSection === "analytics" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 pt-2 border-t border-[#14151A]/10 text-[11px] font-mono text-[#60626a] space-y-1"
                    >
                      <p>• <strong>_ga / _gid</strong>: Aggregated page analytics (IP anonymized).</p>
                      <p>• <strong>unilife_metric_perf</strong>: Measures load latency across university host connections.</p>
                    </motion.div>
                  )}
                </div>

                {/* 3. Personalization & Preferences */}
                <div className="p-4 rounded-xl border-2 border-[#14151A]/10 bg-white hover:border-[#14151A]/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFD23F]/25 text-[#14151A] flex items-center justify-center shrink-0 mt-0.5">
                        <Settings className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-base uppercase text-[#14151A]">
                          Functional Preferences
                        </h4>
                        <p className="text-xs text-[#52534a] mt-0.5 leading-relaxed">
                          Remembers your chosen university campus, bookmark filters, sorting order, and active FAQ states across visits.
                        </p>
                      </div>
                    </div>

                    <label className="shrink-0 relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prefsCookie}
                        onChange={(e) => setPrefsCookie(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
                    </label>
                  </div>
                </div>

                {/* 4. Marketing & Sponsor Announcements */}
                <div className="p-4 rounded-xl border-2 border-[#14151A]/10 bg-white hover:border-[#14151A]/30 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#ff3d81]/15 text-[#ff3d81] flex items-center justify-center shrink-0 mt-0.5">
                        <Cookie className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display text-base uppercase text-[#14151A]">
                          Campus Sponsorships &amp; Alerts
                        </h4>
                        <p className="text-xs text-[#52534a] mt-0.5 leading-relaxed">
                          Used to highlight relevant brand grants, career fairs, and hackathons tailored to your faculty or department.
                        </p>
                      </div>
                    </div>

                    <label className="shrink-0 relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketing}
                        onChange={(e) => setMarketing(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E4DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14151A]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 pt-4 border-t border-[#14151A]/10 bg-[#FAF9F5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#14151A]/20 bg-white text-[#14151A] font-bold text-xs hover:bg-[#F3F2EB] transition-colors cursor-pointer"
                >
                  Reject All Non-Essential
                </button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#FAF9F5] border-2 border-[#14151A] text-[#14151A] font-bold text-xs hover:bg-[#14151A] hover:text-white transition-all cursor-pointer"
                  >
                    Accept All
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveModal}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#14151A] text-white font-bold text-xs hover:bg-[#FFD23F] hover:text-[#14151A] transition-all shadow-[2px_2px_0_#14151A] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save My Choices</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
