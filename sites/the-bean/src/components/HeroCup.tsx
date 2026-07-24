"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Steam } from "@/components/Steam";

type HeroCupProps = {
  className?: string;
  strokeWidth?: number;
  /** reserved for a future trickle-into-cup stream; off by default to keep the icon calm */
  showPour?: boolean;
};

/**
 * A cup + saucer that's always alive: gentle bob/sway, a shimmering liquid
 * surface, and rising steam (reused from Steam.tsx). Replaces the draw-once
 * AnimatedLogo mark in the hero so the page opens with continuous motion.
 */
export function HeroCup({ className = "", strokeWidth = 2.5, showPour = false }: HeroCupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-9 left-1/2 -translate-x-1/2">
        <Steam strands={2} className="justify-center" />
      </div>

      <svg viewBox="0 0 200 170" className="h-full w-full overflow-visible" fill="none">
        <motion.g
          animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 150px" }}
        >
          {showPour && (
            <path
              d="M100,20 C97,35 104,45 100,58"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.6}
            />
          )}

          {/* saucer */}
          <ellipse cx="100" cy="152" rx="58" ry="10" stroke="currentColor" strokeWidth={strokeWidth} opacity={0.9} />

          {/* handle */}
          <path
            d="M148,78 C172,78 172,116 148,114"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={0.9}
          />

          {/* cup body */}
          <path
            d="M58,68 L142,68 L134,142 L66,142 Z"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            opacity={0.9}
          />

          {/* rim */}
          <ellipse cx="100" cy="68" rx="42" ry="8" stroke="currentColor" strokeWidth={strokeWidth} opacity={0.9} />

          {/* liquid surface shimmer — static rest position when reduced motion is on */}
          <motion.ellipse
            cx="100"
            cy="68"
            rx={34}
            ry={6}
            animate={shouldReduceMotion ? undefined : { rx: [34, 35.5, 33.5, 34], ry: [6, 5.4, 6.4, 6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            fill="currentColor"
            opacity={0.85}
          />
        </motion.g>
      </svg>
    </div>
  );
}
