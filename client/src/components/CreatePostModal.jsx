import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Postmodal.module.scss";
import Resizer from "../api/Resizer";
import { BASEURL } from "../api/api";
export const CreatePostModal = ({ setShowModal, id }) => {
  const [title, setTitle] = useState < string > "";
  const [description, setDescription] = useState < string > "";
  const [file, setFile] = useState < any > null;
  const [diableButton, setDisableButton] = useState < boolean > true;
  useEffect(() => {
    if (id) {
      fetch(`${BASEURL}/posts/${id}`, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          const { title, message, selectedFile } = json;
          setTitle(title);
          setDescription(message);
          setFile(selectedFile);
        });
    }
  }, [id]);
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    if (e.target.scrollHeight < 250)
      e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const createPostHandler = async () => {
    setDisableButton(true);
    if (id) {
      const response = await fetch(`${BASEURL}/posts/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ title, description, selectedFile: file }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        setShowModal(false);
        window.location.reload();
      }
    } else {
      const response = await fetch(`${BASEURL}/posts`, {
        method: "POST",
        body: JSON.stringify({ title, description, selectedFile: file }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setShowModal(false);
        window.location.reload();
      }
    }

    setDisableButton(false);
  };
  // ---------------enable disable button-------------------
  useEffect(() => {
    if (title === "" || description === "" || file === null) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [title, description, file]);
  const resizeFile = (file) =>
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
  const onFileSelect = async (event) => {
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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className={styles["file__input"]}>
          <input type="file" name="file" onChange={onFileSelect} />
        </div>
        <img src={file} className={styles["image__preview"]} />
      </div>
    </div>,
    document.body
  );
};
