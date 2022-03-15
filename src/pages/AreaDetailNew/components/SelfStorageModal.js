import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";

import { STYLE_MODAL } from "../../../constant/style";
import FormSelfStorage from "./FormSelfStorage";

const styleModal = {
  ...STYLE_MODAL,
  width: "70%",
};
export default function SelfStorageModal({
  currentSpace,
  setCurrentSpace,
  handleClose,
  open,
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
            currentSpace={currentSpace}
            setCurrentSpace={setCurrentSpace}
            getData={getData}
            page={page}
            areaId={areaId}
            searchName={searchName}
            handleClose={handleClose}
          />
        </Box>
      </Box>
    </Modal>
  );
}
