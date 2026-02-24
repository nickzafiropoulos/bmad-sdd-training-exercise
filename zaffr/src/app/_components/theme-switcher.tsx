"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "zaffr-theme";
type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function SunIcon({ className }: { className?: string }) {
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
      <g clipPath="url(#sun-clip)">
        <path
          d="M16 11C16 13.7614 13.7614 16 11 16C8.23858 16 6 13.7614 6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 1V2.5M11 19.5V21M18.0708 18.0713L17.0101 17.0106M4.98926 4.98926L3.9286 3.9286M21 11H19.5M2.5 11H1M18.0713 3.92871L17.0106 4.98937M4.98975 17.0107L3.92909 18.0714"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="sun-clip">
          <rect width="22" height="22" fill="transparent" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
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
      <g clipPath="url(#moon-clip)">
        <path
          d="M20.5 13.0784C19.3003 13.7189 17.9301 14.0821 16.4751 14.0821C11.7491 14.0821 7.91792 10.2509 7.91792 5.52485C7.91792 4.06986 8.28105 2.69968 8.92163 1.5C4.66765 2.49698 1.5 6.31513 1.5 10.8731C1.5 16.1899 5.8101 20.5 11.1269 20.5C15.6849 20.5 19.503 17.3324 20.5 13.0784Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="moon-clip">
          <rect width="22" height="22" fill="transparent" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background-muted)]"
    >
      {theme === "dark" ? (
        <SunIcon className="h-[22px] w-[22px]" />
      ) : (
        <MoonIcon className="h-[22px] w-[22px]" />
      )}
    </button>
  );
}
