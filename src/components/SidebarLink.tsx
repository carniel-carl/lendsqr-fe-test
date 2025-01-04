import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type IAProps = {
  icon: IconType;
  href: string;
  title: string;
  active: boolean;
};

const SidebarLink = ({ icon: Icon, href, title, active }: IAProps) => {
  return (
    <Link to={href} className={`sidebar-link ${active && "active"}`}>
      <Icon /> <span>{title}</span>
    </Link>
  );
};

export default SidebarLink;
