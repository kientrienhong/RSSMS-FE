import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";

export default function DateComponent({
  dateSchedule,
  currentIndex,
  index,
  setCurrentIndexDate,
  setListScheduleCurrentDate,
  listScheduleWholeWeek,
}) {
  let color = currentIndex === index ? "primary" : "black";
  let splitedDateSchedule = dateSchedule.toString().split(" ");
  return (
    <Badge
      color="error"
      badgeContent={
        listScheduleWholeWeek[Object.keys(listScheduleWholeWeek)[index]]
          .amountNotAssignStaff
      }
    >
      <Box
        onClick={() => {
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
          {`${splitedDateSchedule[1]} / ${splitedDateSchedule[2]}`}
        </Typography>
      </Box>
    </Badge>
  );
}
