"use client";

import { motion } from "framer-motion";
import { CinematicImage } from "@/components/CinematicImage";
import { HeroCup } from "@/components/HeroCup";
import { FloatingBeans } from "@/components/FloatingBeans";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <CinematicImage
        src="hero.jpg"
        alt="Dark, moody interior of The Bean coffee house"
        className="absolute inset-0"
        overlay="hero"
        priority
      />

      <FloatingBeans className="z-[5]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
        <HeroCup className="h-28 md:h-36 w-auto text-burnt-orange mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" />

        <motion.h1
          className="font-display text-5xl md:text-7xl tracking-tight text-cream"
          variants={fadeUp}
          custom={1.3}
          initial="hidden"
          animate="visible"
        >
          The Bean
        </motion.h1>

        <motion.p
          className="mt-4 max-w-md text-cream-dim text-lg md:text-xl font-light"
          variants={fadeUp}
          custom={1.5}
          initial="hidden"
          animate="visible"
        >
          Coffee, roasted with intent. Slow pours, no shortcuts.
        </motion.p>

        <motion.a
          href="#menu"
          className="mt-10 inline-flex items-center gap-2 border border-burnt-orange text-burnt-orange-light px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-burnt-orange hover:text-charcoal transition-colors duration-300"
          variants={fadeUp}
          custom={1.7}
          initial="hidden"
          animate="visible"
        >
          View the menu
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-cream-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-cream-dim"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
