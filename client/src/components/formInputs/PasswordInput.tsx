import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.scss";
export const PasswordInput: React.FC<PasswordInput> = ({ placeholder }) => {
  const [showPw, setShowPw] = useState<boolean>(false);
  return (
    <div className={styles["password"]}>
      <pre className={styles["__label"]}>{placeholder}</pre>
      <div className={styles["input__container"]}>
        <input type={showPw ? "text" : "password"} />
        <span
          className={styles["__eyeicon__container"]}
          onClick={() => setShowPw((prev) => !prev)}
        >
          {showPw && <EyeIcon className={styles["__eyeicon"]} />}
          {!showPw && <EyeSlashIcon className={styles["__eyeicon"]} />}
        </span>
      </div>
    </div>
  );
};
interface PasswordInput {
  placeholder: string;
}
