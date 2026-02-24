"use client";

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export function ErrorState({
  message = "Couldn't load your list. Check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="border border-[var(--color-accent-destructive)] rounded-lg px-[var(--spacing-section)] py-8 text-center" role="alert">
      <p
        className="mb-4 font-bold text-[var(--color-text)]"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-heading)",
        }}
      >
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-[var(--color-accent-primary)] px-4 py-2 text-[var(--color-text-on-primary)] hover:bg-[var(--color-accent-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
        style={{ fontSize: "var(--text-small)" }}
      >
        Try again
      </button>
    </div>
  );
}
