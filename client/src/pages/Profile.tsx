import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
} from "../features/userPosts/userPostsSlice.js";
import { useDispatch, useSelector } from "react-redux";
const Profile: React.FC = () => {
  // const context = useContext(UserContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileInfo = useSelector(getUserProfile);
  const profilePosts = useSelector(getUserPosts);
  const profileStatus = useSelector(getProfileStatus);
  const postStatus = useSelector(getPostStatus);
  const isAdmin = useSelector(getUserAdmin);
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, []);
  console.log(profileInfo);
  return (
    <div className={styles["profile-container"]}>
      <Header />
    </div>
  );
};

export default Profile;
