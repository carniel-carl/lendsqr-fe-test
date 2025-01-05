import { IconType } from "react-icons";

type SidebarDataType = {
  heading: string;
  links: {
    icon: IconType;
    title: string;
    href: string;
  }[];
}[];

type UserAnalyticsCardProps = {
  icon: IconType;
  label: string;
  value: number;
  colour: "pink" | "purple" | "red" | "orange";
};
