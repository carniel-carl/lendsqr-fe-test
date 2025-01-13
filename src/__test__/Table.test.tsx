import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Table from "../components/Table";
import { Column, TableProps } from "../types/types";

// Mock data
const columns: Column[] = [
  { header: "Organisation", accessor: "organisation" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  { header: "Date Joined", accessor: "dateJoined", type: "date" },
  { header: "Status", accessor: "status" },
  { header: "", accessor: "actions" },
];

const data = [
  {
    organisation: "Org1",
    username: "user1",
    email: "user1@example.com",
    phone: "1234567890",
    dateJoined: "2023-01-01T01:00:00",
    status: "active",
  },
  {
    organisation: "Org2",
    username: "user2",
    email: "user2@example.com",
    phone: "0987654321",
    dateJoined: "2023-02-01T01:00:00",
    status: "inactive",
  },
];

const renderTable = (props: Partial<TableProps> = {}) => {
  const defaultProps: TableProps = {
    columns,
    data,
    renderActions: () => <button>Action</button>,
    filterHeader: false,
    showPagination: true,
    renderFilter: () => <button>Filter</button>,
    title: "User Table",
  };
  return render(
    <MemoryRouter>
      <Table {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("Table", () => {
  beforeEach(() => {
    renderTable();
  });

  afterEach(() => {
    cleanup();
  });
  it("should render the table with columns and data", () => {
    expect(screen.getByText("User Table")).toBeInTheDocument();
    expect(screen.getByText("Organisation")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("should render actions correctly", () => {
    expect(screen.getAllByText("Action").length).toBe(2);
  });

  it("should include the renderFilter in the table when filterHeader is true", () => {
    renderTable({ filterHeader: true });
    expect(screen.getAllByText("Filter").length).toBeGreaterThan(0);
  });

  it("should render actions if renderActions is provided", () => {
    renderTable({ renderActions: () => <button>Custom Action</button> });
    expect(screen.getAllByText("Custom Action").length).toBe(2);
  });

  it("should format date correctly", () => {
    expect(screen.getByText("Jan 1, 2023, 1:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Feb 1, 2023, 1:00 AM")).toBeInTheDocument();
  });
  it("should show the Pagination component when showPagination is true", () => {
    renderTable({ showPagination: true });
    expect(screen.getAllByTestId("Next")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("Prev")[0]).toBeInTheDocument();
  });
});
