"use client";
import { motion } from "framer-motion";

type DigitalGlobeProps = {
  size?: number;
};

function DigitalGlobe({ size = 160 }: DigitalGlobeProps) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size, perspective: "1200px" }}
      aria-hidden="true"
    >
      <div className="absolute inset-[-12%] rounded-full bg-emerald-400/22 blur-3xl" />
      <div className="absolute inset-[-18%] rounded-full bg-teal-500/14 blur-3xl" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 rounded-full border border-emerald-300/40 bg-[radial-gradient(circle_at_28%_24%,rgba(110,231,183,0.4),rgba(15,23,42,0.18)_42%,rgba(0,0,0,0)_72%)] shadow-[0_0_55px_rgba(16,185,129,0.45)]"
      >
        <div className="absolute inset-2 rounded-full border border-emerald-200/30" />
        <div className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,rgba(52,211,153,0.22),rgba(20,184,166,0.07),rgba(16,185,129,0.2),rgba(52,211,153,0.22))] mix-blend-screen" />

        {[0.24, 0.42, 0.62, 0.78].map((scale, index) => (
          <div
            key={`meridian-${index}`}
            className="absolute inset-3 rounded-full border border-emerald-300/28"
            style={{ transform: `rotate(${index * 24}deg) scaleX(${scale})` }}
          />
        ))}

        {[24, 37, 50, 63, 76].map((top, index) => (
          <div
            key={`latitude-${index}`}
            className="absolute left-1/2 h-px -translate-x-1/2 bg-emerald-300/40"
            style={{ top: `${top}%`, width: `${76 - index * 10}%` }}
          />
        ))}

        <div className="absolute inset-0 rounded-full [background:repeating-linear-gradient(to_bottom,rgba(52,211,153,0.14)_0px,rgba(52,211,153,0.14)_1px,transparent_1px,transparent_8px)] opacity-45 mix-blend-screen" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        className="absolute inset-4 rounded-full border border-teal-300/45"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
        className="absolute inset-[-10%] rounded-full border border-emerald-300/30"
        style={{ transform: "rotateX(68deg)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 13, ease: "linear", repeat: Infinity }}
        className="absolute inset-[-15%] rounded-full border border-teal-300/25"
        style={{ transform: "rotateX(72deg)" }}
      />

      <motion.div
        animate={{ opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[18%] rounded-full border border-emerald-100/30"
      />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 shadow-[0_0_22px_rgba(110,231,183,1)]" />
      <motion.div
        animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200/60"
      />

      {[["22%", "26%"], ["20%", "62%"], ["67%", "58%"], ["48%", "18%"]].map(
        ([left, top], index) => (
          <motion.div
            key={`${left}-${top}`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-[0_0_14px_rgba(110,231,183,1)]"
            style={{ left, top }}
          />
        )
      )}

      <div className="absolute inset-[-5%] rounded-full border border-emerald-300/20" />

      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.1, 0.16, 0.08] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_3px)] mix-blend-screen"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.12, 0.05] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full [background-image:radial-gradient(rgba(255,255,255,0.35)_0.55px,transparent_0.55px)] [background-size:3px_3px]"
      />
    </div>
  );
}

export default DigitalGlobe;
