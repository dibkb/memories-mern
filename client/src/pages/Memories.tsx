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
  getTotalPages,
} from "../features/posts/postSlice.js";
import PostsContainer from "../components/PostsContainer";
import Skeleton from "../components/Skeleton";
const Memories: React.FC = () => {
  const [currPage, setCurrPage] = useState<number>(0);
  const context = useContext(UserContext);
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const status = useSelector(getPostStatus);
  const totalPages: number = useSelector(getTotalPages);
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
      dispatch(fetchPosts(0));
    }
  }, [status, dispatch]);
  const totalPagesArray = Array.apply(null, Array(totalPages)).map(function (
    x,
    i
  ) {
    return i;
  });
  // --------------fetch new page-------------------
  useEffect(() => {
    dispatch(fetchPosts(currPage));
  }, [currPage]);
  const pagesNav = totalPagesArray.map((element) => {
    return (
      <button
        className={element === currPage ? styles["active"] : undefined}
        key={element}
        onClick={() => setCurrPage(element)}
      >
        {element + 1}
      </button>
    );
  });
  return (
    <div className={styles["memories-container"]}>
      <Header />
      <main className={styles["main"]}>
        {context?.userInfo ? <AddPost /> : <CreateAccount />}
      </main>
      {status === "loading" && <Skeleton items={6} />}
      {status === "successfull" && (
        <PostsContainer posts={posts} isAdmin={false} />
      )}
      {status === "successfull" && (
        <div className={styles["pagination__container"]}>{pagesNav}</div>
      )}
    </div>
  );
};

export default Memories;
