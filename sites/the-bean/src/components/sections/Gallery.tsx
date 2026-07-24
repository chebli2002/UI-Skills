"use client";

import { motion } from "framer-motion";
import { CinematicImage } from "@/components/CinematicImage";

const shots = [
  { src: "gallery-1.jpg", alt: "The Bean, café interior ambience" },
  { src: "gallery-2.jpg", alt: "Latte art close-up" },
  { src: "gallery-3.jpg", alt: "Beans mid-roast" },
  { src: "gallery-4.jpg", alt: "Pastry case at The Bean" },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Gallery() {
  return (
    <section className="py-32 px-6 md:px-16">
      <div className="text-center mb-14">
        <span className="text-burnt-orange-light uppercase tracking-[0.3em] text-xs">
          Inside The Bean
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-cream mt-4">
          A room built for slowing down
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {shots.map((shot, i) => (
          <motion.div
            key={shot.src}
            className="group relative aspect-[3/4] overflow-hidden"
            variants={item}
            custom={i * 0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover="hover"
          >
            <motion.div
              className="absolute inset-0"
              variants={{ hover: { scale: 1.08 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <CinematicImage src={shot.src} alt={shot.alt} className="h-full w-full" overlay="none" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent" />
            <motion.p
              className="absolute bottom-4 left-4 text-cream text-sm tracking-wide"
              variants={{ hidden: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
              initial="hidden"
              transition={{ duration: 0.3 }}
            >
              {shot.alt}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
