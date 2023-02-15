import React, { useEffect, useState } from "react";
import styles from "../../styles/components.module.scss";
import profile from "../../assets/profile.svg";
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
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  useEffect(() => {
    if (!image) {
      setPreview(profile);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
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
        <img src={preview} className={styles["image__preview"]} />
        <input
          type="file"
          onChange={imageSelectHandler}
          className={styles["fileInput"]}
        />
      </div>
    </div>
  );
};
