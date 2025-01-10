import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IAProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bordered?: boolean;
  className?: string;
}

const DropdownBox = ({ className = "", bordered, ...props }: IAProps) => {
  return (
    <div
      className={`dropdown-box ${className} ${bordered ? "bordered" : ""}`}
      {...props}
    />
  );
};

export default DropdownBox;
