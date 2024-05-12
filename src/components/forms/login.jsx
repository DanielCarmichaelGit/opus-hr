import { useState } from "react";
import governor from "../../css/global/governor.module.css";
import InputGroup from "../inputs/inputGroup";
import { Typography } from "@mui/material";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateInputs() {
    const errors = {};

    // Validate email
    if (!email.trim()) {
      errors["Email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors["Email"] = "Invalid email address";
    }

    // Validate password
    if (!password.trim()) {
      errors["Password"] = "Password is required";
    } else if (password.length < 8) {
      errors["Password"] = "Password must be at least 8 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate inputs
    const isValid = validateInputs();

    if (isValid) {
      // If inputs are valid, call the onSubmit callback with the form data
      onSubmit({ email, password });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={governor.Form}>
      <div className={governor.FormHeader}>
        <Typography className={governor.FormHeaderText} variant="h5">
          Welcome back!
        </Typography>
      </div>
      <div className={governor.FormMain}>
        <InputGroup
          label={"Email"}
          inputType={"email"}
          inputValue={email}
          inputValueChange={setEmail}
          errors={errors}
        />
        <InputGroup
          label={"Password"}
          inputType={"password"}
          inputValue={password}
          inputValueChange={setPassword}
          errors={errors}
        />
        <button className={governor.FormSubmitButton} type="submit">
          Continue
        </button>
      </div>
      <div className={governor.FormFooter}>
        <Typography className={governor.FormFooterLinks} variant="caption">
          Not A Client?
        </Typography>
        <Typography className={governor.FormFooterLinks} variant="caption">
          Forgot Password
        </Typography>
        <Typography className={governor.FormFooterLinks} variant="caption">
          Terms & Conditions
        </Typography>
      </div>
    </form>
  );
}
