import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import styles from "../styles/Profile.module.scss";
import { UserContext } from "../UserContext";
import {
  getUserProfile,
  getUserPosts,
  getPostStatus,
  getProfileStatus,
  getUserAdmin,
  fetchUserProfile,
  fetchUserPosts,
  getTotalPages,
} from "../features/userPosts/userPostsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "../components/ProfileSection";
const Profile: React.FC = () => {
  // const context = useContext(UserContext);
  const [currPage, setCurrPage] = useState<number>(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileInfo = useSelector(getUserProfile);
  const profilePosts = useSelector(getUserPosts);
  const profileStatus = useSelector(getProfileStatus);
  const postStatus = useSelector(getPostStatus);
  const totalPages: number = useSelector(getTotalPages);
  const isAdmin: boolean = useSelector(getUserAdmin);
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, []);
  // -----------------------
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchUserPosts(id, 0));
    }
  }, [postStatus, dispatch]);
  // --------------fetch new page-------------------
  useEffect(() => {
    dispatch(fetchUserPosts({ id, currPage }));
  }, [currPage]);
  // -------------page pagination-------------------
  const totalPagesArray = Array.apply(null, Array(totalPages)).map(function (
    x,
    i
  ) {
    return i;
  });
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
    <div className={styles["profile-container"]}>
      <Header />
      <ProfileSection profile={profileInfo} isAdmin={isAdmin} />
      <div className={styles["pagination__container"]}>{pagesNav}</div>
    </div>
  );
};

export default Profile;
