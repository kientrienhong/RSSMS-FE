import React from "react";
import { Box } from "@material-ui/core";
export default function TagSelection({
  tag,
  currentTag,
  setCurrentTag,
  setIsCustomerDelivery,
}) {
  let colorText = "#A19FA8";
  let backgroundColor = "white";
  let border = "1px solid #A19FA8";
  if (currentTag.name === tag.name) {
    colorText = "white";
    backgroundColor = "#04BFFE";
    border = "none";
  }

  return (
    <Box
      sx={{
        borderRadius: "4px",
        border: border,
        padding: "8px 0px",
        color: colorText,
        backgroundColor: backgroundColor,
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setIsCustomerDelivery(false);
        setCurrentTag(tag);
      }}
    >
      {tag.name}
    </Box>
  );
}
