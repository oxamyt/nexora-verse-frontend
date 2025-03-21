import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@/pages/Auth/SignUp";
import { AuthLayout } from "@/pages/Auth/AuthLayout";
import { Login } from "@/pages/Auth/Login";
import { Outlet } from "react-router-dom";
import { ProfileLayout } from "@/pages/Profile/ProfileLayout";
import { Profile } from "@/pages/Profile/Profile";
import Home from "@/pages/Home/Home";
import { PostPage } from "@/pages/Post/PostPage";
import { PostLayout } from "@/pages/Post/PostLayout";
import { FeedLayout } from "@/pages/Feed/FeedLayout";
import { Feed } from "@/pages/Feed/Feed";
import { SearchLayout } from "@/pages/Search/SearchLayout";
import { Search } from "@/pages/Search/Search";
import { MessagesLayout } from "@/pages/Messages/MessagesLayout";
import { UsersList } from "@/pages/Messages/UsersList";
import { ChatPage } from "@/pages/Messages/ChatPage";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { ErrorPage } from "@/pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile/:id",
        element: (
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        ),
      },
      {
        path: "/posts",
        element: (
          <PostLayout>
            <Outlet />
          </PostLayout>
        ),
        children: [{ path: ":postId", element: <PostPage /> }],
      },
      {
        path: "/live",
        element: (
          <FeedLayout>
            <Feed />
          </FeedLayout>
        ),
      },
      {
        path: "/search",
        element: (
          <SearchLayout>
            <Search />
          </SearchLayout>
        ),
      },
      {
        path: "/messages",
        element: (
          <MessagesLayout>
            <Outlet />
          </MessagesLayout>
        ),
        children: [
          { path: "", element: <UsersList /> },
          { path: ":userId", element: <ChatPage /> },
        ],
      },
    ],
  },
]);

export default router;
