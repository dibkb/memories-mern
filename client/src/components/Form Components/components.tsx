import React from "react";
import styles from "../../styles/Form.module.scss";
import { UserCircleIcon, CameraIcon } from "@heroicons/react/24/solid";
export const CreateAccount: React.FC<CreateAccount> = ({ acceptTerms }) => {
  return (
    <button
      className={styles[`create__btn__${acceptTerms}`]}
      disabled={!acceptTerms}
    >
      CREATE ACCOUNT
    </button>
  );
};
interface CreateAccount {
  acceptTerms: boolean;
}
export const ProfilePicture: React.FC = () => {
  return (
    <div className={styles["profile__input"]}>
      <div className={styles["icon__container"]}>
        <UserCircleIcon className={styles["user__icon"]} />
        <CameraIcon className={styles["camera__icon"]} />
      </div>
      <p>Choose Profile Picture</p>
    </div>
  );
};
