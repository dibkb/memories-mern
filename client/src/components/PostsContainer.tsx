import React from "react";
// ------------styles-----------------
import styles from "../styles/Postcontainer.module.scss";
import { colors } from "../utils/colors";
import { Pencil, Trash } from "../utils/Icons";
import { LikeCount } from "./LikeCount";
const PostsContainer: React.FC<PostsContainer> = ({ posts, isAdmin }) => {
  const editSection = (
    <span className={styles["edit__Section"]}>
      <button className={styles["edit"]}>
        <Pencil />
      </button>
      <button className={styles["trash"]}>
        <Trash />
      </button>
    </span>
  );
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
        {!isAdmin && (
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
                fontFamily: "Inter, sans-serif",
              }}
              className={styles["creator__name"]}
            >
              {post.creatorName}
            </small>
          </div>
        )}
        {isAdmin && editSection}
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
  isAdmin: boolean;
}
export default PostsContainer;
