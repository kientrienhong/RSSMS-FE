import React from "react";
import { Card, Typography, Box, Stack, Pagination } from "@material-ui/core";
import ListShelf from "./ListShelf";
export default function AreaDetailView({
  storage,
  listShelf,
  setCurrentShelf,
  handleOpen,
  setIsHandy,
}) {
  return (
    <Card
      style={{ height: "73vh" }}
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "65%",
        height: "75vh",
        padding: "2%",
        alignItems: "flex-start",
      }}
    >
      <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
        {storage.name}
      </Typography>

      <ListShelf
        listShelf={listShelf}
        setCurrentShelf={setCurrentShelf}
        handleOpen={handleOpen}
        setIsHandy={setIsHandy}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marignTop: "64px",
        }}
      >
        <Stack spacing={2} sx={{}}>
          <Pagination count={4} page={1} />
        </Stack>
      </Box>
    </Card>
  );
}
