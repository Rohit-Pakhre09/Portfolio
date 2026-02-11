"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-scroll";
import {
  FaHome,
  FaUser,
  FaFolder,
  FaEnvelope,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaTrophy,
  FaFileAlt,
  FaChevronDown,
  FaEllipsisH,
} from "react-icons/fa";

type NavItem = {
  name: string;
  link: string;
  icon: ReactNode;
};

function Navbar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moreMenuId = "navbar-more-menu";
  const isDesktopViewport = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 640px)").matches;

  const primaryNavItems: NavItem[] = [
    {
      name: "Home",
      link: "home",
      icon: <FaHome className="h-3.5 w-3.5" />,
    },
    {
      name: "About",
      link: "about",
      icon: <FaUser className="h-3.5 w-3.5" />,
    },
    {
      name: "Skills",
      link: "skills",
      icon: <FaTools className="h-3.5 w-3.5" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <FaFolder className="h-3.5 w-3.5" />,
    },
    {
      name: "Resume",
      link: "resume",
      icon: <FaFileAlt className="h-3.5 w-3.5" />,
    },
    {
      name: "Contact",
      link: "contact",
      icon: <FaEnvelope className="h-3.5 w-3.5" />,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      name: "Education",
      link: "education",
      icon: <FaGraduationCap className="h-3.5 w-3.5" />,
    },
    {
      name: "Experience",
      link: "experience",
      icon: <FaBriefcase className="h-3.5 w-3.5" />,
    },
    {
      name: "Achievements",
      link: "achievements",
      icon: <FaTrophy className="h-3.5 w-3.5" />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleMoreClick = () => {
    if (isDesktopViewport()) return;
    setIsMoreOpen((prev) => !prev);
  };

  const handleMoreMouseEnter = () => {
    if (!isDesktopViewport()) return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsMoreOpen(true);
  };

  const handleMoreMouseLeave = () => {
    if (!isDesktopViewport()) return;
    closeTimerRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 160);
  };

  return (
    <nav className="flex items-center gap-0.5 sm:gap-1">
      {primaryNavItems.map((navItem) => (
        <Link
          key={navItem.link}
          to={navItem.link}
          smooth
          spy
          duration={500}
          offset={-80}
          activeClass="text-white bg-emerald-500/20 border-emerald-300/40"
          className="cursor-pointer rounded-full border border-transparent px-2 py-1.5 text-xs text-neutral-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </span>
        </Link>
      ))}
      <div
        className="relative"
        ref={moreMenuRef}
        onMouseEnter={handleMoreMouseEnter}
        onMouseLeave={handleMoreMouseLeave}
      >
        <button
          type="button"
          onClick={handleMoreClick}
          aria-expanded={isMoreOpen}
          aria-controls={moreMenuId}
          aria-haspopup="menu"
          className="cursor-pointer rounded-full border border-transparent px-2 py-1.5 text-xs text-neutral-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="block sm:hidden">
              <FaEllipsisH className="h-3.5 w-3.5" />
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              More <FaChevronDown className="h-3 w-3" />
            </span>
          </span>
        </button>

        {isMoreOpen && (
          <div
            id={moreMenuId}
            role="menu"
            className="absolute right-0 top-full z-50 mt-1 min-w-44 rounded-xl border border-white/10 bg-black/90 p-2 shadow-lg shadow-black/30 backdrop-blur-md"
          >
            {secondaryNavItems.map((navItem) => (
              <Link
                key={navItem.link}
                to={navItem.link}
                smooth
                spy
                duration={500}
                offset={-80}
                onClick={() => setIsMoreOpen(false)}
                activeClass="text-white bg-emerald-500/20 border-emerald-300/40"
                role="menuitem"
                className="mb-1 flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-neutral-300 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white last:mb-0"
              >
                {navItem.icon}
                {navItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
