import React, { useState } from "react";
import { Box, Card, Typography, Button, Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";

export default function ModalArea({ open, handleClose, currentArea }) {
  const { handleSubmit, control } = useForm();

  const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const onSubmit = (data) => {
    console.log(data);
  };

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
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography color="black" variant="h2">
          Create area
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginTop: "16px" }}>
            <CustomInput
              control={control}
              rules={{
                required: "Name required",
              }}
              styles={{ width: "400px" }}
              name="name"
              label="Name"
              userInfo={currentArea.name}
              inlineStyle={styleInput}
            />
          </Box>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
