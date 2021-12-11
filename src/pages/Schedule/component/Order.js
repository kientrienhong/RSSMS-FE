import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { ORDER_STATUS } from "../../../constant/constant";
import CustomAvatar from "../../../components/CustomAvatar";
export default function Order({
  order,
  handleOpen,
  setCurrentListSchedule,
  setCurrentOrder,
}) {
  const dateStart = new Date(order.StartTime);
  const dateEnd = new Date(order.EndTime);

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

  const buildListAvatar = () => {
    if (order?.order?.listStaffDelivery) {
      return order.order.listStaffDelivery.map((e, index) => (
        <Avatar
          sx={{
            width: 28,
            height: 28,
            marginLeft: index === 0 ? "0px" : "-8px",
          }}
          src={e?.images[0]?.url}
          alt={e}
        />
      ));
    }
  };

  return (
    <Box
      sx={{
        height: "100px",
        background: "#eff3ff",
        padding: "4%",
      }}
      onClick={() => {
        setCurrentOrder(order.order);
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
