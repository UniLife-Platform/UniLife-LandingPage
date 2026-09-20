"use client";

import { useEffect, useRef } from "react";

/**
 * High-performance, lightweight cursor follower.
 * Optimized specifically to avoid:
 * 1. React re-renders on mousemove (uses direct DOM transform via RAF)
 * 2. DOM mutations on hovered elements (no forced classList transforms that cause dropdown lag)
 * 3. Heavy mix-blend GPU compositing over backdrop-blur elements
 * 4. Loss of native cursor responsiveness (native cursor remains active and instant)
 */
export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on fine-pointer devices (desktop mouse / trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let rafId: number | null = null;
    let isMoving = false;
    let idleTimeout: NodeJS.Timeout | null = null;

    const updatePosition = () => {
      // Linear interpolation for silky-smooth follower ring
      const ease = 0.22;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      // Update dot position immediately (snappy)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Update ring follower (smooth lagging trail)
      const scale = isClicking ? 0.75 : isHovering ? 1.5 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

      // Continue loop while moving or closing distance
      const distance = Math.hypot(mouseX - ringX, mouseY - ringY);
      if (isMoving || distance > 0.5) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        rafId = null;
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check if hovering an interactive element without querying deep trees
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, [role='button'], input, select, textarea, summary, [data-interactive='true']"
      );

      if (interactive !== isHovering) {
        isHovering = interactive;
        if (isHovering) {
          ring.style.borderColor = "rgba(79, 127, 255, 0.85)";
          ring.style.backgroundColor = "rgba(79, 127, 255, 0.08)";
          dot.style.backgroundColor = "#4f7fff";
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1.4)`;
        } else {
          ring.style.borderColor = "rgba(20, 21, 26, 0.35)";
          ring.style.backgroundColor = "transparent";
          dot.style.backgroundColor = "#14151A";
        }
      }

      startAnimation();

      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const handleMouseDown = () => {
      isClicking = true;
      ring.style.borderColor = "#ff3d81";
      ring.style.backgroundColor = "rgba(255, 61, 129, 0.15)";
      startAnimation();
    };

    const handleMouseUp = () => {
      isClicking = false;
      ring.style.borderColor = isHovering ? "rgba(79, 127, 255, 0.85)" : "rgba(20, 21, 26, 0.35)";
      ring.style.backgroundColor = isHovering ? "rgba(79, 127, 255, 0.08)" : "transparent";
      startAnimation();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimeout) clearTimeout(idleTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#14151A] pointer-events-none z-[9999] opacity-0 transition-opacity duration-200"
        style={{
          willChange: "transform",
        }}
      />

      {/* Smooth Trailing Follower Ring */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[rgba(20,21,26,0.35)] pointer-events-none z-[9998] opacity-0 transition-[border-color,background-color,opacity] duration-200"
        style={{
          willChange: "transform",
          boxShadow: "0 0 12px rgba(79, 127, 255, 0.12)",
        }}
      />
    </>
  );
}
