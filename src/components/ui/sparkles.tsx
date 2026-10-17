"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  initialY: number;
};

const Sparkles = ({
  id: _id,
  className,
}: {
  id?: string;
  className?: string;
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkle = () => {
      const colors = ["#8BE9FD", "#BD93F9", "#50FA7B", "#FF79C6", "#F1FA8C"]; // Futuristic color palette
      const newSparkle = {
        id: Date.now() + Math.random(), // Use Math.random for uniqueness in case of rapid generation
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5, // Smaller size for a finer effect
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 1, // Keep duration similar
        initialY: Math.random() * window.innerHeight, // Store initial Y for upward motion
      };
      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, newSparkle.duration * 1000);
    };

    const interval = setInterval(generateSparkle, 80); // Slightly increase density
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        className,
      )}
    >
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, x: sparkle.x, y: sparkle.initialY }}
            animate={{ opacity: 1, y: sparkle.initialY - 50 }} // Subtle upward motion
            exit={{ opacity: 0, y: sparkle.initialY - 100 }} // Continue upward on exit
            transition={{ duration: sparkle.duration, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              filter: `blur(${sparkle.size / 4}px)`, // Add a slight blur for glow effect
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Sparkles;
