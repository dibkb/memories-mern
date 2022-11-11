import React from "react";
import Logo from "../components/Logo";
import styles from "../styles/Home.module.scss";
import { colors } from "../utils/colors";
const Home: React.FC = () => {
  return (
    <body className="container mx-auto">
      <Logo large={true} color={colors.neon} />
      <p className={styles["subtitle"]}>
        Create beautiful memories and share with the world
      </p>
      <button className={styles["btn"]}>Start here</button>
    </body>
  );
};

export default Home;
