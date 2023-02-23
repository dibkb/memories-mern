import { createPortal } from "react-dom";
import styles from "../styles/Notificationmodal.module.scss";
export const LoginModal = ({ setShowModal }) => {
  return createPortal(
    <div className={styles["modal__container"]}>modal</div>,
    document.body
  );
};
export const DeleteModal = ({ setShowModal, id }) => {
  const deletePostHandler = async () => {};
  return createPortal(
    <div className={styles["modal__container"]}>
      <div className={styles["content"]}>
        <h1>Delete Post</h1>
        <p className={styles["delete_warning"]}>
          Do you want to permanently remove this post.
        </p>
        <div className={styles["button__container"]}>
          <button className={styles["yes"]} onClick={deletePostHandler}>
            Yes
          </button>
          <button className={styles["no"]} onClick={() => setShowModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
