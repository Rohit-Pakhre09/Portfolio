"use client";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  note: string;
};

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Science in Information Technology (BSc. IT)",
    institution: "Vidhyadeep University",
    location: "Anita (Kim), Olpad Highway, Surat, Gujarat, India",
    period: "2023 - Present",
    note: "Currently pursuing BSc IT with focus on computer science fundamentals, software development, and web technologies.",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Shree Gurukrupa Vidhya Sankul",
    location: "Udhana, Surat, Gujarat, India",
    period: "Completed",
    note: "Completed Higher Secondary education in Commerce stream, developing strong foundations in mathematics, business studies, logical reasoning, and analytical thinking.",
  },
  {
    degree: "Secondary School (10th)",
    institution: "Jeevan Vikas High School",
    location: "Udhana, Surat, Gujarat, India",
    period: "Completed",
    note: "Early academic base that shaped discipline and problem-solving habits.",
  },
];

function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            Education
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
            Academic Background
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
            A quick overview of my completed academic journey.
          </p>
        </div>

        <div className="grid gap-5">
          {educationData.map((item, index) => (
            <motion.article
              key={`${item.degree}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/4 to-transparent p-5 shadow-lg shadow-black/20 backdrop-blur-md sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_17rem] sm:items-start sm:gap-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
                    <FaGraduationCap className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {item.institution}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {item.note}
                    </p>
                  </div>
                </div>

                <div className="mt-1 w-full space-y-2 pl-12 text-xs text-neutral-400 sm:mt-0 sm:w-[17rem] sm:pl-0">
                  <p className="grid grid-cols-[0.875rem_1fr] items-start gap-2">
                    <FaCalendarAlt className="mt-0.5 h-3 w-3 text-emerald-300/80" />
                    <span className="leading-relaxed">{item.period}</span>
                  </p>
                  <p className="grid grid-cols-[0.875rem_1fr] items-start gap-2">
                    <FaMapMarkerAlt className="mt-0.5 h-3 w-3 text-emerald-300/80" />
                    <span className="leading-relaxed">{item.location}</span>
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;

