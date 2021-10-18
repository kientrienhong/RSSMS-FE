import React from "react";
import { Box, Card, Typography } from "@material-ui/core";

export default function DetailBox() {
  return (
    <Card
      sx={{
        width: "100%",
        height: "50%",
        marginLeft: "1%",
        marginTop: "8%",
        display: "flex",
        flexDirection: "column",
        marginRight: "3%",
        alignItems: "center",
        justifyAligns: "space-between",
        padding: "2%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "4%",
          height: "auto",
        }}
      >
        <Typography color="black" variant="h3">
          Order id:
        </Typography>
        <Typography color="black" variant="h3">
          #32
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Typography color="black" variant="h3">
          Time remaining:
        </Typography>
        <p>4 years 3 weeks 3 days</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Typography color="black" variant="h3">
          Customer name
        </Typography>
        <p>Hong Kien Trien</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Typography color="black" variant="h3">
          Customer phone
        </Typography>
        <p>0777457504</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Typography color="black" variant="h3">
          Customer address
        </Typography>
        <p style={{ textAlign: "right" }}>12 Gia phu, phuong 13, quan 5</p>
      </Box>
    </Card>
  );
}
