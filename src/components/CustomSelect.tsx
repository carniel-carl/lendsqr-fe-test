import { ForwardedRef, forwardRef, SelectHTMLAttributes } from "react";
import { CgChevronDown } from "react-icons/cg";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: any }[];
}
const CustomSelect = forwardRef(
  (
    { value, onChange, options, ...props }: CustomSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className="select-wrapper">
        <CgChevronDown size={20} className="custom-select__arrow" />
        <select
          {...props}
          className="custom-select"
          value={value}
          onChange={onChange}
          ref={ref}
        >
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default CustomSelect;
