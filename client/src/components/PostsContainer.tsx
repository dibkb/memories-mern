import React, { useState } from "react";
// ------------styles-----------------
import styles from "../styles/Postcontainer.module.scss";
import PostExert from "./PostExert";
const PostsContainer: React.FC<PostsContainer> = ({ posts, isAdmin }) => {
  const content = posts.map((post: any) => {
    return <PostExert post={post} isAdmin={isAdmin} key={post._id} />;
  });
  return <div className={styles.container__styles}>{content}</div>;
};
interface PostsContainer {
  posts: any;
  isAdmin: boolean;
}
export default PostsContainer;
