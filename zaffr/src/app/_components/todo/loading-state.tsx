export function LoadingState() {
  return (
    <div
      className="flex items-center justify-center gap-2 py-8"
      role="status"
      aria-live="polite"
      aria-label="Loading todos"
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent-primary)]"
        aria-hidden
      />
      <span className="text-[var(--color-text-muted)]" style={{ fontSize: "var(--text-small)" }}>
        Loading your list…
      </span>
    </div>
  );
}
