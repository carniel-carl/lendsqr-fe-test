import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

interface InputPropsBase
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string | null;
  variant: "primary" | "search" | "regular";
}

type InputProps =
  | (InputPropsBase & {
      variant: "primary";
      label: string;
      placeholder: string;
    })
  | (InputPropsBase & { variant: "search"; label?: string })
  | (InputPropsBase & { variant: "regular"; label: string });

const Input = forwardRef(
  (
    { className, error, label, variant, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // SUB: Show/hide password handler
    const showPasswordHandler = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType =
      props?.type === "password"
        ? showPassword
          ? "text"
          : "password"
        : props?.type;

    return (
      <div className="input-group">
        <div className={`input-field ${variant}`}>
          <label htmlFor={props.id} className="input__label">
            {label}
          </label>
          <div className={`input`}>
            <input
              ref={ref}
              className={`input__input ${className}`}
              {...props}
              type={inputType}
            />

            {props?.type === "password" && (
              <button
                className="password__btn"
                type="button"
                onClick={showPasswordHandler}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
        </div>
        {error && <small className="form__error--text">{error}</small>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
