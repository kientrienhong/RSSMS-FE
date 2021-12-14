import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ORDER_STATUS } from "../../../constant/constant";
export default function OrderReturnDate({
  order,
  setCurrentOrderNotAssignReturnTime,
  handleOpenAssignTime,
}) {
  let dateReturn = new Date(order.returnDate);
  return (
    <Box
      sx={{
        height: "4%",
        width: "15%",
        background: "#eff3ff",
        padding: "1% 2% 1% 2%",
        marginLeft: "1%",
        borderRadius: "8px",
        marginRight: "4% !important",
      }}
      onClick={() => {
        setCurrentOrderNotAssignReturnTime(order);
        handleOpenAssignTime();
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
            #{order?.id}
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
        <p className="schedule__order__title__time">{`${dateReturn.toLocaleDateString(
          "en-US"
        )}`}</p>
        <p
          className={`schedule__order__footer__status schedule__order__footer__status--${
            ORDER_STATUS[order?.status]
          }`}
        >
          {ORDER_STATUS[order?.status]}
        </p>
      </Box>
    </Box>
  );
}
