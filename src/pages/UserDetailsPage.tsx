import { HiArrowLongLeft } from "react-icons/hi2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles/pages/userdetails.scss";
import UserProfileHeader from "../Sections/UserProfileHeader";
import UserProfileData from "../Sections/UserProfileData";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { User } from "../types/types";
import { useParams } from "react-router-dom";
import { fetchUserDetails } from "../services";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  // HDR: Stimulate API Request to fetch user details
  //Check if the param id is the same as the local storage user details
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const user = await fetchUserDetails(id ? id : "");
      if (user) {
        setUserData(user);
      } else {
        setError("No user data found");
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="user-details">
      {/* Header */}
      <div>
        <Button
          variant="neutral"
          className="back_button"
          onClick={navigateBack}
        >
          <HiArrowLongLeft size={25} />
          <span>Back to Users</span>
        </Button>

        {!loading && !error && (
          <div className="user-details__header">
            <h2 className="user-details__header--heading">User Details </h2>
            <div className="user-details__actions">
              <Button variant="danger" className="action_btn">
                Blacklist User
              </Button>
              <Button variant="success" className="action_btn">
                Activate User
              </Button>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading />}
      {error && <div className="error-container">{error}</div>}
      {!loading && !error && userData && (
        <>
          {/* Profile */}
          <UserProfileHeader user={userData} />

          {/*SUB: Content */}
          <div className="user-details__content">
            <UserProfileData
              type="personal"
              title="Personal Information"
              data={{
                ...userData.personalInformation,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
              }}
            />
            <UserProfileData
              type="educationAndEmployment"
              title="Education & Employment"
              data={{
                ...(userData?.educationAndEmployment || {}),
                officeEmail: userData.officeEmail,
              }}
            />
            <UserProfileData
              type="social"
              title="Socials"
              data={{
                facebook: userData.facebook,
                twitter: userData.twitter,
                instagram: userData.instagram,
              }}
            />

            <UserProfileData
              type="guarantor"
              title="Guarantor"
              data={userData?.guarantor}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;
