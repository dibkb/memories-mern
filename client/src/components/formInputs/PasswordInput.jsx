import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.scss";
import { WarningIcon } from "../../utils/Icons";
export const PasswordInput = ({ placeholder, input, setInput, error }) => {
  const [showPw, setShowPw] = useState(false);
  const onChangeHandler = (e) => {
    e.preventDefault;
    setInput(e.target.value);
  };

  return (
    <div className={styles["password"]}>
      <pre className={styles["__label"]}>{placeholder}</pre>
      <div className={styles["input__container"]}>
        <input
          type={showPw ? "text" : "password"}
          value={input}
          onChange={onChangeHandler}
          className={error.error ? styles["input__true"] : styles["input__"]}
          autoComplete="new-password"
        />
        <span
          className={styles["__eyeicon__container"]}
          onClick={() => setShowPw((prev) => !prev)}
        >
          {showPw && <EyeIcon className={styles["__eyeicon"]} />}
          {!showPw && <EyeSlashIcon className={styles["__eyeicon"]} />}
        </span>
      </div>
      <span className={styles["warning__container"]}>
        {error.error && <WarningIcon />}
        <em className={styles["form__warning"]}>{error.message}</em>
      </span>
    </div>
  );
};
