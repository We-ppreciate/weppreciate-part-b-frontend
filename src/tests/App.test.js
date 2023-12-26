// Imports for test
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import App from "../App";

// Mock the AuthProvider to provide authentication context
jest.mock("../components/Authentication/AuthContext.js", () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

describe("App component rendering", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});

describe("App routing rendering correct component", () => {
  it("renders homepage component for / route", () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(
      screen.getByText("You work hard. We'ppreciate you.")
    ).toBeInTheDocument();
  });

  it("renders login component for /login route", () => {
    render(<App />, { wrapper: MemoryRouter, initialEntries: ["/login"] });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects to / for invalid paths", () => {
    render(<App />, { wrapper: MemoryRouter, initialEntries: ["/invalid"] });
    expect(screen.getByText("You work hard. We'ppreciate you.")).toBeInTheDocument();
  });
});

describe("App routing on private routes", () => {
  it("redirects to login for /dashboard when not authenticated", () => {
    render(<App />, { wrapper: MemoryRouter, initialEntries: ["/dashboard"] });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
