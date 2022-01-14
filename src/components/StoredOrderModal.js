import React from "react";
import { Box, Modal, Grid, Radio, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import { placeBoxes } from "../apis/Apis";
import { useNavigate } from "react-router";
import { STYLE_MODAL } from "../constant/style";
const styleModal = STYLE_MODAL;

const styleInput = {
  border: "1px #A19FA8 solid",
  textAlign: "center",
  borderRadius: "4px",
  width: "50%",
};

const style = {
  marginLeft: "16px",
  cursor: "pointer",
};

function StoredOrderModal({
  storedOrder,
  open,
  handleClose,
  isView,
  currentBox,
  placeProductToShelf,
  placingProducts,
  removePlacedProduct,
  showLoading,
  hideLoading,
  showSnackbar,
  emptyPlacedProduct,
  changeIsLoadShelf,
  changeIsLoadStorage,
  userState,
  cancelStoreOrder,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const buildRadioSelect = () => {
    return storedOrder?.products?.map((e) => {
      let eventTemp = {
        target: {
          value: e.id.toString(),
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
          key={e.id}
        >
          <Radio
            value={e.id}
            checked={selectedValue === e.id.toString()}
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
              src={e?.images[0]?.url}
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

  const buildListPlacingProduct = () => {
    return placingProducts?.boxes.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        key={e.nameProduct}
      >
        <Box sx={{ width: "30%" }}>
          <p>{e.nameProduct}</p>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Typography
            sx={{
              cursor: "pointer !important",
              color: "blue !important",
            }}
            onClick={() => {
              navigate(`storages/${e.storageId}/areas/${e.areaId}`, {
                replace: true,
              });
            }}
          >
            {e.shelfName} / {e.nameBox}
          </Typography>
        </Box>
        <Box sx={{ width: "10%" }}>
          <img
            src="/img/minus.png"
            alt="minus"
            width="20px"
            height="20px"
            style={style}
            onClick={() => {
              removePlacedProduct(e);
              showSnackbar("success", "Remove product success");
            }}
          />
        </Box>
      </Box>
    ));
  };

  const onHandleSubmit = async () => {
    storedOrder.products.forEach((e) => {
      if (e.amount > 0) {
        setError("You must place all product in order");
        return;
      }
    });
    try {
      showLoading();
      await placeBoxes(placingProducts, userState.idToken);
      showSnackbar("success", "Save placing success");
      emptyPlacedProduct();
      handleClose();
      changeIsLoadShelf();
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const handlePlaceBox = () => {
    console.log(currentBox);

    if (selectedValue === "") {
      setError("Please choose product to place");
      return;
    }

    // if (selectedValue.toString() === )
    console.log(storedOrder?.products);
    console.log(selectedValue);
    let foundOrderDetail = storedOrder?.products?.find(
      (e) => e.id.toString() === selectedValue
    );
    if (
      foundOrderDetail.productId.toString() === currentBox.productId.toString()
    ) {
      if (foundOrderDetail?.amount === 0) {
        setError("There is no product to place");
        return;
      }
      placeProductToShelf({
        idOrderDetail: foundOrderDetail.id,
        idProduct: foundOrderDetail.productId,
        nameProduct: foundOrderDetail.productName,
      });
      setError("");
      showSnackbar("success", "Place product success");
      handleClose();
    } else {
      setError("You must choose right product to place");
    }
  };

  const onHandlePlace = () => {
    handlePlaceBox();
  };

  let widthModal = storedOrder.orderId === -1 ? "40%" : "80%";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {storedOrder.orderId === -1 ? (
        <Box
          sx={{
            ...styleModal,
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
            width: widthModal,
          }}
        >
          <Typography color="black" variant="h2">
            Do not have any orders to place
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            ...styleModal,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              width: "100%",
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
                Total products in order
              </Typography>
              <Grid container spacing={2}>
                {buildRadioSelect(storedOrder?.product)}
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
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "16px",
                  borderRadius: "4px",
                  height: "345px",
                  width: "100%",
                  border: "solid 1px #000",
                  padding: "8px",
                  overflowY: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ width: "30%" }}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Name Product
                    </Typography>
                  </Box>
                  <Box sx={{ width: "60%" }}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Position
                    </Typography>
                  </Box>
                  <Box sx={{ width: "10%" }}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Action
                    </Typography>
                  </Box>
                </Box>
                {buildListPlacingProduct()}
              </Box>
            </Box>
          </Box>
          {isView === true ? null : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginTop: "16px",
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
                  onClick={() => onHandlePlace()}
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
                    marginRight: "16px",
                  }}
                  onClick={() => onHandleSubmit()}
                  color="success"
                  variant="contained"
                >
                  Submit
                </Button>
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  onClick={() => cancelStoreOrder()}
                  color="error"
                  variant="outlined"
                >
                  Cancel storing order
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
  placingProducts: state.order.placingProducts,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    placeProductToShelf: (product) =>
      dispatch(action.placeProductToShelf(product)),
    removePlacedProduct: (product) =>
      dispatch(action.removePlacedProduct(product)),
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    emptyPlacedProduct: () => dispatch(action.emptyPlacedProduct()),
    changeIsLoadShelf: () => dispatch(action.changeIsLoadShelf()),
    removeStorage: () => dispatch(action.removeStorage()),
    cancelStoreOrder: () => dispatch(action.cancelStoreOrder()),
    changeIsLoadStorage: () => dispatch(action.changeIsLoadStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoredOrderModal);
