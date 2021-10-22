import React from "react";
import { Box, Typography, Modal } from "@material-ui/core";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function DetailBoxModal({ open, handleClose }) {
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
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h3">
          Detail Order
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4%",
            width: "100%",
          }}
        >
          <Typography color="black" variant="h3">
            Order id:
          </Typography>
          <Typography color="black" variant="h3">
            #32
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Time remaining:
          </Typography>
          <p>4 years 3 weeks 3 days</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer name
          </Typography>
          <p>Hong Kien Trien</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer phone
          </Typography>
          <p>0777457504</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer address
          </Typography>
          <p style={{ textAlign: "right" }}>12 Gia phu, phuong 13, quan 5</p>
        </Box>
      </Box>
    </Modal>
  );
}
