import { FaUserGroup } from "react-icons/fa6";
import { SidebarDataType } from "../types/types";
import { HiUserGroup } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { FaRegHandshake } from "react-icons/fa";
import { BsPersonCheckFill, BsPersonXFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdSavings } from "react-icons/md";

export const sidebarData: SidebarDataType = [
  {
    heading: "Customers",
    links: [
      {
        title: "Users",
        href: "/users",
        icon: FaUserGroup,
      },
      {
        title: "Guarantor",
        href: "#",
        icon: HiUserGroup,
      },
      {
        title: "Loan",
        href: "#",
        icon: TbMoneybag,
      },
      {
        title: "Decision Models",
        href: "#",
        icon: FaRegHandshake,
      },
      {
        title: "Savings",
        href: "#",
        icon: MdSavings,
      },
      {
        title: "Loan Requests",
        href: "#",
        icon: GiReceiveMoney,
      },
      {
        title: "Whitelist",
        href: "#",
        icon: BsPersonCheckFill,
      },
      {
        title: "Karma",
        href: "#",
        icon: BsPersonXFill,
      },
    ],
  },
  {
    heading: "Business",
    links: [
      {
        title: "Organization",
        href: "#",
        icon: FaUserGroup,
      },
      {
        title: "Guarantor",
        href: "#",
        icon: FaUserGroup,
      },
      {
        title: "Loan",
        href: "#",
        icon: FaUserGroup,
      },
    ],
  },
];
