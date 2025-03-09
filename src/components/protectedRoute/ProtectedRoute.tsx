import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.userId);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
