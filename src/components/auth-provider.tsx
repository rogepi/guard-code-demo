import * as React from "react";

type AuthContextType = {
  codeSalt: string;
  setCodeSalt: (codeSalt: string) => void;
};

export const authContext = React.createContext<AuthContextType>({
  codeSalt: "",
  setCodeSalt: (s: string) => {
    console.log(s);
    console.warn("no auth provider");
  },
});

export const useAuthContext = () => React.useContext(authContext);

interface IAuthContextProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthContextProps) => {
  const [codeSalt, setCodeSalt] = React.useState("");

  return (
    <authContext.Provider value={{ codeSalt, setCodeSalt }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
