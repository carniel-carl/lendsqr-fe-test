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

type Column = {
  header: string;
  accessor: string;
  type?: "text" | "number" | "currency" | "date";
};

type TableProps = {
  columns: Column[];
  data: { [key: string]: any }[];
  rowsPerPage: number;
};
