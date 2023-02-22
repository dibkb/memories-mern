import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Header";
import styles from "../styles/Profile.module.scss";
import { UserContext } from "../UserContext";
import {
  getUserProfile,
  getUserPosts,
  getUserStatus,
  getUserAdmin,
  fetchUserProfile,
} from "../features/userPosts/userPostsSlice.js";
import { useDispatch } from "react-redux";
const Profile: React.FC = () => {
  const context = useContext(UserContext);
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, []);
  return (
    <div className={styles["profile-container"]}>
      <Header />
    </div>
  );
};

export default Profile;
