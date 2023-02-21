import React, { useContext, useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import CreateAccount from "../components/CreateAccount";
import Header from "../Header";
import styles from "../styles/Memories.module.scss";
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  getAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "../features/posts/postSlice.js";
import PostsContainer from "../components/PostsContainer";
const Memories: React.FC = () => {
  const context = useContext(UserContext);
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);
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
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts(1));
    }
  }, [status, dispatch]);
  return (
    <div className={styles["memories-container"]}>
      {context?.userInfo ? <Header user={context?.userInfo} /> : <Header />}
      <main className={styles["main"]}>
        {context?.userInfo ? <AddPost /> : <CreateAccount />}
      </main>
      <PostsContainer posts={posts} />
    </div>
  );
};

export default Memories;
function selectAllPosts(): (state: unknown) => unknown {
  throw new Error("Function not implemented.");
}
