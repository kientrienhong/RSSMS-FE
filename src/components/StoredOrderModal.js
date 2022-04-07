import React from "react";
import {Box, Modal, Grid, Radio, Typography, Button} from "@material-ui/core";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import {placeBoxes, moveOrderDetail} from "../apis/Apis";
import {useNavigate} from "react-router";
import {STYLE_MODAL} from "../constant/style";
import {TYPE_SHELF} from "../constant/constant";

import StoredOrderItem from "./StoredOrderItem";
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
  currentFloor,
  isMoveOrderDetail,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState({
    placing: "",
    submit: "",
  });
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const buildRadioSelect = () => {
    return storedOrder?.products?.map((e, index) => {
      return (
        <StoredOrderItem
          expanded={expanded}
          id={index}
          handleChangeRadio={handleChangeRadio}
          selectedValue={selectedValue}
          storedOrder={e}
          handleChange={handleChange}
        />
      );
    });
  };

  const buildListPlacingProduct = () => {
    return placingProducts?.floors?.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        key={e.nameProduct}
      >
        <Box sx={{width: "30%"}}>
          <p>{e.nameProduct}</p>
        </Box>
        <Box sx={{width: "60%"}}>
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
            {e.areaName} / {e.shelfName} / {e.floorName}
          </Typography>
        </Box>
        <Box sx={{width: "10%"}}>
          <img
            src="/img/minus.png"
            alt="minus"
            width="20px"
            height="20px"
            style={style}
            onClick={() => {
              removePlacedProduct(e);
              showSnackbar("success", "Gỡ hàng hóa thành công");
            }}
          />
        </Box>
      </Box>
    ));
  };

  const onHandleSubmit = async () => {
    if (storedOrder.totalQuantity > 0) {
      setError({...error, submit: "Vui lòng đặt hết hàng hóa lên kệ"});
      return;
    }

    try {
      showLoading();
      if (isMoveOrderDetail) {
        let requestDate = placingProducts?.floors?.map((e) => {
          return {
            orderDetailId: e.idOrderDetail,
            floorId: e.floorId,
            oldFloorId: e.oldFloorId.id,
            serviceType: e.serviceType,
          };
        });
        let response = await moveOrderDetail(requestDate, userState.idToken);
      } else {
        await placeBoxes(placingProducts, userState.idToken);
      }
      setError({
        placing: "",
        submits: "",
      });
      showSnackbar("success", "Thao tác thành công");
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
    if (selectedValue === "") {
      setError({...error, placing: "Vui lòng chọn hàng hóa đặt vào kệ"});
      return;
    }

    let foundOrderDetail = storedOrder?.products?.find(
      (e) => e.id == selectedValue
    );

    if (foundOrderDetail.isPlaced) {
      setError("Hàng hóa này đã được đạt trên kệ");
      return;
    }
    if (
      !(
        foundOrderDetail.serviceType === 0 &&
        currentFloor.typeShelf === TYPE_SHELF["Self-storage"]
      ) &&
      !(
        (foundOrderDetail.serviceType === 3 ||
          foundOrderDetail.serviceType === 2) &&
        currentFloor.typeShelf === TYPE_SHELF["Door-To-Door"]
      )
    ) {
      setError({
        ...error,
        placing: "Vui lòng đặt hàng hóa phù hợp với loại không gian",
      });
      return;
    }

    const availableSpace =
      currentFloor.width *
      currentFloor.height *
      currentFloor.length *
      (100 - currentFloor.usage);

    const placingArea =
      foundOrderDetail.width *
      foundOrderDetail.height *
      foundOrderDetail.length;

    if (
      placingArea <= availableSpace &&
      foundOrderDetail.length <= currentFloor.length &&
      foundOrderDetail.width <= currentFloor.width &&
      foundOrderDetail.height <= currentFloor.height
    ) {
      placeProductToShelf({
        idOrderDetail: foundOrderDetail.id,
        nameProduct: foundOrderDetail.serviceName,
        infoProduct: foundOrderDetail,
        orderDetail: foundOrderDetail,
      });
      setError({
        placing: "",
        submits: "",
      });
      showSnackbar("success", "Đặt hàng lên kệ thành công");
    } else {
      setError({
        ...error,
        placing: "Kích thước không phù hợp hoặc không còn chỗ",
      });
      return;
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
            Bạn chưa có đơn nào để lưu kho
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            ...styleModal,
            maxHeight: "70%",
            overflowY: "scroll",
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
                marginRight: "3%",
                height: "80%",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  height: "80%",
                  width: "100%",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  color="black"
                  variant="h2"
                  style={{
                    marginBottom: "8%",
                  }}
                >
                  Tất cả các sản phẩm trong đơn
                </Typography>
                <Box
                  sx={{
                    height: "346px",
                  }}
                >
                  <Grid container spacing={2}>
                    {buildRadioSelect(storedOrder?.product)}
                  </Grid>
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
                    justifyContent: "center",
                  }}
                >
                  {error?.placing?.length > 0 ? (
                    <p style={{color: "red", textAlign: "center"}}>
                      {error?.placing}
                    </p>
                  ) : null}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "16px",
                      justifyContent: "center",
                    }}
                  >
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
                      Đặt vào
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
                      Đóng
                    </Button>
                  </Box>
                </Box>
              )}
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
                Danh sách những món hàng đã được đặt
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
                  <Box sx={{width: "30%"}}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Tên dịch vụ
                    </Typography>
                  </Box>
                  <Box sx={{width: "60%"}}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Vị trí
                    </Typography>
                  </Box>
                  <Box sx={{width: "10%"}}>
                    <Typography
                      color="black"
                      variant="h3"
                      style={{
                        marginBottom: "1%",
                      }}
                    >
                      Hành động
                    </Typography>
                  </Box>
                </Box>
                {buildListPlacingProduct()}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {error?.submit?.length > 0 ? (
                  <p style={{color: "red", textAlign: "center"}}>
                    {error?.submit}
                  </p>
                ) : null}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "2%",
                  justifyContent: "center",
                }}
              >
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
                  Xác nhận
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
                  Hủy lưu trữ đơn
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentFloor: state.order.currentFloor,
  placingProducts: state.order.placingProducts,
  isMoveOrderDetail: state.order.isMoveOrderDetail,
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
