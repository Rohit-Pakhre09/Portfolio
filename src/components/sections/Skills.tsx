"use client";
import type { IconType } from "react-icons";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGit,
  FaGithub,
  FaServer,
  FaCode,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiNetlify,
  SiPostman,
  SiVercel,
  SiJavascript,
} from "react-icons/si";

type Skill = {
  title: string;
  Icon: IconType;
  level: number;
};

type SkillGroup = {
  heading: string;
  subheading: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    heading: "Frontend",
    subheading: "Modern, responsive interfaces with strong UX quality.",
    skills: [
      { title: "React", Icon: FaReact, level: 93 },
      { title: "Next.js", Icon: SiNextdotjs, level: 90 },
      { title: "TypeScript", Icon: SiTypescript, level: 86 },
      { title: "Tailwind CSS", Icon: SiTailwindcss, level: 92 },
      { title: "HTML5", Icon: FaHtml5, level: 95 },
      { title: "CSS3", Icon: FaCss3Alt, level: 93 },
    ],
  },
  {
    heading: "Backend & Data",
    subheading: "API design, persistence, and scalable service layers.",
    skills: [
      { title: "Node.js", Icon: FaNodeJs, level: 90 },
      { title: "Express.js", Icon: SiExpress, level: 88 },
      { title: "MongoDB", Icon: SiMongodb, level: 88 },
      { title: "REST APIs", Icon: FaServer, level: 89 },
    ],
  },
  {
    heading: "Tools & Delivery",
    subheading: "Developer workflow, collaboration, and deployment readiness.",
    skills: [
      { title: "Git", Icon: FaGit, level: 91 },
      { title: "GitHub", Icon: FaGithub, level: 90 },
      { title: "Postman", Icon: SiPostman, level: 86 },
      { title: "Vercel", Icon: SiVercel, level: 88 },
      { title: "Netlify", Icon: SiNetlify, level: 84 },
    ],
  },
  {
    heading: "Core Fundamentals",
    subheading: "Concepts that support maintainable and production-ready code.",
    skills: [
      { title: "JavaScript (ES6+)", Icon: SiJavascript, level: 93 },
      { title: "DSA (Array, String, HashMap)", Icon: FaCode, level: 64 },
      { title: "DB Modeling Basics", Icon: FaDatabase, level: 80 },
      { title: "Team Collaboration", Icon: FaGithub, level: 88 },
    ],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            Capabilities
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
            Skillset Built for Real Products
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
            I combine strong engineering fundamentals with modern web tooling to ship polished, scalable applications.
          </p>
        </div>

        <div className="space-y-6">
          {skillGroups.map((group) => (
            <article
              key={group.heading}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-8"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">{group.heading}</h3>
                <p className="mt-1 text-sm text-neutral-300">{group.subheading}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <div
                    key={`${group.heading}-${skill.title}`}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <skill.Icon className="h-5 w-5 text-emerald-300" />
                        <span className="text-sm font-medium text-white">{skill.title}</span>
                      </div>
                      <span className="text-xs text-neutral-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
