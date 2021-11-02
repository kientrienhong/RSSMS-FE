import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";

const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "100%",
  marginTop: "6% ",
  marginBottom: "4%",
};
const styleInput = { marginRight: "5%" };

export default function ProductModal({ open, handleClose, currentProduct }) {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {};

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...STYLE_MODAL, width: "60%" }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Box
            sx={{
              marginTop: "16px",
              height: "400px",
              width: "310px",
              position: "relative",
              border: "solid 1px #000",
            }}
          >
            <img
              src="/img/imageEdit.png"
              width="50px"
              height="50px"
              alt="imagee"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              marginTop: "1%",
              marginLeft: "2%",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              style={{ marginTop: "1%", marginBottom: "2%" }}
            >
              Product Information
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  ...styleBoxInput,
                  justifyContent: "flex-start",
                }}
              >
                <CustomInput
                  control={control}
                  rules={{ required: "Name is required" }}
                  styles={{ width: "400px" }}
                  name="name"
                  label="Name"
                  userInfo={currentProduct?.name}
                  inlineStyle={{ ...styleInput }}
                />
                <CustomInput
                  control={control}
                  rules={{ required: "Price is required" }}
                  styles={{ width: "240px" }}
                  name="price"
                  label="Price"
                  userInfo={currentProduct?.price}
                  inlineStyle={{ ...styleInput }}
                />
              </Box>
              <CustomAreaInput
                control={control}
                rules={{ required: "Description is required" }}
                styles={{ width: "400px" }}
                name="description"
                label="Description"
                userInfo={currentProduct?.price}
                inlineStyle={{ ...styleInput, marginTop: "4%" }}
              />
              <CustomAreaInput
                control={control}
                rules={{ required: "Tooltip is required" }}
                styles={{ width: "400px" }}
                name="tooltip"
                label="Tooltip"
                userInfo={currentProduct?.tooltip}
                inlineStyle={{ ...styleInput, marginTop: "4%" }}
              />
              <Box
                sx={{
                  width: "200px",
                  margin: "2% auto",
                  display: "flex",
                  marginTop: "6%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  onClick={() => handleClose()}
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
