"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = { name: string; note: string; price: string };

const MENU: Record<string, MenuItem[]> = {
  Coffee: [
    { name: "Espresso", note: "Double shot, house blend", price: "$4" },
    { name: "Cortado", note: "Equal parts espresso & steamed milk", price: "$5" },
    { name: "Pour Over", note: "Single origin, brewed to order", price: "$6" },
    { name: "Flat White", note: "Ristretto, micro-foam", price: "$5.5" },
    { name: "The Bean Signature", note: "Cardamom, honey, oat milk", price: "$6.5" },
  ],
  Beans: [
    { name: "Ethiopia Yirgacheffe", note: "Floral, citrus, washed", price: "$18" },
    { name: "Colombia Huila", note: "Caramel, stone fruit", price: "$17" },
    { name: "House Blend", note: "Dark chocolate, low acidity", price: "$15" },
  ],
  Pastries: [
    { name: "Almond Croissant", note: "Baked fresh each morning", price: "$5" },
    { name: "Basque Burnt Cheesecake", note: "Slow-baked, caramelized top", price: "$6" },
    { name: "Cardamom Bun", note: "Swedish-style, laminated dough", price: "$4.5" },
  ],
};

const CATEGORIES = Object.keys(MENU);

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Menu() {
  const [active, setActive] = useState(CATEGORIES[0]);

  return (
    <section id="menu" className="relative py-32 px-6 md:px-16 bg-cream">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-burnt-orange uppercase tracking-[0.3em] text-xs">
            The Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mt-4">
            What we pour
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-6 py-2 text-sm uppercase tracking-widest transition-colors duration-300 ${
                active === cat ? "text-charcoal" : "text-charcoal-dim hover:text-charcoal"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="menu-tab-pill"
                  className="absolute inset-0 bg-burnt-orange-light rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="divide-y divide-charcoal-dim/15"
          >
            {MENU[active].map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                className="flex items-baseline justify-between gap-6 py-5"
              >
                <div>
                  <p className="font-display text-xl text-charcoal">{item.name}</p>
                  <p className="text-charcoal-dim text-sm mt-1">{item.note}</p>
                </div>
                <span className="text-burnt-orange font-display text-lg whitespace-nowrap">
                  {item.price}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
