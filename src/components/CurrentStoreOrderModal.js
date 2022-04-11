import React from "react";
import {Box, Modal, Button, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import {STYLE_MODAL} from "../constant/style";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};

function CurrentStoreOrderModal({
  showSnackbar,
  isCurrentStoreOrder,
  placingProducts,
  storedOrder,
  isMoveOrderDetail,
  handleCurrentStoreOrder,
  emptyPlacedProduct,
}) {
  const handleClose = () => {
    handleCurrentStoreOrder(false);
  };
  console.log(isCurrentStoreOrder);
  return (
    <Modal
      open={isCurrentStoreOrder}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "center",
            marginLeft: "2.5%",
          }}
        >
          {isMoveOrderDetail
            ? "Bạn trong quá trình di chuyển đồ. Bạn có muốn hủy bỏ?"
            : storedOrder?.products?.length > 0 ||
              placingProducts?.floors?.length > 0
            ? "Bạn đang quá trình lưu trữ đơn. Bạn có muốn hủy bỏ?"
            : ""}
        </Typography>
        <Box
          sx={{
            width: "60%",
            margin: "40px auto 10px auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "16%",
            }}
            onClick={async () => {
              try {
                emptyPlacedProduct();
                handleClose();
                showSnackbar("success", "Hủy thao tác thành công");
              } catch (error) {
                console.log(error);
              }
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Xác nhận
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={() => {
              handleClose();
            }}
            color="error"
            variant="outlined"
          >
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  placingProducts: state.order.placingProducts,
  storedOrder: state.order.storedOrder,
  isMoveOrderDetail: state.order.isMoveOrderDetail,
  isCurrentStoreOrder: state.application.isCurrentStoreOrder,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCurrentStoreOrder: (isOpen) =>
      dispatch(action.handleCurrentStoreOrder(isOpen)),

    emptyPlacedProduct: () => dispatch(action.emptyPlacedProduct()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentStoreOrderModal);
