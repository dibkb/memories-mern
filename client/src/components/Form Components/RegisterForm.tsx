import React, { useState } from "react";
import styles from "../../styles/Form.module.scss";
import { Link } from "react-router-dom";
import { TextInput } from "../formInputs/TextInput";
import { PasswordInput } from "../formInputs/PasswordInput";
import { Terms } from "./Terms";
import { CreateAccount, ProfilePicture } from "./components";

const haveAnAccount = (
  <Link to="/login" className="mx-auto">
    <a className={styles["__login"]}>
      <p>Already have an account </p>
      <p className={styles["neon"]}>Log In</p>
    </a>
  </Link>
);
const RegisterForm: React.FC = () => {
  const [acceptTerms, setAcceptterms] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  return (
    <section className={styles["__form"]}>
      {/* Profile Picture */}
      <ProfilePicture />
      {/* Name*/}
      <div className={styles["name"]}>
        <TextInput placeholder="First Name" />
        <TextInput placeholder="Last Name" />
      </div>
      {/* Email*/}
      <TextInput placeholder="Email address" />
      {/* Password*/}
      <PasswordInput placeholder="Password" />
      {/* Confirm-Password*/}
      <PasswordInput placeholder="Confirm Password" />
      {/* Terms & Conditions*/}
      <Terms acceptTerms={acceptTerms} handleAcceptTerms={setAcceptterms} />
      {/* Create button */}
      <CreateAccount acceptTerms={acceptTerms} />
      {/* Already have an account? */}
      {haveAnAccount}
    </section>
  );
};
export default RegisterForm;
