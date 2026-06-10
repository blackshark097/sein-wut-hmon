import type { SVGProps } from "react";

/**
 * The two crossed leaf outlines from the SWH logo, hand-traced as
 * stroke-only paths. Each leaf is a single continuous closed path so a
 * stroke-dasharray draw-on animation renders smoothly. `pathLength={1}`
 * normalizes both paths so CSS can animate `stroke-dashoffset: 1 -> 0`
 * without measuring real path lengths.
 *
 * Stroke uses `currentColor`; set color/opacity on the parent.
 */
export function LeafMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 118 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M5 2 C33 14 54 34 63 64 C26 53 6 29 5 2 Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M112.5 2 C84.5 14 63.5 34 54.5 64 C91.5 53 111.5 29 112.5 2 Z"
        pathLength={1}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LeafMark;
