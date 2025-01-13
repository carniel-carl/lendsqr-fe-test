//@ts-nocheck
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, useNavigate } from "react-router-dom";
import UserDetailsPage from "../pages/UserDetailsPage";
import { fetchUserDetails } from "../services";

// Mock useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: () => ({ id: "123" }),
  };
});

vi.mock("../services", () => ({
  fetchUserDetails: vi.fn(),
}));

const mockUserDetails = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  organisation: "Org1",
  status: "active",
  dateJoined: "2023-01-01",
  profile: {
    tier: 3,
  },
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("UserDetailsPage", () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        removeItem: (key) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("should navigate back when the back button is clicked", () => {
    const navigate = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(navigate);
    renderWithProviders(<UserDetailsPage />);

    fireEvent.click(screen.getByText("Back to Users"));
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("should display loading state while fetching user details", () => {
    localStorage.setItem("userDetails", JSON.stringify(mockUserDetails));
    renderWithProviders(<UserDetailsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("sets/gets user data in local storage", () => {
    const userData = { id: 1, name: "Test User" };

    localStorage.setItem("userLendsqr", JSON.stringify(userData));

    render(<UserDetailsPage />);
    const storedData = JSON.parse(localStorage.getItem("userLendsqr")!);

    expect(storedData).toEqual(userData);
  });

  describe("User details from local storage", () => {
    it("render user's info when found", async () => {
      (vi.mocked(fetchUserDetails) as vi.Mock).mockResolvedValue(
        mockUserDetails
      );

      renderWithProviders(<UserDetailsPage />);

      await waitFor(() => {
        expect(screen.getByText(/John/i)).toBeInTheDocument();
        expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
      });
    });

    it("should display error state if not found", async () => {
      (vi.mocked(fetchUserDetails) as vi.Mock).mockRejectedValue(
        new Error("Failed to fetch")
      );

      renderWithProviders(<UserDetailsPage />);

      await waitFor(() => {
        expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
      });
    });
  });
});
