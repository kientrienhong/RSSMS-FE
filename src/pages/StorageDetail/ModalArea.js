import React from "react";
import { Box, Typography, Button, Modal } from "@material-ui/core";
import CustomInput from "../../components/CustomInput";
import CustomAreaInput from "../../components/CustomAreaInput";
import { STYLE_MODAL } from "../../constant/style";
export default function ModalArea({
  open,
  handleClose,
  currentArea,
  handleSubmit,
  control,
  onSubmit,
}) {
  const styleInput = { marginRight: "2.5%" };

  const styleModal = {
    ...STYLE_MODAL,
    width: "auto",
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
              inlineStyle={{ ...styleInput, marginBottom: "4%" }}
            />
            <CustomAreaInput
              control={control}
              rules={{
                required: "Description required",
              }}
              styles={{ width: "400px" }}
              name="description"
              label="Description"
              userInfo={currentArea.description}
              inlineStyle={styleInput}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
