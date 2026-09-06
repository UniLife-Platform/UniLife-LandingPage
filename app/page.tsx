"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const APP_URL = "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl";

export default function Home() {
  return (
    <>
      <Head>
        <title>UniLife — Your campus, finally here.</title>
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-visuals { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; min-height: 540px; }
        .float-img { position: absolute; border-radius: 16px; box-shadow: 0 24px 48px rgba(20,21,26,0.15); object-fit: cover; z-index: 0; border: 4px solid #fff; }
        .left-float { width: 180px; height: 240px; left: -5%; top: 15%; }
        .right-float { width: 160px; height: 160px; right: 0%; bottom: 12%; }
        @media (max-width: 920px) { .float-img { display: none; } .hero-visuals { min-height: 400px; margin-top: 40px; } }

        .id-card-stage { perspective: 1200px; display: flex; justify-content: center; z-index: 2; position: relative; width: 100%; }
        .id-card {
          width: 100%; max-width: 360px; aspect-ratio: 340 / 490; 
          background: #fdfbf7; color: #14151A;
          border-radius: 20px; padding: 24px; position: relative; 
          transform: rotateY(-6deg) rotateX(4deg);
          box-shadow: 20px 24px 0 rgba(20,21,26,0.03), 0 30px 60px rgba(20,21,26,0.12);
          overflow: hidden; border: 1px solid rgba(20,21,26,0.08);
          transition: transform 0.3s ease;
        }
        .id-card:hover { transform: rotateY(0deg) rotateX(0deg) translateY(-5px); }
        
        .id-card__glare {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg); animation: hologram-sweep 6s infinite cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 10; pointer-events: none;
        }
        @keyframes hologram-sweep { 0% { left: -100%; opacity: 0; } 20% { opacity: 1; } 40% { left: 200%; opacity: 0; } 100% { left: 200%; opacity: 0; } }

        .id-card__pin {
          position: absolute; top: -10px; left: 50%; transform: translateX(-50%); 
          width: 20px; height: 20px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #fff, #ff3d81 60%); 
          box-shadow: 0 4px 6px rgba(0,0,0,0.2); z-index: 3;
        }
        
        .animate-scan { animation: scan 3s infinite ease-in-out; }
        @keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(15px); } 100% { transform: translateY(0); } }
        
        .animate-bounce-slow { animation: bounce-coin 2.5s infinite ease-in-out; }
        @keyframes bounce-coin { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}} />

      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/" />

        {/* ---- HERO ---- */}
        <header className="px-6 md:px-16 py-12 md:py-20 max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-x-12 gap-y-16 items-center min-h-[calc(100vh-90px)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[1.5px] text-[#14151A] bg-white border border-[rgba(20,21,26,0.12)] px-3.5 py-1.5 rounded-full mb-6 uppercase before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FFD23F]">
              Open to students at any university
            </span>
            <h1 className="font-display text-[clamp(2.8rem,7.4vw,5.4rem)] leading-[0.96] uppercase mb-6 text-[#14151A]">
              Everyone you go{" "}
              <span className="relative inline-block">
                <span className="relative z-10">to school</span>
                <svg viewBox="0 0 200 60" fill="none" aria-hidden="true" className="absolute -left-[8%] -top-[18%] w-[118%] h-[150%] z-0 overflow-visible">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    d="M8 34C22 12 90 4 130 10C165 15 190 24 188 36C186 50 130 56 90 54C48 52 6 44 10 30"
                    stroke="#FFD23F"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              with —
              <span className="block text-[clamp(2.3rem,5vw,3.7rem)] mt-1.5 font-['Instrument_Serif',serif] italic font-normal normal-case tracking-normal">finally in one place.</span>
            </h1>
            <p className="text-[#46473f] text-[1.12rem] leading-[1.65] max-w-[480px] mb-8">
              UniLife brings your department, your marketplace, and your study
              group onto one app built for real students. No strangers, no bots —
              just the people you already share a lecture hall with.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-10">
              {/* Forcing explicit text colors to override any global CSS conflicts */}
              <a href={APP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[0.88rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Join UniLife →
              </a>
              <a href="#study" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[0.88rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all whitespace-nowrap">
                See what&apos;s inside
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mt-9">
              <span className="font-mono text-[0.74rem] px-4 py-2 rounded-full border border-[rgba(20,21,26,0.12)] text-[#8a8a7f] bg-white"><b className="text-[#14151A]">400+</b> Students in</span>
              <span className="font-mono text-[0.74rem] px-4 py-2 rounded-full border border-[rgba(20,21,26,0.12)] text-[#8a8a7f] bg-white"><b className="text-[#14151A]">Open to students at any university</b> Live now</span>
              <span className="font-mono text-[0.74rem] px-4 py-2 rounded-full border border-[rgba(20,21,26,0.12)] text-[#8a8a7f] bg-white"><b className="text-[#14151A]">Real</b> Verified profiles</span>
            </div>
          </motion.div>

          {/* ---- HERO VISUALS (3D Composition) ---- */}
          <div className="hero-visuals">
            {/* Locked-in specific Unsplash images of students */}
            <motion.img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop"
              alt="Campus Event"
              className="float-img left-float"
              animate={{ y: [0, -15, 0], rotate: [-8, -10, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop"
              alt="Study Group"
              className="float-img right-float"
              animate={{ y: [0, 15, 0], rotate: [12, 14, 12] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            />

            <motion.div 
              className="id-card-stage"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div 
                className="id-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <div className="id-card__glare"></div>
                <div className="id-card__pin"></div>
                
                <div className="flex justify-between items-center font-mono text-[0.65rem] tracking-[1px] text-[#8a8a7f] mb-4 uppercase font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4f7fff] text-white px-1.5 py-0.5 rounded font-display text-[0.8rem] font-bold">U</span>
                    <span>UNILIFE CAMPUS ID</span>
                  </div>
                  <span>2026/27</span>
                </div>

                <div className="w-full h-[170px] rounded-xl mb-5 bg-gradient-to-br from-[#8fb0ff] to-[#1c2c66] flex items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_10px)]">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harrison" alt="Student Avatar" className="w-[50px] h-[50px] relative z-10 rounded-md" />
                </div>

                <h2 className="font-display text-[2.2rem] uppercase leading-none mb-1">You, Verified</h2>
                <div className="font-mono text-[0.75rem] text-[#46473f] mb-6 tracking-[0.5px] font-semibold">MATRIC • COMP ENG / 300L</div>

                <div className="flex gap-3 mb-5">
                  <div className="flex-1 bg-[rgba(20,21,26,0.04)] rounded-lg p-3">
                    <b className="block font-display text-[1.4rem] leading-[1.1] mb-0.5">4,250</b>
                    <span className="font-mono text-[0.55rem] tracking-[1px] text-[#8a8a7f] uppercase font-semibold">SP BALANCE</span>
                  </div>
                  <div className="flex-1 bg-[rgba(20,21,26,0.04)] rounded-lg p-3">
                    <b className="block font-display text-[1.4rem] leading-[1.1] mb-0.5">#1</b>
                    <span className="font-mono text-[0.55rem] tracking-[1px] text-[#8a8a7f] uppercase font-semibold">DEPT. RANK</span>
                  </div>
                </div>

                <div className="absolute bottom-[56px] left-0 right-0 h-[1px] bg-[rgba(20,21,26,0.06)] border-b border-white"></div>
                
                <div className="absolute bottom-4 left-6 right-4 flex justify-between items-end">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UL-26-COMPENG-HARRISON" className="w-[42px] h-[42px] rounded mix-blend-multiply opacity-85" alt="Verified QR" />
                  <div className="border-2 border-[#34d399] text-[#34d399] font-mono text-[0.7rem] font-bold tracking-[1.5px] px-2.5 py-1 rounded-md -rotate-6">VERIFIED ✓</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

                {/* ---- COURSE OUTLINE ---- */}
        <section id="outline" className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                Course outline
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 leading-[1.05] text-[#14151A]">
                Four modules. One campus.
              </h2>
              <p className="text-[#46473f] text-[1.05rem] leading-relaxed mb-8">
                Not another generic social app — UniLife is a purpose-built survival kit for university life, split into four things you actually need: your people, your hustle, your grades, and your bragging rights.
              </p>
              <a
                href="#study"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[0.88rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all whitespace-nowrap"
              >
                See what&apos;s inside ↓
              </a>
            </motion.div>

            <motion.div
              className="relative w-full rounded-[24px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
                alt="Students on campus between classes"
                className="w-full h-auto aspect-[4/5] object-cover rounded-[24px] shadow-2xl"
              />

              <motion.div
                className="absolute -bottom-5 -right-5 md:bottom-6 md:-right-8 bg-white p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] w-[80%] max-w-[240px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                <div className="flex justify-between font-mono text-[0.62rem] text-[#8a8a7f] mb-2 font-semibold uppercase">
                  <span>Timetable</span>
                  <span>2026/27</span>
                </div>
                <div className="bg-[#f4f6fc] p-3 rounded-xl border-l-4 border-[#ff3d81]">
                  <div className="text-[0.8rem] text-[#14151A] leading-snug font-medium">
                    4 modules enrolled. All electives, no prerequisites.
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ---- MODULE CARDS ---- */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.08 }}
          >
            {[
              {
                code: "SOC 100",
                title: "Communities",
                desc: "Departmental groups, anonymous confessions, campus feed.",
                href: "/communities",
                accent: "#ff3d81",
                accentBg: "rgba(255,61,129,0.08)",
                accentBorder: "rgba(255,61,129,0.25)",
                img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=500&auto=format&fit=crop",
              },
              {
                code: "MKT 201",
                title: "Marketplace",
                desc: "Buy and sell peer-to-peer, zero fees for early sellers.",
                href: "#marketplace",
                accent: "#b8860b",
                accentBg: "rgba(255,210,63,0.15)",
                accentBorder: "rgba(255,210,63,0.4)",
                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop",
              },
              {
                code: "LIB 301",
                title: "Study Hub",
                desc: "Past questions, AI tutor, and a live CGPA calculator.",
                href: "#study",
                accent: "#4f7fff",
                accentBg: "rgba(79,127,255,0.08)",
                accentBorder: "rgba(79,127,255,0.25)",
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop",
              },
              {
                code: "GAM 401",
                title: "SP Wallet",
                desc: "Earn Status Points, spend them, climb the leaderboard.",
                href: "#gamification",
                accent: "#059669",
                accentBg: "rgba(52,211,153,0.12)",
                accentBorder: "rgba(52,211,153,0.3)",
                img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format&fit=crop",
              },
            ].map((m) => (
              <motion.a
                key={m.code}
                href={m.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
                style={{ borderTop: `4px solid ${m.accent}`, borderLeft: "1px solid rgba(20,21,26,0.1)", borderRight: "1px solid rgba(20,21,26,0.1)", borderBottom: "1px solid rgba(20,21,26,0.1)" }}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative w-full h-[110px] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <span
                    className="inline-block font-mono text-[0.62rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{ background: m.accentBg, border: `1px solid ${m.accentBorder}`, color: m.accent }}
                  >
                    {m.code}
                  </span>
                  <h3 className="font-bold text-[0.98rem] text-[#14151A] mb-1.5 leading-tight flex items-center justify-between">
                    {m.title}
                    <span
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition-all duration-200 text-[0.85rem]"
                      style={{ color: m.accent }}
                    >
                      →
                    </span>
                  </h3>
                  <p className="text-[#8a8a7f] text-[0.8rem] leading-relaxed">{m.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* ---- STUDY HUB ---- */}
        <section id="study" className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
    Digital Library & AI
  </span>

  <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 leading-[1.05] text-[#14151A]">
    Study smarter, not harder.
  </h2>

  <p className="text-[#46473f] text-[1.05rem] leading-relaxed mb-8">
    Your academic survival kit. Upload a messy lecture PDF and let the
    built-in AI tutor explain complex concepts and generate practice
    quizzes. Earn SP for contributing past questions.
  </p>

  <div className="flex flex-col gap-4">
    {[
      { icon: "📚", title: "Past Questions & Notes", desc: "A verified library of materials for your exact courses." },
      { icon: "🤖", title: "AI Study Tutor", desc: "Chat with your PDFs. Get instant explanations." },
      { icon: "📈", title: "CGPA Calculator", desc: "Track your academic standing in real-time." },
    ].map((f) => (
      <div key={f.title} className="flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-[rgba(79,127,255,0.1)] border border-[rgba(79,127,255,0.3)] flex items-center justify-center text-lg">
          {f.icon}
        </div>
        <div>
          <h4 className="font-bold text-[1rem] text-[#14151A] mb-0.5">{f.title}</h4>
          <p className="text-[#46473f] text-[0.9rem] leading-relaxed">{f.desc}</p>
        </div>
      </div>
    ))}
  </div>
</motion.div>

            <motion.div 
              className="relative w-full rounded-[24px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Specific image of black students studying */}
              <img 
                src="https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=800&auto=format&fit=crop" 
                alt="Nigerian Students Studying" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-[24px] shadow-2xl" 
              />
              
              <motion.div 
                className="absolute -top-5 -right-5 md:top-6 md:-right-8 bg-white p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] z-10 w-[85%] max-w-[280px]"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="w-full h-[2px] bg-[#4f7fff] mb-3 relative shadow-[0_0_10px_#4f7fff] animate-scan"></div>
                <div className="flex justify-between font-mono text-[0.65rem] text-[#8a8a7f] mb-3 font-semibold uppercase">
                  <span>PDF</span> 
                  <span>MTH 201 - Vector Calc</span>
                </div>
                <div className="bg-[#f4f6fc] p-3 rounded-xl border-l-4 border-[#4f7fff]">
                  <div className="text-[0.85rem] text-[#14151A] leading-snug font-medium">
                    Let&apos;s break down Green&apos;s Theorem. Ready for a quick quiz?
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ---- MARKETPLACE ---- */}
        <section id="marketplace" className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="bg-[rgba(255,210,63,0.15)] rounded-[32px] p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
              
              <motion.div 
                className="relative w-full rounded-[24px]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Specific image of student transaction/retail */}
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" 
                  alt="Student Seller" 
                  className="w-full h-auto aspect-square object-cover rounded-[24px] shadow-2xl" 
                />
                
                <motion.div 
                  className="absolute -bottom-5 -left-5 md:bottom-8 md:-left-8 bg-white p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] z-10 w-[90%] max-w-[300px]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <div className="flex gap-3 items-center mb-3">
                    <div className="w-12 h-12 bg-[#FFD23F] rounded-lg shrink-0 flex items-center justify-center text-xl">📐</div>
                    <div>
                      <b className="block text-[0.95rem] font-bold mb-0.5 leading-tight">Engineering Drawing Set</b>
                      <span className="font-mono text-[0.7rem] text-[#46473f]">₦4,500 • Motion Ground</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="font-mono text-[0.65rem] bg-[rgba(52,211,153,0.15)] text-[#059669] px-2 py-1 rounded font-bold uppercase tracking-wide">Verified Seller</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
                  Campus Marketplace
                </span>
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
                  Buy and sell without leaving your department.
                </h2>
                <p className="text-[#46473f] text-lg leading-relaxed mb-8">
                  Textbooks, electronics, and hostel essentials — sold peer-to-peer by students you can actually find again. Open a branded UniShop with inventory management and reach a captive campus audience. Zero fees for early adopters.
                </p>
                <Link href="/sellers" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-[0.88rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap">
                  Open your storefront →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ---- GAMIFICATION & LEADERBOARDS ---- */}
        <section id="gamification" className="py-16 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="max-w-[700px] mx-auto text-center mb-16">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              The Campus Economy
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4">
              Earn Status Points just for showing up.
            </h2>
            <p className="text-[#46473f] text-lg leading-relaxed">
              Climb the ranks on the Richest and Smartest leaderboards. Turn your daily streaks, early bird bonuses, and library contributions into a digital currency you can actually spend.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <motion.div 
              className="bg-white border border-[rgba(20,21,26,0.12)] rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-40 bg-[#fdfbf7] rounded-2xl mb-6 border border-[rgba(20,21,26,0.12)] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-14 h-14 bg-[#FFD23F] rounded-full flex items-center justify-center font-display text-xl border-2 border-[#14151A] shadow-[0_6px_0_#14151A] mb-4 animate-bounce-slow text-[#14151A]">SP</div>
                <div className="bg-[#14151A] text-[#FFD23F] font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">+50 SP (Login Streak)</div>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-[#14151A]">SP Wallet & Store</h3>
              <p className="text-[#46473f] leading-relaxed">
                Earn Status Points (SP) every day. Spend them on custom themes, marketplace listing boosts, and ad-free upgrades inside the app. (1 SP = ₦1).
              </p>
            </motion.div>

            <motion.div 
              className="bg-white border border-[rgba(20,21,26,0.12)] rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-40 bg-gradient-to-br from-[#8fb0ff] to-[#4f7fff] rounded-2xl mb-6 flex flex-col gap-3 p-6 items-stretch justify-center">
                <div className="bg-white px-4 py-2.5 rounded-lg flex items-center justify-between shadow-lg border-l-4 border-[#FFD23F] scale-[1.02] z-10">
                  <span className="font-display text-lg text-[#2b1e00] w-6">1</span>
                  <span className="font-semibold text-[0.9rem] text-[#14151A]">Toluwani A.</span>
                  <span className="font-mono text-[0.7rem] text-[#8a8a7f] font-bold">Lv. 12</span>
                </div>
                <div className="bg-white/90 px-4 py-2.5 rounded-lg flex items-center justify-between">
                  <span className="font-display text-lg text-[#46473f] w-6">2</span>
                  <span className="font-semibold text-[0.9rem] text-[#14151A]">Harrison A.</span>
                  <span className="font-mono text-[0.7rem] text-[#8a8a7f] font-bold">Lv. 8</span>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-[#14151A]">Campus Wars</h3>
              <p className="text-[#46473f] leading-relaxed">
                Compete against other departments. Level up your profile (1 level per 500 SP) and earn exclusive titles and gold badges for being a top contributor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ---- DOWNLOAD BAND ---- */}
        <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <motion.div 
            className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#FFD23F] border border-[rgba(255,210,63,0.3)] px-4 py-1.5 rounded-full mb-6 uppercase">
              Get UniLife
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">Your admission is confirmed.</h2>
            <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
              Download the app, verify your student profile, and start earning SP from day one. No invite code needed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Forcing explicit text colors again to beat global CSS */}
              <a href={APP_URL} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap">
                Download UniLife →
              </a>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap">
                See Pro Plans
              </Link>
            </div>
          </motion.div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}