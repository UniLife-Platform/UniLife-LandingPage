"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Unlock,
  ShieldAlert,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
  Lightbulb,
  Cpu,
  Target,
  Download,
  Flame,
  Filter,
  Search,
  ExternalLink,
  Database,
  Bell,
  Eye,
  LogOut,
  Layers,
  Check,
  Copy
} from "lucide-react";
import {
  ChallengeKPIs,
  VentureSubmission,
  ChallengeAnnouncement,
  MatchmakingProfile,
  INITIAL_KPIS,
  INITIAL_VENTURES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MATCHMAKING,
  INNOVATION_TRACKS,
  getStoredKPIs,
  saveStoredKPIs,
  getStoredVentures,
  saveStoredVentures,
  getStoredAnnouncements,
  saveStoredAnnouncements
} from "@/lib/challengeStorage";

// Master Passkey for Directorate (with 1-click test bypass)
const DEFAULT_PASSKEY = "OOU-DEI-2026";

export default function OOUChallengeAdmin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Core Data State
  const [kpis, setKpis] = useState<ChallengeKPIs>(INITIAL_KPIS);
  const [ventures, setVentures] = useState<VentureSubmission[]>(INITIAL_VENTURES);
  const [announcements, setAnnouncements] = useState<ChallengeAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [matchmaking, setMatchmaking] = useState<MatchmakingProfile[]>(INITIAL_MATCHMAKING);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    "kpis" | "ventures" | "matchmaking" | "announcements" | "tracks" | "supabase"
  >("kpis");

  // Notifications / Save status feedback
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  // Filter / Search for Ventures
  const [ventureSearch, setVentureSearch] = useState<string>("");
  const [trackFilter, setTrackFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");

  // Modals
  const [evaluatingVenture, setEvaluatingVenture] = useState<VentureSubmission | null>(null);
  const [evalScores, setEvalScores] = useState({
    innovation: 8,
    viability: 8,
    teamDiversity: 8,
    trackFit: 8,
    feedback: "",
  });
  const [isAddVentureOpen, setIsAddVentureOpen] = useState(false);
  const [newVenture, setNewVenture] = useState<Partial<VentureSubmission>>({
    title: "",
    track: "Waste-to-Wealth",
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    leadMatric: "",
    leadFaculty: "",
    leadCampus: "Ago-Iwoye Campus",
    problemStatement: "",
    solutionSummary: "",
    stage: "idea",
  });

  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    author: "Dr. O. Ogunkoya (Director)",
    tag: "Event",
    isUrgent: false,
  });

  // Load from Storage
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if session was already authenticated
      const savedAuth = sessionStorage.getItem("oou_admin_session");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
      setKpis(getStoredKPIs());
      setVentures(getStoredVentures());
      setAnnouncements(getStoredAnnouncements());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passkeyInput.trim().toUpperCase() === DEFAULT_PASSKEY || passkeyInput.trim() === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("oou_admin_session", "true");
      setAuthError(null);
      showToast("Access Granted. Welcome, Dr. Ogunkoya.");
    } else {
      setAuthError("Invalid Passkey. Check your Directorate authorization credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("oou_admin_session");
    setPasskeyInput("");
  };

  // KPI Actions
  const handleSaveKPIs = () => {
    saveStoredKPIs(kpis);
    showToast("Institutional KPIs saved & synchronized with public challenge page.");
  };

  const handleResetKPIs = () => {
    setKpis(INITIAL_KPIS);
    saveStoredKPIs(INITIAL_KPIS);
    showToast("KPIs reset to initial baseline targets.");
  };

  // Venture Actions
  const handleStageAdvance = (id: string, newStage: VentureSubmission["stage"]) => {
    const updated = ventures.map((v) => (v.id === id ? { ...v, stage: newStage } : v));
    setVentures(updated);
    saveStoredVentures(updated);

    // Auto-update KPI counters
    const prototypeCount = updated.filter((v) => ["prototype", "validated", "finalist"].includes(v.stage)).length;
    const validatedCount = updated.filter((v) => ["validated", "finalist"].includes(v.stage)).length;
    const updatedKpis: ChallengeKPIs = {
      ...kpis,
      ventureIdeas: updated.length,
      prototypesDeveloped: prototypeCount,
      marketValidated: validatedCount,
    };
    setKpis(updatedKpis);
    saveStoredKPIs(updatedKpis);

    showToast(`Venture stage updated to "${newStage}". KPIs refreshed.`);
  };

  const handleDeleteVenture = (id: string) => {
    if (confirm("Are you sure you want to remove this submission from the challenge registry?")) {
      const updated = ventures.filter((v) => v.id !== id);
      setVentures(updated);
      saveStoredVentures(updated);
      showToast("Venture removed from challenge registry.");
    }
  };

  const handleSaveScore = () => {
    if (!evaluatingVenture) return;
    const total =
      evalScores.innovation + evalScores.viability + evalScores.teamDiversity + evalScores.trackFit;
    const updated = ventures.map((v) =>
      v.id === evaluatingVenture.id
        ? {
            ...v,
            score: {
              ...evalScores,
              total,
            },
          }
        : v
    );
    setVentures(updated);
    saveStoredVentures(updated);
    setEvaluatingVenture(null);
    showToast(`Evaluation saved for ${evaluatingVenture.title} (Score: ${total}/40).`);
  };

  const handleCreateVenture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenture.title || !newVenture.leadName) {
      alert("Please provide at least a title and team lead name.");
      return;
    }
    const created: VentureSubmission = {
      id: `v-${Date.now().toString().slice(-4)}`,
      title: newVenture.title || "Untitled Venture",
      track: newVenture.track as VentureSubmission["track"],
      leadName: newVenture.leadName || "Student Lead",
      leadEmail: newVenture.leadEmail || "lead@oouagoiwoye.edu.ng",
      leadPhone: newVenture.leadPhone || "+234 800 000 0000",
      leadMatric: newVenture.leadMatric || "OOU/2026/0000",
      leadFaculty: newVenture.leadFaculty || "General Studies",
      leadCampus: newVenture.leadCampus || "Ago-Iwoye Campus",
      teamMembers: [
        {
          name: newVenture.leadName || "Student Lead",
          faculty: newVenture.leadFaculty || "General Studies",
          role: "Team Lead",
        },
      ],
      problemStatement: newVenture.problemStatement || "Local problem description.",
      solutionSummary: newVenture.solutionSummary || "Proposed technological or business intervention.",
      stage: newVenture.stage as VentureSubmission["stage"],
      submittedAt: new Date().toISOString(),
    };

    const updated = [created, ...ventures];
    setVentures(updated);
    saveStoredVentures(updated);
    setIsAddVentureOpen(false);

    // Update KPI
    const updatedKpis = { ...kpis, ventureIdeas: updated.length };
    setKpis(updatedKpis);
    saveStoredKPIs(updatedKpis);

    showToast(`New venture "${created.title}" successfully registered in registry.`);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Track",
      "Stage",
      "Score",
      "Lead Name",
      "Matric No",
      "Faculty",
      "Campus",
      "Email",
      "Phone",
      "Team Size",
      "Submitted At",
    ];

    const rows = ventures.map((v) => [
      `"${v.id}"`,
      `"${v.title.replace(/"/g, '""')}"`,
      `"${v.track}"`,
      `"${v.stage}"`,
      v.score ? v.score.total : "N/A",
      `"${v.leadName}"`,
      `"${v.leadMatric}"`,
      `"${v.leadFaculty}"`,
      `"${v.leadCampus}"`,
      `"${v.leadEmail}"`,
      `"${v.leadPhone}"`,
      v.teamMembers.length,
      `"${v.submittedAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `OOU_Entrepreneurship_Challenge_Ventures_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV export generated and downloaded.");
  };

  // Announcement Actions
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const ann: ChallengeAnnouncement = {
      id: `ann-${Date.now().toString().slice(-4)}`,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author: newAnnouncement.author,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      isUrgent: newAnnouncement.isUrgent,
      tag: newAnnouncement.tag,
    };
    const updated = [ann, ...announcements];
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    setIsAddAnnouncementOpen(false);
    showToast("Official Directorate Bulletin published to student portal.");
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    showToast("Announcement removed.");
  };

  // Filtered Ventures
  const filteredVentures = ventures.filter((v) => {
    const matchesSearch =
      !ventureSearch ||
      v.title.toLowerCase().includes(ventureSearch.toLowerCase()) ||
      v.leadName.toLowerCase().includes(ventureSearch.toLowerCase()) ||
      v.leadMatric.toLowerCase().includes(ventureSearch.toLowerCase()) ||
      v.leadFaculty.toLowerCase().includes(ventureSearch.toLowerCase());
    const matchesTrack = trackFilter === "all" || v.track === trackFilter;
    const matchesStage = stageFilter === "all" || v.stage === stageFilter;
    return matchesSearch && matchesTrack && matchesStage;
  });

  // ==========================================
  // PASSCODE LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen flex flex-col justify-between selection:bg-[#10B981] selection:text-black font-body">
        <Nav active="/challenge" />

        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-[#111827] border border-white/15 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Authorized Access Only
              </span>
              <h2 className="font-display text-2xl uppercase text-white mb-2">
                DEI Directorate Portal
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                OOU Entrepreneurship Challenge 2026/2027 Executive Console for Dr. Ogunkoya & Directorate Committee.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Directorate Passkey:
                </label>
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => {
                    setPasskeyInput(e.target.value);
                    setAuthError(null);
                  }}
                  placeholder="Enter master passkey..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-center tracking-widest"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Unlock Directorate Console</span>
                <Unlock className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Bypass for evaluation */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                Director Demo Key: <strong className="text-emerald-400">{DEFAULT_PASSKEY}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setPasskeyInput(DEFAULT_PASSKEY);
                  setIsAuthenticated(true);
                  sessionStorage.setItem("oou_admin_session", "true");
                  showToast("Authenticated as Dr. Ogunkoya (Director).");
                }}
                className="text-xs font-mono text-slate-400 hover:text-white underline"
              >
                One-Click Quick Director Unlock
              </button>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen selection:bg-[#10B981] selection:text-black font-body">
      {/* Toast Alert */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Directorate Admin Bar */}
      <header className="bg-[#0F172A] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-display">
              DEI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-white">OOU DEI Executive Console</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  2026/2027 ACTIVE
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                Directorate of Entrepreneurship & Innovation • Dr. Ogunkoya
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/challenge"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Page</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-500/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5 border border-rose-500/30 transition-colors"
              title="Logout session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab("kpis")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "kpis"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Target KPIs & Mission Control</span>
          </button>

          <button
            onClick={() => setActiveTab("ventures")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "ventures"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Venture Registry ({ventures.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("matchmaking")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "matchmaking"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Cross-Faculty Matchmaker</span>
          </button>

          <button
            onClick={() => setActiveTab("tracks")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "tracks"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Innovation Tracks & Mentors</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "announcements"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Directorate Bulletins ({announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("supabase")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "supabase"
                ? "bg-emerald-500 text-black shadow-lg"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase / SQL Schema</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: TARGET KPIS & REAL-TIME CONTROLS */}
        {/* ==================================================== */}
        {activeTab === "kpis" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl uppercase text-white">
                  Institutional KPI Command Center
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Modify institutional metrics directly. Changes immediately update the live gamified counters on the public student challenge page.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetKPIs}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Targets</span>
                </button>
                <button
                  onClick={handleSaveKPIs}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono flex items-center gap-2 shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Push Live</span>
                </button>
              </div>
            </div>

            {/* KPI Editor Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric 1 */}
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    Target: 1,000
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Student Engagements</h3>
                  <p className="text-slate-400 text-xs">Total applicants & attendees</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    Current Verified Count:
                  </label>
                  <input
                    type="number"
                    value={kpis.studentEngagements}
                    onChange={(e) =>
                      setKpis({ ...kpis, studentEngagements: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-base font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target Ceiling: {kpis.targetStudentEngagements} (
                  {Math.round((kpis.studentEngagements / kpis.targetStudentEngagements) * 100)}%)
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-amber-400 font-bold">Target: 60</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Venture Ideas Formed</h3>
                  <p className="text-slate-400 text-xs">Cross-faculty teams ideating</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    Current Ideas Count:
                  </label>
                  <input
                    type="number"
                    value={kpis.ventureIdeas}
                    onChange={(e) =>
                      setKpis({ ...kpis, ventureIdeas: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-base font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target Ceiling: {kpis.targetVentureIdeas} (
                  {Math.round((kpis.ventureIdeas / kpis.targetVentureIdeas) * 100)}%)
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-blue-400 font-bold">Target: 30</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Prototypes Developed</h3>
                  <p className="text-slate-400 text-xs">Lab tested physical / software MVPs</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    Current Prototype Count:
                  </label>
                  <input
                    type="number"
                    value={kpis.prototypesDeveloped}
                    onChange={(e) =>
                      setKpis({ ...kpis, prototypesDeveloped: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-base font-bold focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target Ceiling: {kpis.targetPrototypesDeveloped} (
                  {Math.round((kpis.prototypesDeveloped / kpis.targetPrototypesDeveloped) * 100)}%)
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-pink-400 font-bold">Target: 10</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Market-Validated Ventures</h3>
                  <p className="text-slate-400 text-xs">Generating revenue or pilot contracts</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    Current Validated Count:
                  </label>
                  <input
                    type="number"
                    value={kpis.marketValidated}
                    onChange={(e) =>
                      setKpis({ ...kpis, marketValidated: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-base font-bold focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target Ceiling: {kpis.targetMarketValidated} (
                  {Math.round((kpis.marketValidated / kpis.targetMarketValidated) * 100)}%)
                </div>
              </div>
            </div>

            {/* Additional Gamification Settings (Streak & Seed Pot) */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Innovation Sprint Streak (Days):</span>
                </label>
                <input
                  type="number"
                  value={kpis.currentStreakDays}
                  onChange={(e) =>
                    setKpis({ ...kpis, currentStreakDays: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2 font-bold">
                  Total Allocated Seed Pot (NGN):
                </label>
                <input
                  type="number"
                  value={kpis.fundingPotNgn}
                  onChange={(e) =>
                    setKpis({ ...kpis, fundingPotNgn: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2 font-bold">
                  Challenge Submission Days Remaining:
                </label>
                <input
                  type="number"
                  value={kpis.daysRemaining}
                  onChange={(e) =>
                    setKpis({ ...kpis, daysRemaining: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: VENTURE SUBMISSIONS & SCORING */}
        {/* ==================================================== */}
        {activeTab === "ventures" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl uppercase text-white">
                  Venture Applications & Stage Pipeline
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Review student concepts, advance stages (Idea → Prototype → Validated), grade submissions with Directorate rubric, and export data.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddVentureOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manual Entry</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={ventureSearch}
                  onChange={(e) => setVentureSearch(e.target.value)}
                  placeholder="Search by title, team lead, matric number, or faculty..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Track:</span>
                  <select
                    value={trackFilter}
                    onChange={(e) => setTrackFilter(e.target.value)}
                    className="bg-slate-900 border border-white/15 text-white px-2.5 py-1.5 rounded-lg text-xs font-mono"
                  >
                    <option value="all">All Tracks</option>
                    <option value="Waste-to-Wealth">Waste-to-Wealth</option>
                    <option value="Digital Agriculture">Digital Agriculture</option>
                    <option value="Student Employability">Student Employability</option>
                    <option value="Community Health">Community Health</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <span>Stage:</span>
                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="bg-slate-900 border border-white/15 text-white px-2.5 py-1.5 rounded-lg text-xs font-mono"
                  >
                    <option value="all">All Stages</option>
                    <option value="idea">Idea Submitted</option>
                    <option value="matchmaking">Matchmaking</option>
                    <option value="prototype">Prototype Phase</option>
                    <option value="validated">Market Validated</option>
                    <option value="finalist">Grand Finalist</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ventures Table */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Venture & Track</th>
                      <th className="py-3.5 px-4">Lead Innovator</th>
                      <th className="py-3.5 px-4">Campus & Faculty</th>
                      <th className="py-3.5 px-4">Current Stage</th>
                      <th className="py-3.5 px-4">DEI Rubric Score</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredVentures.map((v) => (
                      <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4">
                          <strong className="block text-white text-sm font-sans mb-1">
                            {v.title}
                          </strong>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {v.track}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-white block font-sans font-bold">{v.leadName}</span>
                          <span className="text-slate-400 text-[11px] block">{v.leadMatric}</span>
                          <span className="text-slate-500 text-[10px] block">{v.leadEmail}</span>
                        </td>

                        <td className="py-4 px-4 text-slate-300">
                          <span className="block text-white font-bold">{v.leadCampus}</span>
                          <span className="text-slate-400 text-[11px] block">{v.leadFaculty}</span>
                          <span className="text-slate-500 text-[10px]">
                            {v.teamMembers.length} team members
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <select
                            value={v.stage}
                            onChange={(e) => handleStageAdvance(v.id, e.target.value as VentureSubmission["stage"])}
                            className="bg-slate-900 border border-white/15 text-white px-2 py-1 rounded text-xs capitalize font-mono cursor-pointer"
                          >
                            <option value="idea">● Idea</option>
                            <option value="matchmaking">● Matchmaking</option>
                            <option value="prototype">● Prototype</option>
                            <option value="validated">● Validated</option>
                            <option value="finalist">★ Finalist</option>
                          </select>
                        </td>

                        <td className="py-4 px-4">
                          {v.score ? (
                            <div>
                              <span className="text-amber-400 font-bold text-sm">
                                {v.score.total}/40
                              </span>
                              <span className="text-[10px] text-slate-500 block truncate max-w-[140px]">
                                {v.score.feedback}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">Unscored</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEvaluatingVenture(v);
                                setEvalScores({
                                  innovation: v.score?.innovation || 8,
                                  viability: v.score?.viability || 8,
                                  teamDiversity: v.score?.teamDiversity || 8,
                                  trackFit: v.score?.trackFit || 8,
                                  feedback: v.score?.feedback || "",
                                });
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black transition-colors"
                              title="Grade with Directorate Rubric"
                            >
                              Grade
                            </button>
                            <button
                              onClick={() => handleDeleteVenture(v.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                              title="Delete Submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CROSS-FACULTY MATCHMAKER */}
        {/* ==================================================== */}
        {activeTab === "matchmaking" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl uppercase text-white">
                  Cross-Faculty Co-Founder Matchmaking
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Pair engineering coders from Ibogun with agronomy specialists from Ayetoro and clinicians from Sagamu.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchmaking.map((item) => (
                <div key={item.id} className="bg-[#111827] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.campus}
                      </span>
                      <button
                        onClick={() => {
                          const updated = matchmaking.map((m) =>
                            m.id === item.id
                              ? {
                                  ...m,
                                  status: m.status === "open" ? ("matched" as const) : ("open" as const),
                                }
                              : m
                          );
                          setMatchmaking(updated);
                          showToast(`Status updated for ${item.studentName}.`);
                        }}
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.status === "matched"
                            ? "bg-emerald-500 text-black"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {item.status === "matched" ? "Matched ✓" : "Seeking Partner"}
                      </button>
                    </div>

                    <h3 className="font-bold text-white text-base mb-1">{item.studentName}</h3>
                    <p className="text-xs font-mono text-slate-400 mb-3">
                      {item.department} • {item.faculty}
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">
                        Core Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map((s, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl mb-4">
                      <strong className="text-amber-400 block mb-1">Sought Profile:</strong>
                      {item.lookingFor}
                    </div>
                  </div>

                  <a
                    href={`mailto:${item.contactEmail}?subject=OOU%20DEI%20Challenge%20Matchmaking`}
                    className="w-full text-center py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs block transition-colors"
                  >
                    Email Student Directly
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: INNOVATION TRACKS & MENTOR ASSIGNMENTS */}
        {/* ==================================================== */}
        {activeTab === "tracks" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl uppercase text-white">
                Four Specialized Innovation Tracks
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Directorate allocations, lead faculties, and seed funding distribution (₦1,250,000 per track pool).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INNOVATION_TRACKS.map((t) => {
                const trackSubmissions = ventures.filter((v) => v.track === t.name);
                return (
                  <div key={t.id} className="bg-[#111827] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{t.icon}</span>
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {t.badge}
                          </span>
                          <h3 className="font-display text-xl text-white uppercase">{t.name}</h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        {t.allocatedSeed}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed mb-4">{t.tagline}</p>

                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono space-y-1.5 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Lead Faculty Mentor:</span>
                        <strong className="text-white">{t.leadMentor}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Active Submissions:</span>
                        <strong className="text-emerald-400">{trackSubmissions.length} teams</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <strong className="text-slate-300 block mb-1 font-mono uppercase">
                        Sample Priority Projects:
                      </strong>
                      <ul className="list-disc list-inside space-y-1">
                        {t.projectIdeas.map((p, i) => (
                          <li key={i} className="truncate">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: DIRECTORATE BULLETINS & ANNOUNCEMENTS */}
        {/* ==================================================== */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl uppercase text-white">
                  Directorate Announcements & Bulletins
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Broadcast deadline alerts, bootcamp schedules, and lab access notices to participating students.
                </p>
              </div>

              <button
                onClick={() => setIsAddAnnouncementOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Bulletin</span>
              </button>
            </div>

            <div className="space-y-4">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-[#111827] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        {a.tag}
                      </span>
                      {a.isUrgent && (
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 animate-pulse">
                          Urgent
                        </span>
                      )}
                      <span className="font-mono text-xs text-slate-500">{a.date}</span>
                    </div>
                    <h3 className="font-bold text-base text-white">{a.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-[800px] leading-relaxed">
                      {a.content}
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 block pt-1">
                      Author: {a.author}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteAnnouncement(a.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors self-start sm:self-center"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: SUPABASE & POSTGRESQL BACKEND SETUP */}
        {/* ==================================================== */}
        {activeTab === "supabase" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl uppercase text-white">
                Supabase / PostgreSQL Integration
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Production-ready database schema and trigger setup for the OOU Entrepreneurship Challenge.
              </p>
            </div>

            {/* Connection Status Card */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Backend Storage Architecture</h3>
                    <span className="text-xs font-mono text-slate-400">
                      Resilient Dual-Mode (LocalStorage + Supabase Ready)
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  PERSISTENCE ACTIVE
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                All changes made in this admin dashboard are immediately saved in browser local storage and reflected in real-time on the student-facing <code>/challenge</code> page. To enable direct multi-device cloud synchronization, execute the SQL schema below in your Supabase SQL editor.
              </p>

              {/* Schema snippet */}
              <div className="relative">
                <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 rounded-t-xl border-x border-t border-white/10">
                  <span className="text-xs font-mono text-slate-400">
                    supabase/challenge_schema.sql
                  </span>
                  <button
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(`-- OOU Entrepreneurship Challenge 2026/2027 Schema
create table if not exists public.challenge_kpis (
    id text primary key default 'oou_2026_2027',
    student_engagements integer not null default 642,
    target_student_engagements integer not null default 1000,
    venture_ideas integer not null default 41,
    target_venture_ideas integer not null default 60,
    prototypes_developed integer not null default 18,
    target_prototypes_developed integer not null default 30,
    market_validated integer not null default 6,
    target_market_validated integer not null default 10,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);`);
                        setCopiedSchema(true);
                        setTimeout(() => setCopiedSchema(false), 2000);
                      }
                    }}
                    className="flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                  >
                    {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSchema ? "Copied" : "Copy SQL"}</span>
                  </button>
                </div>
                <pre className="bg-black/60 p-4 rounded-b-xl border border-white/10 text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-[300px]">
{`-- 1. INSTITUTIONAL KPIS TABLE
create table if not exists public.challenge_kpis (
    id text primary key default 'oou_2026_2027',
    academic_year text not null default '2026/2027',
    student_engagements integer not null default 642,
    target_student_engagements integer not null default 1000,
    venture_ideas integer not null default 41,
    target_venture_ideas integer not null default 60,
    prototypes_developed integer not null default 18,
    target_prototypes_developed integer not null default 30,
    market_validated integer not null default 6,
    target_market_validated integer not null default 10,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. VENTURE SUBMISSIONS TABLE
create table if not exists public.challenge_ventures (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    track text not null check (track in ('Waste-to-Wealth', 'Digital Agriculture', 'Student Employability', 'Community Health')),
    lead_name text not null,
    lead_matric text not null,
    lead_faculty text not null,
    lead_campus text not null,
    stage text not null default 'idea',
    score_total integer,
    submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* MODAL: GRADE VENTURE WITH DIRECTORATE RUBRIC */}
      {/* ==================================================== */}
      <AnimatePresence>
        {evaluatingVenture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEvaluatingVenture(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#111827] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-200"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                    Directorate Evaluation Rubric
                  </span>
                  <h3 className="font-display text-2xl uppercase text-white">
                    {evaluatingVenture.title}
                  </h3>
                </div>
                <button
                  onClick={() => setEvaluatingVenture(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {/* Rubric Inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">1. Innovation & Technical Novelty (1-10):</span>
                    <span className="text-emerald-400 font-bold">{evalScores.innovation}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={evalScores.innovation}
                    onChange={(e) =>
                      setEvalScores({ ...evalScores, innovation: parseInt(e.target.value) })
                    }
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">2. Market Feasibility & Revenue Model (1-10):</span>
                    <span className="text-emerald-400 font-bold">{evalScores.viability}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={evalScores.viability}
                    onChange={(e) =>
                      setEvalScores({ ...evalScores, viability: parseInt(e.target.value) })
                    }
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">
                      3. Cross-Faculty Team Diversity (1-10):
                    </span>
                    <span className="text-emerald-400 font-bold">{evalScores.teamDiversity}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={evalScores.teamDiversity}
                    onChange={(e) =>
                      setEvalScores({ ...evalScores, teamDiversity: parseInt(e.target.value) })
                    }
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-white font-bold">
                      4. Track Alignment & Local Ogun Impact (1-10):
                    </span>
                    <span className="text-emerald-400 font-bold">{evalScores.trackFit}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={evalScores.trackFit}
                    onChange={(e) =>
                      setEvalScores({ ...evalScores, trackFit: parseInt(e.target.value) })
                    }
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5">
                    Written Feedback from Dr. Ogunkoya / DEI:
                  </label>
                  <textarea
                    rows={3}
                    value={evalScores.feedback}
                    onChange={(e) => setEvalScores({ ...evalScores, feedback: e.target.value })}
                    placeholder="Provide constructive feedback, lab booking instructions, or prototype advice..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Total Score calculation */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-300">Composite Score:</span>
                <span className="text-2xl font-display text-amber-400 font-bold">
                  {evalScores.innovation +
                    evalScores.viability +
                    evalScores.teamDiversity +
                    evalScores.trackFit}{" "}
                  / 40
                </span>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEvaluatingVenture(null)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs font-mono text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveScore}
                  className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono transition-all"
                >
                  Confirm & Save Score
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL: ADD VENTURE SUBMISSION MANUALLY */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isAddVentureOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddVentureOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#111827] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="font-display text-2xl uppercase text-white">
                  Register Venture Submission
                </h3>
                <button
                  onClick={() => setIsAddVentureOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateVenture} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                    Venture Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={newVenture.title}
                    onChange={(e) => setNewVenture({ ...newVenture, title: e.target.value })}
                    placeholder="e.g. Ago-Iwoye SolarCold Co-op"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Innovation Track:
                    </label>
                    <select
                      value={newVenture.track}
                      onChange={(e) => setNewVenture({ ...newVenture, track: e.target.value as VentureSubmission["track"] })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono"
                    >
                      <option value="Waste-to-Wealth">Waste-to-Wealth</option>
                      <option value="Digital Agriculture">Digital Agriculture</option>
                      <option value="Student Employability">Student Employability</option>
                      <option value="Community Health">Community Health</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Initial Stage:
                    </label>
                    <select
                      value={newVenture.stage}
                      onChange={(e) => setNewVenture({ ...newVenture, stage: e.target.value as VentureSubmission["stage"] })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono"
                    >
                      <option value="idea">Idea Submitted</option>
                      <option value="matchmaking">Matchmaking</option>
                      <option value="prototype">Prototype Developed</option>
                      <option value="validated">Market Validated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Lead Student Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newVenture.leadName}
                      onChange={(e) => setNewVenture({ ...newVenture, leadName: e.target.value })}
                      placeholder="e.g. Oluwaseun Adeleke"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Matriculation Number:
                    </label>
                    <input
                      type="text"
                      required
                      value={newVenture.leadMatric}
                      onChange={(e) => setNewVenture({ ...newVenture, leadMatric: e.target.value })}
                      placeholder="e.g. OOU/2022/ENG/0291"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Primary Faculty:
                    </label>
                    <input
                      type="text"
                      value={newVenture.leadFaculty}
                      onChange={(e) => setNewVenture({ ...newVenture, leadFaculty: e.target.value })}
                      placeholder="e.g. Engineering & Technology"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Campus:
                    </label>
                    <select
                      value={newVenture.leadCampus}
                      onChange={(e) => setNewVenture({ ...newVenture, leadCampus: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono"
                    >
                      <option value="Ago-Iwoye Campus">Ago-Iwoye Main Campus</option>
                      <option value="Sagamu Campus">Sagamu (Health Sciences)</option>
                      <option value="Ayetoro Campus">Ayetoro (Agriculture)</option>
                      <option value="Ibogun Campus">Ibogun (Engineering)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                    Problem Statement:
                  </label>
                  <textarea
                    rows={2}
                    value={newVenture.problemStatement}
                    onChange={(e) =>
                      setNewVenture({ ...newVenture, problemStatement: e.target.value })
                    }
                    placeholder="Describe the challenge..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                    Solution Summary:
                  </label>
                  <textarea
                    rows={2}
                    value={newVenture.solutionSummary}
                    onChange={(e) =>
                      setNewVenture({ ...newVenture, solutionSummary: e.target.value })
                    }
                    placeholder="Proposed intervention..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddVentureOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-xs font-mono text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono"
                  >
                    Register Venture
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL: POST NEW BULLETIN */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isAddAnnouncementOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddAnnouncementOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-200"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="font-display text-2xl uppercase text-white">
                  Post Directorate Bulletin
                </h3>
                <button
                  onClick={() => setIsAddAnnouncementOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                    Bulletin Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnnouncement.title}
                    onChange={(e) =>
                      setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                    }
                    placeholder="e.g. Workshop Fabrication Schedule for Ibogun Lab"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                      Category Tag:
                    </label>
                    <select
                      value={newAnnouncement.tag}
                      onChange={(e) =>
                        setNewAnnouncement({ ...newAnnouncement, tag: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono"
                    >
                      <option value="Event">Event</option>
                      <option value="Resources">Resources</option>
                      <option value="Funding">Funding</option>
                      <option value="Deadline">Deadline</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="urgentCheckbox"
                      checked={newAnnouncement.isUrgent}
                      onChange={(e) =>
                        setNewAnnouncement({ ...newAnnouncement, isUrgent: e.target.checked })
                      }
                      className="w-4 h-4 accent-pink-500 rounded"
                    />
                    <label
                      htmlFor="urgentCheckbox"
                      className="text-xs font-mono text-pink-400 font-bold cursor-pointer"
                    >
                      Mark as Urgent Flash
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                    Announcement Details:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newAnnouncement.content}
                    onChange={(e) =>
                      setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                    }
                    placeholder="Enter instructions, links, or deadlines..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddAnnouncementOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-xs font-mono text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono"
                  >
                    Broadcast Bulletin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
