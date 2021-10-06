import React from "react";
import { Box, Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export default function RowArea({
  area,
  setCurrentArea,
  handleOpen,
  handleOpenConfirm,
}) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#04BFFE" : "#308fe8",
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Typography color="black" variant="h3">
          {area.name}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BorderLinearProgress
          variant="determinate"
          value={50}
          sx={{ width: "60%", marginRight: "7%" }}
        />
        <Typography color="black" variant="h3">
          {area.usage}%
        </Typography>
      </Box>
      <Box sx={{ width: "20%", display: "flex", flexDirection: "row" }}>
        <img
          src="/img/edit.png"
          alt="edit"
          style={{ marginRight: "8%", cursor: "pointer" }}
          onClick={() => {
            handleOpen(true);
            setCurrentArea(area);
          }}
        />
        <img
          src="/img/delete.png"
          alt="edit"
          style={{ marginRight: "8%", cursor: "pointer" }}
          onClick={() => {
            handleOpenConfirm();
          }}
        />
        <img src="/img/info.png" alt="edit" style={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
}
