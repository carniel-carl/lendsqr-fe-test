import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="admin__layout">
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="layout-container">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
