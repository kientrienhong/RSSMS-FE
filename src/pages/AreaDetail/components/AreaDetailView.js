import React from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Stack,
  Pagination,
} from "@material-ui/core";
import ListShelf from "./ListShelf";

export default function AreaDetailView({ storage, listShelf }) {
  return (
    <Card
      style={{ height: "68vh" }}
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "65%",
        height: "68vh",
        padding: "2%",
        alignItems: "flex-start",
      }}
    >
      <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
        {storage.name}
      </Typography>
      <ListShelf listShelf={listShelf} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marignTop: "32px",
        }}
      >
        <Stack spacing={2} sx={{}}>
          <Pagination count={4} page={1} />
        </Stack>
      </Box>
    </Card>
  );
}
