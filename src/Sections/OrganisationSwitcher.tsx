import { FaBriefcase } from "react-icons/fa";
import useClickOutiside from "../hooks/useClickOutside";
import { BiChevronDown } from "react-icons/bi";

const OrganisationSwitcher = () => {
  const { visible, setVisible, ref } = useClickOutiside(false);
  return (
    <div className="organisation__switch" ref={ref}>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className={`organisation__switch--btn ${visible ? "active" : ""}`}
      >
        <FaBriefcase />
        Switch Organization
        <BiChevronDown size={20} className="arrow" />
      </button>
      {visible && (
        <div className="organisation__switch--dropdown">
          <p>No organisation</p>
        </div>
      )}
    </div>
  );
};

export default OrganisationSwitcher;
