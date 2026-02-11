"use client";
import { motion } from "framer-motion";
import { FaDownload, FaFileAlt } from "react-icons/fa";

const resumePath = "/resume/Rohit-Pakhre-Resume.pdf";

function ResumeSection() {
  return (
    <section
      id="resume"
      className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-400/25 bg-linear-to-r from-emerald-600/20 via-teal-600/15 to-black/20 p-6 shadow-xl shadow-black/25 backdrop-blur-md sm:p-8">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200/90">
                  Resume
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Download My Latest Resume
                </h2>
                <p className="mt-2 text-sm text-neutral-200 sm:text-base">
                  Get a quick overview of my skills, projects, and education.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  <FaFileAlt className="h-4 w-4" />
                  View Resume
                </a>
                <a
                  href={resumePath}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-300/60 bg-emerald-500/20 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/30"
                >
                  <FaDownload className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ResumeSection;
