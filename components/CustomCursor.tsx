"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: fine)");
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }
  return () => {};
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerServerSnapshot() {
  return false;
}

/**
 * Optimized Custom Cursor - Preserving the signature inverted circular lens
 * with high-performance Framer Motion springs outside React's render cycle.
 * 
 * Performance Optimizations:
 * 1. Coordinates driven by `useMotionValue` + `useSpring` (zero React re-renders on mousemove).
 * 2. Hover checks cached by target element to eliminate redundant DOM queries.
 * 3. Eliminates intrusive transforms on hovered elements that cause layout jitter in nav dropdowns.
 * 4. Hardware-accelerated GPU compositing via will-change and transform3d.
 */
export default function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // High-response spring for smooth tracking without dragging lag
  const springConfig = { stiffness: 500, damping: 30, mass: 0.3 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values directly without triggering React re-renders
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Cache target to avoid running closest() repeatedly on the same element
      if (e.target !== lastTargetRef.current) {
        lastTargetRef.current = e.target;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isInteractive = !!target.closest(
          "a, button, [role='button'], input, select, textarea, summary, label, [data-interactive='true']"
        );

        setIsHovering((prev) => (prev !== isInteractive ? isInteractive : prev));
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      lastTargetRef.current = null;
      setIsHovering(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [isFinePointer, isVisible, rawX, rawY]);

  if (!isFinePointer || !isVisible) {
    return null;
  }

  // Outer inverse circular lens dimensions
  const outerSize = isPressed ? 42 : isHovering ? 64 : 24;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (pointer: fine) {
              body, html {
                cursor: none !important;
              }
              a, button, [role="button"], input, select, textarea, summary, label {
                cursor: none !important;
              }
            }
          `,
        }}
      />

      {/* Outer inverse circular lens */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999] mix-blend-difference bg-white flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, width, height",
        }}
        animate={{
          width: outerSize,
          height: outerSize,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 26,
          mass: 0.35,
        }}
      >
        {/* Inner center dot on hover */}
        <motion.div
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{
            duration: 0.16,
            ease: "easeOut",
          }}
          className="w-2 h-2 rounded-full bg-black pointer-events-none"
        />
      </motion.div>
    </>
  );
}
