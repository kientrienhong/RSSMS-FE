import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";
import AreaUsage from "./AreaUsage";
import ListOrderDetail from "./ListOrderDetail";
const styleModal = {
  ...STYLE_MODAL,
  width: "90%",
};
export default function ModalDetailFloor({ open, handleClose, currentFloor }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{}}
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <AreaUsage value={currentFloor?.usage} />
        <ListOrderDetail
          listOrderDetail={[{}, {}, {}]}
          page={1}
          totalOrderDetail={3}
        />
      </Box>
    </Modal>
  );
}
