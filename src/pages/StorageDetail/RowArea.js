import React from "react";
import { Box, Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
export default function RowArea({
  area,
  setCurrentArea,
  handleOpen,
  handleOpenConfirm,
  storageId,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
        marginBottom: "8px",
      }}
    >
      <Box sx={{ width: "80%", display: "flex", flexDirection: "column" }}>
        <Typography color="black" variant="h3">
          {area.name}
        </Typography>
        <p>{area.description}</p>
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
            setCurrentArea(area);
            handleOpenConfirm();
          }}
        />
        <img
          src="/img/info.png"
          alt="edit"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/app/storages/" + storageId + "/areas/" + area.id, {
              replace: false,
            });
          }}
        />
      </Box>
    </Box>
  );
}
