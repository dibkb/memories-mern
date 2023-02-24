import { createPortal } from "react-dom";
import styles from "../styles/Notificationmodal.module.scss";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../api/api";
export const LoginModal: React.FC<LoginModal> = ({ setShowModal }) => {
  const navigate = useNavigate();
  const routeToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };
  return createPortal(
    <div className={styles["modal__container"]}>
      <div className={styles["content"]}>
        Account successfully created. You can now login.
        <button className={styles["no__block"]} onClick={routeToLogin}>
          Ok
        </button>
      </div>
    </div>,
    document.body
  );
};
export const ErrorModule: React.FC<ErrorModule> = ({ error, setShowModal }) => {
  return createPortal(
    <div className={styles["modal__container"]}>
      <div className={styles["content"]}>
        {error}
        <button
          className={styles["no__block"]}
          onClick={() => setShowModal(false)}
        >
          Ok
        </button>
      </div>
    </div>,
    document.body
  );
};
export const DeleteModal: React.FC<DeleteModal> = ({
  setShowModal,
  postId,
}) => {
  const deletePostHandler = (postId: string) => {
    fetch(`${BASEURL}/users/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setShowModal(false);
        window.location.reload();
      }
    });
  };
  return createPortal(
    <div className={styles["modal__container"]}>
      <div className={styles["content"]}>
        <h1>Delete Post</h1>
        <p className={styles["delete_warning"]}>
          Do you want to permanently remove this post.
        </p>
        <div className={styles["button__container"]}>
          <button
            className={styles["yes"]}
            onClick={() => deletePostHandler(postId)}
          >
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
interface LoginModal {
  setShowModal: any;
}
interface ErrorModule {
  error: any;
  setShowModal: any;
}
interface DeleteModal {
  postId: any;
  setShowModal: any;
}
