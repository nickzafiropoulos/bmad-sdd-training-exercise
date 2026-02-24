import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingState } from "~/app/_components/todo/loading-state";

describe("LoadingState", () => {
  it("renders loading message", () => {
    render(<LoadingState />);
    expect(screen.getByText(/Loading your list/)).toBeInTheDocument();
  });

  it("has accessible status", () => {
    render(<LoadingState />);
    expect(screen.getByRole("status", { name: "Loading todos" })).toBeInTheDocument();
  });
});
