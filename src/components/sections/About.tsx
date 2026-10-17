"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const highlights = [
  { title: "Profile", value: "Fresher", detail: "Actively building practical web projects" },
  { title: "Core Stack", value: "MERN", detail: "MongoDB, Express, React, Node.js" },
  { title: "Focus", value: "Team Projects", detail: "Collaboration, clean code, and product delivery" },
];

function AboutSection() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            About
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
            MERN Developer With a Product Mindset
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
            I build responsive and scalable web applications using the MERN stack with clean architecture and practical UX thinking.
          </p>
        </div>
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-xl shadow-black/20 backdrop-blur-md md:grid-cols-[240px_1fr] md:items-start md:p-8 lg:grid-cols-[280px_1fr] lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-emerald-400/40 shadow-xl shadow-emerald-500/20 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          >
            <Image
              src="/images/profileImage.png"
              alt="Profile Picture"
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-left"
          >
            <p className="text-sm leading-relaxed text-neutral-200 sm:text-base">
              I am Rohit Pakhre, a fresher software developer with a MERN stack niche. I enjoy building end-to-end web products and turning ideas into working solutions.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
              My strongest learning and project work has been around MongoDB, Express, React, and Node.js. I focus on reusable components, REST APIs, and smooth user experiences.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
              I have worked in team-based project development on Smart Shelf, where I learned collaboration, communication, and practical delivery workflows.
            </p>
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-wider text-emerald-300/80">
                    {item.title}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-neutral-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
