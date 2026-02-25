import { ThemeSwitcher } from "./theme-switcher";

const NAV_LINKS = [
  { label: "Journeys", href: "#journeys" },
  { label: "About", href: "#about" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
      <header
        className="absolute top-0 left-0 right-0 z-50 flex shrink-0 justify-center py-5"
        aria-label="Site header"
      >
        <div className="flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
          <a
            href="/"
            className="flex items-center gap-2 rounded text-lg font-bold tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-warm)] focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <span className="text-[var(--color-accent-warm)]" aria-hidden="true">&#9775;</span>
            Road &amp; Ridgelines
          </a>

          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline-block"
              >
                {label}
              </a>
            ))}
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
