import React from "react";
import { Box, Modal, Grid, Radio, Typography } from "@material-ui/core";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styleInput = {
  border: "1px #A19FA8 solid",
  textAlign: "center",
  borderRadius: "4px",
  width: "50%",
};

export default function StoredOrderModal({
  storedOrder,
  open,
  handleClose,
  isView,
}) {
  const list = [
    {
      "Storage 2m2": "/img/storage2m2.png",
      "Storage 4m2": "/img/storage4m2.png",
      "Storage 8m2": "/img/storage8m2.png",
      "Storage 16m2": "/img/storage16m2.png",
    },
    {},
    {
      Bolo: "/img/bolobox.png",
      "Size S": "/img/boxSizeS.png",
      "Size M": "/img/boxSizeM.png",
      "Size L": "/img/boxSizeL.png",
      "Size XL": "/img/boxSizeXL.png",
    },
    {},
    {
      "Area 0.5m2": "/img/areaSize0.5m2.png",
      "Area 1m2": "/img/areaSize1m2.png",
      "Area 2m2": "/img/areaSize2m2.png",
      "Area 3m2": "/img/areaSize3m2.png",
    },
    {},
  ];

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const buildRadioSelect = () => {
    return storedOrder?.products?.map((e) => {
      let eventTemp = {
        target: {
          value: e.productId.toString(),
        },
      };

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "8%",
          }}
          key={e.productId}
        >
          <Radio
            value={e.productId}
            checked={selectedValue === e.productId.toString()}
            name="radio-buttons"
            onChange={handleChange}
            inputProps={{ "aria-label": "B" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              cursor: "pointer",
            }}
            onClick={() => handleChange(eventTemp)}
          >
            <img
              src={list[e.productType][e.productName]}
              alt={e.productName}
              width={80}
              height={80}
            />
            <Typography
              color="black"
              variant="h2"
              style={{
                marginTop: "2%",
                marginLeft: "2.5%",
              }}
            >
              {e.productName}
            </Typography>
            <input style={styleInput} value={e.amount} disabled></input>
          </Box>
        </Box>
      );
    });
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
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginBottom: "8%",
            }}
          >
            Total products in order (#13)
          </Typography>
          <Grid container spacing={2}>
            {buildRadioSelect(storedOrder.product)}
          </Grid>
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginBottom: "8%",
            }}
          >
            List products is placing
          </Typography>
          <Box
            sx={{
              flexDirection: "column",
              marginTop: "16px",
              height: "400px",
              border: "solid 1px #000",
              padding: "8px",
              overflowY: "auto",
            }}
          ></Box>
        </Box>
      </Box>
    </Modal>
  );
}
