export function Hero() {
  return (
    <section
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden"
      aria-label="Hero"
      style={{
        background: `linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-via) 40%, var(--color-hero-to) 100%)`,
      }}
    >
      {/* Decorative topographic pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 20% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.03) 41px, transparent 42px),
            repeating-radial-gradient(circle at 80% 30%, transparent 0, transparent 60px, rgba(255,255,255,0.04) 61px, transparent 62px)
          `,
        }}
        aria-hidden="true"
      />

      {/* Warm accent glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: `var(--color-accent-warm)` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: `var(--color-accent-sunset)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:px-10">
        <p className="animate-fade-up mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-warm)]">
          Road Bike Adventures
        </p>
        <h1 className="animate-fade-up animation-delay-200 font-heading text-5xl font-bold leading-tight text-white md:text-7xl">
          Two Wheels,
          <br />
          <span className="bg-gradient-to-r from-[var(--color-accent-warm)] to-[var(--color-accent-sunset)] bg-clip-text text-transparent">
            Every Continent.
          </span>
        </h1>
        <p className="animate-fade-up animation-delay-400 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
          Chasing mountain passes, coastal roads, and the quiet rhythm of the
          pedal stroke — one journey at a time.
        </p>
        <div className="animate-fade-up animation-delay-600 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#journeys"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: `var(--color-accent-warm)` }}
          >
            Explore Journeys
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/90 transition-all hover:border-white/40 hover:text-white"
          >
            My Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in animation-delay-600 absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
