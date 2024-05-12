import styles from "../css/pages/profile.module.css";
import governor from "../css/global/governor.module.css";
import ProfileConfigs from "./pageComponents/profile/configs";

export default function Profile() {
  return (
    <div className={governor.Governor}>
      <div className={styles.Profile}>
        <ProfileConfigs />
      </div>
    </div>
  );
}
