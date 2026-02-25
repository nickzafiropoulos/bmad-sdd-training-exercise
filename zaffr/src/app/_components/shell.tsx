import Image from "next/image";

import { ThemeSwitcher } from "./theme-switcher";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]">
      <header
        className="flex shrink-0 justify-center border-b border-[var(--color-border)] bg-[var(--color-background-muted)] py-5"
        aria-label="App header"
      >
        <div
          className="flex w-full items-center justify-between px-[var(--spacing-shell)]"
          style={{ maxWidth: "var(--container-max)" }}
        >
          <a
            href="/"
            className="logo-theme flex shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background-muted)] rounded"
          >
            <Image
              src="/brand/logo-zaffr.svg"
              alt="Zaffr"
              width={240}
              height={156}
              className="h-[4.25rem] w-auto"
              priority
            />
          </a>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex flex-1 justify-center py-[var(--spacing-section)]">
        <div
          className="w-full px-[var(--spacing-shell)] md:px-[var(--spacing-section)]"
          style={{ maxWidth: "var(--container-max)" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
