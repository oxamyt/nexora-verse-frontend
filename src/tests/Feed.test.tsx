import { expect, describe, it, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Feed } from "@/pages/Feed/Feed";
import { Post } from "@/types/types";

const mockRecentPosts = [
  {
    id: 1,
    body: "Recent post content",
    title: "Recent post title",
    userId: "1",
    User: { id: 1, username: "user1", avatarUrl: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { likes: 0, comments: 0 },
    likes: [],
  },
];

const mockFollowingPosts = [
  {
    id: 2,
    body: "Following post content",
    title: "Following post title",
    userId: "2",
    User: { id: 2, username: "user2", avatarUrl: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { likes: 0, comments: 0 },
    likes: [],
  },
];

let mockRecent = {
  data: [] as Post[],
  isLoading: false,
  isFetching: false,
  error: null as { status: number; data: string } | null,
};

let mockFollowing = {
  data: [] as Post[],
  isLoading: false,
  isFetching: false,
  error: null as { status: number; data: string } | null,
};

vi.mock("@/store/Api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/store/Api")>();
  return {
    ...actual,
    useGetRecentPostsQuery: vi.fn(() => mockRecent),
    useGetFollowingPostsQuery: vi.fn(() => mockFollowing),
  };
});

vi.mock("@/features/skeletonCards/SkeletonPost", () => ({
  SkeletonPostCard: () => <div data-testid="skeleton-post" />,
}));

vi.mock("@/components/post/PostCard", () => ({
  PostCard: ({ post }: { post: Post }) => (
    <div data-testid="post-card">{post.body}</div>
  ),
}));

describe("Feed Component", () => {
  const renderFeed = () => {
    render(
      <Provider store={store}>
        <Router>
          <Feed />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    mockRecent = {
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
    };
    mockFollowing = {
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders both tabs", () => {
    renderFeed();
    expect(screen.getByRole("button", { name: /Recent/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Following/i })
    ).toBeInTheDocument();
  });

  it("displays recent posts by default", async () => {
    mockRecent.data = mockRecentPosts;
    renderFeed();

    expect(screen.getByText("Recent post content")).toBeInTheDocument();
  });

  it("switches to following posts when tab is clicked", async () => {
    mockFollowing.data = mockFollowingPosts;
    renderFeed();

    await userEvent.click(screen.getByRole("button", { name: /Following/i }));

    expect(screen.getByText("Following post content")).toBeInTheDocument();
  });

  it("shows loading skeletons when loading recent posts", () => {
    mockRecent.isLoading = true;
    renderFeed();
    expect(screen.getAllByTestId("skeleton-post")).toHaveLength(5);
  });

  it("shows loading skeletons when loading following posts", async () => {
    mockFollowing.isLoading = true;
    renderFeed();
    await userEvent.click(screen.getByRole("button", { name: /Following/i }));
    expect(screen.getAllByTestId("skeleton-post")).toHaveLength(5);
  });

  it("displays error message for recent posts", async () => {
    mockRecent.error = { status: 500, data: "Error" };
    renderFeed();
    expect(
      await screen.findByText(/Error loading posts./i)
    ).toBeInTheDocument();
  });

  it("displays error message for following posts", async () => {
    mockFollowing.error = { status: 500, data: "Error" };
    renderFeed();
    await userEvent.click(screen.getByRole("button", { name: /Following/i }));
    expect(
      await screen.findByText(/Error loading posts./i)
    ).toBeInTheDocument();
  });

  it("shows empty state for recent posts", async () => {
    mockRecent.data = [];
    renderFeed();
    expect(await screen.findByText(/No recent posts./i)).toBeInTheDocument();
  });

  it("shows empty state for following posts", async () => {
    mockFollowing.data = [];
    renderFeed();
    await userEvent.click(screen.getByRole("button", { name: /Following/i }));
    expect(
      await screen.findByText(/No posts from followed users./i)
    ).toBeInTheDocument();
  });
});
