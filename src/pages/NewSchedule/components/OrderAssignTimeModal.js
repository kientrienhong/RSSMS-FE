import React, { useState } from "react";
import { STYLE_MODAL } from "../../../constant/style";
import { Box, Modal, Button, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { updateOrder } from "../../../apis/Apis";
import { LIST_TIME } from "../../../constant/constant";
import * as action from "../../../redux/action/action";
import TagSelection from "../../Order/CreateOrder/components/TagSelection";
const styleModal = STYLE_MODAL;

function OrderAssignTimeModal({
  open,
  handleClose,
  order,
  showSnackbar,
  showLoading,
  hideLoading,
  userState,
  getData,
  startOfWeek,
  endOfWeek,
  listOrderNotAssignedReturnTime,
  setListOrderNotAssignedReturnTime,
}) {
  const [timeDelivery, setTimeDelivery] = useState();
  const [isCustomerDelivery, setIsCustomerDelivery] = useState();
  const [error, setError] = useState();
  const mapListTime = (time, setTime) =>
    LIST_TIME.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={setTime}
          setIsCustomerDelivery={setIsCustomerDelivery}
        />
      </Grid>
    ));

  const buildInfoValue = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          color="black"
          variant="h3"
          sx={{ marginBottom: "4%", marginTop: "4%" }}
        >
          {title}
        </Typography>
        <p
          style={{
            textAlign: "right",
          }}
        >
          {value}
        </p>
      </Box>
    );
  };

  const onClickSubmit = async () => {
    if (timeDelivery === undefined) {
      setError("Please choose return time");
      return;
    }

    try {
      showLoading();
      const orderTemp = {
        id: order.id,
        isUserDelivery: isCustomerDelivery,
        deliveryDate: order.deliveryDate,
        deliveryTime: order.deliveryTime,
        returnTime: timeDelivery.name,
        returnDate: order.returnDate,
        deliveryAddress: order.deliveryAddress,
        addressReturn: order.returnAddress,
        status: order.status,
        isPaid: order.isPaid,
      };
      await updateOrder(orderTemp.id, orderTemp, userState.idToken);
      await getData(startOfWeek, endOfWeek);
      let listOrderNotAssignedReturnTimeTemp = [
        ...listOrderNotAssignedReturnTime,
      ];

      const index = listOrderNotAssignedReturnTimeTemp.findIndex(
        (e) => e.id === order.id
      );
      listOrderNotAssignedReturnTimeTemp.splice(index, 1);
      setListOrderNotAssignedReturnTime(listOrderNotAssignedReturnTimeTemp);
      showSnackbar("success", "Assign return time success");
      setError({});
      handleClose();
    } catch (e) {
      console.log(e);
      console.log(e.response);
      if (e.response)
        setError({ submit: { msg: e.response.data.error.message } });
    } finally {
      hideLoading();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        width: "40%",
      }}
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          left: "120%",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          sx={{ marginBottom: "4%", marginTop: "4%" }}
        >
          Assign Return Time
        </Typography>
        {buildInfoValue("Order Id: ", order?.id)}
        {buildInfoValue("Customer name: ", order?.customerName)}
        {buildInfoValue("Customer phone: ", order?.customerPhone)}
        {buildInfoValue("Address return: ", order?.addressReturn)}
        <Typography
          color="black"
          variant="h3"
          sx={{ marginBottom: "4%", marginTop: "4%" }}
        >
          Select return time:
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            width: "98%",
            marginBottom: "3%",
          }}
        >
          {mapListTime(timeDelivery, setTimeDelivery)}
        </Grid>
        {error?.length > 0 ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : null}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginTop: "4%",
            }}
            onClick={onClickSubmit}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderAssignTimeModal);
