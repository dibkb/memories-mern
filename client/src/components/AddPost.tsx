import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import styles from "../styles/Utils.module.scss";
const AddPost: React.FC = () => {
  return (
    <div className={styles["add-post"]}>
      <p>Share something beautiful....</p>
      <CameraIcon className="h-6 w-6" />
    </div>
  );
};

export default AddPost;
