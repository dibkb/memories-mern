import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Header";
import styles from "../styles/Profile.module.scss";
import { UserContext } from "../UserContext";
const Profile = () => {
  const context = useContext(UserContext);
  let { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        console.log(res.json());
      }
    });
  }, []);
  return (
    <div className={styles["profile-container"]}>
      <Header />
    </div>
  );
};

export default Profile;
