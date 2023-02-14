import React from "react";
import styles from "../../styles/Form.module.scss";
export const TextInput: React.FC<TextInput> = ({
  placeholder,
  input,
  setInput,
}) => {
  const onChangeHandler = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  return (
    <span>
      <pre className={styles["__label"]}>{placeholder}</pre>
      <input type="text" value={input} onChange={onChangeHandler} />
    </span>
  );
};
interface TextInput {
  placeholder: string;
  input: string;
  setInput: (value: any) => void;
}
