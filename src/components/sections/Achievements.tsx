"use client";
import { motion } from "framer-motion";
import { FaCertificate, FaLinkedin } from "react-icons/fa";

function AchievementsSection() {
  return (
    <section
      id="achievements"
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
              Achievements
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              Certifications & Milestones
            </h2>
          </div>

          <article className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/4 to-transparent p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  <FaCertificate className="h-3.5 w-3.5" />
                  Online Certification
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Prompt Engineering Certification
                </h3>
                <p className="mt-2 text-sm text-neutral-300 sm:text-base">
                  Completed an online Prompt Engineering program and shared the
                  achievement on LinkedIn.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/posts/rohit-pakhre_promptengineering-ai-generativeai-share-7347530593208791040-Kzl9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFWRmH4B-K0IVV92vRwtp9dmjYcP9epA3oY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10"
              >
                <FaLinkedin className="h-4 w-4 text-[#0A66C2]" />
                View LinkedIn
              </a>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}

export default AchievementsSection;
