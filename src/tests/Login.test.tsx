import { expect, describe, it, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { Login } from "@/pages/Auth/Login";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { useLoginMutation } from "@/store/Api";

vi.mock("@/store/Api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/store/Api")>();
  return {
    ...actual,
    useLoginMutation: vi.fn(() => [
      vi.fn(async (values) => ({
        username: values.username,
        password: values.password,
      })),
      { isLoading: false, error: null, isSuccess: false },
    ]),
  };
});

describe("LoginPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should submit the form", async () => {
    const user = userEvent.setup();

    const loginMock = vi.fn(async (values) => ({
      data: {
        username: values.username,
        password: values.password,
        token: "test_token",
      },
    }));

    (useLoginMutation as any).mockReturnValue([
      loginMock,
      { isLoading: false, error: null, isSuccess: false },
    ]);

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        username: "sam",
        password: "password123",
      });
    });
  });
});
