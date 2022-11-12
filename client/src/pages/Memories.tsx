import React from "react";
import AddPost from "../components/AddPost";
import CreateAccount from "../components/CreateAccount";
import Logo from "../components/Logo";
import styles from "../styles/Memories.module.scss";
import { colors } from "../utils/colors";
const Memories: React.FC = () => {
  return (
    <body className={styles["memories-container"]}>
      <nav className={styles["nav"]}>
        <Logo large={false} color={colors.logo} />
      </nav>
      <main className={styles["main"]}>
        <CreateAccount />
        {/* <AddPost /> */}
      </main>
    </body>
  );
};

export default Memories;
