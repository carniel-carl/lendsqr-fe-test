import { HiArrowLongLeft } from "react-icons/hi2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../styles/pages/userdetails.scss";
import UserProfileHeader from "../Sections/UserProfileHeader";
import UserProfileData from "../Sections/UserProfileData";
import { delay, formatObjectToList } from "../lib/utils";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const userDataFromStorage = localStorage.getItem("userLendsqr");
      await delay(2);
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage));
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
      </div>
      {loading && <Loading />}
      {error && <div className="">{error}</div>}
      {!loading && !error && (
        <>
          {/* Profile */}
          <UserProfileHeader user={user} />

          {/*SUB: Content */}
          <div className="user-details__content">
            {/* Personal Information */}
            <UserProfileData
              title="Socials"
              data={formatObjectToList(user?.socials)}
            />
            {/* Guaranto */}
            <UserProfileData
              title="Guarntor"
              data={formatObjectToList(user?.guarantor)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;
