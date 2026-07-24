"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CinematicImage } from "@/components/CinematicImage";
import { Steam } from "@/components/Steam";

const WAVE_1 = "M65,152 C80,150 90,154 100,152 C110,150 120,154 135,152 L135,164 L65,164 Z";
const WAVE_2 = "M65,153 C80,156 90,150 100,153 C110,156 120,150 135,153 L135,164 L65,164 Z";
const WAVE_3 = "M65,151 C80,153 90,157 100,154 C110,151 120,155 135,152 L135,164 L65,164 Z";

const CAPTION = "Two minutes, thirty seconds — timed by hand, every pour.";

/**
 * Scroll-scrubbed pour: as the user scrolls through this section's runway,
 * the stream draws in, the cup fills with a gradient liquid that gets a
 * wobbling surface and crema once mostly full, splash droplets pop near the
 * rim mid-pour, and steam rises once it's full. The tall wrapper + sticky
 * inner viewport is what ties animation progress to scroll position rather
 * than time; the wave/wobble/steam loops layered on top are time-based and
 * live on separate elements/props so they never fight the scroll-driven
 * values on the same node.
 *
 * Under prefers-reduced-motion, scroll-scrubbed pinning is a vestibular
 * hazard, not just an animation to mute — so instead of muting the motion in
 * place, this renders a simplified static section: no tall runway, no
 * sticky pin, cup already in its finished-pour state, and the same caption.
 */
export function Pour() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const streamLength = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const streamOpacity = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.9], [0, 1, 1, 0]);
  const fillScale = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const waveOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const cremaOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const splashOpacity = useTransform(scrollYProgress, [0.28, 0.32, 0.5, 0.55], [0, 1, 1, 0]);
  const splashY = useTransform(scrollYProgress, [0.28, 0.32], [8, 0]);
  const steamOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.7, 0.85], [16, 0]);

  if (shouldReduceMotion) {
    return (
      <section className="relative min-h-svh overflow-hidden flex items-center justify-center">
        <CinematicImage
          src="pour.jpg"
          alt="Coffee being poured into a cup"
          className="absolute inset-0"
          overlay="panel"
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* static finished-pour state: no scroll-linked fill/wave/splash/stream */}
          <svg
            viewBox="0 0 200 300"
            className="w-40 md:w-56 h-auto text-burnt-orange-light"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="liquid-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="152" x2="0" y2="258">
                <stop offset="0%" style={{ stopColor: "var(--color-burnt-orange-light)" }} />
                <stop offset="45%" style={{ stopColor: "var(--color-burnt-orange)" }} />
                <stop offset="100%" style={{ stopColor: "var(--color-charcoal-deep)" }} />
              </linearGradient>
              <clipPath id="cup-clip">
                <path d="M62,152 L138,152 L129,258 L71,258 Z" />
              </clipPath>
            </defs>

            {/* cup outline */}
            <path
              d="M60,150 L140,150 L130,260 L70,260 Z"
              stroke="currentColor"
              strokeWidth={2.5}
              fill="none"
              opacity={0.9}
            />
            <ellipse cx="100" cy="150" rx="40" ry="8" stroke="currentColor" strokeWidth={2.5} fill="none" opacity={0.9} />

            {/* liquid: fully filled, no wave */}
            <g clipPath="url(#cup-clip)">
              <rect x="65" y="152" width="70" height="106" fill="url(#liquid-gradient)" opacity={0.92} />
            </g>

            {/* crema ring near the rim */}
            <ellipse cx="100" cy="153" rx="35" ry="3" stroke="var(--color-cream)" strokeWidth={1} fill="none" />

            {/* static glass highlights, painted last */}
            <path d="M78,160 L74,250" stroke="var(--color-cream)" strokeWidth={1.5} opacity={0.2} strokeLinecap="round" />
            <path d="M122,158 L126,246" stroke="var(--color-cream)" strokeWidth={1.5} opacity={0.2} strokeLinecap="round" />
          </svg>

          <div className="text-burnt-orange -mt-8">
            <Steam strands={3} className="justify-center" />
          </div>

          <p className="mt-6 font-display text-2xl md:text-3xl text-cream text-center max-w-sm px-6">
            {CAPTION}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[280svh]">
      <div className="sticky top-0 h-svh overflow-hidden flex items-center justify-center">
        <CinematicImage
          src="pour.jpg"
          alt="Coffee being poured into a cup"
          className="absolute inset-0"
          overlay="panel"
        />

        <div className="relative z-10 flex flex-col items-center">
          <svg
            viewBox="0 0 200 300"
            className="w-40 md:w-56 h-auto text-burnt-orange-light"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="liquid-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="152" x2="0" y2="258">
                <stop offset="0%" style={{ stopColor: "var(--color-burnt-orange-light)" }} />
                <stop offset="45%" style={{ stopColor: "var(--color-burnt-orange)" }} />
                <stop offset="100%" style={{ stopColor: "var(--color-charcoal-deep)" }} />
              </linearGradient>
              <clipPath id="cup-clip">
                <path d="M62,152 L138,152 L129,258 L71,258 Z" />
              </clipPath>
            </defs>

            {/* stream, with a wobble loop wrapping two scroll-driven strokes */}
            <motion.g
              animate={{ x: [0, 0.6, -0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.path
                d="M100,0 C95,40 106,70 99,110"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: streamLength, opacity: streamOpacity }}
              />
              <motion.path
                d="M99,0 C94.5,40 105.5,70 98.5,110"
                stroke="var(--color-cream)"
                strokeWidth={1}
                strokeLinecap="round"
                fill="none"
                opacity={0.5}
                style={{ pathLength: streamLength, opacity: streamOpacity }}
              />
            </motion.g>

            {/* splash droplets, mid-air just below the rim — outside the clipped/scaled liquid group */}
            <motion.g style={{ opacity: splashOpacity, y: splashY }} fill="currentColor">
              <circle cx="92" cy="144" r="2" />
              <circle cx="105" cy="141" r="1.6" />
              <circle cx="112" cy="147" r="1.4" />
              <circle cx="86" cy="148" r="1.4" />
            </motion.g>

            {/* cup outline */}
            <path
              d="M60,150 L140,150 L130,260 L70,260 Z"
              stroke="currentColor"
              strokeWidth={2.5}
              fill="none"
              opacity={0.9}
            />
            <ellipse cx="100" cy="150" rx="40" ry="8" stroke="currentColor" strokeWidth={2.5} fill="none" opacity={0.9} />

            {/* liquid: scroll-driven fill scale on the group, time-driven wave on a child */}
            <motion.g style={{ scaleY: fillScale, transformOrigin: "100px 258px" }} clipPath="url(#cup-clip)">
              <rect x="65" y="152" width="70" height="106" fill="url(#liquid-gradient)" opacity={0.92} />
              <motion.path
                d={WAVE_1}
                animate={{ d: [WAVE_1, WAVE_2, WAVE_3, WAVE_1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: waveOpacity }}
                fill="url(#liquid-gradient)"
              />
            </motion.g>

            {/* crema ring near the rim once mostly full */}
            <motion.ellipse
              cx="100"
              cy="153"
              rx="35"
              ry="3"
              stroke="var(--color-cream)"
              strokeWidth={1}
              fill="none"
              style={{ opacity: cremaOpacity }}
            />

            {/* static glass highlights, painted last */}
            <path d="M78,160 L74,250" stroke="var(--color-cream)" strokeWidth={1.5} opacity={0.2} strokeLinecap="round" />
            <path d="M122,158 L126,246" stroke="var(--color-cream)" strokeWidth={1.5} opacity={0.2} strokeLinecap="round" />
          </svg>

          <motion.div style={{ opacity: steamOpacity }} className="text-burnt-orange -mt-8">
            <Steam strands={3} className="justify-center" />
          </motion.div>

          <motion.p
            style={{ opacity: captionOpacity, y: captionY }}
            className="mt-6 font-display text-2xl md:text-3xl text-cream text-center max-w-sm px-6"
          >
            {CAPTION}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
