import React, { useContext, useEffect } from "react";
import styles from "../src/styles/Memories.module.scss";
import Logo from "./components/Logo";
import { colors } from "./utils/colors";
import { userInfo } from "./UserContext";
import ProfileInfo from "./components/ProfileInfo";
import { UserContext } from "./UserContext";
import { Link, redirect } from "react-router-dom";
const Header: React.FC<Header> = () => {
  const context = useContext(UserContext);
  const fetchProfileInfo = () => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          context?.setUserInfo({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
          });
        });
      }
    });
  };
  useEffect(() => {
    fetchProfileInfo();
  }, []);
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
        return redirect("/memories");
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
        {context.userInfo && (
          <>
            <Link to={`/profile/${context.userInfo._id}`}>
              <ProfileInfo
                name={context.userInfo?.firstName}
                image={context.userInfo?.image}
              />
            </Link>
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
