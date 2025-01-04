import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string | null;
}

const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
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
      <div className="input-field">
        <div className={`input ${error && "error"}`}>
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
        {error && <p className="form__error--text">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
