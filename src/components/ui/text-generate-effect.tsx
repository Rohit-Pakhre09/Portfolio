"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  const renderWords = () => {
    return (
      <motion.div>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-inherit"
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : idx * 0.06,
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide text-inherit">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
