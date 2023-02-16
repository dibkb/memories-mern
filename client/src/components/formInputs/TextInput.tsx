import React from "react";
import styles from "../../styles/Form.module.scss";
import { WarningIcon } from "../../utils/Icons";
import { TextError } from "../Form Components/RegisterForm";
export const TextInput: React.FC<TextInput> = ({
  placeholder,
  input,
  setInput,
  error,
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  return (
    <span>
      <pre className={styles["__label"]}>{placeholder}</pre>
      <input
        type="text"
        value={input}
        className={error.error ? styles["input__true"] : styles["input__"]}
        onChange={onChangeHandler}
      />
      <span className={styles["warning__container"]}>
        {error.error && <WarningIcon />}
        <em className={styles["form__warning"]}>{error.message}</em>
      </span>
    </span>
  );
};
interface TextInput {
  placeholder: string;
  input: string;
  setInput: (value: any) => void;
  error: TextError;
}
