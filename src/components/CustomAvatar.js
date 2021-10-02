import React from "react";
import { Box, Avatar } from "@material-ui/core";
export default function CustomAvatar({ url, isEdit, onHandleClick }) {
  return (
    <Box
      sx={{ position: "relative", width: 84, height: 84 }}
      onClick={() => onHandleClick()}
    >
      <Avatar
        src={url}
        sx={{
          cursor: "pointer",
          width: 80,
          height: 80,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: "0",
          bottom: "0",
          height: "40px",
          width: "40px",
          borderRadius: "20px",
          backgroundColor: "white",
          boxShadow: 24,
        }}
      >
        <img
          src="/img/imageEdit.png"
          alt="imageEdit"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    </Box>
  );
}
