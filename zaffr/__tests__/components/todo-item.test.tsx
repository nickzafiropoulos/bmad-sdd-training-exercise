import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoItem } from "~/app/_components/todo/todo-item";

const mockInvalidate = vi.fn();
vi.mock("~/trpc/react", () => ({
  api: {
    useUtils: () => ({
      todo: { getAll: { invalidate: mockInvalidate } },
    }),
    todo: {
      toggle: {
        useMutation: (opts?: { onSuccess?: () => void }) => ({
          mutate: vi.fn(() => opts?.onSuccess?.()),
          isPending: false,
        }),
      },
      delete: {
        useMutation: (opts?: { onSuccess?: () => void }) => ({
          mutate: vi.fn(() => opts?.onSuccess?.()),
          isPending: false,
        }),
      },
    },
  },
}));

describe("TodoItem", () => {
  const todo = {
    id: 1,
    description: "Test todo",
    completed: false,
    createdAt: new Date(),
  };

  beforeEach(() => {
    mockInvalidate.mockClear();
  });

  it("renders description and controls", () => {
    render(<TodoItem todo={todo} />);
    expect(screen.getByText("Test todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Mark as complete/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete todo" })).toBeInTheDocument();
  });

  it("checkbox reflects completed state", () => {
    render(<TodoItem todo={{ ...todo, completed: true }} />);
    expect(screen.getByRole("checkbox", { name: /Mark as incomplete/ })).toBeChecked();
  });
});
