import React, { useContext, useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import CreateAccount from "../components/CreateAccount";
import Header from "../Header";
import styles from "../styles/Memories.module.scss";
import { UserContext } from "../UserContext";
const Memories: React.FC = () => {
  const context = useContext(UserContext);
  useEffect(() => {
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
  }, []);
  return (
    <div className={styles["memories-container"]}>
      {context?.userInfo ? <Header user={context?.userInfo} /> : <Header />}
      <main className={styles["main"]}>
        {context?.userInfo ? <AddPost /> : <CreateAccount />}
      </main>
    </div>
  );
};

export default Memories;
