import { IoIosSearch, IoMdClose } from "react-icons/io";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FaRegBell, FaSignOutAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dispatch, SetStateAction, useMemo } from "react";
import DropdownMenu from "../components/DropdownMenu";
import { useAuth } from "../store/context/AuthContext";
import { logout } from "../services";

type IAprops = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};
const Navbar = ({ showSidebar, setShowSidebar }: IAprops) => {
  const { user } = useAuth();
  // HDR: Toggle function to show or hide the sidebar
  const toggleShowSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const userData = useMemo(() => {
    if (user) {
      return (
        user?.username.charAt(0).toUpperCase() +
        user?.username.slice(1).toLowerCase()
      );
    } else {
      return "Guest";
    }
  }, [user]);

  return (
    <header className="navbar">
      <>
        <div className="navbar__logo">
          <Logo dashboard />
        </div>
        <Button
          variant="neutral"
          className="navbar__menu--btn"
          aria-controls="nav-menu"
          aria-expanded={showSidebar}
          onClick={toggleShowSidebar}
        >
          {showSidebar ? (
            <IoMdClose size={25} />
          ) : (
            <RxHamburgerMenu size={25} />
          )}
        </Button>
      </>
      <div className="navbar__content">
        <div className="navbar__searchbar">
          <Input
            placeholder="Search for anything"
            className="navbar__searchbar--input"
            id="searchInput"
            variant="search"
          />
          <Button className="navbar__searchbar--btn">
            <IoIosSearch size={22} />
          </Button>
        </div>
        <nav className="navbar__nav">
          <Link to="#" className="doc_link">
            Docs
          </Link>
          <Button variant="neutral">
            <FaRegBell size={25} />
          </Button>
          <div className="avatar">
            <img
              src="https://picsum.photos/128"
              alt="avatar"
              className="avatar_image"
            />
          </div>
          <DropdownMenu
            trigger={<span>{userData}</span>}
            align="right"
            bordered
          >
            <p>Hello, {userData}</p>
            <div className="profile__dropdown-content">
              <Link to="#">Profile</Link>
              <Link to="#">Settings</Link>
            </div>
            <Button variant="neutral" className="logout_btn" onClick={logout}>
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </Button>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
