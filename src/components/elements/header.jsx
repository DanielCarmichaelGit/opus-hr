import { Typography } from "@mui/material";
import styles from "../../css/components/elements/header.module.css";
import governor from "../../css/global/governor.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  function handleNavigation(destination) {
    navigate(destination);
  }
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLeft}>
        <img
          className={governor.HeaderLogo}
          src="./opus-hr-logo.svg"
          alt="Opus HR Logo"
          onClick={() => handleNavigation("/")}
        />
      </div>
      <div className={styles.HeaderRight}>
        <button
          onClick={() => handleNavigation("/tests")}
          className={styles.HeaderButton}
        >
          Tests
        </button>
        <button
          onClick={() => handleNavigation("/integrations")}
          className={styles.HeaderButton}
        >
          Integrations
        </button>
        <button
          onClick={() => handleNavigation("/profile")}
          className={styles.HeaderButton}
        >
          Profile
        </button>
      </div>
    </div>
  );
}
