import React from "react";
import styles from "../styles/Utils.module.scss";
const CreateAccount: React.FC = () => {
  return (
    <div className={styles["create-account"]}>
      <button>Create account</button>
      <pre>
        <p>Already have an account </p>
        <p className={styles["neon"]}>Log In</p>
      </pre>
    </div>
  );
};

export default CreateAccount;
