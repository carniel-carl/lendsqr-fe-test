import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/DashBoardPage";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../Layout/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";

// HDR:================ LAZY LOADING ===================
const UsersPage = lazy(() => import("../pages/UsersPage"));
const UserDetailsPage = lazy(() => import("../pages/UserDetailsPage"));

const Routing = () => {
  return (
    <Routes>
      {/*SUB: ====== UNPROTECTED ROUTES ======= */}
      <Route
        path="/login"
        element={
          <ProtectedRoutes accessBy="unauthenticated">
            <LoginPage />
          </ProtectedRoutes>
        }
      />
      {/*SUB: ====== PROTECTED ROUTES ======= */}
      <Route element={<ProtectedRoutes accessBy="authenticated" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
