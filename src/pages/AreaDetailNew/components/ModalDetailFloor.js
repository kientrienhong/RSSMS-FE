import React, {useState} from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Modal,
} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import AreaUsage from "./AreaUsage";
import ListOrderDetail from "./ListOrderDetail";
import {connect} from "react-redux";
const styleModal = {
  ...STYLE_MODAL,
  width: "90%",
};
function ModalDetailFloor({
  open,
  handleClose,
  detailFloor,
  handleOpenOrderDetail,
  setCurrentOrderDetail,
  placingProducts,
}) {
  let additionUsed = 0;
  placingProducts?.floors?.forEach((e) => {
    if (e.floorId === detailFloor.id) {
      additionUsed += e.width * e.height * e.length;
    }
  });

  let additionUsage =
    ((additionUsed + detailFloor.used) / detailFloor.available) * 100;
  let uiDetailFloor = {
    ...detailFloor,
    usage: additionUsage + detailFloor.usage,
    used: additionUsed + detailFloor.used,
    available: detailFloor.available,
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            ...styleModal,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <AreaUsage detailFloor={uiDetailFloor} />
          <ListOrderDetail
            listOrderDetail={detailFloor.orderDetails}
            handleOpenOrderDetail={handleOpenOrderDetail}
            setCurrentOrderDetail={setCurrentOrderDetail}
            page={1}
            detailFloor={detailFloor}
            totalOrderDetail={3}
          />
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  placingProducts: state.order.placingProducts,
});

export default connect(mapStateToProps, null)(ModalDetailFloor);
