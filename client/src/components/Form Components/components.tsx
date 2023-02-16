import React, { useEffect, useState } from "react";
import styles from "../../styles/components.module.scss";
import profile from "../../assets/profile.svg";
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
export const ProfilePicture: React.FC<ProfilePicture> = ({
  profilePicture,
  setProfilePicture,
}) => {
  const [image, setImage] = useState<any>();
  useEffect(() => {
    if (!image) {
      setProfilePicture(profile);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setProfilePicture(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const imageSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
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
