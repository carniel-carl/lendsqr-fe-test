import { ReactElement, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { AuthContext } from "../store/context/AuthContext";
import AuthContextProvider from "../store/context/AuthContext";

// Mock user data
const mockUser = {
  email: "test@example.com",
  username: "testuser",
  loggedInTime: new Date().toISOString(),
};

const expiredUser = {
  email: "expired@example.com",
  username: "expireduser",
  loggedInTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

const renderWithAuthContext = (ui: ReactElement) => {
  return render(<AuthContextProvider>{ui}</AuthContextProvider>);
};

const TestComponent = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext is not provided");
  }

  const { user } = context;
  return <div>{user ? user.username : "No user"}</div>;
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with null user if no user is in local storage", () => {
    renderWithAuthContext(<TestComponent />);
    expect(screen.getByText("No user")).toBeInTheDocument();
  });

  it("should initialize with user from local storage if not expired", () => {
    localStorage.setItem("loggedInUser:Lendqr", JSON.stringify(mockUser));
    renderWithAuthContext(<TestComponent />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("should initialize with null user if user in local storage is expired", () => {
    localStorage.setItem("loggedInUser:Lendqr", JSON.stringify(expiredUser));
    renderWithAuthContext(<TestComponent />);
    expect(screen.getByText("No user")).toBeInTheDocument();
    expect(localStorage.getItem("loggedInUser:Lendqr")).toBeNull();
  });
});
