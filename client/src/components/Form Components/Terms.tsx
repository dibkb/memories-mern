import React from "react";
import styles from "../../styles/Form.module.scss";
import { TogleOff, TogleOn } from "../../utils/Icons";
export const Terms: React.FC<Terms> = ({ acceptTerms, handleAcceptTerms }) => {
  return (
    <div className={styles["terms"]}>
      <span
        className={styles["__switchContainer"]}
        onClick={() => {
          handleAcceptTerms((prev: boolean) => !prev);
        }}
      >
        {acceptTerms && <TogleOn />}
        {!acceptTerms && <TogleOff />}
      </span>
      <p className={styles[`__text-${acceptTerms}`]}>
        I accept the Terms of Service as well as Privacy Policy
      </p>
    </div>
  );
};

interface Terms {
  acceptTerms: boolean;
  handleAcceptTerms: (value: any) => void;
}
