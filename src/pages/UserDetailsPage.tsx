import { HiArrowLongLeft } from "react-icons/hi2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const UserDetailsPage = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Button variant="neutral" className="back_button" onClick={navigateBack}>
        <HiArrowLongLeft size={25} />
        <span>Back to Users</span>
      </Button>
    </div>
  );
};

export default UserDetailsPage;
