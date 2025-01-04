import { IconType } from "react-icons";

type SidebarDataType = {
  heading: string;
  links: {
    icon: IconType;
    title: string;
    href: string;
  }[];
}[];
