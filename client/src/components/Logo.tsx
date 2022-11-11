import React from "react";
import styles from "../styles/Utils.module.scss";
const Logo: React.FC<LogoProp> = ({ large, color }) => {
  const fontSize = large ? "3rem" : "1rem";
  return (
    <main
      style={{ fontSize: fontSize, color: color }}
      className={styles["logo"]}
    >
      MEMORIES
    </main>
  );
};
export default Logo;
interface LogoProp {
  large?: boolean;
  color?: string;
}
