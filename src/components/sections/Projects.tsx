"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaImage } from "react-icons/fa";
import { PinContainer } from "../ui/3d-pin";
import { projects, type Project } from "@/lib/projects";

const ITEMS_PER_PAGE = 3;

const isValidImageSrc = (value: string | undefined) => {
  if (!value) return false;
  if (value.startsWith("/")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !isValidImageSrc(src)) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-slate-900 to-slate-800 text-slate-300">
        <FaImage className="h-8 w-8 text-emerald-300/80" />
        <p className="text-xs uppercase tracking-wider text-neutral-400">
          Will Come Soon..
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain p-2"
      onError={() => setHasError(true)}
    />
  );
}

const formatPinTitle = (project: Project) => {
  if (!project.liveLink) return project.title;

  try {
    const url = new URL(project.liveLink);
    return `${url.host}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return project.liveLink;
  }
};

function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const startItem =
    projects.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, projects.length);

  return (
    <section id="projects" className="scroll-mt-28 py-16 sm:py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedProjects.map((project) => (
              <PinContainer
                key={project.title}
                title={formatPinTitle(project)}
                href={project.liveLink ?? project.sourceLink}
                containerClassName="h-[30rem] w-full"
                className="w-[min(92vw,22rem)] sm:w-[18.5rem] md:w-[20rem] lg:w-[21rem] xl:w-[20rem]"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-lg shadow-black/25 backdrop-blur-sm transition-all duration-200 group-hover/pin:border-emerald-400/40">
                  <div className="relative h-48 w-full bg-black/40 sm:h-52">
                    <ProjectImage src={project.image} alt={project.title} />
                  </div>
                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <h3 className="text-lg font-bold text-slate-100">
                      {project.title}
                    </h3>
                    <p className="min-h-18 text-sm leading-relaxed text-slate-300">
                      {project.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-emerald-400/50 px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10"
                        >
                          <FaExternalLinkAlt className="h-3.5 w-3.5" />
                          Live URL
                        </a>
                      )}
                      <a
                        href={project.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10"
                      >
                        <FaGithub className="h-4 w-4" />
                        View GitHub
                      </a>
                    </div>
                  </div>
                </article>
              </PinContainer>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-neutral-400 sm:text-sm">
                Showing {startItem}-{endItem} of {projects.length} projects
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-neutral-200 transition-colors hover:border-emerald-300/50 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-md border text-sm transition-colors ${
                        currentPage === page
                          ? "border-emerald-300/60 bg-emerald-500/20 text-emerald-200"
                          : "border-white/20 text-neutral-300 hover:border-emerald-300/40 hover:text-emerald-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-neutral-200 transition-colors hover:border-emerald-300/50 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectsSection;
