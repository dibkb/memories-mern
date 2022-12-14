import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "../styles/Home.module.scss";
import { colors } from "../utils/colors";
const Home: React.FC = () => {
  return (
    <body className={styles["home-container"]}>
      <section className={styles["section"]}>
        <Logo large={true} color={colors.neon} />
        <p className={styles["subtitle"]}>
          Create beautiful memories and share with the world
        </p>
        <Link to="/memories">
          <button className={styles["button"]}>Start here</button>
        </Link>
      </section>
    </body>
  );
};
export default Home;
