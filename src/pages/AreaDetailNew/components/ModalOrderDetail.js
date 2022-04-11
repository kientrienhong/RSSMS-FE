import React from "react";
import {Box, Typography, Card, Grid, Modal, Button} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import {ACCESSSORY_TYPE} from "../../../constant/constant";

const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

export default function ModalOrderDetail({
  currentOrderDetail,
  open,
  handleClose,
}) {
  const listAccessory = currentOrderDetail?.orderDetailServices?.filter(
    (e) => e.serviceType === ACCESSSORY_TYPE
  );

  const mapListAccessory = (listAccessory) => {
    return listAccessory?.map((e, index) => (
      <Grid item xs={3} key={index}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "2%",
          }}
        >
          <img
            width="100"
            height="100"
            src={e.serviceUrl}
            alt={e.serviceName}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
            }}
          >
            <Typography
              color="black"
              variant="h3"
              style={{
                marginTop: "2%",
                textAlign: "left",
                marginLeft: "2.5%",
              }}
            >
              {e.serviceName} x {e.amount}
            </Typography>
          </Box>
        </Card>
      </Grid>
    ));
  };

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
            <p
              style={{
                marginTop: "2%",
                textAlign: "left",
                marginLeft: "2.5%",
              }}
            >
              Mô tả: {e.note}
            </p>
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
          maxHeight: "80%",
          overflowY: "scroll",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "2%",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
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
          {currentOrderDetail?.images?.length === 0 ? (
            <p
              style={{
                display: "inline-block",
                margin: "1% auto",
              }}
            >
              (Trống)
            </p>
          ) : (
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
          )}
        </Grid>
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "1%",
            textAlign: "left",
            marginBottom: "2%",
          }}
        >
          Phụ kiện đi kèm
        </Typography>
        {listAccessory?.length === 0 ? (
          <p
            style={{
              display: "inline-block",
              margin: "1% auto",
            }}
          >
            (Trống)
          </p>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              width: "98%",
              marginBottom: "3%",
            }}
          >
            {mapListAccessory(listAccessory)}
          </Grid>
        )}

        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginRight: "16%",
          }}
          onClick={async () => {
            handleClose();
          }}
          color="error"
          variant="outlined"
          type="submit"
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
}
