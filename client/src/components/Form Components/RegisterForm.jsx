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
import { ErrorModule, LoginModal } from "../NotificationModal";
import { BASEURL } from "../../api/api";
const haveAnAccount = (
  <Link to="/login" className="mx-auto">
    <a className={styles["__login"]}>
      <p>Already have an account </p>
      <p className={styles["neon"]}>Log In</p>
    </a>
  </Link>
);
const RegisterForm = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [profilePicture, setProfilePicture] = useState();
  const [firstName, SetFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState({
    error: null,
    message: null,
  });
  const [lastName, SetLastName] = useState("");
  const [lastNameError, setLastNameError] = useState({
    error: null,
    message: null,
  });
  const [email, SetEmail] = useState("");
  const [emailError, setEmailError] = useState({
    error: null,
    message: null,
  });
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    error: null,
    message: null,
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: null,
    message: null,
  });
  const [acceptTerms, setAcceptterms] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
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
  const createAcountHandler = async (e) => {
    e.preventDefault();
    fetch(`${BASEURL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        image: profilePicture,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setLoginModal(true);
        } else {
          setLoginModal(false);
          setErrorModal(true);
          return response.json();
        }
      })
      .then((json) => {
        setServerError(json.error);
      });
  };
  return (
    <form className={styles["__form"]} autoComplete="off">
      {loginModal && !errorModal && <LoginModal setShowModal={setLoginModal} />}
      {errorModal && !loginModal && (
        <ErrorModule error={serverError} setShowModal={setErrorModal} />
      )}
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
