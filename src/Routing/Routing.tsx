import { Route, Routes } from "react-router-dom";
import DashBoardPage from "../pages/DashBoardPage";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../Layout/DashboardLayout";

const Routing = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashBoardPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Routing;
