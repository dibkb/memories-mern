import React from "react";
import { colors } from "../utils/colors";
const ProfileInfo: React.FC<ProfileInfo> = ({ name, image }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: "1rem",
        cursor: "pointer",
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: `2px solid ${colors.neon}`,
        }}
      />
      <small
        style={{
          fontSize: "16px",
          color: colors.textSsecondary,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {name}
      </small>
    </div>
  );
};

export default ProfileInfo;
interface ProfileInfo {
  name: string | undefined;
  image: string | undefined;
}
