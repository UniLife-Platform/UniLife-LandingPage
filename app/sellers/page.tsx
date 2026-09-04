"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function SellersPage() {
  return (
    <>
      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/sellers" />

        {/* ---- PAGE HEAD & HERO ---- */}
        <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                Campus commerce, reimagined
              </span>
              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
                Elevate your hustle.
              </h1>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8 max-w-[500px]">
                Open your UniLife storefront and sell to a verified campus
                audience. You already have the product — textbooks, streetwear,
                snacks, tech, or design skills. It&apos;s time to upgrade your
                distribution.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Open my storefront →
                </a>
                <a
                  href="#unlock"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-[#F6F2E7] transition-all whitespace-nowrap"
                >
                  How it works
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-full h-auto aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-[#EFE9D9]"
            >
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Student entrepreneur managing products"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* ---- THE UNILIFE ADVANTAGE (4 Cards) ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="text-center mb-16 max-w-[650px] mx-auto">
            <span className="inline-block font-mono text-xs tracking-widest text-[#059669] bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
              The UniLife advantage
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">
              Four structural advantages no other platform offers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🏪",
                title: "Your branded turf",
                desc: "Upload products, manage orders, and run your shop with a premium, professional interface that reflects your brand — not a generic listing page.",
              },
              {
                emoji: "🎯",
                title: "Zero wasted traffic",
                desc: "Every single user on the platform is a verified student on campus. You're marketing directly to buyers — no ad spend, no guesswork, no outsiders.",
              },
              {
                emoji: "🔒",
                title: "Trust built-in",
                desc: "All buyers and sellers are verified peers. The anonymous scam risk that plagues WhatsApp and DM sales is eliminated by design.",
              },
              {
                emoji: "📡",
                title: "Social amplification",
                desc: "Export your product listings directly to Instagram, TikTok, and X with a single tap — driving external traffic back into your verified store.",
              },
            ].map((adv, i) => (
              <motion.div
                key={i}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  {adv.emoji}
                </div>
                <h3 className="font-bold text-[1.2rem] mb-3">{adv.title}</h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- VISUAL BREAK ---- */}
        <section className="py-10 px-6 md:px-16 max-w-[1160px] mx-auto">
          <motion.div
            className="w-full h-[300px] md:h-[450px] rounded-[32px] overflow-hidden shadow-2xl relative bg-[#EFE9D9]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/6077382/pexels-photo-6077382.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Student preparing online orders"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* ---- EXCLUSIVE PERKS FOR DAY-ONE MERCHANTS ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="bg-[#14151A] text-white rounded-[32px] p-8 md:p-16 relative overflow-hidden">
            <div className="text-center mb-16 max-w-[650px] mx-auto relative z-10">
              <span className="inline-block font-mono text-xs tracking-widest text-[#FFD23F] border border-[rgba(255,210,63,0.3)] px-3 py-1 rounded-full mb-4 uppercase">
                Exclusive perks for day-one merchants
              </span>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-3">
                Three privileges reserved for founding merchants.
              </h2>
              <p className="text-[rgba(255,255,255,0.7)] text-sm italic">
                Once the slots fill, these perks close permanently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  tag: "COUNCIL",
                  title: "The Sellers Council",
                  img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
                  points: [
                    "Private, invite-only merchant group shaping how campus commerce works",
                    "Direct input on marketplace features and seller tools",
                    "Early access to new capabilities before general release",
                  ],
                },
                {
                  tag: "TARGETING",
                  title: "Precision targeting",
                  img: "https://images.pexels.com/photos/7682341/pexels-photo-7682341.jpeg?auto=compress&cs=tinysrgb&w=600",
                  points: [
                    "Your shop drops into the feeds of the highest-intent buyers for what you sell",
                    "New inventory triggers push notifications to interested buyers",
                    "No wasted impressions — every eyeball counts",
                  ],
                },
                {
                  tag: "STATUS",
                  title: "Status & visibility",
                  img: "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=600",
                  points: [
                    "Unlock the exclusive ‘Top Merchant’ badge on your profile and storefront",
                    "Your shop pinned to the discovery feed of every new user for a full week",
                    "Be the first face new students see when they open the app",
                  ],
                },
              ].map((perk, i) => (
                <motion.div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden min-h-[420px] border border-[rgba(255,255,255,0.1)] flex flex-col justify-end"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <img
                    src={perk.img}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={perk.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] via-[#14151A]/85 to-transparent"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-auto">
                      <span className="font-mono text-[0.65rem] bg-[#FFD23F] text-[#14151A] px-2 py-1 rounded font-bold uppercase tracking-wider">
                        {perk.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-[1.25rem] mb-4 text-white">
                      {perk.title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {perk.points.map((pt, j) => (
                        <li
                          key={j}
                          className="flex gap-2.5 items-start text-[rgba(255,255,255,0.8)] text-[0.85rem] leading-snug"
                        >
                          <span className="text-[#FFD23F] font-mono mt-0.5">
                            ›
                          </span>{" "}
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TO UNLOCK YOUR STOREFRONT (Steps) ---- */}
        <section
          id="unlock"
          className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto"
        >
          <div className="text-center mb-16 max-w-[600px] mx-auto">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              To unlock your storefront
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4">
              Just two actions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[850px] mx-auto mb-10">
            {[
              {
                title: "List your first 3 items",
                desc: "Add at least 3 products — with photos, a price, and a short description. That's all it takes to go live.",
              },
              {
                title: "Share one promo graphic",
                desc: "Post one promotional story about your new UniLife shop. We supply the professionally designed asset — you just share it.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 relative shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#4f7fff] text-white flex items-center justify-center font-display text-xl mb-6 shadow-md border-2 border-white ring-4 ring-[rgba(79,127,255,0.15)]">
                  {i + 1}
                </div>
                <h3 className="font-bold text-[1.15rem] mb-3">{step.title}</h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-[850px] mx-auto text-center bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] text-[#14151A] rounded-2xl p-4 font-medium text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ⚡ Day-One Merchant privileges are strictly limited. First to reply,
            first to benefit.
          </motion.div>
        </section>

        {/* ---- WHY SELL HERE VS ANYWHERE ELSE (Compare) ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              Comparison
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4">
              Why sell here vs anywhere else
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 border border-[rgba(20,21,26,0.12)] rounded-[24px] overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {/* WhatsApp & DMs */}
            <div className="bg-[#fdfbf7] p-8 md:p-12">
              <h4 className="font-mono text-[0.75rem] tracking-[2px] text-[#8a8a7f] uppercase mb-8 font-bold">
                WhatsApp & DMs
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  "No product catalogue — buyers forget what you sell",
                  "Scam risk — no identity verification for buyers",
                  "Messages buried in busy group chats",
                  "Zero analytics on what's performing",
                  "Re-posting the same items repeatedly",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start text-[#46473f] text-[0.95rem] leading-relaxed"
                  >
                    <span className="text-[#ff3d81] font-mono font-bold mt-1 shrink-0">
                      ✕
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* UniLife Storefront */}
            <div className="bg-white p-8 md:p-12 border-t md:border-t-0 md:border-l border-[rgba(20,21,26,0.12)]">
              <h4 className="font-mono text-[0.75rem] tracking-[2px] text-[#14151A] uppercase mb-8 font-bold">
                UniLife Storefront
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  "Permanent, browsable storefront always visible",
                  "100% verified buyers — fraud risk eliminated",
                  "Discovery feed + push notifications to buyers",
                  "Sales dashboard and category performance data",
                  "Live listings that sell for you around the clock",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start text-[#14151A] font-medium text-[0.95rem] leading-relaxed"
                  >
                    <span className="text-[#34d399] font-mono font-bold mt-1 shrink-0">
                      ✓
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* ---- DOWNLOAD BAND / TICKET ---- */}
        <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <motion.div
            className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#FFD23F] border border-[rgba(255,210,63,0.3)] px-4 py-1.5 rounded-full mb-6 uppercase">
              Get Started
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
              Ready to dominate the campus market?
            </h2>
            <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
              Message us and we&apos;ll send you the rapid-setup guide. Day-One
              Merchant slots are strictly limited.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/2348164670694"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap"
              >
                Message on WhatsApp →
              </a>
              <a
                href="mailto:unilife.edu.org@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
              >
                Email us
              </a>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
