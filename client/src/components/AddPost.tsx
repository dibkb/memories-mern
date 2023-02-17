import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import styles from "../styles/Utils.module.scss";
import { CreatePostModal } from "./CreatePostModal";
const AddPost: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <>
      <div className={styles["add-post"]} onClick={() => setShowModal(true)}>
        <p>Share something beautiful....</p>
        <CameraIcon className="h-6 w-6" />
      </div>
      {showModal && <CreatePostModal setShowModal={setShowModal} />}
    </>
  );
};

export default AddPost;
