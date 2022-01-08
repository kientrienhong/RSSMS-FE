import React from "react";
import { Box } from "@material-ui/core";
import DateComponent from "./DateComponent";
export default function ListDateComponent({
  listDateAWeek,
  currentIndex,
  setCurrentIndexDate,
}) {
  const mapListDate = () =>
    listDateAWeek.map((e, i) => (
      <DateComponent
        dateSchedule={e}
        currentIndex={currentIndex}
        index={i}
        setCurrentIndexDate={setCurrentIndexDate}
      />
    ));

  return (
    <Box
      sx={{
        margin: "0% 4% 0% 14%",
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {mapListDate()}
    </Box>
  );
}
