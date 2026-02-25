export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-[var(--color-border)] bg-[var(--color-background-muted)] py-20 md:py-28"
      aria-label="About"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
        {/* Visual placeholder — gradient portrait silhouette */}
        <div className="flex items-center justify-center">
          <div
            className="relative flex h-80 w-full max-w-md items-end overflow-hidden rounded-2xl md:h-[420px]"
            style={{
              background: `linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-via) 50%, var(--color-accent-warm) 100%)`,
            }}
            aria-hidden="true"
          >
            {/* Bike silhouette */}
            <svg
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20"
              width="180"
              height="120"
              viewBox="0 0 180 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="40" cy="85" r="30" />
              <circle cx="140" cy="85" r="30" />
              <path d="M40 85 L75 35 L110 85 L140 85" />
              <path d="M75 35 L95 35" />
              <path d="M95 35 L110 85" />
              <path d="M95 35 L105 30" />
              <circle cx="75" cy="35" r="3" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-overlay)]/40 to-transparent" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-warm)]">
            The Rider
          </p>
          <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            Every Road Has a Story
          </h2>
          <div className="mt-6 space-y-4 text-[var(--color-text-muted)] md:text-lg">
            <p>
              It started with a single ride up a local climb that left me
              breathless and hooked. Somewhere between the burning legs and the
              summit view, I realized the bike could take me further than I ever
              imagined.
            </p>
            <p>
              Since then, the road bike has been my passport. From the hairpins
              of the Dolomites to the endless Patagonian steppe, every pedal
              stroke writes a new chapter.
            </p>
            <p>
              This site is a collection of those chapters — routes, reflections,
              and the relentless pull of the next horizon.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <a
              href="#journeys"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] transition-all hover:scale-105"
              style={{ background: `var(--color-accent-warm)` }}
            >
              View Routes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
