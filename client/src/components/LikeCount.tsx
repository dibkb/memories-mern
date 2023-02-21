import React, { useState } from "react";
import { LikeOutline, LikeSolid } from "../utils/Icons";
import styles from "../styles/Postcontainer.module.scss";
import axios from "axios";

export const LikeCount = ({ id, likes }) => {
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [clicked, setClicked] = useState<boolean>(false);
  const likeCountHandler = async () => {
    setClicked(true);
    setLikeCount((cur) => cur + 1);
    axios.patch(`http://localhost:4000/posts/${id}/likePost`);
  };
  return (
    <span className={styles["like__count"]} onClick={likeCountHandler}>
      {clicked ? <LikeSolid /> : <LikeOutline />}
      {likeCount}
    </span>
  );
};
