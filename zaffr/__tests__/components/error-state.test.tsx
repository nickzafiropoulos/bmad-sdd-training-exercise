import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ErrorState } from "~/app/_components/todo/error-state";

describe("ErrorState", () => {
  it("renders default message and retry button", () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    expect(screen.getByText(/Couldn't load your list/)).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Try again/ });
    expect(button).toBeInTheDocument();
  });

  it("calls onRetry when Try again is clicked", async () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    await userEvent.click(screen.getByRole("button", { name: /Try again/ }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders custom message when provided", () => {
    render(<ErrorState message="Custom error" onRetry={vi.fn()} />);
    expect(screen.getByText("Custom error")).toBeInTheDocument();
  });
});
