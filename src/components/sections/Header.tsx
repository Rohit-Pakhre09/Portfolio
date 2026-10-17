"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";

function Header() {
  const scrollDuration = 900;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "border-b border-white/10 bg-black/40 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
        <Link
          to="home"
          smooth
          duration={scrollDuration}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5 transition-colors hover:border-emerald-300/40 sm:gap-2 sm:px-3"
        >
          <Image
            src="/favicon.svg"
            alt="Rohit Pakhre logo"
            width={32}
            height={32}
            className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
            priority
          />
          <span className="text-xs font-semibold tracking-wide text-white sm:text-base">
            Rohit <span className="hidden sm:inline">Pakhre</span>
          </span>
        </Link>
        <div className="rounded-full border border-white/10 bg-black/30 p-0.5 sm:p-1">
          <Navbar />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
