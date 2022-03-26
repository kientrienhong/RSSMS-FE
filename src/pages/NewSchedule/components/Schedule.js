import React from "react";
import { Box, Checkbox, Button, Avatar } from "@material-ui/core";
import { getOrderById, getRequestDetail } from "../../../apis/Apis";
import { connect } from "react-redux";

import * as action from "../../../redux/action/action";

function Schedule({
  schedule,
  setCurrentOrder,
  handleOpen,
  onChangeCheckBox,
  listSelectedOrder,
  handleOpenAssignTime,
  userState,
}) {
  console.log(schedule);
  let foundSameStorage = false;
  let indexFound = listSelectedOrder?.findIndex((e) => {
    if (e.storageId === schedule.storageId) {
      foundSameStorage = true;
    }
    if (
      e["deliveryTime"] === schedule["deliveryTime"] &&
      schedule.id !== e.id
    ) {
      return true;
    }
  });

  let foundSameListStaff = 0;
  if (listSelectedOrder?.length > 0) {
    listSelectedOrder[0]?.listStaffDelivery?.forEach((e) => {
      if (schedule?.listStaffDelivery) {
        schedule.listStaffDelivery.forEach((ele) => {
          if (e.id === ele.id) {
            foundSameListStaff++;
            return;
          }
        });
      }
    });
  }

  let isSameListStaff = false;
  if (listSelectedOrder?.length > 0) {
    if (listSelectedOrder[0]?.listStaffDelivery) {
      if (
        listSelectedOrder[0]?.listStaffDelivery.length === foundSameListStaff
      ) {
        isSameListStaff = true;
      }
    } else {
      if (!schedule.listStaffDelivery) {
        isSameListStaff = true;
      }
    }
  }

  const buildListAvatar = () => {
    if (schedule?.listStaffDelivery) {
      return schedule.listStaffDelivery.map((e, index) => (
        <Avatar
          sx={{
            width: 28,
            height: 28,
            marginLeft: index === 0 ? "0px" : "-8px",
          }}
          src={e?.imageUrl}
          alt={e}
          key={e?.imageUrl}
        />
      ));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor:
          schedule.status === 6
            ? "#FF615F"
            : schedule.isDelivery
            ? "#99E5FE"
            : schedule.orderId
            ? "#8099FF"
            : "#04BFFE",
        boxShadow: 16,
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "150px",
        width: onChangeCheckBox !== undefined ? "225px" : "320px",
        marginRight: "3%",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ display: "inline-block", margin: 0 }}>
            {/* {schedule.orderId === undefined ? "Order: #" : "Request: #"} */}
            {schedule.customerName}
          </p>
          <p style={{ display: "inline-block", margin: 0 }}>
            {/* {schedule.orderId === undefined ? "Order: #" : "Request: #"} */}
            {schedule.deliveryAddress}
          </p>
        </Box>

        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {buildListAvatar()}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <p style={{ display: "block", margin: "0" }}>
            {schedule.storageName}
          </p>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            alignItems: "center !important",
          }}
        >
          <img
            onClick={async () => {
              try {
                const orderDetail = await getRequestDetail(
                  schedule.id,
                  userState.idToken
                );
                setCurrentOrder(orderDetail.data);
                handleOpen();
              } catch (error) {
                console.log(error);
              }
            }}
            src="/img/info.png"
            alt="info"
            height={24}
            width={24}
            style={{
              cursor: "pointer",
              // marginRight: "16px",
            }}
          />
          {onChangeCheckBox !== undefined ? (
            <Checkbox
              disabled={
                indexFound !== -1 ||
                (!foundSameStorage && listSelectedOrder.length > 0) ||
                (listSelectedOrder.length > 0 && !isSameListStaff)
              }
              onChange={(val) => onChangeCheckBox(schedule, val.target.checked)}
              color="success"
              inputProps={{ "aria-label": "controlled" }}
            />
          ) : (
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              onClick={async () => {
                setCurrentOrder(schedule);

                handleOpenAssignTime();
              }}
              color="success"
              variant="contained"
              type="submit"
            >
              Assign
            </Button>
          )}
        </Box>
      </Box>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
