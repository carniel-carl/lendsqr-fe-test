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

      <div>
        <h2>User Details </h2>
        <div>
          <Button variant="danger" className="action_btn">
            Blacklist User
          </Button>
          <Button variant="accent" className="action_btn">
            Activate User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
