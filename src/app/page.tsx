"use client";

import { useEffect, useMemo, useState } from "react";
import AboutSection from "@/components/sections/About";
import AchievementsSection from "@/components/sections/Achievements";
import ContactSection from "@/components/sections/Contact";
import EducationSection from "@/components/sections/Education";
import ExperienceSection from "@/components/sections/Experience";
import HeroSection from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import ResumeSection from "@/components/sections/Resume";
import SkillsSection from "@/components/sections/Skills";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaderFading, setIsLoaderFading] = useState(false);
  const loaderChars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        char: "01ABCDEF"[index % 8],
      })),
    [],
  );

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsLoaderFading(true), 1400);
    const hideTimer = setTimeout(() => setShowLoader(false), 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-500 ${
            isLoaderFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="matrix-loader">
            <div className="matrix-loader-orbit">
              {loaderChars.map((item, index) => {
                const angle = (index / loaderChars.length) * 360;
                return (
                  <span
                    key={item.id}
                    className="matrix-loader-char"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-92px)`,
                    }}
                  >
                    {item.char}
                  </span>
                );
              })}
            </div>
            <div className="matrix-loader-core">
              <span>Loading</span>
            </div>
          </div>
          <p className="absolute bottom-14 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/85">
            Initializing Portfolio
          </p>
        </div>
      )}
      <div className="relative z-10 min-h-screen bg-black/[0.96] bg-grid-white/[0.02] antialiased">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </>
  );
}
