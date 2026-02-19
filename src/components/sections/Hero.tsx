"use client";
import { Link } from "react-scroll";
import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { Button } from "../ui/moving-border";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Added for social links
import InteractiveParticles from "../ui/InteractiveParticles";

function HeroSection() {
  return (
    <div
      id="home" // Added ID
      className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center overflow-hidden px-4 py-14 sm:min-h-[calc(100vh-4rem)] sm:px-6 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-72">
        <InteractiveParticles
          quantity={160}
          particleColor="rgba(248, 250, 252, 0.95)"
        />
      </div>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-5 text-3xl font-bold text-transparent sm:py-8 sm:text-7xl">
          Hi, I'm Rohit Pakhre
        </h1>
        <TextGenerateEffect
          words="Full Stack Developer, building innovative web solutions." // More descriptive
          className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-lg font-bold text-transparent md:text-3xl lg:text-4xl" // Adjusted sizes
        />
        <p className="mx-auto mt-4 max-w-lg text-sm font-normal text-neutral-300 md:text-lg">
          I craft robust and scalable web applications from front to back, focusing on user experience and clean code.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="projects" smooth={true} duration={500}>
            <Button
              borderRadius="1.75rem"
              className="bg-transparent dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800"
            >
              View my work
            </Button>
          </Link>
          <div className="flex gap-3 sm:gap-4">
            <a href="https://github.com/rohit-pakhre09" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-gray-400">
              <FaGithub className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a href="https://linkedin.com/in/rohit-pakhre" target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-gray-400">
              <FaLinkedin className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            {/* Potentially add a resume download button here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
