import { expect, describe, it, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Profile } from "@/pages/Profile/Profile";

const mockUserProfile = {
  data: {
    username: "JohnDoe",
    bio: "This is a bio",
    avatarUrl: "https://example.com/avatar.jpg",
    _count: {
      followers: 2,
      following: 5,
      posts: 10,
    },
  },
  isLoading: false,
  error: null,
};

vi.mock("@/store/Api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/store/Api")>();
  return {
    ...actual,
    useProfileQuery: vi.fn(() => mockUserProfile),
  };
});

const renderProfile = () => {
  render(
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );
};

describe("Profile Page", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render profile page with user details", async () => {
    renderProfile();

    expect(await screen.findByText("JohnDoe")).toBeInTheDocument();
    expect(await screen.findByText("This is a bio")).toBeInTheDocument();
    expect(await screen.findByText("2")).toBeInTheDocument();
    expect(await screen.findByText("5")).toBeInTheDocument();
    expect(await screen.findByText("10")).toBeInTheDocument();
  });

  it("should allow switching post categories", async () => {
    renderProfile();

    const postsTab = screen.getByRole("button", { name: /my posts/i });
    const likedPostsTab = screen.getByRole("button", { name: /liked posts/i });

    expect(postsTab).toHaveClass("border-b-2 border-black");
    expect(likedPostsTab).not.toHaveClass("border-b-2 border-black");

    await userEvent.click(likedPostsTab);

    expect(likedPostsTab).toHaveClass("border-b-2 border-black");
    expect(postsTab).not.toHaveClass("border-b-2 border-black");
  });
});
