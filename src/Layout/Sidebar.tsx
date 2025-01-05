import { FaBriefcase, FaHome, FaSignOutAlt } from "react-icons/fa";
import { sidebarData } from "../data/SidebarData";

import SidebarLink from "../components/SidebarLink";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = useLocation().pathname;

  return (
    <aside className="sidebar" data-collapsed={collapsed && "true"}>
      <div className="sidebar__container">
        <div className="sidebar__top-content">
          <div>
            <FaBriefcase />
            Switch Organization
          </div>

          <SidebarLink
            active={pathname === "/"}
            href="/"
            title="Dashboard"
            icon={FaHome}
          />
        </div>

        <nav className="sidebar__nav">
          {sidebarData.map((data) => (
            <div key={data.heading} className="sidebar__navlink-content">
              <p className="sidebar__navlink--heading">{data.heading}</p>
              {data.links && (
                <div className="sidebar__navlinks">
                  {data.links.map((link, index) => (
                    <SidebarLink
                      {...link}
                      key={index}
                      active={pathname.startsWith(link.href)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar__bottom-content">
          {/* <SidebarLink
            active={pathname === "/"}
            href="/"
            title="Logout"
            icon={FaHome}
          /> */}
          <Button variant="neutral" className="logout_btn">
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </Button>
          <p className="sidebar__version--text">v1.2.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
