import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/DashBoardPage";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../Layout/DashboardLayout";
import UserPage from "../pages/UserPage";

const Routing = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashBoardPage />} />
        <Route path="/users" element={<UserPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Routing;
