"use client";

import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  HelpCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  ShoppingBag,
  Coins,
  BookOpen,
  Users,
  MessageCircle,
  Mail,
  ChevronDown,
  Check,
  Copy,
  ThumbsUp,
  AlertTriangle
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:hello@unilife.com.ng";

type QAItem = {
  id: string;
  q: string;
  a: string;
  category: string;
  tag?: string;
  accent: string;
  popular?: boolean;
  baseHelpful: number;
};

const FAQ_DATA: QAItem[] = [
  {
    id: "free-to-use",
    q: "Is UniLife really 100% free or will you surprise me with fees later?",
    a: "UniLife is fundamentally free for all verified university students. The Free plan includes your student profile, campus marketplace listings, past questions library, and peer study rooms at zero cost. We offer optional Pro and Creator plans for high-volume campus sellers who want unlimited featured listings or priority placement — but normal students will never be charged just to use the app, study, or buy.",
    category: "getting-started",
    tag: "⚡ Zero Hidden Fees",
    accent: "#4f7fff",
    popular: true,
    baseHelpful: 184,
  },
  {
    id: "anti-scam-marketplace",
    q: "How do I avoid getting scammed when buying an iPhone or textbook on campus?",
    a: "Every single seller on UniLife is verified with a valid student matric number or official school email — anonymous bot accounts and outside fraudsters are locked out. However, we strictly advise safe campus trade protocols: 1) Only meet in broad daylight at high-traffic campus spots (like the Student Union Building, library foyer, or main campus gate); 2) Physically inspect the item thoroughly before transferring money; 3) Never make advance deposits before laying your hands on the goods.",
    category: "marketplace",
    tag: "🛡️ Safety First",
    accent: "#ff3d81",
    popular: true,
    baseHelpful: 246,
  },
  {
    id: "what-is-sp",
    q: "What actually is SP, and can I transfer it to my OPay or PalmPay?",
    a: "SP (Status Points) is UniLife's in-app student reward currency. You earn it organically through daily login streaks, uploading verified past questions, helping coursemates, and referring classmates. SP is spent inside the app on marketplace boosts, custom profile badges, and study perks. Note: SP is not fiat bank savings and cannot be directly cashed out to external banks — but our Referral Challenge Pot pays REAL Naira directly into your bank account!",
    category: "sp-economy",
    tag: "💰 Rewards Breakdown",
    accent: "#FFD23F",
    popular: true,
    baseHelpful: 198,
  },
  {
    id: "ai-study-hub",
    q: "How does the AI Study Hub work with my lecturer's messy PDF handouts?",
    a: "Upload any course lecture PDF, slide deck, or past question document. Our campus AI engine parses the Nigerian curriculum context and converts 60-page slides into concise 5-minute revision flashcards, high-yield bullet summaries, and simulated multiple-choice exam drills tailored to your course code.",
    category: "study",
    tag: "🤖 Exam Cheat Code",
    accent: "#4f7fff",
    popular: true,
    baseHelpful: 165,
  },
  {
    id: "selling-food-services",
    q: "Can I sell small items like hostel food, snacks, perfume, or hair braiding?",
    a: "Yes! UniLife isn't just for laptops and used textbooks. Student chefs, bakers, tech repairers, thrift sellers, graphic designers, and barbers all run UniShops. You set your availability, link your WhatsApp for fast student pickups, and get ordered directly by hostel mates without paying crazy commissions.",
    category: "marketplace",
    tag: "🏪 Student Hustle",
    accent: "#059669",
    popular: false,
    baseHelpful: 132,
  },
  {
    id: "referral-cash-ladder",
    q: "How does the Referral Challenge work? Can I actually win real cash?",
    a: "Yes. In the 'Unlock the Pot' referral campaign, every real verified student who signs up with your link adds to the collective cash pool. As milestones are reached, the pot expands up to ₦100,000+, and the top referrers on the live leaderboard take home verified Naira payouts sent straight to their Nigerian bank account. No raffles, no lucky dips — strictly leaderboard points.",
    category: "sp-economy",
    tag: "🔥 Real Cash Payouts",
    accent: "#FFD23F",
    popular: true,
    baseHelpful: 215,
  },
  {
    id: "school-verification",
    q: "What if my university or polytechnic isn't officially supported yet?",
    a: "UniLife is open to students across all Nigerian institutions. While initial beta rollouts kicked off at OOU, UNILAG, and FUTA, students from any accredited Nigerian university or polytechnic can register today using their student email or matric ID. As your school reaches critical mass (50+ students in a department), department-specific leaderboards and dues portals activate automatically.",
    category: "getting-started",
    tag: "🎓 Nationwide Access",
    accent: "#4f7fff",
    popular: false,
    baseHelpful: 141,
  },
  {
    id: "faculty-dues-voting",
    q: "How do Faculty Presidents and SUG executives collect dues without POS charges?",
    a: "We provide student associations with digital dues rails: tamper-proof automated e-receipts, transparent accounting ledgers so students can see where dues go, and digital barcode ticketing for departmental dinners and rallies. Executives can apply via our School Bodies partnership page.",
    category: "partners",
    tag: "🏛️ Campus Politics & Dues",
    accent: "#8a8a7f",
    popular: false,
    baseHelpful: 119,
  },
  {
    id: "anonymous-confessions",
    q: "Can coursemates or lecturers see what I post in anonymous confessions?",
    a: "No. When posting in designated anonymous spaces (like campus confessions and course reviews), your public display name, handle, and avatar are completely stripped away. Even your classmates cannot see who posted. UniLife keeps cryptographic logs solely to prevent criminal threats or illegal harassment in accordance with community guidelines.",
    category: "safety",
    tag: "🔒 True Anonymity",
    accent: "#ff3d81",
    popular: false,
    baseHelpful: 177,
  },
  {
    id: "data-consumption",
    q: "Does UniLife consume a lot of mobile data on MTN, Airtel, or Glo?",
    a: "We engineered UniLife with local African network realities in mind. The app is optimized for low-bandwidth 3G and 4G networks, with local caching for past questions and lecture notes so you don't re-download the same 5MB slide deck multiple times. A 30-minute study session uses less than 8MB.",
    category: "getting-started",
    tag: "⚡ Low Data Mode",
    accent: "#059669",
    popular: false,
    baseHelpful: 154,
  },
  {
    id: "report-harassment",
    q: "What happens if someone delivers fake goods or sends offensive messages?",
    a: "Tap the 3 dots on any listing or message to submit an instant report. Our student safety moderation team inspects the account within 15 minutes. Verified scams lead to immediate account suspension, device hardware banning, and reporting to campus security whenever criminal fraud is established.",
    category: "safety",
    tag: "🛡️ 15-Min Response",
    accent: "#ff3d81",
    popular: false,
    baseHelpful: 168,
  },
  {
    id: "delete-account-policy",
    q: "Can I delete my account and erase my student data at any time?",
    a: "Yes. You have full ownership of your data. You can delete your account directly inside the app settings or via our web portal at /delete-account. Your personal identifying credentials, matric records, and private messages are immediately purged from our servers.",
    category: "safety",
    tag: "🧹 Privacy First",
    accent: "#8a8a7f",
    popular: false,
    baseHelpful: 112,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle, count: FAQ_DATA.length },
  { id: "getting-started", label: "Getting Started", icon: Zap, count: FAQ_DATA.filter((x) => x.category === "getting-started").length },
  { id: "marketplace", label: "Marketplace & Trade", icon: ShoppingBag, count: FAQ_DATA.filter((x) => x.category === "marketplace").length },
  { id: "sp-economy", label: "SP & Cash Pot", icon: Coins, count: FAQ_DATA.filter((x) => x.category === "sp-economy").length },
  { id: "study", label: "Study Hub & AI", icon: BookOpen, count: FAQ_DATA.filter((x) => x.category === "study").length },
  { id: "safety", label: "Safety & Privacy", icon: ShieldCheck, count: FAQ_DATA.filter((x) => x.category === "safety").length },
  { id: "partners", label: "SUG & Faculty", icon: Users, count: FAQ_DATA.filter((x) => x.category === "partners").length },
];

function LivelyAccordion({ item }: { item: QAItem }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(item.baseHelpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${item.q}\n\n${item.a}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVoted) {
      setHelpfulCount((v) => v + 1);
      setHasVoted(true);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border-2 border-[#14151A] transition-all duration-200 overflow-hidden ${
        open ? "shadow-[4px_4px_0px_#14151A]" : "hover:shadow-[3px_3px_0px_#14151A] hover:-translate-y-0.5"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 text-left p-5 sm:p-6 outline-none"
        aria-expanded={open}
      >
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {item.tag && (
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#14151A]/20"
                style={{ background: `${item.accent}18`, color: "#14151A" }}
              >
                {item.tag}
              </span>
            )}
            {item.popular && (
              <span className="font-mono text-[10px] font-bold uppercase bg-[#FFD23F] text-[#14151A] border border-[#14151A] px-2 py-0.5 rounded-full">
                🔥 Most Asked
              </span>
            )}
          </div>
          <h3 className="font-display text-lg sm:text-xl uppercase tracking-tight text-[#14151A] leading-snug">
            {item.q}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="shrink-0 w-9 h-9 rounded-full bg-[#F6F2E7] border border-[#14151A] flex items-center justify-center text-[#14151A] shadow-sm mt-0.5"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#14151A]/10 bg-[#FAF8F2]"
          >
            <div className="p-5 sm:p-6">
              <p className="text-[#333] text-base leading-relaxed mb-5 font-normal">
                {item.a}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#14151A]/10 text-xs font-mono text-black/60">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleVote}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                      hasVoted
                        ? "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold"
                        : "bg-white border-[#14151A]/20 hover:bg-[#F6F2E7] text-[#14151A]"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{hasVoted ? "Marked helpful" : "Helpful?"}</span>
                    <span className="font-bold">({helpfulCount})</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#14151A]/20 hover:bg-[#F6F2E7] text-[#14151A] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy answer"}</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/2348164670694?text=${encodeURIComponent(`Hi UniLife, I have a question about: "${item.q}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4f7fff] transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  Ask more about this →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased selection:bg-[#ff3d81] selection:text-white">
      <Nav active="/faq" />

      {/* ---- HERO SECTION ---- */}
      <header className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-[1160px] mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[760px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#14151A] bg-[#FFD23F] border-2 border-[#14151A] px-4 py-1.5 rounded-full mb-6 uppercase font-bold shadow-[2px_2px_0px_#14151A]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            100% Student Proof · Honest Campus Answers
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.92] text-[#14151A] mb-5">
            No Gibberish. <br />
            <span className="text-[#ff3d81]">Real Answers.</span>
          </h1>

          <p className="text-[#46473f] text-base sm:text-xl leading-relaxed max-w-[620px] mx-auto mb-8 font-normal">
            Everything you need to know about peer trades, anti-scam checks, AI past questions, cash referrals, and campus leaderboards.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-[640px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. SP, fake sellers, delivery, fees, OPay, past questions)..."
              className="w-full pl-12 pr-12 py-4 bg-white border-2 border-[#14151A] rounded-2xl text-base placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#ff3d81] shadow-[4px_4px_0px_#14151A] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-black/50 hover:text-black uppercase bg-[#F6F2E7] px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      </header>

      {/* ---- CATEGORY FILTER PILLS ---- */}
      <section className="px-4 sm:px-6 md:px-16 max-w-[1000px] mx-auto mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full font-mono text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap flex items-center gap-2 border-2 ${
                  isSelected
                    ? "bg-[#14151A] text-white border-[#14151A] shadow-[3px_3px_0px_#ff3d81] scale-105"
                    : "bg-white text-[#14151A] border-[#14151A] hover:bg-black/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-[#ff3d81] text-white" : "bg-black/10 text-black/80"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-black/60 pt-4 px-2">
          <span>
            Showing {filteredFAQs.length} of {FAQ_DATA.length} answers
          </span>
          {searchQuery && (
            <span className="text-[#ff3d81] font-bold">
              Filtered by: &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
      </section>

      {/* ---- ACCORDION LIST ---- */}
      <main className="px-4 sm:px-6 md:px-16 max-w-[820px] mx-auto pb-20">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#14151A]/30 rounded-2xl p-10 text-center my-8 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-[#FFD23F] mx-auto mb-3" />
            <h3 className="font-display text-2xl uppercase tracking-tight text-[#14151A] mb-2">
              No answers matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-black/60 max-w-md mx-auto text-sm mb-6">
              Couldn&apos;t find that specific term. Try searching for &ldquo;SP&rdquo;, &ldquo;marketplace&rdquo;, &ldquo;free&rdquo;, or ask our student team directly on WhatsApp.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="bg-[#14151A] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase"
              >
                Reset Search
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-black border-2 border-[#14151A] px-6 py-2.5 rounded-full font-bold text-xs uppercase shadow-[2px_2px_0px_#14151A]"
              >
                Ask on WhatsApp →
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredFAQs.map((item) => (
              <LivelyAccordion key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* ---- STILL STUCK? DIRECT ASSISTANCE ---- */}
      <section className="px-4 sm:px-6 md:px-16 pb-24 max-w-[1160px] mx-auto">
        <motion.div
          className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden border-2 border-[#14151A] shadow-[6px_6px_0px_#ff3d81]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#FFD23F] uppercase font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Direct Campus Support
            </div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase mb-4 text-[#F6F2E7] tracking-tight leading-tight">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-[rgba(246,242,231,0.75)] mb-8 text-base sm:text-lg leading-relaxed font-normal">
              Skip the wait. Chat directly with a real student representative who answers campus questions every day. Usually replies in under 5 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base bg-[#FFD23F] text-[#14151A] border-2 border-[#14151A] shadow-[3px_3px_0px_#14151A] hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp →</span>
              </a>

              <a
                href={EMAIL_URL}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-bold text-base bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#14151A] transition-all"
              >
                <Mail className="w-5 h-5" />
                <span>Send an Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
