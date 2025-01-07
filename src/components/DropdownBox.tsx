import { HTMLAttributes } from "react";

const DropdownBox = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={`dropdown-box ${className}`} {...props} />;
};

export default DropdownBox;
