import React from "react";
import { colors } from "../utils/colors";
const Skeleton: React.FC<Skeleton> = ({ items }) => {
  const skeleton = [...Array(items)].map((ele, index) => {
    return (
      <div
        key={index}
        style={{
          height: "300px",
          maxWidth: "600px",
          backgroundColor: colors.cardBackground,
          borderRadius: "9px",
        }}
      ></div>
    );
  });

  return (
    <div
      style={{
        display: "grid",
        gap: "1.4rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        margin: "2rem 0",
      }}
    >
      {skeleton}
    </div>
  );
};
interface Skeleton {
  items: number;
}
export default Skeleton;
