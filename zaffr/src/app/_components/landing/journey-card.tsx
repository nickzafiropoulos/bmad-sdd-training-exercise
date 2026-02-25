interface JourneyCardProps {
  title: string;
  region: string;
  distance: string;
  elevation: string;
  description: string;
  gradient: string;
  days: string;
}

export function JourneyCard({
  title,
  region,
  distance,
  elevation,
  description,
  gradient,
  days,
}: JourneyCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      style={{ minHeight: "380px" }}
    >
      {/* Gradient background simulating a landscape photo */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-overlay)] via-[var(--color-card-overlay)]/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-6">
        <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          {region}
        </span>
        <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/70">{description}</p>

        <div className="mt-2 flex flex-wrap gap-4 border-t border-white/10 pt-3 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <RouteIcon />
            {distance}
          </span>
          <span className="flex items-center gap-1">
            <MountainIcon />
            {elevation}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon />
            {days}
          </span>
        </div>
      </div>
    </article>
  );
}

function RouteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
