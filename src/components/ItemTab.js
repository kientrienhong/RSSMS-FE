import React, { useState } from "react";
import StoredOrderItem from "./StoredOrderItem";
import { Grid } from "@material-ui/core";
export default function ItemTab({ listOrderDetail }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
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
