import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/context/AuthContext";
import { ReactNode } from "react";

const ProtectedRoutes = ({
  children,
  accessBy,
}: {
  children?: ReactNode;
  accessBy: string;
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (accessBy === "unauthenticated") {
    if (!user) {
      return children;
    } else {
      return <Navigate to={"/"} state={{ from: location }} replace />;
    }
  }

  if (accessBy === "authenticated") {
    if (user) {
      return <Outlet />;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
