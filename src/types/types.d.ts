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
  renderActions?: (row: { [key: string]: any }) => React.ReactNode;
  filterHeader?: boolean;
  showPagination?: boolean;
  renderFilter?: (column: string) => React.ReactNode;
};

type DropdownProps = {
  children: React.ReactNode;
  className?: string;
  trigger: React.ReactNode;
  showCaret?: boolean;
  align?: "left" | "right" | "middle" | "center";
  bordered?: boolean;
};
type FilterDataType = {
  username?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
  status?: string;
  organisation?: string;
};

type UserProfile = {
  bank: string;
  tier: number;
  userId: string;
  company: string;
  accountNumber: string;
  accountBalance: number;
};

type Guarantor = {
  email: string;
  company: string;
  fullName: string;
  phoneNumber: string;
  relationship: string;
};

type FinancialDetails = {
  hasLoan: boolean;
  hasSavings: boolean;
  loanAmount: string | null;
  savingsAmount: string | null;
};

type PersonalInformation = {
  bvn: string;
  gender: string;
  children: number | string;
  phoneNumber: string;
  maritalStatus: string;
  residenceType: string;
};

type EducationAndEmployment = {
  loanRepayment: number;
  monthlyIncome: string;
  employmentStatus: string;
  levelOfEducation: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  profile: UserProfile;
  twitter: string;
  facebook: string;
  username: string;
  createdAt: string;
  guarantor: Guarantor;
  instagram: string;
  updatedAt: string;
  dateJoined: string;
  officeEmail: string;
  organisation: string;
  financialDetails: FinancialDetails;
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
};
