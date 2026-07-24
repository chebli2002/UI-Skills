type LogoProps = {
  className?: string;
  strokeWidth?: number;
};

/**
 * Abstract mark: a bean silhouette (vesica outline + crease) with two
 * rising steam strands. Paths are exposed with stable IDs so animation
 * components (hero entrance, loops) can target them individually.
 */
export function Logo({ className, strokeWidth = 2.5 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="logo-steam-a"
        d="M50,86 C40,71 55,61 45,46 C35,31 50,21 42,6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        id="logo-steam-b"
        d="M68,86 C78,69 62,59 72,43 C82,27 66,19 74,4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        id="logo-bean-outline"
        d="M60,90 C95,110 95,170 60,190 C25,170 25,110 60,90 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        id="logo-bean-crease"
        d="M60,98 C48,120 72,130 60,150 C48,168 68,176 60,188"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
