import { expect, describe, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Home from "@/pages/Home/Home";

describe("Home Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it("renders all main elements correctly", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/galaxy.png");

    expect(
      screen.getByRole("heading", { name: /nexora/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /create account/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  it("has working navigation links with correct destinations", () => {
    const createAccountLink = screen.getByRole("link", {
      name: /create account/i,
    });
    expect(createAccountLink).toHaveAttribute("href", "/auth/signup");

    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "/auth/login");
  });
});
