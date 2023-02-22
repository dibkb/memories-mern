import React, { useContext } from "react";
import Header from "../Header";
import styles from "../styles/Profile.module.scss";
import { UserContext } from "../UserContext";
const Profile = () => {
  const context = useContext(UserContext);
  console.log(context);
  return (
    <div className={styles["memories-container"]}>
      {context?.userInfo ? <Header user={context?.userInfo} /> : <Header />}
    </div>
  );
};

export default Profile;
