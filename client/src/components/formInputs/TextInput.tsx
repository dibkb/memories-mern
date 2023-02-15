import React from "react";
import styles from "../../styles/Form.module.scss";
import { colors } from "../../utils/colors";
import { WarningIcon } from "../../utils/Icons";
import { TextError } from "../Form Components/RegisterForm";
const inputStyles: React.CSSProperties = {
  outline: "none",
  background: "transparent",
  border: `1.5px solid ${colors.formBorder}`,
  marginTop: "0.75rem",
  padding: "0.75rem 1rem",
  width: "100%",
};
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
        className={styles[`input__${error.error}`]}
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
