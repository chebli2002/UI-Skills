import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "ghost" | "link";
  /** which background this sits on, so the accent shade stays AA-contrast */
  tone?: "dark" | "light";
};

const base =
  "inline-flex items-center gap-2 uppercase tracking-[0.2em] text-sm transition-colors duration-300";

const variants: Record<string, Record<string, string>> = {
  primary: {
    dark: "bg-burnt-orange-light text-charcoal-deep px-8 py-3 hover:bg-cream",
    light: "bg-burnt-orange-deep text-cream px-8 py-3 hover:bg-charcoal",
  },
  ghost: {
    dark: "border border-burnt-orange text-burnt-orange-light px-8 py-3 hover:bg-burnt-orange hover:text-charcoal",
    light:
      "border border-burnt-orange-deep text-burnt-orange-deep px-8 py-3 hover:bg-burnt-orange-deep hover:text-cream",
  },
  link: {
    dark: "text-cream-dim hover:text-burnt-orange-light underline-offset-4 hover:underline",
    light: "text-charcoal-dim hover:text-burnt-orange-deep underline-offset-4 hover:underline",
  },
};

/**
 * Site-wide link/button primitive. Three variants (primary/ghost/link) each
 * come in a dark-bg and light-bg tone so the burnt-orange accent never drops
 * below AA contrast on either --charcoal or --cream backgrounds.
 */
export function Button({
  href,
  variant = "ghost",
  tone = "dark",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant][tone]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
