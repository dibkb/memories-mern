import React from "react";
// ------------styles-----------------
import styles from "../styles/Postcontainer.module.scss";
import { colors } from "../utils/colors";
import { LikeOutline } from "../utils/Icons";
import { LikeCount } from "./LikeCount";
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
      >
        <div className={styles.creator__info}>
          <img
            src={post.creatorImage}
            alt=""
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `2px solid ${colors.neon}`,
            }}
          />
          <small
            style={{
              fontSize: "16px",
              color: colors.textSsecondary,
            }}
            className={styles["creator__name"]}
          >
            {post.creatorName}
          </small>
        </div>
        <small className={styles["post__title"]}>{post.title}</small>
        <p className={styles["description"]}>{post.message}</p>
        <LikeCount id={post._id} likes={post.likeCount} />
      </div>
    );
  });
  return <div className={styles.container__styles}>{content}</div>;
};
interface PostsContainer {
  posts: any;
}
export default PostsContainer;
