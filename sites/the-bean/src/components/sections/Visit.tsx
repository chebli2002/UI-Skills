"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=14+Kettle+Row%2C+Portland+OR";

export function Visit() {
  return (
    <section
      id="visit"
      className="relative bg-cream py-24 md:py-32 px-6 md:px-16"
    >
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-charcoal-deep/25 to-transparent pointer-events-none"
      />

      <div className="relative max-w-[40rem] mx-auto text-center">
        <motion.span
          className="text-burnt-orange-deep uppercase tracking-[0.3em] text-xs"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          Come By
        </motion.span>

        <motion.h2
          className="font-display text-3xl md:text-4xl text-charcoal mt-4 leading-tight"
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          Come sit with us.
        </motion.h2>

        <motion.div
          className="mt-6 text-charcoal-dim text-lg leading-relaxed"
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <p>14 Kettle Row, Portland OR</p>
          <p>7am — 6pm daily</p>
          <p className="mt-4">
            Tucked a block off the arterial on Kettle Row — look for steam in
            the window.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
          custom={0.45}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <Button href="#menu" variant="primary" tone="light">
            Shop Beans
          </Button>
          <Button
            href={DIRECTIONS_URL}
            variant="link"
            tone="light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
