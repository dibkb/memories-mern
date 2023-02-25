import React from "react";
import styles from "../styles/Utils.module.scss";
import { Link } from "react-router-dom";
const CreateAccount = () => {
  return (
    <div className={styles["create-account"]}>
      <Link to="/register">
        <button>Create account</button>
      </Link>
      <Link to="/login">
        <a>
          <p>Already have an account </p>
          <p className={styles["neon"]}>Log In</p>
        </a>
      </Link>
    </div>
  );
};

export default CreateAccount;
