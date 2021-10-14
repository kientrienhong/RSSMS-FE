import React, { useState } from "react";
import {
  Box,
  Modal,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Shelf from "./Shelf";
import FormHandy from "./FormHandy";
import FormUnwieldy from "./FormUnwieldy";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function SheflModal({
  currentShelf,
  open,
  handleClose,
  isEdit,
  areaId,
  setCurrentShelf,
  page,
  getData,
  searchName,
  isHandy,
  setIsHandy,
}) {
  const handleChangeRadioButton = (event) => {
    if (event.target.value === "0") {
      setIsHandy(true);
      setCurrentShelf({
        ...currentShelf,
        type: 0,
        boxesInHeight: 0,
        boxesInWidth: 0,
        boxes: [],
      });
    } else {
      setIsHandy(false);
      setCurrentShelf({
        ...currentShelf,
        type: 1,
        boxesInHeight: 1,
        boxesInWidth: 1,
        boxes: [{}],
      });
    }
  };

  if (currentShelf.type === undefined) {
    setCurrentShelf({
      type: 0,
    });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "60%", height: "auto" }}>
          <Shelf shelf={currentShelf} index={2} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={currentShelf.type}
              onChange={handleChangeRadioButton}
            >
              <FormControlLabel value={0} control={<Radio />} label="Handy" />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Unwieldy"
              />
            </RadioGroup>
          </FormControl>
          {isHandy === true ? (
            <FormHandy
              isEdit={isEdit}
              currentShelf={currentShelf}
              setCurrentShelf={setCurrentShelf}
              getData={getData}
              page={page}
              areaId={areaId}
              searchName={searchName}
              handleClose={handleClose}
            />
          ) : (
            <FormUnwieldy
              isEdit={isEdit}
              currentShelf={currentShelf}
              setCurrentShelf={setCurrentShelf}
              getData={getData}
              page={page}
              areaId={areaId}
              searchName={searchName}
              handleClose={handleClose}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}
