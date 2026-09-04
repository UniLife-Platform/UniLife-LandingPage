"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

type PlanItem = {
  title: string;
  price: string;
  unit: string;
  period: string;
  topup: string;
  desc: string;
  items: string[];
  featured?: boolean;
};

const PLANS: PlanItem[] = [
  {
    title: "Free",
    price: "0",
    unit: "SP",
    period: "/month",
    topup: "No purchase needed",
    desc: "Everything you need to get started on campus.",
    items: [
      "Basic marketplace listing",
      "Limited study uploads",
      "Standard profile",
      "Ads supported",
      "Limited usage & storage",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    price: "2,500",
    unit: "SP",
    period: "/month",
    topup: "≈ ₦2,500 to top up · or earn it free",
    desc: "For students and sellers who are active every day.",
    items: [
      "Unlimited marketplace listings",
      "Advanced shop analytics",
      "Gold profile badge",
      "Ad-free experience",
      "Increased usage & storage",
      "Some customization + priority support",
      "Optional add-ons available",
    ],
    featured: true,
  },
  {
    title: "Creator",
    price: "5,000",
    unit: "SP",
    period: "/month",
    topup: "≈ ₦5,000 to top up · or earn it free",
    desc: "For top sellers, creators, and community leaders.",
    items: [
      "Full feature access",
      "Unlimited usage & storage",
      "Full customization",
      "Priority support",
      "Premium support & consulting included",
      "Everything in Pro",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active="/pricing" />

      {/* ---- PAGE HEAD ---- */}
      <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
              Simple, honest pricing
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              Choose the plan that fits your campus journey.
            </h1>
            <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[640px] mx-auto">
              Start free. Upgrade with SP when your hustle — or your following —
              outgrows it.
            </p>
          </motion.div>
        </div>

        {/* ---- SP EXPLAINER STRIP ---- */}
        <motion.div
          className="relative flex flex-col md:flex-row items-center gap-8 bg-white border border-[rgba(20,21,26,0.12)] rounded-[28px] p-8 md:p-10 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 shrink-0 bg-[#FFD23F] rounded-full flex items-center justify-center font-display text-xl border-2 border-[#14151A] shadow-[0_6px_0_#14151A] text-[#14151A]">
            SP
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-[1.15rem] mb-1.5">
              Status Points (SP) power everything here
            </h3>
            <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
              Top up with Naira anytime — or earn SP for free through daily
              streaks, referrals, and study contributions. SP has no cash value
              and can&apos;t be redeemed or transferred.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ---- PLAN CARDS ---- */}
      <section className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) =>
            plan.featured ? (
              <motion.div
                key={plan.title}
                className="relative bg-[#14151A] text-[#F6F2E7] rounded-[28px] p-8 md:p-10 shadow-2xl lg:-translate-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <span className="inline-block font-mono text-[0.7rem] tracking-widest text-[#14151A] bg-[#FFD23F] px-3 py-1 rounded-full mb-6 uppercase font-bold">
                  Most popular
                </span>
                <h3 className="font-display text-2xl uppercase mb-2 leading-tight">
                  {plan.title}
                </h3>
                <p className="text-[rgba(246,242,231,0.65)] text-[0.9rem] leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="flex items-end gap-1.5 mb-1.5">
                  <span className="font-display text-5xl leading-none">
                    {plan.price}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#FFD23F] mb-1">
                    {plan.unit}
                  </span>
                  <span className="font-mono text-sm text-[rgba(246,242,231,0.5)] mb-1">
                    {plan.period}
                  </span>
                </div>
                <p className="font-mono text-[0.72rem] text-[rgba(246,242,231,0.5)] uppercase tracking-wide mb-8">
                  {plan.topup}
                </p>

                <a
                  href={APP_URL}
                  className="block text-center w-full px-6 py-3.5 rounded-full font-bold text-[0.92rem] bg-[#FFD23F] !text-[#14151A] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all mb-8"
                >
                  Go {plan.title}
                </a>

                <ul className="flex flex-col gap-3">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-[rgba(246,242,231,0.9)]"
                    >
                      <span className="mt-1 text-[#FFD23F] shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key={plan.title}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-[28px] p-8 md:p-10 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <span className="inline-block font-mono text-[0.7rem] tracking-widest text-[#46473f] bg-[#f4f6fc] px-3 py-1 rounded-full mb-6 uppercase font-bold">
                  {plan.title === "Free" ? "Get started" : "For creators"}
                </span>
                <h3 className="font-display text-2xl uppercase mb-2 leading-tight text-[#14151A]">
                  {plan.title}
                </h3>
                <p className="text-[#8a8a7f] text-[0.9rem] leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="flex items-end gap-1.5 mb-1.5">
                  <span className="font-display text-5xl leading-none text-[#14151A]">
                    {plan.price}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#4f7fff] mb-1">
                    {plan.unit}
                  </span>
                  <span className="font-mono text-sm text-[#8a8a7f] mb-1">
                    {plan.period}
                  </span>
                </div>
                <p className="font-mono text-[0.72rem] text-[#8a8a7f] uppercase tracking-wide mb-8">
                  {plan.topup}
                </p>

                <a
                  href={APP_URL}
                  className="block text-center w-full px-6 py-3.5 rounded-full font-bold text-[0.92rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all mb-8"
                >
                  {plan.title === "Free" ? "Start free" : `Go ${plan.title}`}
                </a>

                <ul className="flex flex-col gap-3">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-[#46473f]"
                    >
                      <span className="mt-1 text-[#34d399] shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>

        <motion.p
          className="text-center text-[#8a8a7f] text-[0.88rem] leading-relaxed max-w-[640px] mx-auto mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          SP is UniLife&apos;s in-app currency — top up with Naira anytime, or
          earn it for free through daily streaks and contributions. SP is a
          rewards balance, not stored monetary value: it has no cash value and
          cannot be redeemed, refunded, or transferred outside the app. Free
          tier users can upgrade or downgrade at any time — no lock-in
          contracts.
        </motion.p>
      </section>

      <Footer />
    </div>
  );
}
