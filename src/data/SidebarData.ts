import { FaMoneyBillTransfer, FaUserGroup } from "react-icons/fa6";
import { SidebarDataType } from "../types/types";
import { HiUserGroup } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import {
  FaBriefcase,
  FaChartBar,
  FaClipboardList,
  FaCoins,
  FaRegHandshake,
  FaScroll,
  FaSlidersH,
} from "react-icons/fa";
import {
  BsBank2,
  BsPersonCheckFill,
  BsPersonFillGear,
  BsPersonXFill,
} from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { MdSavings } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { HiPercentBadge } from "react-icons/hi2";
import { TiRefreshOutline } from "react-icons/ti";

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
    heading: "Businesses",
    links: [
      {
        title: "Organization",
        href: "#",
        icon: FaBriefcase,
      },
      {
        title: "Loan Products",
        href: "#",
        icon: GiReceiveMoney,
      },
      {
        title: "Savings Products",
        href: "#",
        icon: BsBank2,
      },
      {
        title: "Fees and Charges",
        href: "#",
        icon: FaCoins,
      },
      {
        title: "Transactions",
        href: "#",
        icon: FaMoneyBillTransfer,
      },
      {
        title: "Services",
        href: "#",
        icon: IoSettings,
      },
      {
        title: "Service Account",
        href: "#",
        icon: BsPersonFillGear,
      },
      {
        title: "Settlements",
        href: "#",
        icon: FaScroll,
      },
      {
        title: "Reports",
        href: "#",
        icon: FaChartBar,
      },
    ],
  },
  {
    heading: "Settings",
    links: [
      {
        title: "Preferences",
        href: "#",
        icon: FaSlidersH,
      },
      {
        title: "Fees and Pricing",
        href: "#",
        icon: HiPercentBadge,
      },
      {
        title: "Audit Logs",
        href: "#",
        icon: FaClipboardList,
      },
      {
        title: "Systems Messages",
        href: "#",
        icon: TiRefreshOutline,
      },
    ],
  },
];
