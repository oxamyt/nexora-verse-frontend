import { expect, describe, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { Login } from "@/pages/Auth/Login";

describe("LoginPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render login form", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();

    render(
      <Router>
        <Login />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });
});
