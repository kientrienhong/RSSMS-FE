import React from "react";
import {Box, Typography, Badge} from "@material-ui/core";

export default function DateComponent({
  dateSchedule,
  currentIndex,
  index,
  setCurrentIndexDate,
  setListScheduleCurrentDate,
  listScheduleWholeWeek,
  setListSelectedOrder,
}) {
  let color = currentIndex === index ? "primary" : "black";
  var options = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  let splitedDateSchedule = dateSchedule
    .toLocaleDateString("vi-VN", options)
    .toString()
    .split(", ");
  let splitedDate = splitedDateSchedule[1]?.split("/");
  console.log(splitedDate);
  return (
    <Badge
      color="error"
      badgeContent={
        listScheduleWholeWeek[Object.keys(listScheduleWholeWeek)[index]]
          ?.amountNotAssignStaff
      }
    >
      <Box
        onClick={() => {
          setListSelectedOrder([]);
          setCurrentIndexDate(index);
          setListScheduleCurrentDate(
            listScheduleWholeWeek[Object.keys(listScheduleWholeWeek)[index]]
          );
        }}
        sx={{
          width: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "2%",
          cursor: "pointer",
        }}
      >
        <Typography color={color} variant="h2">
          {splitedDateSchedule[0]}
        </Typography>
        <Typography color={color} variant="h6">
          {`${splitedDate[0]} / ${splitedDate[1]}`}
        </Typography>
      </Box>
    </Badge>
  );
}
