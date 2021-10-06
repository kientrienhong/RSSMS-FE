import React, { useState } from "react";
import { Box, Card, Typography, Button } from "@material-ui/core";
import RowArea from "./RowArea";
import ModalArea from "./ModalArea";
export default function AreaList({ listArea, setListArea }) {
  const mapListToview = (setCurrentArea, handleOpen) =>
    listArea.map((e) => {
      return (
        <RowArea
          area={e}
          key={e.key}
          setCurrentArea={setCurrentArea}
          handleOpen={handleOpen}
        />
      );
    });

  const addArea = async (name) => {
    let listAreaTemp = [...listArea];
  };

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentArea, setCurrentArea] = useState({});
  const handleOpen = (isEdit) => {
    setOpen(true);
    setIsEdit(isEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentArea({});
  };

  return (
    <Card
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "68vh",
        padding: "2%",
        alignItems: "center",
      }}
    >
      <ModalArea
        open={open}
        handleClose={handleClose}
        currentArea={currentArea}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography color="black" variant="h2">
          List area
        </Typography>
        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginBottom: "4%",
          }}
          color="primary"
          variant="contained"
          onClick={() => handleOpen(false)}
        >
          Create area
        </Button>
      </Box>
      {mapListToview(setCurrentArea, handleOpen)}
    </Card>
  );
}
