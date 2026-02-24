"use client";

import { api } from "~/trpc/react";
import { TrashIcon } from "~/app/_components/icons/trash-icon";

export type TodoItemData = {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export function TodoItem({ todo }: { todo: TodoItemData }) {
  const utils = api.useUtils();
  const toggle = api.todo.toggle.useMutation({
    onSuccess: (data) => {
      utils.todo.getAll.setData(undefined, (old) =>
        old ? old.map((t) => (t.id === data.id ? { ...t, completed: data.completed } : t)) : old
      );
    },
  });
  const remove = api.todo.delete.useMutation({
    onSuccess: () => void utils.todo.getAll.invalidate(),
  });

  const isToggling = toggle.isPending;
  const isDeleting = remove.isPending;
  /* Optimistic display: show target state while toggling so we never flash old state when request completes */
  const displayCompleted = isToggling ? !todo.completed : todo.completed;

  return (
    <li
      className="flex list-none items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-shell)] py-3"
      data-id={todo.id}
      aria-busy={isToggling}
    >
      <label
        htmlFor={`todo-toggle-${todo.id}`}
        className={`flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center rounded ${isToggling ? "cursor-wait opacity-70" : ""}`}
      >
        <input
          id={`todo-toggle-${todo.id}`}
          type="checkbox"
          checked={displayCompleted}
          onChange={() => toggle.mutate({ id: todo.id })}
          disabled={isToggling}
          aria-label={displayCompleted ? "Mark as incomplete" : "Mark as complete"}
          className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-accent-completion)] focus:ring-2 focus:ring-[var(--color-accent-primary)]"
        />
      </label>
      <span
        className={`min-w-0 flex-1 text-[var(--color-text)] ${displayCompleted ? "line-through opacity-70" : ""}`}
        style={{ fontSize: "var(--text-body)" }}
      >
        {todo.description}
      </span>
      <button
        type="button"
        onClick={() => remove.mutate({ id: todo.id })}
        disabled={isDeleting || isToggling}
        aria-label="Delete todo"
        className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded text-[var(--color-text)] hover:bg-[var(--color-background-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] disabled:opacity-50"
      >
        <TrashIcon className="h-[22px] w-[22px]" />
      </button>
    </li>
  );
}
