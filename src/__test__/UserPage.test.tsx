//@ts-nocheck
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import UsersPage from "../pages/UsersPage";

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    QueryClient: actual.QueryClient,
    QueryClientProvider: actual.QueryClientProvider,
    useQuery: vi.fn(),
  };
});

const mockUsers = [
  {
    organisation: "Org1",
    username: "user1",
    email: "user1@example.com",
    phone: "1234567890",
    dateJoined: "2023-01-01",
    status: "active",
  },
  {
    organisation: "Org2",
    username: "user2",
    email: "user2@example.com",
    phone: "0987654321",
    dateJoined: "2023-02-01",
    status: "inactive",
  },
];

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("UsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading state while fetching users", () => {
    useQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<UsersPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display the users after loading", async () => {
    useQuery.mockReturnValue({
      data: { users: mockUsers },
      error: null,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<UsersPage />);

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    const section = screen.getByTestId("user-data");
    expect(section).toBeInTheDocument();
  });

  it("should handle error and display an error message", async () => {
    useQuery.mockReturnValue({
      data: null,
      error: "Error fetching data",
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<UsersPage />);
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });
});
