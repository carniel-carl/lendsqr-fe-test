import { MdArrowDropDown } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside";
import Button from "./Button";
import DropdownBox from "./DropdownBox";
import { DropdownProps } from "../types/types";
import React from "react";

const DropdownMenu = ({
  children,
  className = "",
  trigger,
  showCaret = true,
  align = "middle",
  bordered,
}: DropdownProps) => {
  const { ref, visible, setVisible } = useClickOutside(false);

  const closeDropdown = () => {
    setVisible(false);
  };

  return (
    <div className={`dropdown ${className}`} ref={ref}>
      <Button
        className={`dropdown__trigger ${visible && "active"}`}
        onClick={() => setVisible(!visible)}
      >
        {trigger}

        {showCaret && <MdArrowDropDown size={18} className="trigger__caret" />}
      </Button>

      {visible && (
        <DropdownBox
          className={`dropdown-menu__content align-${align}`}
          bordered={bordered}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? //@ts-ignore
                React.cloneElement(child, { closeDropdown })
              : child
          )}
        </DropdownBox>
      )}
    </div>
  );
};

export default DropdownMenu;
