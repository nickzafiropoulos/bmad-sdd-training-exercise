"use client";

import { api } from "~/trpc/react";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const { data, isLoading, isError, error, refetch } = api.todo.getAll.useQuery();

  if (isLoading) return <LoadingState />;
  if (isError)
    return (
      <ErrorState
        message={error?.message ?? "Couldn't load your list. Check your connection and try again."}
        onRetry={() => void refetch()}
      />
    );
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <ul className="flex flex-col gap-[var(--spacing-list-gap)]" aria-label="Todo list">
      {data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
