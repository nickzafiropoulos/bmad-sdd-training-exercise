const STATS = [
  { value: "42,000+", label: "Kilometers Ridden" },
  { value: "23", label: "Countries" },
  { value: "147", label: "Mountain Passes" },
  { value: "6", label: "Continents" },
] as const;

export function StatsBar() {
  return (
    <section
      className="border-y border-white/10 py-16"
      style={{ background: `var(--color-stat-bg)` }}
      aria-label="Journey statistics"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-heading text-3xl font-bold text-[var(--color-accent-warm)] md:text-4xl">
              {value}
            </p>
            <p className="mt-1 text-sm text-[var(--color-footer-text-muted)]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
