import React, {useEffect, useState} from "react";
import {
  Box,
  Modal,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import FormSpace from "./FormSpace";
import {STYLE_MODAL} from "../../../constant/style";
const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

export default function ModalSpace({
  currentSpace,
  open,
  handleClose,
  isEdit,
  areaId,
  setCurrentSpace,
  page,
  getData,
  searchName,
  isView,
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
          flexDirection: "column",
        }}
      >
        <FormSpace
          isEdit={isEdit}
          currentSpace={currentSpace}
          setCurrentSpace={setCurrentSpace}
          getData={getData}
          page={page}
          areaId={areaId}
          searchName={searchName}
          handleClose={handleClose}
          isView={isView}
        />
      </Box>
    </Modal>
  );
}
