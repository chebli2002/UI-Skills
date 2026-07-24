"use client";

import { motion } from "framer-motion";

type RotatingBeanProps = {
  className?: string;
};

const beanOutline = "M60,10 C95,30 95,90 60,110 C25,90 25,30 60,10 Z";
const beanCrease = "M60,18 C48,40 72,50 60,70 C48,88 68,96 60,108";

function BeanFace() {
  return (
    <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
      <path d={beanOutline} stroke="currentColor" strokeWidth={2.5} fill="none" />
      <path d={beanCrease} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * A single bean glyph spun around Y in 3D space, front/back faces layered
 * with backface-visibility hidden so it reads as a solid object rotating
 * rather than a flat card flipping.
 */
export function RotatingBean({ className = "" }: RotatingBeanProps) {
  return (
    <div className={`text-burnt-orange ${className}`} style={{ perspective: 800 }}>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0">
          <BeanFace />
        </div>
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0"
        >
          <BeanFace />
        </div>
      </motion.div>
    </div>
  );
}
