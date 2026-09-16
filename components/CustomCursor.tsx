"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only activate cursor if the device has a fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsFinePointer(e.matches);
    };

    handleMediaChange(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    let currentHoveredElement: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, [role='button'], input, select, textarea, summary, [data-interactive='true']"
      ) as HTMLElement | null;

      if (interactiveEl) {
        if (currentHoveredElement !== interactiveEl) {
          if (currentHoveredElement) {
            currentHoveredElement.classList.remove("cursor-hover-target");
          }
          currentHoveredElement = interactiveEl;
          interactiveEl.classList.add("cursor-hover-target");
        }
        setIsHovering(true);
      } else {
        if (currentHoveredElement) {
          currentHoveredElement.classList.remove("cursor-hover-target");
          currentHoveredElement = null;
        }
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      if (currentHoveredElement) {
        currentHoveredElement.classList.remove("cursor-hover-target");
        currentHoveredElement = null;
      }
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
      if (currentHoveredElement) {
        currentHoveredElement.classList.remove("cursor-hover-target");
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  if (!isFinePointer || !isVisible) {
    return null;
  }

  // Outer inverse circular lens
  const outerSize = isPressed ? 44 : isHovering ? 64 : 24;

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
              /* Interactive element hover reaction */
              .cursor-hover-target {
                transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), filter 0.22s ease !important;
                transform: translateY(-2px) scale(1.018) !important;
                filter: brightness(1.06) !important;
              }
              .cursor-hover-target:active {
                transform: translateY(0px) scale(0.985) !important;
              }
            }
          `,
        }}
      />

      {/* CUSTOM INVERSE CURSOR (mix-blend-difference white/black invert) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999] mix-blend-difference bg-white flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)]"
        animate={{
          x: mousePosition.x - outerSize / 2,
          y: mousePosition.y - outerSize / 2,
          width: outerSize,
          height: outerSize,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 26,
          mass: 0.45,
        }}
      >
        {/* Inner center dot when hovering */}
        <motion.div
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-2 h-2 rounded-full bg-black pointer-events-none"
        />
      </motion.div>
    </>
  );
}
