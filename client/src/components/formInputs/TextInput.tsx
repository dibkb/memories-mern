import React from "react";
import styles from "../../styles/Form.module.scss";
export const TextInput: React.FC<TextInput> = ({ placeholder }) => {
  return (
    <span>
      <pre className={styles["__label"]}>{placeholder}</pre>
      <input type="text" />
    </span>
  );
};
interface TextInput {
  placeholder: string;
}
