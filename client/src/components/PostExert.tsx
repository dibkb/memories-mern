import React, { useState } from "react";
import { colors } from "../utils/colors";
import { Pencil, Trash } from "../utils/Icons";
import { CreatePostModal } from "./CreatePostModal";
import { LikeCount } from "./LikeCount";
import { DeleteModal } from "./NotificationModal";
import styles from "../styles/Postcontainer.module.scss";
import { Link } from "react-router-dom";
const PostExert: React.FC<PostExert> = ({ post, isAdmin }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
        <Link to={`/profile/${post.creator}`} className={styles.creator__info}>
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
        </Link>
      )}
      {isAdmin && (
        <span className={styles["edit__Section"]}>
          <button
            className={styles["edit"]}
            onClick={() => setShowEditModal(true)}
          >
            <Pencil />
          </button>
          <button
            className={styles["trash"]}
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash />
          </button>
        </span>
      )}
      <small className={styles["post__title"]}>{post.title}</small>
      <p className={styles["description"]}>{post.message}</p>
      <LikeCount id={post._id} likes={post.likeCount} />
      {showDeleteModal && isAdmin && (
        <DeleteModal setShowModal={setShowDeleteModal} postId={post._id} />
      )}
      {showEditModal && isAdmin && (
        <CreatePostModal setShowModal={setShowEditModal} id={post._id} />
      )}
    </div>
  );
};

export default PostExert;
interface PostExert {
  post: any;
  isAdmin: any;
}
