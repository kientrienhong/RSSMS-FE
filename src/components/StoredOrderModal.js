import React from "react";
import { Box, Modal, Grid, Radio, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
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

function StoredOrderModal({
  storedOrder,
  open,
  handleClose,
  isView,
  currentBox,
  placeProductToShelf,
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

  const mapping = {
    1: "Storage 2m2",
    2: "Storage 4m2",
    3: "Storage 8m2",
    4: "Storage 16m2",
    11: "Bolo",
    12: "Size S",
    13: "Size M",
    14: "Size L",
    16: "Size XL",
    18: "Area 0.5m2",
    19: "Area 1m2",
    20: "Area 2m2",
    21: "Area 3m2",
  };

  const [selectedValue, setSelectedValue] = React.useState();
  const [error, setError] = React.useState();
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
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
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
                height: "345px",
                width: "100%",
                border: "solid 1px #000",
                padding: "8px",
                overflowY: "auto",
              }}
            ></Box>
          </Box>
        </Box>
        {isView === true ? null : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {error?.length > 0 ? (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : null}

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{
                  height: "45px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginRight: "16px",
                }}
                onClick={() => {
                  let idProductTemp = -1;
                  if (currentBox.shelfType === 0) {
                    if (currentBox?.boxSize === 0) {
                      idProductTemp = 12;
                    } else if (currentBox?.boxSize === 1) {
                      idProductTemp = 13;
                    } else if (currentBox?.boxSize === 2) {
                      idProductTemp = 14;
                    } else if (currentBox?.boxSize === 3) {
                      idProductTemp = 16;
                    }
                  } else {
                    if (currentBox?.boxSize === 0) {
                      idProductTemp = 18;
                    } else if (currentBox?.boxSize === 1) {
                      idProductTemp = 19;
                    } else if (currentBox?.boxSize === 2) {
                      idProductTemp = 20;
                    } else if (currentBox?.boxSize === 3) {
                      idProductTemp = 21;
                    }
                  }

                  let productTemp = storedOrder.products.find(
                    (e) => idProductTemp === e.productId
                  );

                  if (productTemp.amount <= 0) {
                    setError("There is no product to place");
                    return;
                  }

                  if (selectedValue.toString() === idProductTemp.toString()) {
                    placeProductToShelf({
                      idProduct: selectedValue,
                      nameProduct: mapping[selectedValue],
                    });
                    setError("");
                  } else {
                    setError("You must choose right product to place");
                  }
                }}
                color="primary"
                variant="contained"
              >
                Place
              </Button>
              <Button
                style={{
                  height: "45px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                onClick={() => {}}
                color="success"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openStoredOrderModal: (isView) =>
      dispatch(action.openStoredOrderModal(isView)),
    placeProductToShelf: (product) =>
      dispatch(action.placeProductToShelf(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoredOrderModal);
