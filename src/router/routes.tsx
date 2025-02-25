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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
    ],
  },
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
]);

export default router;
