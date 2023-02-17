import React, { useContext } from "react";
import styles from "../src/styles/Memories.module.scss";
import Logo from "./components/Logo";
import { colors } from "./utils/colors";
import { userInfo } from "./UserContext";
import ProfileInfo from "./components/ProfileInfo";
import { UserContext } from "./UserContext";
const Header: React.FC<Header> = ({ user }) => {
  const context = useContext(UserContext);
  async function logoutHandler(
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    fetch("http://localhost:4000/users/logout", {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        context?.setUserInfo(null);
      }
    });
  }
  return (
    <nav className={styles["nav"]}>
      <Logo large={false} color={colors.logo} />
      <span
        style={{
          display: "flex",
          columnGap: "2rem",
        }}
      >
        {user && (
          <>
            <ProfileInfo name={user?.firstName} image={user?.image} />
            <button className={styles["logout__btn"]} onClick={logoutHandler}>
              Log out
            </button>
          </>
        )}
      </span>
    </nav>
  );
};
export default Header;
interface Header {
  user?: userInfo;
}
