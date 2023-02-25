import React, { useContext, useEffect } from "react";
import styles from "../src/styles/Memories.module.scss";
import Logo from "./components/Logo";
import { colors } from "./utils/colors";
import { userInfo } from "./UserContext";
import ProfileInfo from "./components/ProfileInfo";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "./api/api";
const Header = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const fetchProfileInfo = () => {
    fetch(`${BASEURL}/users/profile`, {
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
  async function logoutHandler(e) {
    e.preventDefault();
    fetch(`${BASEURL}/users/logout`, {
      credentials: "include",
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        context?.setUserInfo(null);
        navigate("/memories");
      }
    });
  }
  return (
    <nav className={styles["nav"]}>
      <Link to="/memories">
        <Logo large={false} color={colors.logo} />
      </Link>
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
