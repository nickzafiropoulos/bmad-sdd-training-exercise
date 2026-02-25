export function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: `var(--color-footer-bg)` }}
      aria-label="Site footer"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-10">
        <div className="flex items-center gap-2 text-sm font-bold" style={{ color: `var(--color-footer-text)` }}>
          <span className="text-[var(--color-accent-warm)]" aria-hidden="true">&#9775;</span>
          Road &amp; Ridgelines
        </div>

        <nav className="flex gap-6 text-sm" style={{ color: `var(--color-footer-text-muted)` }} aria-label="Footer navigation">
          <a href="#journeys" className="transition-colors hover:text-white">Journeys</a>
          <a href="#about" className="transition-colors hover:text-white">About</a>
        </nav>

        <p className="text-xs" style={{ color: `var(--color-footer-text-muted)` }}>
          &copy; {new Date().getFullYear()} Road &amp; Ridgelines. Keep pedaling.
        </p>
      </div>
    </footer>
  );
}
