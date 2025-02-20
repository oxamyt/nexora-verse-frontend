import { expect, describe, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { PostForm } from "@/components/post/PostForm";
import userEvent from "@testing-library/user-event";
import { store } from "@/store/store";
import { Provider } from "react-redux";

describe("Home Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <PostForm />
        </Router>
      </Provider>
    );
  });

  it("renders all main elements correctly", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /new post/i }));

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What's on your mind?")
    ).toBeInTheDocument();
  });
});
