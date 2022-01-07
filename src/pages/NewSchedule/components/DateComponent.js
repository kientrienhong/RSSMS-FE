import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function DateComponent({
  dateSchedule,
  currentIndex,
  index,
  setCurrentIndexDate,
}) {
  let color = currentIndex === index ? "primary" : "black";
  let splitedDateSchedule = dateSchedule.toString().split(" ");
  return (
    <Box
      onClick={() => {
        setCurrentIndexDate(index);
      }}
      sx={{
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
  );
}
