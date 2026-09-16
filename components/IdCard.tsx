"use client";

import { useRef } from "react";
import Image from "next/image";

export default function IdCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 22 - 8}deg) rotateX(${y * -22 + 6}deg)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateY(-8deg) rotateX(6deg)";
  }

  return (
    <div
      className="id-card-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="id-card" id="idCard" ref={cardRef}>
        <div className="id-card__pin" />
        <div className="id-card__top">
          <span className="id-card__top-brand">
            <Image src="/icon.png" alt="" width={20} height={20} />
            UNILIFE CAMPUS ID
          </span>
          <span>2026/27</span>
        </div>
        <div className="id-card__photo">
          <Image src="/icon.png" alt="" width={54} height={54} />
        </div>
        <div className="id-card__name">You, Verified</div>
        <div className="id-card__meta mono">MATRIC · UL/26/04217</div>
        <div className="id-card__stats">
          <div className="id-card__stat">
            <b>1,240</b>
            <span>SP BALANCE</span>
          </div>
          <div className="id-card__stat">
            <b>#12</b>
            <span>DEPT. RANK</span>
          </div>
        </div>
        <div className="id-card__stamp">VERIFIED ✓</div>
      </div>
    </div>
  );
}
