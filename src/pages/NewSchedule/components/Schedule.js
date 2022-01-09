import React from "react";
import { Box, Checkbox, Button } from "@material-ui/core";

export default function Schedule({
  schedule,
  setCurrentOrder,
  handleOpen,
  onChangeCheckBox,
  listSelectedOrder,
  handleOpenAssignTime,
}) {
  let timeString = schedule.isDelivery ? "deliveryTime" : "returnTime";
  let indexFound = listSelectedOrder?.findIndex((e) => {
    let timeStringElement = e.isDelivery ? "deliveryTime" : "returnTime";

    if (e[timeStringElement] === schedule[timeString] && schedule.id !== e.id) {
      return true;
    }
  });

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        boxShadow: 16,
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "150px",
        width: "225px",
        marginRight: "3%",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <p style={{ display: "inline-block", margin: 0 }}>
          Order: #{schedule.id}
        </p>
        <p style={{ display: "inline-block", margin: "0 0 11% 0" }}>
          {schedule.storageName}
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "end !important",
        }}
      >
        <img
          onClick={() => {
            setCurrentOrder(schedule);
            handleOpen();
          }}
          src="/img/info.png"
          alt="info"
          height={24}
          width={24}
          style={{
            cursor: "pointer",
          }}
        />
        {onChangeCheckBox !== undefined ? (
          <Checkbox
            disabled={indexFound !== -1}
            onChange={(val) => onChangeCheckBox(schedule)}
            color="primary"
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
            color="primary"
            variant="contained"
            type="submit"
          >
            Assign
          </Button>
        )}
      </Box>
    </Box>
  );
}
