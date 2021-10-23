import React from "react";
import { Box, Typography } from "@material-ui/core";

const buttonBox = {
  borderRadius: "4px",
  backgroundColor: "white",
  width: "45px",
  height: "45px",
  position: "relative",
  marginLeft: "2%",
  border: "1px solid #A19FA8",
};

const imgStyle = {
  width: "24px",
  height: "24px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const quantityStyle = {
  width: "16px",
  height: "16px",
  borderRadius: "8px",
  backgroundColor: "#CE0200",
  color: "white",
  fontSize: "10px",
  fontWeight: "bold",
  fontColor: "8px",
  position: "absolute",
  top: "25%",
  right: "5%",
  transform: "translate(-50%, -50%)",
};

const textStyle = {
  display: "inline-block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  marign: "0",
  padding: "0",
};

export default function ProductButton({ imgUrl, quantity }) {
  return (
    <Box sx={buttonBox}>
      <img src={imgUrl} alt="product" style={imgStyle} />
      {quantity > 0 ? (
        <div style={quantityStyle}>
          <div style={textStyle}>{quantity}</div>
        </div>
      ) : null}
    </Box>
  );
}
