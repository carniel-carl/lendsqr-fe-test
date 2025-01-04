import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin__layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar collapsed={collapsed} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
