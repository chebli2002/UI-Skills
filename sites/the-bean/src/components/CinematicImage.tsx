"use client";

import { useState } from "react";
import Image from "next/image";

type CinematicImageProps = {
  /** filename under public/images, e.g. "hero.jpg" */
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** darkens/warms the shot to match the brand palette */
  overlay?: "hero" | "panel" | "none";
};

const overlayClass: Record<NonNullable<CinematicImageProps["overlay"]>, string> = {
  hero: "bg-gradient-to-t from-charcoal-deep/75 via-charcoal/15 to-charcoal/35",
  panel: "bg-gradient-to-b from-charcoal/15 via-transparent to-charcoal/40",
  none: "",
};

/**
 * Renders a photo from public/images with a grayscale+warm treatment so
 * mismatched source photography reads as one cohesive dark palette.
 * Falls back to a textured gradient placeholder when the file 404s (i.e.
 * hasn't been dropped in yet), so layout/animation work isn't blocked on
 * asset delivery.
 */
export function CinematicImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  overlay = "panel",
}: CinematicImageProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`overflow-hidden ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      {!errored ? (
        <Image
          src={`/images/${src}`}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          onError={() => setErrored(true)}
          className="object-cover grayscale-[15%] contrast-110 saturate-75"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--charcoal-light),var(--charcoal-deep)_70%)]"
        />
      )}
      {overlay !== "none" && (
        <div aria-hidden className={`absolute inset-0 ${overlayClass[overlay]}`} />
      )}
    </div>
  );
}
