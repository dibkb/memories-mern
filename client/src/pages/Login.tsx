import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "../styles/Login.module.scss";
const Login: React.FC = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(true);
  return (
    <div className={styles["login__container"]}>
      <main className={styles["__main"]}>
        <section className={styles["__background"]}>
          <nav>
            <Logo />
          </nav>
          <main className={styles["__body"]}>
            <h1>Login</h1>
            <p>
              Let’s take another look at how these three Frame settings in Auto
              Layout will affect your contents
            </p>
          </main>
        </section>
        <section className={styles["__loginForm"]}>
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
          {/* Create button */}
          <button
            className={styles[`create__btn__${isValidated}`]}
            disabled={!isValidated}
          >
            LOG IN
          </button>
          {/* Already have an account? */}
          <Link to="/register" className="mx-auto">
            <a className={styles["__login"]}>
              <p>Dont have an account </p>
              <p className={styles["neon"]}>Sign Up</p>
            </a>
          </Link>
        </section>
      </main>
    </div>
  );
};
export default Login;
