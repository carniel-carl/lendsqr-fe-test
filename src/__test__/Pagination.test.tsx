import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, useSearchParams, useNavigate } from "react-router-dom";

import { PaginationProps } from "../types/types";
import Pagination from "../components/Pagination";

const renderPagination = (props: Partial<PaginationProps> = {}) => {
  const defaultProps: PaginationProps = {
    currentPage: 1,
    totalPages: 5,
    dataLength: 50,
    rowsperPage: 10,
    setRowsPerPage: vi.fn(),
  };
  return render(
    <MemoryRouter>
      <Pagination {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("Pagination", () => {
  it("should render the pagination controls", () => {
    renderPagination();
    expect(screen.getByTestId("Next")).toBeInTheDocument();
    expect(screen.getByTestId("Prev")).toBeInTheDocument();
  });

  it("should disable the Previous button on the first page", () => {
    renderPagination({ currentPage: 1 });
    expect(screen.getByTestId("Prev")).toBeDisabled();
  });

  it("should disable the Next button on the last page", () => {
    renderPagination({ currentPage: 5, totalPages: 5 });
    expect(screen.getAllByTestId("Next")[0]).toBeDisabled();
  });
});
