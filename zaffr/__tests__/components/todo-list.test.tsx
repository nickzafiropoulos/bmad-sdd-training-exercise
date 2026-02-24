import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TodoList } from "~/app/_components/todo/todo-list";

const mockRefetch = vi.fn();
const mockUseQuery = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    useUtils: () => ({ todo: { getAll: { invalidate: vi.fn() } } }),
    todo: {
      getAll: { useQuery: () => mockUseQuery() },
      toggle: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
      delete: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
    },
  },
}));

describe("TodoList", () => {
  it("shows LoadingState when loading", () => {
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false, refetch: mockRefetch });
    render(<TodoList />);
    expect(screen.getByRole("status", { name: "Loading todos" })).toBeInTheDocument();
  });

  it("shows ErrorState when error", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Network error" },
      refetch: mockRefetch,
    });
    render(<TodoList />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows EmptyState when data is empty", () => {
    mockUseQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });
    render(<TodoList />);
    expect(screen.getByRole("status", { name: "No todos yet" })).toBeInTheDocument();
  });

  it("renders list of TodoItems when data has items", () => {
    mockUseQuery.mockReturnValue({
      data: [
        { id: 1, description: "First", completed: false, createdAt: new Date() },
        { id: 2, description: "Second", completed: true, createdAt: new Date() },
      ],
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });
    render(<TodoList />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Todo list" })).toBeInTheDocument();
  });
});
