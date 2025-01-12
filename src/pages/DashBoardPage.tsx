import { useMemo } from "react";
import { useAuth } from "../store/context/AuthContext";

const DashBoardPage = () => {
  const { user } = useAuth();

  const userData = useMemo(() => {
    if (user) {
      return (
        user?.username.charAt(0).toUpperCase() +
        user?.username.slice(1).toLowerCase()
      );
    } else {
      return "Guest";
    }
  }, [user]);
  return (
    <div>
      <h1>Welcome, {userData}</h1>
      <p>Lendsqr</p>
    </div>
  );
};

export default DashBoardPage;
