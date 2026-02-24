export function EmptyState() {
  return (
    <div className="py-8 text-center" role="status" aria-label="No todos yet">
      <p
        className="mb-2 font-bold text-[var(--color-text)]"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-heading)",
        }}
      >
        No todos yet
      </p>
      <p className="text-[var(--color-text-muted)]" style={{ fontSize: "var(--text-small)" }}>
        Add your first todo above to get started.
      </p>
    </div>
  );
}
