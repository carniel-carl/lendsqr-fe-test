import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { sidebarData } from "../data/SidebarData";

import SidebarLink from "../components/SidebarLink";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { logout } from "../services";
import OrganisationSwitcher from "../Sections/OrganisationSwitcher";

type IAprops = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};
const Sidebar = ({ showSidebar, setShowSidebar }: IAprops) => {
  const pathname = useLocation().pathname;

  // SUB: Close sidebar menu for mobile when link is clicked / navigated
  const closeSidebarMenu = () => {
    setShowSidebar(false);
  };
  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSidebar]);
  return (
    <>
      <aside className="sidebar" data-collapsed={showSidebar} id="nav-menu">
        <div className="sidebar__container">
          <div className="sidebar__top-content">
            <OrganisationSwitcher />

            <SidebarLink
              active={pathname === "/"}
              href="/"
              title="Dashboard"
              icon={FaHome}
              onClick={closeSidebarMenu}
            />
          </div>

          <nav className="sidebar__nav">
            {sidebarData.map((data) => (
              <div key={data.heading} className="sidebar__navlink-content">
                <p className="sidebar__navlink--heading">{data.heading}</p>
                {data.links && (
                  <ul className="sidebar__navlinks">
                    {data.links.map((link, index) => (
                      <li key={index}>
                        <SidebarLink
                          {...link}
                          active={pathname.startsWith(link.href)}
                          onClick={closeSidebarMenu}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="sidebar__bottom-content">
            <Button variant="neutral" className="logout_btn" onClick={logout}>
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </Button>
            <p className="sidebar__version--text">v1.2.0</p>
          </div>
        </div>
      </aside>

      {/* SUB: Mobile Menu Navigation background overlay when opened */}
      <div
        className={`overlay ${showSidebar && "show"}`}
        onClick={() => setShowSidebar(false)}
      />
    </>
  );
};

export default Sidebar;
