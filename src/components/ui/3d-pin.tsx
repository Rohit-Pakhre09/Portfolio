"use client";
import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg) scale(1)",
  );
  const [isHovered, setIsHovered] = useState(false);
  const [labelShift, setLabelShift] = useState(0);

  const onMouseEnter = () => {
    setIsHovered(true);
    setTransform("translate(-50%,-50%) rotateX(18deg) scale(0.965)");
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    setLabelShift(0);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    const tiltX = 14 + relY * 10;
    const tiltY = (relX - 0.5) * 10;
    const scale = 0.962 + relY * 0.02;

    setTransform(
      `translate(-50%,-50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
    );
    setLabelShift((relX - 0.5) * 10);
  };

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse tracking for 3D effect is decoration */}
      <div
        className={cn(
          "relative group/pin z-50 cursor-pointer",
          containerClassName,
        )}
        role="presentation"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(62deg) translateZ(0deg)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            style={{
              transform: transform,
            }}
            className={cn(
              "absolute left-1/2 top-1/2 flex items-start justify-start overflow-hidden rounded-2xl border bg-black p-4 transition duration-300",
              isHovered
                ? "border-emerald-300/35 shadow-[0_14px_30px_rgb(16_185_129/0.14)]"
                : "border-white/10 shadow-[0_8px_16px_rgb(0_0_0/0.4)]",
            )}
          >
            <div className={cn("relative z-50", className)}>{children}</div>
          </div>
        </div>
        {isHovered && (
          <PinPerspective title={title} href={href} labelShift={labelShift} />
        )}
      </div>
    </>
  );
};

export const PinPerspective = ({
  title,
  href,
  labelShift,
}: {
  title?: string;
  href?: string;
  labelShift?: number;
}) => {
  const resolvedHref = href ?? "#";

  return (
    <motion.div className="pointer-events-none z-60 flex h-80 w-96 items-center justify-center opacity-0 transition duration-300 group-hover/pin:opacity-100">
      <div className="inset-0 -mt-6 h-full w-full flex-none">
        <div className="absolute top-0 inset-x-0  flex justify-center">
          <a
            href={resolvedHref}
            target={"_blank"}
            rel="noopener noreferrer"
            className="pointer-events-auto relative z-10 flex cursor-pointer items-center space-x-2 rounded-full bg-zinc-950/95 px-4 py-1 ring-1 ring-white/15"
          >
            <motion.span
              animate={{ x: labelShift ?? 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative z-20 inline-block py-0.5 text-sm font-semibold text-white sm:text-base"
            >
              {title}
            </motion.span>

            <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/pin:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(62deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          {/* biome-ignore lint/complexity/noUselessFragments: wraps multiple siblings */}
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 0.9, 0.45, 0],
                scale: [0.75, 1, 1.08],
                z: 0,
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-40 w-40 rounded-[50%] bg-emerald-500/10 shadow-[0_8px_16px_rgb(0_0_0/0.25)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 0.85, 0.4, 0],
                scale: [0.72, 1, 1.06],
                z: 0,
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 1.6,
              }}
              className="absolute left-1/2 top-1/2 h-40 w-40 rounded-[50%] bg-emerald-500/10 shadow-[0_8px_16px_rgb(0_0_0/0.25)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 0.8, 0.38, 0],
                scale: [0.7, 1, 1.04],
                z: 0,
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 3.2,
              }}
              className="absolute left-1/2 top-1/2 h-40 w-40 rounded-[50%] bg-emerald-500/10 shadow-[0_8px_16px_rgb(0_0_0/0.25)]"
            ></motion.div>
          </>
        </div>

        {/* biome-ignore lint/complexity/noUselessFragments: wraps multiple siblings */}
        <>
          <motion.div
            animate={{ height: [64, 92, 76], opacity: [0.45, 0.9, 0.55] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/2 bottom-1/2 w-px translate-y-3.5 bg-linear-to-b from-transparent to-emerald-400 blur-[1px]"
          />
          <motion.div
            animate={{ height: [64, 92, 76] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/2 bottom-1/2 w-px translate-y-3.5 bg-linear-to-b from-transparent to-emerald-400"
          />
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/2 bottom-1/2 z-40 h-1 w-1 translate-x-[0.5px] translate-y-3.5 rounded-full bg-emerald-400 blur-[2px]"
          />
        </>
      </div>
    </motion.div>
  );
};
