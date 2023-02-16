import React, { useContext, useEffect } from "react";
import styles from "../src/styles/Memories.module.scss";
import Logo from "./components/Logo";
import { colors } from "./utils/colors";
import { UserContext, userInfo } from "./UserContext";
const Header: React.FC<Header> = ({ user }) => {
  return (
    <nav className={styles["nav"]}>
      <Logo large={false} color={colors.logo} />
    </nav>
  );
};
export default Header;
interface Header {
  user?: userInfo;
}
