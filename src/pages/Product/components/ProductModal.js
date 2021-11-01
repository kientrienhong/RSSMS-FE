import React from "react";
import { Box, Modal } from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";
import { useForm } from "react-hook-form";

export default function ProductModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={STYLE_MODAL}></Box>
    </Modal>
  );
}
