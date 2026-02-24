"use client";

import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

export function TodoView() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-section)] py-6 shadow-[var(--shadow-list)]">
      <TodoForm />
      <TodoList />
    </div>
  );
}
