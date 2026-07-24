"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

const links = [
  { label: "Origin", href: "#origin" },
  { label: "Menu", href: "#menu" },
  { label: "Visit", href: "#visit" },
];

/**
 * Sticky top nav: transparent over the hero, solid once the page scrolls
 * past it. Mobile gets a slide-down drawer instead of the horizontal list.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 72));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md border-b border-cream-dim/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[72rem] mx-auto flex items-center justify-between px-6 md:px-16 py-4">
        <a href="#" className="flex items-center gap-2 text-cream shrink-0">
          <Logo className="h-8 w-auto text-burnt-orange-light" />
          <span className="font-display text-lg">The Bean</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm uppercase tracking-[0.2em] text-cream-dim hover:text-cream transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <Button href="#menu" variant="primary" tone="dark" className="!px-5 !py-2 !text-xs">
            Shop beans
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden text-cream p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path
                d="M4 4 L18 18 M18 4 L4 18"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 6 H20 M2 11 H20 M2 16 H20"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-charcoal border-b border-cream-dim/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-cream-dim hover:text-cream text-sm uppercase tracking-[0.2em] border-b border-cream-dim/10 last:border-none"
                >
                  {l.label}
                </a>
              ))}
              <Button
                href="#menu"
                variant="primary"
                tone="dark"
                onClick={() => setOpen(false)}
                className="!justify-center my-4"
              >
                Shop beans
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
