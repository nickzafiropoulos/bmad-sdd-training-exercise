"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function TodoForm() {
  const [description, setDescription] = useState("");
  const utils = api.useUtils();
  const create = api.todo.create.useMutation({
    onSuccess: () => {
      void utils.todo.getAll.invalidate();
      setDescription("");
    },
  });

  const isSubmitting = create.isPending;
  const error = create.error?.message;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = description.trim();
        if (!value || isSubmitting) return;
        create.mutate({ description: value });
      }}
      className="mb-[var(--spacing-section)]"
      aria-label="Add todo"
    >
      <div className="flex gap-2">
        <label htmlFor="todo-input" className="sr-only">
          New todo
        </label>
        <input
          id="todo-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What needs doing?"
          disabled={isSubmitting}
          maxLength={2048}
          className="min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-[12px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)] disabled:opacity-50"
          style={{ fontSize: "var(--text-body)" }}
          aria-invalid={!!error}
          aria-describedby={error ? "todo-form-error" : undefined}
        />
        <button
          type="submit"
          disabled={isSubmitting || !description.trim()}
          className="shrink-0 rounded-md bg-[var(--color-accent-primary)] px-4 py-[12px] text-[var(--color-text-on-primary)] hover:bg-[var(--color-accent-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] disabled:opacity-50"
          style={{ fontSize: "var(--text-body)" }}
        >
          {isSubmitting ? "Adding…" : "Add"}
        </button>
      </div>
      {error && (
        <p id="todo-form-error" className="mt-2 text-[var(--color-accent-destructive)]" style={{ fontSize: "var(--text-small)" }}>
          {error}
        </p>
      )}
    </form>
  );
}
