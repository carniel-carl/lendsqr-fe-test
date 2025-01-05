import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type IAProps = {
  icon: IconType;
  href: string;
  title: string;
  active: boolean;
  onClick: () => void;
};

const SidebarLink = ({ icon: Icon, href, title, active, onClick }: IAProps) => {
  return (
    <Link
      to={href}
      className={`sidebar-link ${active && "active"}`}
      onClick={onClick}
    >
      <Icon /> <span>{title}</span>
    </Link>
  );
};

export default SidebarLink;
