import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "@/pages/Auth/SignUp";
import { AuthLayout } from "@/pages/Auth/AuthLayout";
import { Login } from "@/pages/Auth/Login";
import { Outlet } from "react-router-dom";
import { ProfileLayout } from "@/pages/Profile/ProfileLayout";
import { Profile } from "@/pages/Profile/Profile";
import Home from "@/pages/Home/Home";

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
]);

export default router;
