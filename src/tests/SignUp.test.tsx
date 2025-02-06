import { expect, describe, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { SignUp } from "../pages/Auth/SignUp";

describe("SignUpPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render sign up form", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();

    render(
      <Router>
        <SignUp />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("should not submit the form when passwords do not match and display error", async () => {
    const user = userEvent.setup();

    render(
      <Router>
        <SignUp />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password");

    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await user.click(submitButton);

    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
  });

  it("should submit the form when passwords match", async () => {
    const user = userEvent.setup();

    render(
      <Router>
        <SignUp />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await user.click(submitButton);

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");

    expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument();
  });
});
