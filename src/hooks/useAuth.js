import { useState, useEffect } from "react";

const useAuth = () => {
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

  return token;
};

export default useAuth;