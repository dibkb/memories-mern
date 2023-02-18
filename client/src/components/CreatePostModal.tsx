import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Postmodal.module.scss";
import FileBase64 from "react-file-base64";
export const CreatePostModal: React.FC<CreatePostModal> = ({
  setShowModal,
}) => {
  const handleKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [displayPicture, setDisplayPicture] = useState<string>("");
  const fileSelectorHandler = (base64: any) => {
    setFile(base64);
  };
  useEffect(() => {
    let blobURL: string;
    if (file)
      fetch(file.base64)
        .then((res) => res.blob())
        .then((blob) => (blobURL = URL.createObjectURL(blob)))
        .then((img) => setDisplayPicture(img));

    return () => URL.revokeObjectURL(blobURL);
  }, [file]);
  return createPortal(
    <div className={styles["modal__overlay"]}>
      <div className={styles["container"]}>
        <button
          onClick={() => setShowModal(false)}
          className={styles["button"]}
        >
          Close
        </button>
        <input
          type="text"
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
          className={styles["title"]}
        />
        <textarea
          placeholder="Description..."
          rows={4}
          cols={50}
          className={styles["textarea"]}
          onKeyDown={handleKeyDown}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        ></textarea>
        <div className={styles["file__input"]}>
          <FileBase64
            id="fileInput"
            multiple={false}
            onDone={fileSelectorHandler}
          />
        </div>
        <img src={displayPicture} className={styles["image__preview"]} />
      </div>
    </div>,
    document.body
  );
};
interface CreatePostModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
