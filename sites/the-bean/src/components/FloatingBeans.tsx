"use client";

import { motion, useReducedMotion } from "framer-motion";

type Bean = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  bobY: number;
  opacity: number;
  hideOnMobile?: boolean;
};

// Scattered around the hero's edges so the centered cup/headline stay clear.
const beans: Bean[] = [
  { top: "9%", left: "12%", size: 30, duration: 9, delay: 0, driftX: 10, bobY: 16, opacity: 0.85 },
  { top: "15%", left: "85%", size: 22, duration: 11, delay: 1.2, driftX: -12, bobY: 20, opacity: 0.7, hideOnMobile: true },
  { top: "29%", left: "5%", size: 36, duration: 8.5, delay: 0.6, driftX: 12, bobY: 14, opacity: 0.9 },
  { top: "24%", left: "92%", size: 26, duration: 10, delay: 2, driftX: -8, bobY: 18, opacity: 0.75 },
  { top: "57%", left: "6%", size: 24, duration: 12, delay: 0.3, driftX: -10, bobY: 15, opacity: 0.7, hideOnMobile: true },
  { top: "61%", left: "91%", size: 32, duration: 9.5, delay: 1.6, driftX: 14, bobY: 17, opacity: 0.85 },
  { top: "80%", left: "16%", size: 20, duration: 7.5, delay: 2.4, driftX: 8, bobY: 12, opacity: 0.65, hideOnMobile: true },
  { top: "77%", left: "82%", size: 27, duration: 10.5, delay: 1, driftX: -12, bobY: 16, opacity: 0.8 },
];

const beanOutline = "M60,10 C95,30 95,90 60,110 C25,90 25,30 60,10 Z";
const beanCrease = "M60,18 C48,40 72,50 60,70 C48,88 68,96 60,108";

function BeanGlyph() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible">
      <path
        d={beanOutline}
        stroke="currentColor"
        strokeWidth={4}
        fill="var(--charcoal-deep)"
        fillOpacity={0.5}
        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
      />
      <path d={beanCrease} stroke="currentColor" strokeWidth={4} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Coffee beans adrift around the hero cup: each tumbles on its own
 * bob/drift/rotate loop so the scatter reads as organic, not synchronized.
 */
export function FloatingBeans({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden text-burnt-orange ${className}`}>
      {beans.map((bean, i) => (
        <motion.div
          key={i}
          className={`absolute ${bean.hideOnMobile ? "hidden md:block" : ""}`}
          style={{
            top: bean.top,
            left: bean.left,
            width: bean.size,
            height: bean.size,
            opacity: bean.opacity,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -bean.bobY, 0, bean.bobY, 0],
                  x: [0, bean.driftX, 0, -bean.driftX, 0],
                  rotate: [0, 180, 360],
                }
          }
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BeanGlyph />
        </motion.div>
      ))}
    </div>
  );
}
