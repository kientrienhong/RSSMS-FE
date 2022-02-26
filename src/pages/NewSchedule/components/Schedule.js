import React from "react";
import { Box, Checkbox, Button, Avatar } from "@material-ui/core";
export default function Schedule({
  schedule,
  setCurrentOrder,
  handleOpen,
  onChangeCheckBox,
  listSelectedOrder,
  handleOpenAssignTime,
}) {
  let timeString = schedule.isDelivery ? "deliveryTime" : "returnTime";
  let foundSameStorage = false;

  let indexFound = listSelectedOrder?.findIndex((e) => {
    let timeStringElement = e.isDelivery ? "deliveryTime" : "returnTime";
    if (e.storageId === schedule.storageId) {
      foundSameStorage = true;
    }
    if (e[timeStringElement] === schedule[timeString] && schedule.id !== e.id) {
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
          src={e?.images[0]?.url}
          alt={e}
          key={e?.images[0]?.url}
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
        <p style={{ display: "inline-block", margin: 0 }}>
          {schedule.orderId === undefined ? "Order: #" : "Request: #"}
          {schedule.id}
        </p>
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
            onClick={() => {
              if (schedule.orderId) {
              } else {
                setCurrentOrder(schedule);
                handleOpen();
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
