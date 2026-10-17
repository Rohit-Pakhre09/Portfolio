"use client";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Link } from "react-scroll";

function Footer() {
  const scrollDuration = 700;

  return (
    <footer className="relative z-10 mt-16 border-t border-white/10 bg-black/70 text-white backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_auto] md:items-start">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-lg font-bold">Rohit Pakhre</p>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Software Developer focused on building clean, scalable, and
              user-first web experiences.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">
              Building reliable digital experiences
            </p>
            <Link
              to="contact"
              smooth
              duration={scrollDuration}
              offset={-80}
              className="mt-3 inline-flex rounded-full border border-emerald-300/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 transition-colors hover:bg-emerald-500/20"
            >
              Start a project
            </Link>
          </div>

          <div className="text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-300">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
              <Link
                to="about"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                About
              </Link>
              <Link
                to="skills"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Skills
              </Link>
              <Link
                to="education"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Education
              </Link>
              <Link
                to="experience"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Experience
              </Link>
              <Link
                to="projects"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Projects
              </Link>
              <Link
                to="achievements"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Achievements
              </Link>
              <Link
                to="resume"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Resume
              </Link>
              <Link
                to="contact"
                smooth
                duration={scrollDuration}
                offset={-80}
                className="text-gray-400 transition-colors hover:text-emerald-300"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex justify-center space-x-4 md:justify-end">
            <a
              href="https://github.com/Rohit-Pakhre09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-white/20 bg-white/3 p-2 text-gray-300 transition-all hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/rohit-pakhre"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-white/20 bg-white/3 p-2 text-gray-300 transition-all hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/rohit._.ix/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/20 bg-white/3 p-2 text-gray-300 transition-all hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Rohit Pakhre. All rights reserved.
          </p>

          <Link
            to="home"
            smooth
            duration={scrollDuration}
            offset={-80}
            className="rounded-full border border-white/20 px-3 py-1 transition-colors hover:border-emerald-300/40 hover:text-emerald-300"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
