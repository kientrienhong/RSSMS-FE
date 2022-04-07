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
        height: "150px",
        marginBottom: "25%",
        borderRadius: "4px",
      }}
    >
      {time.name}
    </Box>
  );
}
