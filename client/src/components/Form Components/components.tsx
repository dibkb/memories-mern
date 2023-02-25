import React, { useEffect, useState } from "react";
import styles from "../../styles/components.module.scss";
import profile from "../../assets/profile.svg";
import Resizer from "../../api/Resizer";
export const CreateAccount: React.FC<CreateAccount> = ({
  isValidated,
  createAcountHandler,
}) => {
  return (
    <button
      className={styles[`create__btn__${isValidated}`]}
      disabled={!isValidated}
      onClick={createAcountHandler}
    >
      CREATE ACCOUNT
    </button>
  );
};
interface CreateAccount {
  isValidated: boolean;
  createAcountHandler: (e: any) => Promise<void>;
}
// --------------------- PROFILE PICTURE-----------------------------------------------
export const ProfilePicture: React.FC<ProfilePicture> = ({
  profilePicture,
  setProfilePicture,
}) => {
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  useEffect(() => {
    setProfilePicture(profile);
  }, []);
  const imageSelectHandler = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = (await resizeFile(file)) as string;
      setProfilePicture(image);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles["profile__input"]}>
      <div className={styles["icon__container"]}>
        <img src={profilePicture} className={styles["image__preview"]} />
        <input
          type="file"
          onChange={imageSelectHandler}
          className={styles["fileInput"]}
        />
      </div>
    </div>
  );
};
interface ProfilePicture {
  profilePicture: any;
  setProfilePicture: (value: string) => void;
}
