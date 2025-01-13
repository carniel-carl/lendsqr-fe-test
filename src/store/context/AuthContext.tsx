import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOGIN_TIME } from "../../lib/constant";

type LoggedInType = {
  email: string;
  username: string;
  loggedInTime: Date | null;
};

type AuthContextType = {
  user: LoggedInType | null;
  setLoggedInUser: Dispatch<SetStateAction<LoggedInType | null>>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

const getInitialUser = () => {
  const localUser = localStorage.getItem("loggedInUser:Lendqr");
  if (localUser) {
    const userObj = JSON.parse(localUser);
    const currentTime = new Date().getTime();
    const loggedInTime = new Date(userObj.loggedInTime).getTime();
    const timeDifference = (currentTime - loggedInTime) / (1000 * 60);

    if (timeDifference > LOGIN_TIME) {
      return null;
    } else {
      return userObj;
    }
  }
};
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInType | null>(
    getInitialUser()
  );

  useEffect(() => {
    const localUser = localStorage.getItem("loggedInUser:Lendqr");
    if (localUser) {
      const userObj = JSON.parse(localUser);
      const currentTime = new Date().getTime();
      const loggedInTime = new Date(userObj.loggedInTime).getTime();
      const timeDifference = (currentTime - loggedInTime) / (1000 * 60);

      if (timeDifference > LOGIN_TIME) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser:Lendqr");
      } else {
        setLoggedInUser(userObj);
      }
    } else {
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
