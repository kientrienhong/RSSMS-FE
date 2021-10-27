import React from "react";
import { Box, Typography, Modal, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function DetailBoxModal({
  open,
  handleClose,
  orderDetailBox,
  setUpMoveBox,
  currentBox,
}) {
  const calculateRemaningDate = () => {
    let result = "";
    let date1 = new Date();
    let date2 = new Date(orderDetailBox.returnDate);
    let differenceInTime = date2.getTime() - date1.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const year = Math.floor(differenceInDays / 365);
    const month = Math.floor((differenceInDays - year * 365) / 30);
    const day = differenceInDays - year * 365 - month * 30;

    if (year > 0) {
      result += year + " years ";
    }

    if (month > 0) {
      result += month + " months ";
    }
    result += day + " days";
    return result;
  };
  calculateRemaningDate();
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h3">
          Detail Order
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4%",
            width: "100%",
          }}
        >
          <Typography color="black" variant="h3">
            Order id:
          </Typography>
          <Typography color="black" variant="h3">
            #{orderDetailBox.id}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Time remaining:
          </Typography>
          <p>{calculateRemaningDate()}</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer name
          </Typography>
          <p>{orderDetailBox.customerName}</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer phone
          </Typography>
          <p>{orderDetailBox.customerPhone}</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
          }}
        >
          <Typography color="black" variant="h3">
            Customer address
          </Typography>
          <p style={{ textAlign: "right" }}>{orderDetailBox.deliveryAddress}</p>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginRight: "2%",
            }}
            onClick={() => {
              setUpMoveBox(currentBox);
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Move
          </Button>
          <Button
            style={{
              height: "45px",
              width: "150px",
            }}
            sx={{ width: "auto" }}
            // onClick={}
            color="error"
            variant="outlined"
          >
            Return item
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUpMoveBox: (box) => dispatch(action.setUpMoveBox(box)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBoxModal);
