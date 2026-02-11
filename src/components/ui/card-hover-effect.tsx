"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion"; // Added imports
import React, { useRef, useState } from "react"; // Added useRef

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card key={idx} icon={item.icon}> {/* Pass icon to Card */}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  icon, // Receive icon prop
}: {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode; // Type for icon prop
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(
    smoothMouseY,
    [-100, 100], // Input range (pixels from center)
    [-8, 8]     // Output range (degrees)
  );
  const rotateY = useTransform(
    smoothMouseX,
    [-100, 100], // Input range (pixels from center)
    [-8, 8]     // Output range (degrees)
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
      }}
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transition-all duration-300", // Added transition
        className
      )}
    >
      <div
        className="absolute inset-0 bg-dot-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Subtle background pattern
        style={{
          maskImage: "radial-gradient(100px 100px at var(--x) var(--y), white, transparent)",
          WebkitMaskImage: "radial-gradient(100px 100px at var(--x) var(--y), white, transparent)",
        }}
      ></div>
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${smoothMouseX}px ${smoothMouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
      />

      <div className="relative z-50">
        <div className="p-4 flex flex-col items-center"> {/* Centered content */}
          {icon && <div className="mb-4 text-4xl text-neutral-500 dark:text-neutral-200">{icon}</div>} {/* Render icon */}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};