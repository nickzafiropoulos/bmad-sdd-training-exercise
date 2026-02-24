import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyState } from "~/app/_components/todo/empty-state";

describe("EmptyState", () => {
  it("renders no todos message and CTA", () => {
    render(<EmptyState />);
    expect(screen.getByText("No todos yet")).toBeInTheDocument();
    expect(screen.getByText(/Add your first todo above/)).toBeInTheDocument();
  });

  it("has accessible status role", () => {
    render(<EmptyState />);
    expect(screen.getByRole("status", { name: "No todos yet" })).toBeInTheDocument();
  });
});
