import React from "react";
import styles from "../styles/ProfileSection.module.scss";
import { Pencil } from "../utils/Icons";
const ProfileSection: React.FC<ProfileSection> = ({ profile, isAdmin }) => {
  return (
    <div className={styles["profile__container"]}>
      <div
        className={styles["image"]}
        style={{
          backgroundImage: `url(${profile.image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <span className={styles["name"]}>
        {profile.firstName + " " + profile.lastName}
      </span>
      {isAdmin && (
        <button className={styles["edit__tag"]}>
          Edit
          <Pencil />
        </button>
      )}
    </div>
  );
};

export default ProfileSection;
interface ProfileSection {
  profile: any;
  isAdmin: boolean;
}
