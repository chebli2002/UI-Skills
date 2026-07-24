"use client";

import { motion } from "framer-motion";
import { CinematicImage } from "@/components/CinematicImage";
import { RotatingBean } from "@/components/RotatingBean";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const details = [
  { label: "Origin", value: "Ethiopia & Colombia" },
  { label: "Roast", value: "Medium–dark" },
  { label: "Process", value: "Washed, slow-dried" },
];

export function Origin() {
  return (
    <section id="origin" className="relative py-20 md:py-32 px-6 md:px-16">
      <CinematicImage
        src="beans-texture.jpg"
        alt="Close-up texture of roasted coffee beans"
        className="absolute inset-0"
        overlay="panel"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative h-64 md:h-96 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div
            aria-hidden
            className="absolute h-56 w-56 md:h-80 md:w-80 rounded-full bg-charcoal-deep/70 blur-2xl"
          />
          <RotatingBean className="relative h-48 w-48 md:h-72 md:w-72 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]" />
        </motion.div>

        <div>
          <motion.span
            className="text-burnt-orange-light uppercase tracking-[0.3em] text-xs"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            Our Origin
          </motion.span>

          <motion.h2
            className="font-display text-5xl md:text-6xl text-cream mt-4 leading-tight"
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            Every bean has a story before it ever meets water.
          </motion.h2>

          <motion.p
            className="mt-6 text-cream-dim text-lg leading-relaxed max-w-md"
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            We source a single high-altitude lot from Ethiopia&apos;s
            Yirgacheffe region and a family farm in Colombia&apos;s Huila,
            roast each in twelve-kilogram batches, and rest every lot for
            ten days before it&apos;s ground.
          </motion.p>

          <motion.p
            className="font-display italic text-2xl md:text-3xl text-burnt-orange-light mt-6"
            variants={fadeUp}
            custom={0.45}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            Patience is the whole method.
          </motion.p>

          <motion.dl
            className="mt-10 grid grid-cols-3 gap-6 max-w-md border-t border-cream-dim/20 pt-6"
            variants={fadeUp}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-xs uppercase tracking-widest text-cream-dim/70">
                  {d.label}
                </dt>
                <dd className="mt-1 text-cream font-display text-lg">{d.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
