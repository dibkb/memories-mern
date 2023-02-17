import React, { ReactComponentElement } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Postmodal.module.scss";
export const CreatePostModal: React.FC<CreatePostModal> = ({
  setShowModal,
}) => {
  const handleKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return createPortal(
    <div className={styles["modal__overlay"]}>
      <div className={styles["container"]}>
        <button
          onClick={() => setShowModal(false)}
          className={styles["button"]}
        >
          Close
        </button>
        <input type="text" placeholder="Title" className={styles["title"]} />
        <textarea
          placeholder="Description..."
          rows={4}
          cols={50}
          className={styles["textarea"]}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </div>,
    document.body
  );
};
interface CreatePostModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
