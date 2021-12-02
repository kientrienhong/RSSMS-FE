import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ORDER_STATUS } from "../../../constant/constant";
export default function Order({ order, handleOpen, setCurrentListSchedule }) {
  const dateStart = new Date(order.StartTime);
  const dateEnd = new Date(order.EndTime);
  const statusOrder = {
    0: "Delivery",
    1: "Complete",
  };

  const listStaff = ["/avatar.png", "/avatar2.png", "/avatar3.png"];

  const formatTime = (date) => {
    let d = new Date(date);
    var h = d.getHours(),
      m = d.getMinutes();

    if (h > 12) {
      h = h - 12;
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }

    return h + ":" + m;
  };

  return (
    <Box
      sx={{
        height: "100px",
        background: "#eff3ff",
        padding: "4%",
      }}
      onClick={() => {
        setCurrentListSchedule(order);
        handleOpen();
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "30%",
            margin: "0",
            fontSize: "17px",
            textAlign: "left",
          }}
        >
          <Typography color="black" variant="h2">
            #{order?.order?.id}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          marginTop: "20px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="schedule__order__title__time">{`${formatTime(
          dateStart
        )} - ${formatTime(dateEnd)}`}</p>
        <p
          className={`schedule__order__footer__status schedule__order__footer__status--${
            ORDER_STATUS[order?.order?.status]
          }`}
        >
          {ORDER_STATUS[order?.order?.status]}
        </p>
      </Box>
    </Box>
  );
}
