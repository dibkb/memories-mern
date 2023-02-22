import React, { useEffect, useState } from "react";
import styles from "../../styles/Form.module.scss";
import { Link, Navigate } from "react-router-dom";
import { TextInput } from "../formInputs/TextInput";
import { PasswordInput } from "../formInputs/PasswordInput";
import { Terms } from "./Terms";
import { CreateAccount, ProfilePicture } from "./components";
import {
  lengthTest,
  alphabetTest,
  emailTest,
  alphaNumericCheck,
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
  const [redirect, setRedirect] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<any>();
  const [firstName, SetFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<TextError>({
    error: null,
    message: null,
  });
  const [lastName, SetLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<TextError>({
    error: null,
    message: null,
  });
  const [email, SetEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<TextError>({
    error: null,
    message: null,
  });
  const [password, SetPassword] = useState<string>("");
  const [confirmPassword, SetConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<TextError>({
    error: null,
    message: null,
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState<TextError>({
    error: null,
    message: null,
  });
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
      if (!emailTest(email)) {
        setEmailError({
          error: true,
          message: "This is not a valid email",
        });
      } else {
        setEmailError({
          error: false,
          message: null,
        });
      }
    }
  }, [email]);
  // -------------------- Password validation --------------------
  useEffect(() => {
    if (password !== "") {
      if (password.length < 5) {
        setPasswordError({
          error: true,
          message: "Password must be atleast 5 characters long",
        });
      } else if (!alphaNumericCheck(password)) {
        setPasswordError({
          error: true,
          message: "Password must contain alphanumeric characters",
        });
      } else {
        setPasswordError({
          error: false,
          message: null,
        });
      }
    }
  }, [password]);
  // -------------------- Confirm Password validation --------------------
  useEffect(() => {
    if (password === confirmPassword) {
      setConfirmPasswordError({
        error: false,
        message: null,
      });
    } else {
      setConfirmPasswordError({
        error: true,
        message: "Passwords do not match",
      });
    }
  }, [confirmPassword, password]);
  // ------------------- All validated---------------------
  useEffect(() => {
    if (
      firstNameError.error === false &&
      lastNameError.error === false &&
      emailError.error === false &&
      passwordError.error === false &&
      confirmPasswordError.error === false &&
      acceptTerms === true
    ) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    acceptTerms,
  ]);
  // ------------------------ CREATE ACCOUNT-------------------
  const createAcountHandler = async (e: any) => {
    e.preventDefault();
    fetch("http://localhost:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        image: profilePicture,
      }),
    }).then((response) => {
      if (response.ok) {
        setRedirect(true);
      } else {
        // MOdal warning
      }
    });
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form className={styles["__form"]} autoComplete="on">
      {/* Profile Picture */}
      <ProfilePicture
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />
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
        error={passwordError}
      />
      {/* Confirm-Password*/}
      <PasswordInput
        placeholder="Confirm Password"
        input={confirmPassword}
        setInput={SetConfirmPassword}
        error={confirmPasswordError}
      />
      {/* Terms & Conditions*/}
      <Terms acceptTerms={acceptTerms} handleAcceptTerms={setAcceptterms} />
      {/* Create button */}
      <CreateAccount
        isValidated={isValidated}
        createAcountHandler={createAcountHandler}
      />
      {/* Already have an account? */}
      {haveAnAccount}
    </form>
  );
};
export default RegisterForm;
export interface TextError {
  error: boolean | null;
  message: string | null;
}
