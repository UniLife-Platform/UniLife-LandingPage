"use client";

import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Plus,
  Minus,
  Check,
  MessageCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
  AlertCircle,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:hello@unilife.com.ng";

interface FAQItem {
  id: string;
  q: string;
  a: string;
  category: string;
}

interface FAQSection {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "getting-started",
    title: "Getting Started & Verification",
    description: "Account creation, student matric ID verification, campus availability, and privacy.",
    items: [
      {
        id: "free-to-use",
        q: "Is UniLife really 100% free or will you surprise me with fees later?",
        a: "UniLife is fundamentally free for all verified university students. The Free plan includes your student profile, campus marketplace listings, past questions library, and peer study rooms at zero cost. We offer optional Pro and Creator plans for high-volume campus sellers who want unlimited featured listings or priority placement — but normal students will never be charged just to use the app, study, or buy.",
        category: "getting-started",
      },
      {
        id: "school-verification",
        q: "What if my university or polytechnic isn't officially supported yet?",
        a: "UniLife is open to students across all Nigerian institutions. While initial rollouts began at OOU, UNILAG, and FUTA, students from any accredited Nigerian university or polytechnic can register today using their student email or matric ID. As your school reaches critical mass (50+ students in a department), department-specific leaderboards and dues portals activate automatically.",
        category: "getting-started",
      },
      {
        id: "data-consumption",
        q: "Does UniLife consume a lot of mobile data on MTN, Airtel, or Glo?",
        a: "We engineered UniLife with local Nigerian network realities in mind. The app is optimized for low-bandwidth 3G and 4G networks, with local caching for past questions and lecture notes so you don't re-download the same 5MB slide deck multiple times. A 30-minute study session uses less than 8MB.",
        category: "getting-started",
      },
      {
        id: "delete-account-policy",
        q: "Can I delete my account and erase my student data at any time?",
        a: "Yes. You have full ownership of your data. You can delete your account directly inside the app settings or via our web portal at /delete-account. Your personal identifying credentials, matric records, and private messages are immediately purged from our servers.",
        category: "getting-started",
      },
    ],
  },
  {
    id: "marketplace-safety",
    title: "Marketplace, Safety & Escrow",
    description: "Buying, selling, safe campus meetup zones, scam prevention, and order delivery.",
    items: [
      {
        id: "anti-scam-marketplace",
        q: "How do I avoid getting scammed when buying a phone or laptop on campus?",
        a: "Every single seller on UniLife is verified with a valid student matric number or official school email — anonymous bot accounts and outside fraudsters are locked out. However, we strictly advise safe campus trade protocols: 1) Only meet in broad daylight at high-traffic campus spots (like the Student Union Building, library foyer, or main gate); 2) Physically inspect the item thoroughly before transferring money; 3) Never make advance deposits before laying your hands on the goods.",
        category: "marketplace-safety",
      },
      {
        id: "selling-food-services",
        q: "Can I sell small items like hostel food, snacks, perfume, or hair braiding?",
        a: "Yes! UniLife isn't just for laptops and used textbooks. Student chefs, bakers, tech repairers, thrift sellers, graphic designers, and barbers all run UniShops. You set your availability, link your WhatsApp for fast student pickups, and get ordered directly by hostel mates without paying crazy commissions.",
        category: "marketplace-safety",
      },
      {
        id: "delivery-campus-shuttle",
        q: "Will items be delivered to my hostel doorstep?",
        a: "Campus trades are arranged directly between students. Most campus sellers offer hostel lobby drop-offs or mutual meetups at central campus landmarks (Faculty quads, SUB, or Campus Gate). For off-campus hostels, sellers frequently partner with peer dispatch riders or campus shuttle pick-up spots.",
        category: "marketplace-safety",
      },
      {
        id: "report-harassment",
        q: "What happens if someone delivers fake goods or sends offensive messages?",
        a: "Tap the 3 dots on any listing or message to submit an instant report. Our student safety moderation team inspects the account within 15 minutes. Verified scams lead to immediate account suspension, device hardware banning, and reporting to campus security whenever criminal fraud is established.",
        category: "marketplace-safety",
      },
    ],
  },
  {
    id: "rewards-economy",
    title: "SP (Status Points) & Cash Referrals",
    description: "Earning reward points, leaderboard climbing, and cash prize disbursements.",
    items: [
      {
        id: "what-is-sp",
        q: "What actually is SP, and can I transfer it to my OPay or PalmPay?",
        a: "SP (Status Points) is UniLife's in-app student reward currency. You earn it organically through daily login streaks, uploading verified past questions, helping coursemates, and referring classmates. SP is spent inside the app on marketplace boosts, custom profile badges, and study perks. Note: SP is not fiat bank savings and cannot be directly cashed out to external banks — but our Referral Challenge Pot pays REAL Naira directly into your bank account!",
        category: "rewards-economy",
      },
      {
        id: "referral-cash-ladder",
        q: "How does the Referral Challenge work? Can I actually win real cash?",
        a: "Yes. In the 'Unlock the Pot' referral campaign, every real verified student who signs up with your link adds to the collective cash pool. As milestones are reached, the pot expands up to ₦100,000+, and the top referrers on the live leaderboard take home verified Naira payouts sent straight to their Nigerian bank account. No raffles, no lucky dips — strictly leaderboard points.",
        category: "rewards-economy",
      },
      {
        id: "sp-expiry",
        q: "Do my Status Points (SP) expire if I'm away during ASUU strikes or holidays?",
        a: "No! Your accumulated SP remains securely stored in your student wallet. Streaks pause gracefully during recognized academic union breaks or verified vacation windows without wiping your lifetime score.",
        category: "rewards-economy",
      },
    ],
  },
  {
    id: "study-faculty",
    title: "AI Study Hub & Campus Leadership",
    description: "Past exam question banks, PDF handout tutors, and SUG faculty dues collection.",
    items: [
      {
        id: "ai-study-hub",
        q: "How does the AI Study Hub work with my lecturer's messy PDF handouts?",
        a: "Upload any course lecture PDF, slide deck, or past question document. Our campus AI engine parses the Nigerian curriculum context and converts 60-page slides into concise 5-minute revision flashcards, high-yield bullet summaries, and simulated multiple-choice exam drills tailored to your course code.",
        category: "study-faculty",
      },
      {
        id: "anonymous-confessions",
        q: "Can coursemates or lecturers see what I post in anonymous confessions?",
        a: "No. When posting in designated anonymous spaces (like campus confessions and course reviews), your public display name, handle, and avatar are completely stripped away. Even your classmates cannot see who posted. UniLife keeps cryptographic logs solely to prevent criminal threats or illegal harassment in accordance with community guidelines.",
        category: "study-faculty",
      },
      {
        id: "faculty-dues-voting",
        q: "How do Faculty Presidents and SUG executives collect dues without POS charges?",
        a: "We provide student associations with digital dues rails: tamper-proof automated e-receipts, transparent accounting ledgers so students can see where dues go, and digital barcode ticketing for departmental dinners and rallies. Executives can apply via our School Bodies partnership page.",
        category: "study-faculty",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "free-to-use": true, // open first by default like many modern FAQ designs
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;

    setIsSubmitting(true);
    // Simulate swift submission and open WhatsApp / email fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_SECTIONS;
    const q = searchQuery.toLowerCase().trim();

    return FAQ_SECTIONS.map((sec) => {
      const filtered = sec.items.filter(
        (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      );
      return {
        ...sec,
        items: filtered,
      };
    }).filter((sec) => sec.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="bg-[#FAF9F5] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased selection:bg-[#ff3d81] selection:text-white">
      <Nav active="/faq" />

      {/* ---- HERO HEADER ---- */}
      <header className="pt-14 sm:pt-20 pb-8 px-4 sm:px-6 md:px-12 max-w-[1240px] mx-auto">
        <div className="text-left max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14151A] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-[#60626a] text-sm sm:text-base leading-relaxed max-w-3xl">
            Find answers to the most common questions about student onboarding, marketplace verification, past questions AI, status points, and campus leadership. If you can&apos;t find what you&apos;re looking for, our student support team is always happy to help.
          </p>

          {/* Search bar */}
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a7f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. fees, scam, SP, AI, delivery, past questions)..."
              className="w-full pl-11 pr-12 py-3 bg-white border border-[#E2E1DA] rounded-xl text-sm placeholder:text-[#8a8a7f] text-[#14151A] focus:outline-none focus:border-[#14151A] focus:ring-1 focus:ring-[#14151A] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-[#8a8a7f] hover:text-[#14151A] uppercase bg-[#F3F2EB] px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ---- MAIN 2-COLUMN LAYOUT (Like Reference Image) ---- */}
      <div className="px-4 sm:px-6 md:px-12 max-w-[1240px] mx-auto pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FAQ Category Cards with Accordions (8 cols on desktop) */}
          <main className="lg:col-span-8 space-y-6">
            {filteredSections.length === 0 ? (
              <div className="bg-white border border-[#E5E4DC] rounded-2xl p-10 text-center shadow-xs">
                <AlertCircle className="w-10 h-10 text-[#8a8a7f] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#14151A] mb-1">
                  No matching questions found
                </h3>
                <p className="text-sm text-[#60626a] max-w-md mx-auto mb-6">
                  We couldn&apos;t find an answer matching &ldquo;{searchQuery}&rdquo;. You can submit your question directly in the form on the right or chat with our team on WhatsApp.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 bg-[#14151A] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Clear Search
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] text-black font-semibold rounded-lg text-xs hover:bg-[#20ba5a] transition-colors"
                  >
                    Ask on WhatsApp →
                  </a>
                </div>
              </div>
            ) : (
              filteredSections.map((section) => (
                <section
                  key={section.id}
                  className="bg-white border border-[#E5E4DC] rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(20,21,26,0.03)]"
                >
                  {/* Category Header */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#14151A] tracking-tight">
                      {section.title}
                    </h2>
                    <p className="text-xs text-[#8a8a7f] mt-1 font-normal">
                      {section.description}
                    </p>
                  </div>

                  {/* Accordion List */}
                  <div className="divide-y divide-[#EFEFE8]">
                    {section.items.map((item) => {
                      const isOpen = !!openItems[item.id];
                      return (
                        <div key={item.id} className="py-4 first:pt-1 last:pb-1">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className="text-[0.95rem] font-semibold text-[#14151A] group-hover:text-[#4f7fff] transition-colors pr-2">
                              {item.q}
                            </span>
                            <span className="shrink-0 w-6 h-6 flex items-center justify-center text-[#8a8a7f] group-hover:text-[#14151A] transition-colors">
                              {isOpen ? (
                                <Minus className="w-4 h-4 stroke-[2.2]" />
                              ) : (
                                <Plus className="w-4 h-4 stroke-[2.2]" />
                              )}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 pb-1 text-[0.9rem] leading-relaxed text-[#50525a]">
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            )}
          </main>

          {/* RIGHT COLUMN: "Didn't find your answer?" Contact Card (4 cols on desktop) */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white border border-[#E5E4DC] rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(20,21,26,0.04)]">
              
              {/* Card Header */}
              <h3 className="text-xl font-bold text-[#14151A] tracking-tight">
                Didn&apos;t find your answer?
              </h3>
              <p className="text-xs text-[#8a8a7f] mt-1 mb-4">
                Our support team is ready to help.
              </p>

              {/* Support Avatars */}
              <div className="flex items-center -space-x-2 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  alt="Support rep"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  alt="Support rep"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                  alt="Support rep"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <span className="ml-4 font-mono text-[11px] text-[#10b981] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  Active right now
                </span>
              </div>

              {/* Form or Success State */}
              {formSubmitted ? (
                <div className="bg-[#FAF9F5] border border-[#E2E1DA] rounded-xl p-5 text-center">
                  <div className="w-10 h-10 bg-[#10b981]/15 text-[#10b981] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#14151A] mb-1">
                    Message Sent!
                  </h4>
                  <p className="text-xs text-[#60626a] mb-4">
                    Thanks {formState.name}! A student representative will review your inquiry and reply to {formState.email || "your contact"} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormState({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="text-xs font-semibold text-[#14151A] underline underline-offset-2"
                  >
                    Send another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E2E1DA] rounded-lg text-xs placeholder:text-[#9c9c94] text-[#14151A] focus:outline-none focus:bg-white focus:border-[#14151A] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E2E1DA] rounded-lg text-xs placeholder:text-[#9c9c94] text-[#14151A] focus:outline-none focus:bg-white focus:border-[#14151A] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number (WhatsApp optional)"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E2E1DA] rounded-lg text-xs placeholder:text-[#9c9c94] text-[#14151A] focus:outline-none focus:bg-white focus:border-[#14151A] transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E2E1DA] rounded-lg text-xs placeholder:text-[#9c9c94] text-[#14151A] focus:outline-none focus:bg-white focus:border-[#14151A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#14151A] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Instant Channels Footer */}
              <div className="mt-6 pt-5 border-t border-[#EFEFE8]">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8a7f] font-semibold mb-2.5">
                  Need an instant reply?
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F3F2EB] border border-[#E5E4DC] text-xs font-medium text-[#14151A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      WhatsApp Helpline
                    </span>
                    <span className="text-[10px] text-[#8a8a7f]">~5 mins</span>
                  </a>

                  <a
                    href={EMAIL_URL}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F3F2EB] border border-[#E5E4DC] text-xs font-medium text-[#14151A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#4f7fff]" />
                      hello@unilife.com.ng
                    </span>
                    <span className="text-[10px] text-[#8a8a7f]">Email</span>
                  </a>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ---- BOTTOM VALUE BANNER (Matching the 4 feature items at the bottom of the reference screenshot) ---- */}
      <section className="border-t border-[#E5E4DC] bg-white py-10 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-start gap-3.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E5E4DC] flex items-center justify-center text-[#14151A] mt-0.5">
              <Sparkles className="w-4 h-4 text-[#ff3d81]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#14151A] mb-1">
                Zero Fees for Students
              </h4>
              <p className="text-xs text-[#60626a] leading-relaxed">
                Free past questions, study rooms, and student marketplace profiles across all campuses.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E5E4DC] flex items-center justify-center text-[#14151A] mt-0.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#14151A] mb-1">
                Verified Matric Profiles
              </h4>
              <p className="text-xs text-[#60626a] leading-relaxed">
                Every buyer and seller is verified with real institution matriculation numbers or school emails.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E5E4DC] flex items-center justify-center text-[#14151A] mt-0.5">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#14151A] mb-1">
                Fast Student Support
              </h4>
              <p className="text-xs text-[#60626a] leading-relaxed">
                Friendly support reps located on Nigerian campuses, ready to resolve disputes and questions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E5E4DC] flex items-center justify-center text-[#14151A] mt-0.5">
              <Zap className="w-4 h-4 text-[#FFD23F]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#14151A] mb-1">
                Low Data Consumption
              </h4>
              <p className="text-xs text-[#60626a] leading-relaxed">
                Optimized for Nigerian telco networks (MTN, Airtel, Glo) with offline past question caching.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
