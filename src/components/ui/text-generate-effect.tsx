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
    const occurrences = new Map<string, number>();

    return (
      <motion.div>
        {wordsArray.map((word, idx) => {
          const occurrence = occurrences.get(word) ?? 0;
          occurrences.set(word, occurrence + 1);

          return (
            <motion.span
              key={`${word}-${occurrence}`}
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
