import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { SignUp } from "@/pages/Auth/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <SignUp />,
  },
]);

export default router;
