import { HiArrowLongLeft } from "react-icons/hi2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles/pages/userdetails.scss";
import UserProfileHeader from "../Sections/UserProfileHeader";
import UserProfileData from "../Sections/UserProfileData";
import { delay, formatObjectToList } from "../lib/utils";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { User } from "../types/types";
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  //HDR: Check if the param id is the same as the local storage user details
  const validateDetails = (data: User) => {
    if (data.id !== id) {
      return false;
    }
    return true;
  };

  // HDR: Stimulate API Request to fetch user details
  //Check if the param id is the same as the local storage user details
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const userDataFromStorage = localStorage.getItem("userLendsqr");
      await delay(2);
      if (userDataFromStorage) {
        const data = JSON.parse(userDataFromStorage);
        const isValid = validateDetails(data);
        if (isValid) {
          setUserData(data);
        } else {
          setError("No user data found");
        }
      } else {
        console.error("No user data found in local storage");
        setError("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user details", error);
      setError("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const navigateBack = () => {
    navigate(-1);
  };
  const user = {
    "full name": "Grace Effiom",
    tier: 2,
    balance: 200000,
    account: "9012345678",
    bank: "Providus Bank",
    phone: "07060780922",
    email: "grace@gmail.com",
    education: "B.Sc",
    income: "₦200,000 - ₦400,000",
    socials: {
      twitter: "@grace_effiom",
      facebook: "Grace Effiom",
      instagram: "@grace_effiom",
    },
    guarantor: {
      "full name": "Debby Ogana",
      phone: "07060780922",
      email: "debby@gmail.com",
      relationship: "Sister",
    },
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
                ...userData?.educationAndEmployment,
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
