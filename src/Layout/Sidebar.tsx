import { FaBriefcase, FaHome } from "react-icons/fa";
import { sidebarData } from "../data/SidebarData";

import SidebarLink from "../components/SidebarLink";
import { useLocation } from "react-router-dom";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = useLocation().pathname;

  return (
    <aside className="sidebar" data-collapsed={collapsed && "true"}>
      <div className="sidebar__container">
        <div>
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
      </div>
    </aside>
  );
};

export default Sidebar;
