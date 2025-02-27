import { expect, describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { useLazyGetByUsernameQuery } from "@/store/Api";
import { store } from "@/store/store";
import { Search } from "@/pages/Search/Search";

vi.mock("@/store/Api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/store/Api")>();
  return {
    ...actual,
    useLazyGetByUsernameQuery: vi.fn(),
  };
});

const mockUseLazyGetByUsernameQuery = vi.mocked(useLazyGetByUsernameQuery);
describe("Search Component", () => {
  const mockUserData = {
    id: 1,
    username: "testuser",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Router>
          <Search />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    mockUseLazyGetByUsernameQuery.mockReturnValue([
      vi.fn(),
      { data: null, isFetching: false, error: null },
    ]);
  });

  it("renders search form elements", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("Search username...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("submits form with entered username", async () => {
    const mockTrigger = vi.fn();
    mockUseLazyGetByUsernameQuery.mockReturnValue([
      mockTrigger,
      { data: null, isFetching: false, error: null },
    ]);

    renderComponent();
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("Search username..."),
      "testuser"
    );
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(mockTrigger).toHaveBeenCalledWith("testuser");
  });

  it("shows validation error for empty submission", async () => {
    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /search/i }));
    const errorMessage = await screen.findByText(
      /Username must be at least 3 characters long./i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("displays loading state", () => {
    mockUseLazyGetByUsernameQuery.mockReturnValue([
      vi.fn(),
      { data: null, isFetching: true, error: null },
    ]);

    renderComponent();

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("shows error message on API failure", () => {
    mockUseLazyGetByUsernameQuery.mockReturnValue([
      vi.fn(),
      { data: null, isFetching: false, error: { status: 500 } },
    ]);

    renderComponent();

    expect(
      screen.getByText(/Error occurred while searching./)
    ).toBeInTheDocument();
  });

  it("displays user data when found", () => {
    mockUseLazyGetByUsernameQuery.mockReturnValue([
      vi.fn(),
      { data: mockUserData, isFetching: false, error: null },
    ]);

    renderComponent();

    const usernameElement = screen.getByRole("heading", {
      name: mockUserData.username,
    });
    expect(usernameElement).toBeInTheDocument();
  });

  it("shows 'No users found' initially", () => {
    renderComponent();
    expect(screen.getByText(/No users found/)).toBeInTheDocument();
  });
});
