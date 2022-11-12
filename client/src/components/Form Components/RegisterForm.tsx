import React, { useState } from "react";
import styles from "../../styles/Form.module.scss";
import {
  UserCircleIcon,
  CameraIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { TogleOff, TogleOn } from "../../utils/Icons";
import CreateAccount from "../CreateAccount";
import { Link } from "react-router-dom";
const RegisterForm: React.FC = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);
  const [acceptTerms, setAcceptterms] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  return (
    <section className={styles["__form"]}>
      {/* Profile Picture */}
      <div className={styles["profile__input"]}>
        <div className={styles["icon__container"]}>
          <UserCircleIcon className={styles["user__icon"]} />
          <CameraIcon className={styles["camera__icon"]} />
        </div>
        <p>Choose Profile Picture</p>
      </div>
      {/* Name*/}
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
      {/* Email*/}
      <div className={styles["email"]}>
        <pre className={styles["__label"]}>Email address</pre>
        <input type="text" />
      </div>
      {/* Password*/}
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
      {/* Confirm-Password*/}
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
      {/* Terms & Conditions*/}
      <div
        className={styles["terms"]}
        onClick={() => {
          setAcceptterms((prev) => !prev);
        }}
      >
        <span className={styles["__switchContainer"]}>
          {acceptTerms && <TogleOn />}
          {!acceptTerms && <TogleOff />}
        </span>
        <p className={styles[`__text-${acceptTerms}`]}>
          I accept the Terms of Service as well as Privacy Policy
        </p>
      </div>
      {/* Create button */}
      <button
        className={styles[`create__btn__${acceptTerms}`]}
        disabled={!acceptTerms}
      >
        CREATE ACCOUNT
      </button>
      {/* Already have an account? */}
      <Link to="/login" className="mx-auto">
        <a className={styles["__login"]}>
          <p>Already have an account </p>
          <p className={styles["neon"]}>Log In</p>
        </a>
      </Link>
    </section>
  );
};

export default RegisterForm;
