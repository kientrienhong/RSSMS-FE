import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";

import {STYLE_MODAL} from "../../../constant/style";
import FormSelfStorage from "./FormSelfStorage";

const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
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
  isView,
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
            width: "100%",
          }}
        >
          <FormSelfStorage
            isEdit={isEdit}
            currentSpace={currentSpace}
            setCurrentSpace={setCurrentSpace}
            searchName={searchName}
            getData={getData}
            page={page}
            areaId={areaId}
            isView={isView}
            handleClose={handleClose}
          />
        </Box>
      </Box>
    </Modal>
  );
}
