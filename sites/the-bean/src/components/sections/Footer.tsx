import { Logo } from "@/components/Logo";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Origin", href: "#origin" },
  { label: "Visit", href: "#visit" },
];

const social = ["Instagram", "X"];

export function Footer() {
  return (
    <footer className="bg-cream px-6 md:px-16 py-16 border-t border-charcoal-dim/15">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-12">
        <div className="flex items-center gap-3 text-charcoal">
          <Logo className="h-10 w-auto text-burnt-orange" />
          <span className="font-display text-xl">The Bean</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-charcoal-dim/70 mb-1">
            Explore
          </span>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-charcoal-dim hover:text-burnt-orange transition-colors duration-300 w-fit"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-charcoal-dim/70 mb-1">
            Visit
          </span>
          <p className="text-charcoal-dim">14 Kettle Row, Portland OR</p>
          <p className="text-charcoal-dim">7am — 6pm daily</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-charcoal-dim/70 mb-1">
            Follow
          </span>
          {social.map((s) => (
            <span
              key={s}
              className="text-charcoal-dim opacity-60 w-fit"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <p className="max-w-6xl mx-auto mt-16 text-xs text-charcoal-dim/50">
        © {new Date().getFullYear()} The Bean. All rights reserved.
      </p>
    </footer>
  );
}
