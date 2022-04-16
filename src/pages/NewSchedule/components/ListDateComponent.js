import React from "react";
import {Box} from "@material-ui/core";
import DateComponent from "./DateComponent";
export default function ListDateComponent({
  listDateAWeek,
  listScheduleWholeWeek,
  currentIndex,
  setCurrentIndexDate,
  setListScheduleCurrentDate,
  setListSelectedOrder,
  setEndOfWeek,
  setStartOfWeek,
}) {
  const mapListDate = () =>
    listDateAWeek.map((e, i) => (
      <DateComponent
        dateSchedule={e}
        setListSelectedOrder={setListSelectedOrder}
        currentIndex={currentIndex}
        index={i}
        setListScheduleCurrentDate={setListScheduleCurrentDate}
        setCurrentIndexDate={setCurrentIndexDate}
        listScheduleWholeWeek={listScheduleWholeWeek}
      />
    ));

  const onClickPrevious = () => {
    let startDate = new Date(Object.keys(listScheduleWholeWeek)[0]);
    let endDate = new Date(Object.keys(listScheduleWholeWeek)[6]);
    console.log(startDate, endDate);
    startDate = new Date(startDate.setDate(startDate.getDate() - 7));
    endDate = new Date(endDate.setDate(endDate.getDate() - 6));

    setStartOfWeek(startDate);
    setEndOfWeek(endDate);
  };

  const onClickNext = () => {
    let startDate = new Date(Object.keys(listScheduleWholeWeek)[0]);
    let endDate = new Date(Object.keys(listScheduleWholeWeek)[6]);
    startDate = new Date(startDate.setDate(startDate.getDate() + 7));
    endDate = new Date(endDate.setDate(endDate.getDate() + 8));
    setStartOfWeek(startDate);
    setEndOfWeek(endDate);
  };

  return (
    <Box
      sx={{
        margin: "0% 4% 0% 3%",
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img
        src="/img/arrowLeft.png"
        alt="arrowLeft"
        width="32"
        height="32"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          onClickPrevious();
        }}
      />
      {mapListDate()}
      <img
        src="/img/arrowRight.png"
        alt="arrowRight"
        width="32"
        height="32"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          onClickNext();
        }}
      />
    </Box>
  );
}
