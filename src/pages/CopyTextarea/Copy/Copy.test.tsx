import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Copy from "./Copy";

describe("Copy", () => {
  it("works", async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const { asFragment } = render(<Copy onClick={spy} />);
    const button = screen.getByRole("button");

    expect(screen.getByTestId("CopyIcon")).toBeInTheDocument();
    expect(button).not.toHaveClass("btn-disabled");

    act(() => {
      fireEvent.click(button);
    });

    expect(spy).toHaveBeenCalled();
    expect(screen.getByTestId("CopiedIcon")).toBeInTheDocument();
    expect(button).toHaveClass("btn-disabled");

    act(() => {
      vi.runAllTimers();
    });

    expect(button).not.toHaveClass("btn-disabled");
    expect(screen.getByTestId("CopyIcon")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
