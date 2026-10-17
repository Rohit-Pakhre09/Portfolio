"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]';
const CURSOR_VARIANT: "minimal" | "neon" = "neon";

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringXTarget = useMotionValue(-100);
  const ringYTarget = useMotionValue(-100);

  const ringX = useSpring(ringXTarget, {
    stiffness: 320,
    damping: 28,
    mass: 0.25,
  });
  const ringY = useSpring(ringYTarget, {
    stiffness: 320,
    damping: 28,
    mass: 0.25,
  });
  const haloX = useSpring(ringXTarget, {
    stiffness: 120,
    damping: 24,
    mass: 0.45,
  });
  const haloY = useSpring(ringYTarget, {
    stiffness: 120,
    damping: 24,
    mass: 0.45,
  });

  useEffect(() => {
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!canUseCustomCursor) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-enabled");

    const handleMove = (event: MouseEvent) => {
      setVisible(true);
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      ringXTarget.set(event.clientX);
      ringYTarget.set(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const handleLeaveWindow = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      setVisible(false);
      setInteractive(false);
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleLeaveWindow);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleLeaveWindow);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dotX, dotY, ringXTarget, ringYTarget]);

  if (!enabled) return null;
  const isMinimal = CURSOR_VARIANT === "minimal";

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      <motion.div
        style={{ x: haloX, y: haloY }}
        animate={{
          opacity: visible
            ? interactive
              ? isMinimal
                ? 0.2
                : 0.55
              : isMinimal
                ? 0.12
                : 0.35
            : 0,
          scale: pressed
            ? 0.75
            : interactive
              ? isMinimal
                ? 1.1
                : 1.5
              : isMinimal
                ? 0.95
                : 1.1,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isMinimal
            ? "h-10 w-10 bg-emerald-300/18 blur-lg"
            : "h-16 w-16 bg-emerald-400/35 blur-xl"
        }`}
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed
            ? isMinimal
              ? 0.9
              : 0.84
            : interactive
              ? isMinimal
                ? 1.16
                : 1.38
              : 1,
          borderColor: interactive
            ? "rgba(16, 185, 129, 0.95)"
            : "rgba(110, 231, 183, 0.68)",
          boxShadow: interactive
            ? isMinimal
              ? "0 0 0 1px rgba(16,185,129,0.18), 0 0 10px rgba(16,185,129,0.2)"
              : "0 0 0 1px rgba(16,185,129,0.25), 0 0 24px rgba(16,185,129,0.45)"
            : isMinimal
              ? "0 0 0 1px rgba(110,231,183,0.12), 0 0 6px rgba(16,185,129,0.14)"
              : "0 0 0 1px rgba(110,231,183,0.18), 0 0 18px rgba(16,185,129,0.22)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[2px] ${
          isMinimal ? "h-7 w-7 bg-emerald-100/6" : "h-9 w-9 bg-emerald-200/8"
        }`}
      />
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed
            ? isMinimal
              ? 0.85
              : 0.72
            : interactive
              ? isMinimal
                ? 1.05
                : 1.24
              : 1,
          backgroundColor: interactive
            ? "rgb(52, 211, 153)"
            : "rgb(167, 243, 208)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isMinimal
            ? "h-2 w-2 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
            : "h-2.5 w-2.5 shadow-[0_0_18px_rgba(16,185,129,0.9)]"
        }`}
      />
    </div>
  );
}

export default CustomCursor;
