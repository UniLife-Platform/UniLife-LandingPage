"use client";

import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, type Variants } from "motion/react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=ng.com.unilife.app";
const WHATSAPP_URL = "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl";

// --- ELITE SPOTLIGHT CARD (Border & Fill Glow) ---
const SpotlightCard = ({ children, className = "", color = "rgba(52, 211, 153, 0.2)" }: { children: React.ReactNode, className?: string, color?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className={`relative group rounded-[32px] bg-[#09090b] shadow-2xl ${className}`} 
      onMouseMove={handleMouseMove}
    >
      {/* Animated Border Gradient Tracker */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`,
        }}
      />
      {/* Inner Content Wrapper */}
      <div className="absolute inset-[1px] rounded-[31px] bg-[#09090b]/90 backdrop-blur-3xl z-10"></div>
      
      {/* Inner Fill Tracker */}
      <motion.div
        className="pointer-events-none absolute inset-[1px] rounded-[31px] opacity-0 transition duration-500 group-hover:opacity-100 z-20 mix-blend-screen"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${color.replace('0.2', '0.05')}, transparent 80%)`,
        }}
      />
      
      <div className="relative z-30 h-full">{children}</div>
    </div>
  );
};

export default function DownloadPage() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsWaitlisted(true);
    }, 1500);
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .scan-line { position: absolute; width: 100%; height: 2px; background: #34d399; box-shadow: 0 0 10px #34d399, 0 0 20px #34d399, 0 0 40px #34d399; top: 0; left: 0; animation: scan 2s infinite linear; z-index: 10; }
        @keyframes scan { 0% { top: -5%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 105%; opacity: 0; } }
        
        .bg-grid { 
          background-size: 40px 40px; 
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); 
          -webkit-mask-image: linear-gradient(to bottom, white, transparent);
          mask-image: linear-gradient(to bottom, white, transparent);
        }
        
        .id-card { width: 100%; max-width: 320px; aspect-ratio: 340 / 490; background: #fdfbf7; color: #14151A; border-radius: 24px; padding: 24px; position: relative; box-shadow: -20px 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.5); overflow: hidden; }
        .id-card__glare { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%); transform: skewX(-20deg); animation: sweep 6s infinite cubic-bezier(0.19, 1, 0.22, 1); z-index: 10; pointer-events: none; }
        @keyframes sweep { 0% { left: -100%; opacity: 0; } 20% { opacity: 1; } 40% { left: 200%; opacity: 0; } 100% { left: 200%; opacity: 0; } }
        body { margin: 0; padding: 0; background-color: #030305; }
      `}} />

      {/* QR ZOOM MODAL */}
      <AnimatePresence>
        {isQrZoomed && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030305]/80 p-6"
            onClick={() => setIsQrZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-[#09090b] border border-white/10 p-10 rounded-[32px] flex flex-col items-center shadow-[0_0_100px_rgba(52,211,153,0.15)] relative"
              onClick={(e) => e.stopPropagation()} 
            >
              <button onClick={() => setIsQrZoomed(false)} className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/50 transition-colors">✕</button>
              
              <div className="w-16 h-16 bg-[#34d399]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#34d399]/20 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                 <svg className="w-8 h-8 text-[#34d399]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.6 9.48l1.84-3.18c.16-.27.06-.61-.21-.76-.27-.15-.61-.06-.76.21L16.62 9c-1.37-.62-2.92-.96-4.57-.96-1.65 0-3.2.34-4.57.96L5.63 5.75c-.15-.27-.49-.36-.76-.21-.27.15-.37.49-.21.76l1.84 3.18C3.76 11.04 1.7 13.9 1 17.5h22.1c-.7-3.6-2.76-6.46-5.5-8.02zM8.2 15c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8zm7.7 0c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8z"/></svg>
              </div>
              <h3 className="font-display text-3xl text-white uppercase mb-2">Scan to Install</h3>
              <p className="font-mono text-xs text-[#a1a1aa] uppercase tracking-[0.2em] mb-10">Android Edition</p>
              
              <div className="relative border border-white/10 bg-white/5 rounded-[2rem] p-4 mb-8 shadow-2xl">
                <div className="scan-line h-[3px]"></div>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(PLAYSTORE_URL)}`} 
                  alt="QR Code" 
                  className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-2xl" 
                />
              </div>
              <a href={PLAYSTORE_URL} className="text-[#34d399] font-bold text-sm tracking-wide hover:text-white transition-colors">
                Or download directly to device →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#030305] text-[#F6F2E7] min-h-screen flex flex-col font-body antialiased selection:bg-[#4f7fff] selection:text-white overflow-x-clip relative">
        
        {/* CINEMATIC AURORA BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#4f7fff] opacity-[0.05] blur-[100px] rounded-full mix-blend-screen" />
          <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 50, ease: "linear" }} className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#ff3d81] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
          <motion.div animate={{ y: [0, -50, 0], x: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }} className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#34d399] opacity-[0.04] blur-[130px] rounded-full mix-blend-screen" />
        </div>

        <Nav active="/download" theme="dark" />

        <main className="flex-grow flex flex-col items-center pt-12 sm:pt-16 md:pt-20 pb-24 px-6 relative z-10">
          
          {/* ELITE HERO SECTION */}
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center mb-28 md:mb-32">
            <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-20">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#e2e2e2] font-semibold">V1.0 Live on Play Store</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="font-display text-[clamp(3rem,7vw,5.5rem)] uppercase mb-6 leading-[0.9] tracking-tighter text-white">
                Your campus, <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a1a1aa] to-[#52525b]">amplified.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[500px] mb-10 font-medium">
                Verify your matric number, join your exact department, and open your campus shop. The ultimate survival kit for university.
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-5 p-4 rounded-3xl bg-white/[0.02] border border-white/5 w-fit backdrop-blur-sm">
                <div className="flex -space-x-4">
                  {['Harrison', 'Tolu', 'Chuks'].map((seed, i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=e2e2e2`} alt="Avatar" className="w-12 h-12 rounded-full border-[3px] border-[#030305] bg-[#14151A]" />
                  ))}
                </div>
                <div className="flex flex-col pr-4">
                  <div className="flex text-[#FFD23F] text-[0.9rem] gap-0.5 tracking-tighter">★★★★★</div>
                  <span className="font-mono text-[0.65rem] text-[#a1a1aa] uppercase tracking-[0.1em] font-bold mt-1">400+ Verified Users</span>
                </div>
              </motion.div>
            </motion.div>

            {/* 3D SCENE INTEGRATION */}
            <motion.div 
              className="flex justify-center lg:justify-end relative h-full min-h-[400px] perspective-[1000px]"
              initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Floor Grid Reflection effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(79,127,255,0.15)_0%,transparent_70%)] rounded-full blur-xl transform rotate-X-[70deg]"></div>
              
              <motion.div 
                className="id-card z-10"
                whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05, translateY: -15, boxShadow: "-30px 40px 80px rgba(0,0,0,0.6)" }}
                animate={{ rotateY: -15, rotateX: 10, y: [0, -20, 0] }}
                transition={{ y: { repeat: Infinity, duration: 7, ease: "easeInOut" }, type: "spring", stiffness: 150, damping: 20 }}
              >
                <div className="id-card__glare"></div>
                <div className="flex justify-between items-center font-mono text-[0.65rem] tracking-[1px] text-[#8a8a7f] mb-4 uppercase font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4f7fff] text-white px-2 py-0.5 rounded font-display text-[0.85rem] font-bold shadow-[0_0_15px_rgba(79,127,255,0.5)]">U</span>
                    <span>CAMPUS ID</span>
                  </div>
                  <span>2026/27</span>
                </div>
                <div className="w-full h-[170px] rounded-2xl mb-5 bg-gradient-to-br from-[#8fb0ff] to-[#1c2c66] flex items-center justify-center relative overflow-hidden shadow-inner border border-white/20">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_10px)]"></div>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harrison" alt="Avatar" className="w-[64px] h-[64px] relative z-10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/30" />
                </div>
                <h2 className="font-display text-[2.4rem] uppercase leading-none mb-1 text-[#14151A]">You, Verified</h2>
                <div className="font-mono text-[0.75rem] text-[#46473f] mb-6 tracking-[0.5px] font-semibold">MATRIC • COMP ENG</div>
                <div className="flex gap-3 mb-1">
                  <div className="flex-1 bg-[rgba(20,21,26,0.03)] rounded-xl p-3 border border-black/5">
                    <b className="block font-display text-[1.5rem] leading-[1.1] mb-0.5 text-[#14151A]">4,250</b>
                    <span className="font-mono text-[0.55rem] tracking-[1px] text-[#8a8a7f] uppercase font-semibold">SP BALANCE</span>
                  </div>
                  <div className="flex-1 flex justify-end items-end p-1">
                    <div className="relative group cursor-pointer" onClick={() => setIsQrZoomed(true)}>
                      <div className="absolute inset-0 bg-[#34d399] opacity-0 group-hover:opacity-20 blur-md rounded-lg transition-opacity duration-300"></div>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(PLAYSTORE_URL)}`} className="w-[58px] h-[58px] rounded-lg mix-blend-multiply opacity-90 relative z-10" alt="QR" title="Click to Enlarge" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ELITE BENTO GRID */}
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr] gap-6 z-20">
            
            {/* ANDROID PRIMARY CARD */}
            <motion.div className="lg:col-span-1 h-full" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
              <SpotlightCard className="p-10 flex flex-col justify-between h-full" color="rgba(52,211,153,0.25)">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#34d399]/10 rounded-2xl flex items-center justify-center border border-[#34d399]/20 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                       <svg className="w-7 h-7 text-[#34d399]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.6 9.48l1.84-3.18c.16-.27.06-.61-.21-.76-.27-.15-.61-.06-.76.21L16.62 9c-1.37-.62-2.92-.96-4.57-.96-1.65 0-3.2.34-4.57.96L5.63 5.75c-.15-.27-.49-.36-.76-.21-.27.15-.37.49-.21.76l1.84 3.18C3.76 11.04 1.7 13.9 1 17.5h22.1c-.7-3.6-2.76-6.46-5.5-8.02zM8.2 15c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8zm7.7 0c-.44 0-.8-.36-.8-.8s.36-.8.8-.8.8.36.8.8-.36.8-.8.8z"/></svg>
                    </div>
                    <h2 className="font-display text-4xl uppercase text-white">Android</h2>
                  </div>
                  
                  <p className="text-[#a1a1aa] mb-10 leading-relaxed text-[1.05rem]">
                    P2P marketplace, anonymous confessions, and your AI Study Tutor. Start earning Status Points (SP) today.
                  </p>
                  
                  <motion.a 
                    href={PLAYSTORE_URL} target="_blank" rel="noopener noreferrer" 
                    whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="inline-block relative group"
                  >
                    <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    <img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" className="h-[64px] relative z-10 drop-shadow-2xl" />
                  </motion.a>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6">
                  <div 
                    onClick={() => setIsQrZoomed(true)}
                    className="relative bg-white p-3 rounded-[1.25rem] shadow-[0_0_50px_rgba(52,211,153,0.15)] overflow-hidden shrink-0 group-hover:shadow-[0_0_60px_rgba(52,211,153,0.3)] transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-[#34d399]/50"
                  >
                    <div className="scan-line"></div>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(PLAYSTORE_URL)}`} alt="QR Code" className="w-[80px] h-[80px] rounded-xl mix-blend-multiply relative z-0" />
                  </div>
                  <div>
                    <span className="block font-mono text-[0.65rem] text-[#34d399] uppercase tracking-[0.2em] font-bold mb-1.5">Fast Install</span>
                    <span className="block text-[#a1a1aa] text-[0.85rem] hover:text-white transition-colors cursor-pointer" onClick={() => setIsQrZoomed(true)}>Click QR to enlarge</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* CAMPUS EXPANSION / REQUEST CARD */}
            <motion.div 
              className="bg-[#09090b] rounded-[32px] overflow-hidden relative shadow-2xl h-full border border-white/10 group flex flex-col justify-between p-8 sm:p-10"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" 
                  alt="Students" 
                  className="w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 to-transparent"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[0.65rem] bg-[#FFD23F]/10 border border-[#FFD23F]/30 text-[#FFD23F] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-[0.15em]">
                    Campus Expansion
                  </span>
                  <span className="font-mono text-xs text-[#a1a1aa] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Vote Open
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl uppercase text-white mb-3 leading-tight">
                  Not at OOU yet?
                </h3>
                <p className="text-[#a1a1aa] text-[0.92rem] leading-relaxed mb-6">
                  Help us prioritize our next campus launch. Cast your vote and rally your coursemates to bring UniLife to your university.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["UNILAG", "UI", "OAU", "LASU", "FUTA", "UNIBEN"].map((uni) => (
                    <span key={uni} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  href="/request"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#FFD23F] text-[#14151A] hover:bg-[#ffe066] hover:-translate-y-0.5 transition-all shadow-[0_10px_25px_rgba(255,210,63,0.2)]"
                >
                  <span>Request Your Campus</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* iOS WAITLIST CARD */}
            <motion.div className="h-full" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.3 }}>
              <SpotlightCard className="p-10 flex flex-col justify-between h-full" color="rgba(255,255,255,0.15)">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-3xl uppercase text-white flex items-center gap-3">
                      <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                        <svg className="w-5 h-5 text-white mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.67.72 3.4 1.8-3.12 1.87-2.6 5.98.48 7.32-.71 1.7-1.53 3.06-2.53 3.89zM12.03 7.25C11.92 5.14 13.84 3.18 16 3c.21 2.22-1.92 4.29-3.97 4.25z"/></svg>
                      </span>
                      iPhone
                    </h2>
                    <span className="font-mono text-[0.6rem] bg-white/5 text-[#a1a1aa] px-3 py-1.5 rounded-full uppercase tracking-[0.1em] border border-white/10 font-semibold shadow-inner">
                      In Dev
                    </span>
                  </div>

                  <img alt="App Store" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1276560000&h=7e7b68fad19738b5649a1bfb78ff46e9" className="h-[44px] rounded-lg opacity-30 grayscale mb-8 pointer-events-none" />
                  
                  <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-6">
                    Finalizing the iOS build. Drop your email and we&apos;ll ping you the second it hits the App Store.
                  </p>
                </div>

                <div className="mt-auto">
                  <AnimatePresence mode="wait">
                    {!isWaitlisted ? (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3" onSubmit={handleWaitlist}>
                        <div className="relative">
                          <input 
                            type="email" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)}
                            placeholder="Student email..." disabled={isSubmitting}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#4f7fff] focus:ring-1 focus:ring-[#4f7fff] transition-all disabled:opacity-50 shadow-inner"
                            required
                          />
                        </div>
                        <button 
                          type="submit" disabled={isSubmitting}
                          className="w-full bg-white text-[#14151A] px-5 py-4 rounded-xl text-sm font-bold hover:bg-[#e2e2e2] transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] flex justify-center items-center disabled:opacity-80"
                        >
                          {isSubmitting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-[3px] border-[#14151A] border-t-transparent rounded-full" />
                          ) : "Notify Me"}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#34d399]/10 border border-[#34d399]/30 rounded-xl p-5 flex items-center gap-4 shadow-inner">
                        <div className="w-12 h-12 rounded-full bg-[#34d399] flex items-center justify-center text-[#14151A] shrink-0 font-bold text-xl shadow-[0_0_20px_rgba(52,211,153,0.4)]">✓</div>
                        <div>
                          <p className="text-[#34d399] font-bold text-[0.95rem] mb-1">You&apos;re on the list ✌️</p>
                          <p className="text-[#a1a1aa] text-xs leading-tight">Alerting {waitlistEmail}.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* CINEMATIC WHATSAPP BANNER */}
            <motion.div 
              className="lg:col-span-3 rounded-[32px] overflow-hidden relative flex flex-col md:flex-row shadow-2xl mt-8 group border border-white/10 bg-[#09090b]"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop" 
                  alt="Students Community" 
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#030305] via-[#030305]/95 to-transparent"></div>
              </div>
              
              <div className="w-full md:w-[60%] p-10 md:p-14 relative z-10 flex flex-col justify-center text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(37,211,102,0.4)] border border-white/20">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl uppercase text-white">The Core Community</h2>
                </div>
                
                <p className="text-[#a1a1aa] text-base max-w-[500px] mx-auto md:mx-0 leading-relaxed mb-10 drop-shadow-md">
                  Get real-time updates, chat directly with the founders, and connect with other early adopters. Your voice shapes the ecosystem.
                </p>
                
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block self-center md:self-start bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-[1rem] hover:bg-[#20b858] hover:-translate-y-1 transition-all shadow-[0_15px_40px_rgba(37,211,102,0.4)] whitespace-nowrap"
                >
                  Join WhatsApp Group →
                </a>
              </div>
            </motion.div>
          </div>

        </main>
        
        <div className="border-t border-white/5 bg-[#030305] relative z-20">
          <Footer />
        </div>
      </div>
    </>
  );
}