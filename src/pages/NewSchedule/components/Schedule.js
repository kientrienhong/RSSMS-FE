import React from "react";
import { Grid, Box, Typography, Modal, Checkbox } from "@material-ui/core";

export default function Schedule({ schedule }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        boxShadow: 16,
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "150px",
        width: "225px",
        marginRight: "3%",
        padding: "1%",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <p style={{ display: "inline-block", margin: 0 }}>
          Order: #{schedule.id}
        </p>
        <p style={{ display: "inline-block", margin: "0 0 11% 0" }}>
          Sugard Storage
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "end !important",
        }}
      >
        <img src="/img/info.png" alt="info" height={24} width={24} />
        <Checkbox
          //   checked={checked}
          //   onChange={handleChange}
          color="primary"
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
    </Box>
  );
}
