import { ReactNode } from "react";
import AuthContextProvider from "./AuthContext";

const Context = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default Context;
