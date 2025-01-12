import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import DropdownMenu from "../components/DropdownMenu";
import { DropdownProps } from "../types/types";

const renderDropdownMenu = (props: Partial<DropdownProps> = {}) => {
  const defaultProps: DropdownProps = {
    children: <div>Dropdown Content</div>,
    className: "",
    trigger: <span>Trigger</span>,
    showCaret: true,
    align: "middle",
    bordered: false,
  };
  return render(<DropdownMenu {...defaultProps} {...props} />);
};

describe("DropdownMenu", () => {
  beforeEach(() => {
    renderDropdownMenu();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the trigger button", () => {
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("should open the dropdown when the trigger button is clicked", () => {
    const triggerButton = screen.getByText("Trigger");
    fireEvent.click(triggerButton);

    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();
  });

  it("should close the dropdown when the trigger button is clicked again", () => {
    const triggerButton = screen.getByText("Trigger");
    fireEvent.click(triggerButton);
    fireEvent.click(triggerButton);
    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();
  });

  it("should add 'no-scroll' class to body when dropdown is visible", () => {
    const triggerButton = screen.getByText("Trigger");
    fireEvent.click(triggerButton);
    expect(document.body.classList.contains("no-scroll")).toBe(true);
  });

  it("should remove 'no-scroll' class from body when dropdown is hidden", () => {
    const triggerButton = screen.getByText("Trigger");
    fireEvent.click(triggerButton);
    fireEvent.click(triggerButton);
    expect(document.body.classList.contains("no-scroll")).toBe(false);
  });

  it("should close the dropdown when clicking outside of it", () => {
    const triggerButton = screen.getByText("Trigger");
    fireEvent.click(triggerButton);
    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();

    //SUB: Simulate clicking outside the dropdown
    fireEvent.mouseDown(document);
    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();
  });
});
