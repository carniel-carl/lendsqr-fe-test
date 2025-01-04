import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div>Navbar</div>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
