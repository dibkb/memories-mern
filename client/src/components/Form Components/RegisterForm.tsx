import React, { useEffect, useState } from "react";
import styles from "../../styles/Form.module.scss";
import { Link } from "react-router-dom";
import { TextInput } from "../formInputs/TextInput";
import { PasswordInput } from "../formInputs/PasswordInput";
import { Terms } from "./Terms";
import { CreateAccount, ProfilePicture } from "./components";
import {
  lengthTest,
  alphabetTest,
  emailTest,
  emailExists,
} from "../../utils/formValidation";
const haveAnAccount = (
  <Link to="/login" className="mx-auto">
    <a className={styles["__login"]}>
      <p>Already have an account </p>
      <p className={styles["neon"]}>Log In</p>
    </a>
  </Link>
);
const RegisterForm: React.FC = () => {
  const [firstName, SetFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<TextError>({
    error: false,
    message: null,
  });
  const [lastName, SetLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<TextError>({
    error: false,
    message: null,
  });
  const [email, SetEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<TextError>({
    error: false,
    message: null,
  });
  const [password, SetPassword] = useState<string>("");
  const [confirmPassword, SetConfirmPassword] = useState<string>("");
  const [acceptTerms, setAcceptterms] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  // ------------------- Firstname validation------------------------
  useEffect(() => {
    if (firstName !== "") {
      if (!alphabetTest(firstName)) {
        setFirstNameError({
          error: true,
          message: "First name can only be alphabets",
        });
      } else if (!lengthTest(firstName)) {
        setFirstNameError({
          error: true,
          message: "First name should be atleast 3 characters",
        });
      } else if (lengthTest(firstName) && alphabetTest(firstName)) {
        setFirstNameError({
          error: false,
          message: null,
        });
      }
    }
  }, [firstName]);
  // ------------------- Lastname validation------------------------
  useEffect(() => {
    if (lastName !== "") {
      if (!alphabetTest(lastName)) {
        setLastNameError({
          error: true,
          message: "Last name can only be alphabets",
        });
      } else if (lastName.length < 1) {
        setLastNameError({
          error: true,
          message: "Last name should not be empty",
        });
      } else {
        setLastNameError({
          error: false,
          message: null,
        });
      }
    }
  }, [lastName]);
  // ------------------- Email validation------------------------
  useEffect(() => {
    if (email !== "") {
      console.log(emailExists(email));
      if (!emailTest(email)) {
        setEmailError({
          error: true,
          message: "This is not a valid email",
        });
      } else if (emailExists(email)) {
        setEmailError({
          error: true,
          message: "This email is already in use",
        });
      }
      // else if (emailTest(email) && !emailExists(email))
      // {
      //   setEmailError({
      //     error: false,
      //     message: null,
      //   });
      // }
    }
  }, [email]);
  return (
    <section className={styles["__form"]}>
      {/* Profile Picture */}
      <ProfilePicture />
      {/* Name*/}
      <div className={styles["name"]}>
        <TextInput
          placeholder="First Name"
          input={firstName}
          setInput={SetFirstName}
          error={firstNameError}
        />
        <TextInput
          placeholder="Last Name"
          input={lastName}
          setInput={SetLastName}
          error={lastNameError}
        />
      </div>
      {/* Email*/}
      <TextInput
        placeholder="Email address"
        input={email}
        setInput={SetEmail}
        error={emailError}
      />
      {/* Password*/}
      <PasswordInput
        placeholder="Password"
        input={password}
        setInput={SetPassword}
      />
      {/* Confirm-Password*/}
      <PasswordInput
        placeholder="Confirm Password"
        input={confirmPassword}
        setInput={SetConfirmPassword}
      />
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
export interface TextError {
  error: boolean;
  message: string | null;
}
