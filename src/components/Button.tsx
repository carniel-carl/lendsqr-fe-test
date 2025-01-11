import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
} from "react";

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
  neutral: "btn__neutral",
  danger: "btn__danger",
  success: "btn__success",
};
const Button = forwardRef(
  (
    { className, variant = "primary", children, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={`btn ${VARIANT[variant]} ${className} `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
