import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Postmodal.module.scss";
import Resizer from "react-image-file-resizer";
export const CreatePostModal: React.FC<CreatePostModal> = ({
  setShowModal,
}) => {
  const handleKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    if (e.target.scrollHeight < 250)
      e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [displayPicture, setDisplayPicture] = useState<string>("");
  const [diableButton, setDisableButton] = useState(true);
  const createPostHandler = async () => {
    setDisableButton(true);
    const response = await fetch("http://localhost:4000/posts", {
      method: "POST",
      body: JSON.stringify({ title, description, selectedFile: file }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      setShowModal(false);
      window.location.reload();
    }
    setDisableButton(false);
  };
  useEffect(() => {
    let blobURL: string;
    if (file)
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => (blobURL = URL.createObjectURL(blob)))
        .then((img) => setDisplayPicture(img));
  }, [file]);
  // ----------enable disable button-------------------
  useEffect(() => {
    if (title === "" || description === "" || file === null) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [title, description, file]);
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const onFileSelect = async (event: any) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setFile(image);
    } catch (err) {
      console.error(err);
    }
  };
  return createPortal(
    <div className={styles["modal__overlay"]}>
      <div className={styles["container"]}>
        <div className={styles["button__container"]}>
          <button
            disabled={diableButton}
            className={
              diableButton
                ? styles[`submit__${diableButton}`]
                : styles["submit"]
            }
            onClick={createPostHandler}
          >
            Create Post
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={styles["close"]}
          >
            Close
          </button>
        </div>
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
          <input type="file" name="file" onChange={onFileSelect} />
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
