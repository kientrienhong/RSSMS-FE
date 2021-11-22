import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";
import Shelf from "./Shelf";

import { STYLE_MODAL } from "../../../constant/style";
import FormSelfStorage from "./FormSelfStorage";

const styleModal = {
  ...STYLE_MODAL,
  width: "70%",
};
export default function SelfStorageModal({
  currentShelf,
  isModifyShelf,
  setCurrentShelf,
  handleClose,
  open,
  listSelfStorage,
  isEdit,
  areaId,
  page,
  getData,
  searchName,
}) {
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
          <Shelf
            shelf={currentShelf}
            index={2}
            isModifyShelf={isModifyShelf}
            setCurrentShelf={setCurrentShelf}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <FormSelfStorage
            isEdit={isEdit}
            currentShelf={currentShelf}
            setCurrentShelf={setCurrentShelf}
            getData={getData}
            page={page}
            areaId={areaId}
            searchName={searchName}
            handleClose={handleClose}
            listSelfStorage={listSelfStorage}
          />
        </Box>
      </Box>
    </Modal>
  );
}
