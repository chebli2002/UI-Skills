"use client";

import { motion } from "framer-motion";

type AnimatedLogoProps = {
  className?: string;
  strokeWidth?: number;
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] as const}, opacity: { duration: 0.3, delay } },
  }),
};

/**
 * Draw-on entrance for the wordmark: bean outline first, crease follows,
 * then the two steam strands trail up last. Runs once on mount.
 */
export function AnimatedLogo({ className, strokeWidth = 2.5 }: AnimatedLogoProps) {
  return (
    <motion.svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M60,90 C95,110 95,170 60,190 C25,170 25,110 60,90 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        variants={draw}
        custom={0}
      />
      <motion.path
        d="M60,98 C48,120 72,130 60,150 C48,168 68,176 60,188"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={draw}
        custom={0.5}
      />
      <motion.path
        d="M50,86 C40,71 55,61 45,46 C35,31 50,21 42,6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.75}
        variants={draw}
        custom={0.9}
      />
      <motion.path
        d="M68,86 C78,69 62,59 72,43 C82,27 66,19 74,4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.75}
        variants={draw}
        custom={1.05}
      />
    </motion.svg>
  );
}
