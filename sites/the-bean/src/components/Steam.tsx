"use client";

import { motion } from "framer-motion";

type SteamProps = {
  className?: string;
  strands?: number;
};

const PATHS = [
  "M10,90 C0,70 18,55 8,35 C-2,15 14,5 6,-15",
  "M10,90 C20,72 4,58 14,38 C24,18 8,8 16,-12",
  "M10,90 C2,68 16,52 6,32 C-4,12 12,2 4,-18",
];

/**
 * Looping wisps of steam. Each strand drifts up, sways, and fades,
 * staggered so they never move in lockstep.
 */
export function Steam({ className = "", strands = 3 }: SteamProps) {
  return (
    <div className={`pointer-events-none flex gap-6 ${className}`} aria-hidden>
      {Array.from({ length: strands }).map((_, i) => (
        <svg key={i} viewBox="-15 -20 40 115" width="28" height="80" fill="none">
          <motion.path
            d={PATHS[i % PATHS.length]}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, y: 10 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.5, 0],
              y: [10, -6, -22],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.9,
            }}
          />
        </svg>
      ))}
    </div>
  );
}
