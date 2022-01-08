import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import Schedule from "./Schedule";
export default function ScheduleArea({
  listGroup,
  setCurrentOrder,
  handleOpen,
}) {
  const mapListSchedule = (mapListSchedule) =>
    mapListSchedule?.map((e, index) => (
      <Schedule
        schedule={e}
        key={index}
        setCurrentOrder={setCurrentOrder}
        handleOpen={handleOpen}
      />
    ));

  const mapListGroup = (listGroup) => {
    let listComponent = [];
    for (const entry of listGroup?.entries()) {
      if (entry[1]?.length === 0) {
        listComponent.push(
          <Box
            sx={{
              height: "100px",
              display: "flex",
              marginBottom: "7.8%",

              flexDirection: "row",
            }}
          ></Box>
        );
      } else {
        listComponent.push(
          <Box
            sx={{
              height: "100px",
              display: "flex",
              marginBottom: "7.8%",

              flexDirection: "row",
            }}
          >
            {mapListSchedule(entry[1])}
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
        width: "80%",
        marginLeft: "1%",
      }}
    >
      {mapListGroup(listGroup)}
    </Box>
  );
}
