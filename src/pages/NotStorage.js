import React from "react";
import { Box, Typography } from "@material-ui/core";
export default function NotStorage() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 3,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        color="black"
        variant="h2"
        style={{
          marginTop: "2%",
          textAlign: "left",
          marginLeft: "2.5%",
        }}
      >
        You have not been assigned yet!
      </Typography>
    </Box>
  );
}
