"use client";

import { useId } from "react";

/**
 * Trash icon – stroke uses currentColor so it inherits text color (e.g. white on destructive button).
 * Use with a parent that sets color (e.g. text-[var(--color-text-on-destructive)]).
 */
export function TrashIcon({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g clipPath={`url(#trash-clip-${id})`}>
        <path
          d="M18.5 4.5L17.8803 14.5251C17.7219 17.0864 17.6428 18.3671 17.0008 19.2879C16.6833 19.7431 16.2747 20.1273 15.8007 20.416C14.8421 21 13.559 21 10.9927 21C8.42312 21 7.1383 21 6.17905 20.4149C5.7048 20.1257 5.296 19.7408 4.97868 19.2848C4.33688 18.3626 4.25945 17.0801 4.10461 14.5152L3.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 4.5H20M15.0557 4.5L14.3731 3.09173C13.9196 2.15626 13.6928 1.68852 13.3017 1.39681C13.215 1.3321 13.1231 1.27454 13.027 1.2247C12.5939 1 12.0741 1 11.0345 1C9.9688 1 9.436 1 8.99568 1.23412C8.8981 1.28601 8.80498 1.3459 8.71729 1.41317C8.32164 1.7167 8.10063 2.20155 7.65861 3.17126L7.05292 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.5 15.5V9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M13.5 15.5V9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id={`trash-clip-${id}`}>
          <rect width="22" height="22" fill="transparent" />
        </clipPath>
      </defs>
    </svg>
  );
}
