import { IconType } from "react-icons";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

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
