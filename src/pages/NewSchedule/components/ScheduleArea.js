import React from "react";
import {Box} from "@material-ui/core";
import Schedule from "./Schedule";
import ItemSidebar from "./ItemSidebar";
export default function ScheduleArea({
  listGroup,
  setCurrentOrder,
  handleOpen,
  onChangeCheckBox,
  listSelectedOrder,
  handleOpenOrderModal,
  listTime,
  listScheduleCurrentDate,
}) {
  const mapListSchedule = (mapListSchedule) =>
    mapListSchedule?.map((e, index) => (
      <Schedule
        schedule={e}
        key={index}
        setCurrentOrder={setCurrentOrder}
        handleOpen={handleOpen}
        handleOpenOrderModal={handleOpenOrderModal}
        onChangeCheckBox={onChangeCheckBox}
        listScheduleCurrentDate={listScheduleCurrentDate}
        listSelectedOrder={listSelectedOrder}
      />
    ));

  const mapListGroup = (listGroup) => {
    let listComponent = [];
    if (listGroup === undefined) {
      return [];
    }
    for (const entry of listGroup?.entries()) {
      if (entry[1]?.length === 0) {
        listComponent.push(
          <Box
            sx={{
              height: "100px",
              display: "flex",
              marginBottom: "9%",
              width: "100%",

              flexDirection: "row",
            }}
          >
            <ItemSidebar time={entry[0]} />
          </Box>
        );
      } else {
        listComponent.push(
          <Box
            sx={{
              height: "100px",
              display: "flex",
              marginBottom: "9%",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <ItemSidebar time={entry[0]} />

            {mapListSchedule(entry[1]["listSchedule"])}
          </Box>
        );
      }
    }
    return listComponent;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: "3%",
      }}
    >
      {mapListGroup(listGroup?.listSchedule)}
    </Box>
  );
}
