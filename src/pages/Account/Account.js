import React from "react";
import { Box, Container, Grid, Card } from "@material-ui/core";
export default function Account() {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "cloumn",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Card>
    </Box>
  );
}
