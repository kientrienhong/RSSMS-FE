import React, { useState } from "react";
import StoredOrderItem from "./StoredOrderItem";
import { Grid } from "@material-ui/core";
export default function ItemTab({ listOrderDetail }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    // let check = isExpanded ? panel : false;
    // let expandedTemp = [...expanded];
    // if(check !== false){
    //   expandedTemp.push(check);
    // } else {
    //   expandedTemp.removeAt()
    // }

    // console.log(panel);
    console.log(event);
    setExpanded(isExpanded ? panel : false);
  };
  const mapListOrderDetail = () =>
    listOrderDetail.map((e, index) => (
      <Grid item xs={6} key={index}>
        <StoredOrderItem
          expanded={expanded}
          id={index}
          storedOrder={e}
          handleChange={handleChange}
        />
      </Grid>
    ));

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListOrderDetail()}
      </Grid>
    </div>
  );
}
