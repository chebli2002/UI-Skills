"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CinematicImage } from "@/components/CinematicImage";
import { Steam } from "@/components/Steam";

/**
 * Scroll-scrubbed pour: as the user scrolls through this section's runway,
 * the stream draws in, the cup fills, and steam rises once it's full.
 * The tall wrapper + sticky inner viewport is what ties animation progress
 * to scroll position rather than time.
 */
export function Pour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const streamLength = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const streamOpacity = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.9], [0, 1, 1, 0]);
  const fillScale = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const steamOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.7, 0.85], [16, 0]);

  return (
    <section ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <CinematicImage
          src="pour.jpg"
          alt="Coffee being poured into a cup"
          className="absolute inset-0"
          overlay="panel"
        />

        <div className="relative z-10 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-40 md:w-56 h-auto text-burnt-orange-light">
            <motion.path
              d="M100,0 C95,40 106,70 99,110"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: streamLength, opacity: streamOpacity }}
            />

            <path
              d="M60,150 L140,150 L130,260 L70,260 Z"
              stroke="currentColor"
              strokeWidth={2.5}
              fill="none"
              opacity={0.9}
            />
            <ellipse cx="100" cy="150" rx="40" ry="8" stroke="currentColor" strokeWidth={2.5} fill="none" opacity={0.9} />

            <clipPath id="cup-clip">
              <path d="M62,152 L138,152 L129,258 L71,258 Z" />
            </clipPath>
            <motion.rect
              x="65"
              y="152"
              width="70"
              height="106"
              clipPath="url(#cup-clip)"
              fill="currentColor"
              opacity={0.85}
              style={{ scaleY: fillScale, transformOrigin: "80px 258px" }}
            />
          </svg>

          <motion.div style={{ opacity: steamOpacity }} className="text-burnt-orange -mt-8">
            <Steam strands={3} className="justify-center" />
          </motion.div>

          <motion.p
            style={{ opacity: captionOpacity, y: captionY }}
            className="mt-6 font-display text-2xl md:text-3xl text-cream text-center max-w-sm px-6"
          >
            Every cup, poured slow, poured deliberate.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
