"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const primaryItems = [
  "Scalable Full Stack Apps",
  "Clean Architecture",
  "Performance First",
  "Production Ready UI",
  "API Integrations",
  "Robust Auth Flows",
];

const secondaryItems = [
  "React + Next.js",
  "TypeScript + Node.js",
  "Express + MongoDB",
  "Tailwind + Motion",
  "SEO + Accessibility",
  "Deployment + Monitoring",
];

const itemDetails: Record<string, string> = {
  "Scalable Full Stack Apps":
    "Architected for growth with clean modules, reusable patterns, and stable release workflows.",
  "Clean Architecture":
    "Readable structure with separation of concerns, making teams faster and maintenance safer.",
  "Performance First":
    "Optimized rendering, lean bundles, and responsive interactions across modern devices.",
  "Production Ready UI":
    "Accessible, consistent interfaces built with real-world states and edge-case handling.",
  "API Integrations":
    "Reliable third-party and internal integrations with retries, validation, and graceful fallbacks.",
  "Robust Auth Flows":
    "Secure sign-in flows with route protection, role checks, and session-aware UX.",
  "React + Next.js":
    "Fast, SEO-friendly frontends with modern routing, server rendering, and flexible data fetching.",
  "TypeScript + Node.js":
    "Type-safe APIs and services that improve refactoring speed and reduce runtime surprises.",
  "Express + MongoDB":
    "Practical backend stack for scalable CRUD, business logic layers, and data modeling.",
  "Tailwind + Motion":
    "Intentional visuals with polished interactions that feel smooth without being distracting.",
  "SEO + Accessibility":
    "Semantic structure and metadata improvements so products are discoverable and inclusive.",
  "Deployment + Monitoring":
    "CI/CD-first releases with observability hooks to track uptime and catch regressions early.",
};

function ShowcaseStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState(primaryItems[0]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const xPrimary = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const xSecondary = useTransform(scrollYProgress, [0, 1], [-140, 140]);
  const activeDescription = useMemo(
    () => itemDetails[activeItem] ?? "Interactive showcase",
    [activeItem],
  );

  return (
    <section ref={sectionRef} className="relative z-10 py-10 sm:py-14">
      <div className="w-full overflow-hidden">
        <div className="mb-4 flex items-center justify-center">
          <p className="rounded-full border border-emerald-300/35 bg-emerald-500/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-200 sm:text-xs">
            What I Build
          </p>
        </div>

        <div className="space-y-3">
          <motion.div style={{ x: xPrimary }} className="min-w-full">
            <motion.div
              drag="x"
              dragConstraints={{ left: -120, right: 120 }}
              dragElastic={0.2}
              className="flex w-max min-w-full cursor-grab gap-3 px-4 active:cursor-grabbing sm:px-6 lg:px-8"
            >
              {[...primaryItems, ...primaryItems].map((item, index) => (
                <motion.button
                  key={`primary-${index}`}
                  type="button"
                  onMouseEnter={() => setActiveItem(item)}
                  onFocus={() => setActiveItem(item)}
                  onClick={() => setActiveItem(item)}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-sm transition-colors sm:px-5 sm:text-sm ${
                    activeItem === item
                      ? "border-emerald-300/60 bg-emerald-500/20 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.28)]"
                      : "border-white/15 bg-white/6 text-neutral-100 hover:border-emerald-300/35 hover:bg-emerald-500/12"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ x: xSecondary }} className="min-w-full">
            <motion.div
              drag="x"
              dragConstraints={{ left: -120, right: 120 }}
              dragElastic={0.2}
              className="flex w-max min-w-full cursor-grab gap-3 px-4 active:cursor-grabbing sm:px-6 lg:px-8"
            >
              {[...secondaryItems, ...secondaryItems].map((item, index) => (
                <motion.button
                  key={`secondary-${index}`}
                  type="button"
                  onMouseEnter={() => setActiveItem(item)}
                  onFocus={() => setActiveItem(item)}
                  onClick={() => setActiveItem(item)}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-sm transition-colors sm:px-5 sm:text-sm ${
                    activeItem === item
                      ? "border-emerald-200/70 bg-emerald-500/26 text-emerald-50 shadow-[0_0_18px_rgba(16,185,129,0.36)]"
                      : "border-emerald-300/30 bg-emerald-500/10 text-emerald-100 hover:border-emerald-200/60 hover:bg-emerald-500/18"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-emerald-300/28 bg-linear-to-r from-emerald-500/12 via-emerald-400/8 to-transparent px-4 py-3 text-left sm:px-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
                {activeItem}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-200/95">
                {activeDescription}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseStrip;
