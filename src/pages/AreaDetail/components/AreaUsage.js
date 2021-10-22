import React from "react";
import { Box, Card, Typography, Grid } from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default function AreaUsage({ list, name, numberInRow }) {
  const mapListToView = () =>
    list.map((e) => buildProductUsage(e.name, e.usage));

  const buildProductUsage = (name, usage) => {
    return (
      <Grid item xs={12 / numberInRow}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CircularProgressWithLabel
            value={usage}
            width="80px"
            height="80px"
            sx={{
              diplay: "inline-block",
            }}
          />
          <p style={{ textAlign: "center" }}>{name}</p>
        </Box>
      </Grid>
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        marginRight: "3%",
        alignItems: "center",
        justifyAligns: "space-between",
        padding: "2%",
        paddingTop: "4%",
        marginBottom: "4%",
      }}
    >
      <Typography
        color="black"
        variant="h2"
        sx={{ textAlign: "left", marginBottom: "16px" }}
      >
        {name}
      </Typography>
      <Grid container spacing={2}>
        {mapListToView()}
      </Grid>
    </Card>
  );
}
