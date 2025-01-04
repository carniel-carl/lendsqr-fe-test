import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof typeof VARIANT;
}

const VARIANT = {
  primary: "btn__primary",
  secondary: "btn__secondary",
};
const Button = ({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={`btn ${VARIANT[variant]} ${className} `} {...props}>
      {children}
    </button>
  );
};

export default Button;
