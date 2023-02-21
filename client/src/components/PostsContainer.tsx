import React from "react";
// ------------styles-----------------
import styles from "../styles/Postcontainer.module.scss";
const PostsContainer: React.FC<PostsContainer> = ({ posts }) => {
  const content = posts.map((post: any) => {
    return (
      <div
        key={post._id}
        className={styles.post__container}
        style={{
          backgroundImage: `url(${post.selectedFile})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    );
  });
  return <div className={styles.container__styles}>{content}</div>;
};
interface PostsContainer {
  posts: any;
}
export default PostsContainer;
