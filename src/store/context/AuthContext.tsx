import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LoggedInType = {
  email: string;
  loggedInTime: Date | null;
};

type AuthContextType = {
  user: LoggedInType | null;
} | null;

const AuthContext = createContext<AuthContextType>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInType | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("loggedInUser:Lendqr");
    if (localUser) {
      const userObj = JSON.parse(localUser);
      const currentTime = new Date().getTime();
      const loggedInTime = new Date(userObj.loggedInTime).getTime();
      const timeDifference = (currentTime - loggedInTime) / (1000 * 60);

      if (timeDifference > 30) {
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
    <AuthContext.Provider value={{ user: loggedInUser }}>
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
