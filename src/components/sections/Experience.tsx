"use client";
import { motion } from "framer-motion";
import { FaLaptopCode, FaUsers } from "react-icons/fa";

const teamHighlights = [
  "Worked in a collaborative team setup during development",
  "Contributed to feature implementation and UI integration",
  "Participated in debugging, testing, and delivery discussions",
];

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
              Experience
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              Team Project Experience as a Fresher
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
              I am currently a fresher, focused on learning and building
              practical products through real teamwork.
            </p>
          </div>

          <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                <FaUsers className="h-3.5 w-3.5" />
                Team Collaboration
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-200">
                <FaLaptopCode className="h-3.5 w-3.5" />
                Smart Shelf Project
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Smart Shelf (Team Project)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
              Built as a collaborative project where I contributed to
              development tasks and learned how to work with shared codebases,
              timelines, and structured communication.
            </p>

            <ul className="mt-5 space-y-2">
              {teamHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </motion.div>
    </section>
  );
}

export default ExperienceSection;
