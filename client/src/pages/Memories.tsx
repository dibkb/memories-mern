import React, { useContext, useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import CreateAccount from "../components/CreateAccount";
import Header from "../Header";
import styles from "../styles/Memories.module.scss";
import { UserContext } from "../UserContext";
const Memories: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const context = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        context?.setUserInfo({
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        });
      });
      setLoggedIn(true);
    });
  }, []);
  return (
    <div className={styles["memories-container"]}>
      {loggedIn ? <Header user={context?.userInfo} /> : <Header />}
      <main className={styles["main"]}>
        {loggedIn ? <AddPost /> : <CreateAccount />}
      </main>
    </div>
  );
};

export default Memories;
