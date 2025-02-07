import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { SignUp } from "@/pages/Auth/SignUp";
import { AuthLayout } from "@/pages/Auth/AuthLayout";
import { Login } from "@/pages/Auth/Login";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export default router;
