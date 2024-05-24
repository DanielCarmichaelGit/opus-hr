import { Typography } from "@mui/material";
import styles from "../../../css/pages/pageComponents/profile/configs.module.css";
import handleAvatarCreate from "../../../../utils/functions/handleAvatarCreate";
import { useState } from "react";

export default function ProfileConfigs() {
  const [avatar, setAvatar] = useState("");

  async function callAvatarCreate() {
    handleAvatarCreate(
      "#333",
      "male",
      "Daniel",
      "wearing a button up shirt and glasses",
      false
    ).then((res) => {
      console.log(res);
      setAvatar(res.avatar.avatar_image);
    });
  }

  return (
    <div className={styles.ProfileConfigs}>
      <div className={styles.ProfileDetails}>
        <Typography variant="caption">Profile Details</Typography>
      </div>
      <div className={styles.AvatarDetails}>
        <Typography variant="caption">Interview Avatar</Typography>
        <img
          className={styles.AvatarImage}
          src={avatar}
          alt="Interview Avatar Image"
        />
        <button onClick={() => callAvatarCreate()}>Generate Avatar</button>
      </div>
    </div>
  );
}
