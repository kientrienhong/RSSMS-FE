import React from "react";
import { Box, Typography, Card, Grid, Modal } from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";

const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

export default function ModalOrderDetail({
  currentOrderDetail,
  open,
  handleClose,
}) {
  console.log(currentOrderDetail);
  const mapListImage = (listImage) => {
    return listImage?.map((e, index) => (
      <Grid item xs={6} key={index}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img width="200" height="200" src={e.url} alt={e.name} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <Typography
              color="black"
              variant="h3"
              style={{
                marginTop: "2%",
                textAlign: "left",
                marginLeft: "2.5%",
              }}
            >
              Tên: {e.name}
            </Typography>
            <p>Mô tả: {e.note}</p>
          </Box>
        </Card>
      </Grid>
    ));
  };
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
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "2%",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
            marginBottom: "2%",
          }}
        >
          Hình ảnh
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            width: "98%",
            marginBottom: "3%",
          }}
        >
          {mapListImage(currentOrderDetail?.images)}
        </Grid>
      </Box>
    </Modal>
  );
}
