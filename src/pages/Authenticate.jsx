import { useEffect, useState } from "react";
import styles from "../css/pages/authentication.module.css";
import { Typography } from "@mui/material";
import SignupForm from "../components/forms/signup";
import LoginForm from "../components/forms/login";
import fetchWrapper from "../../utils/API/fetchWrapper";

export default function Authenticate({ type = "login" }) {
  const [selectedAuthOption, setSelectedAuthOption] = useState("login");

  useEffect(() => {
    if (type) {
      setSelectedAuthOption(type)
    }
  }, [type])

  function handleAuthOptionChange(option) {
    setSelectedAuthOption(option);
  }

  function handleSignupSubmit(formData) {
    // Handle the form data from the SignupForm component
    fetchWrapper("/api/auth/signup", "", "POST", formData).then((res) => {
      if (res.token) {
        localStorage.setItem("OPUS-TOKEN", res.token);
        window.location.replace("/")
      }
    });
  }

  function handleLoginSubmit(formData) {
    // Handle the form data from the SignupForm component
    fetchWrapper("/api/auth/login", "", "POST", formData).then((res) => {
      if (res.token) {
        localStorage.setItem("OPUS-TOKEN", res.token);
        window.location.replace("/")
      }
    });
  }

  return (
    <div className={styles.Authenticate}>
      <div className={styles.AuthOptions}>
        <div
          onClick={() => handleAuthOptionChange("login")}
          className={
            selectedAuthOption !== "login"
              ? `${styles.AuthOption}`
              : `${styles.SelectedAuthOption}`
          }
        >
          <Typography variant="body1">Login</Typography>
        </div>
        <div
          onClick={() => handleAuthOptionChange("signup")}
          className={
            selectedAuthOption !== "signup"
              ? `${styles.AuthOption}`
              : `${styles.SelectedAuthOption}`
          }
        >
          <Typography variant="body1">Sign Up</Typography>
        </div>
      </div>
      {selectedAuthOption === "signup" ? (
        <SignupForm onSubmit={handleSignupSubmit} />
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
}
