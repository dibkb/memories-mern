import React from "react";
import Logo from "../components/Logo";
import styles from "../styles/Register.module.scss";
const Register: React.FC = () => {
  return (
    <div className={styles["register__container"]}>
      <main className={styles["__main"]}>
        <section className={styles["__background"]}>
          <nav>
            <Logo />
          </nav>
          <main className={styles["__body"]}>
            <h1>Register with Us</h1>
            <p>
              Let’s take another look at how these three Frame settings in Auto
              Layout will affect your contents
            </p>
          </main>
        </section>
        <section className={styles["form"]}></section>
      </main>
    </div>
  );
};

export default Register;
