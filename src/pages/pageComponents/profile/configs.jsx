import { Typography } from "@mui/material";
import styles from "../../../css/pages/pageComponents/profile/configs.module.css";

export default function ProfileConfigs() {
  return (
    <div className={styles.ProfileConfigs}>
      <div className={styles.ProfileDetails}>
        <Typography variant="caption">Profile Details</Typography>
      </div>
      <div className={styles.AvatarDetails}>
        <Typography variant="caption">Interview Avatar</Typography>
        <img className={styles.AvatarImage} src="" alt="Interview Avatar Image" />
      </div>
    </div>
  );
}
