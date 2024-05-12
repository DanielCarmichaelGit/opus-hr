import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("OPUS-TOKEN"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("OPUS-TOKEN"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export default AuthContext;