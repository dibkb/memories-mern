import React, { useContext, useEffect } from "react";
import styles from "../src/styles/Memories.module.scss";
import Logo from "./components/Logo";
import { colors } from "./utils/colors";
import { UserContext, userInfo } from "./UserContext";
import ProfileInfo from "./components/ProfileInfo";
const Header: React.FC<Header> = ({ user }) => {
  return (
    <nav className={styles["nav"]}>
      <Logo large={false} color={colors.logo} />
      <span
        style={{
          display: "flex",
          columnGap: "2rem",
        }}
      >
        <ProfileInfo name={user?.firstName} image={user?.image} />
        <button className={styles["logout__btn"]}>Logout</button>
      </span>
    </nav>
  );
};
export default Header;
interface Header {
  user?: userInfo;
}
