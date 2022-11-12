import React, { useState } from "react";
import styles from "../../styles/Form.module.scss";
import {
  UserCircleIcon,
  CameraIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
const RegisterForm: React.FC = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);
  return (
    <section className={styles["__form"]}>
      <div className={styles["profile__input"]}>
        <div className={styles["icon__container"]}>
          <UserCircleIcon className={styles["user__icon"]} />
          <CameraIcon className={styles["camera__icon"]} />
        </div>
        <p>Choose Profile Picture</p>
      </div>
      <div className={styles["name"]}>
        <span className={styles["__first"]}>
          <pre className={styles["__label"]}>First Name</pre>
          <input type="text" />
        </span>
        <span className={styles["__last"]}>
          <pre className={styles["__label"]}>Last Name</pre>
          <input type="text" />
        </span>
      </div>
      <div className={styles["email"]}>
        <pre className={styles["__label"]}>Email address</pre>
        <input type="text" />
      </div>
      <div className={styles["password"]}>
        <pre className={styles["__label"]}>Password</pre>
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
      <div className={styles["confirm__password"]}>
        <pre className={styles["__label"]}>Confirm Password</pre>
        <div className={styles["input__container"]}>
          <input type={showConfirmPw ? "text" : "password"} />
          <span
            className={styles["__eyeicon__container"]}
            onClick={() => setShowConfirmPw((prev) => !prev)}
          >
            {showConfirmPw && <EyeIcon className={styles["__eyeicon"]} />}
            {!showConfirmPw && <EyeSlashIcon className={styles["__eyeicon"]} />}
          </span>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
