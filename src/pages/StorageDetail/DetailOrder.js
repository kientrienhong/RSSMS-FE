import React from "react";
import { Box, Card, Typography } from "@material-ui/core";

export default function DetailOrder({ storage }) {
  console.log(storage);
  const buildInfo = (title, content) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography color="black" variant="h2">
        {title}
      </Typography>
      <p style={{ fontSize: "20px" }}>{content}</p>
    </Box>
  );
  let remainingTime = "";
  let remainingYear = Math.floor(storage?.orderInfo?.durationMonths / 12);
  let remainingMonth = storage?.orderInfo?.durationMonths - remainingYear * 12;
  if (remainingYear > 1) {
    remainingTime += remainingYear + " year ";
  }

  if (remainingMonth > 0) {
    remainingTime += remainingMonth + " month ";
  }
  remainingTime += storage?.orderInfo?.durationDays + " day ";

  return (
    <Card
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "40vh",
        padding: "2%",
        alignItems: "space-between",
        justifyContent: "center",
      }}
    >
      {storage.orderId !== null ? (
        <>
          {buildInfo("ID", "#" + storage?.orderId)}
          {buildInfo("Customer name", storage?.orderInfo?.customerName)}
          {buildInfo("Customer phone", storage?.orderInfo?.customerPhone)}
          {buildInfo("Remaining time", remainingTime)}
        </>
      ) : (
        <Typography color="black" variant="h2" sx={{ textAlign: "center" }}>
          Not rented yet
        </Typography>
      )}
    </Card>
  );
}
