import React from "react";
import {Box} from "@material-ui/core";

export default function ItemSidebar({time}) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        boxShadow: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "180px",
        width: "200px",
        borderRadius: "4px",
        marginRight: "2%",
        fontSize: "20px",
      }}
    >
      {time}
    </Box>
  );
}
