import React from "react";
import { Box, Typography, Card } from "@material-ui/core";
export default function StorageDetailView({ storage }) {
  const listType = ["Self-Storage", "Door-to-door"];
  const buildInfoRow = (title, info) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Box sx={{ width: "10%" }}>
          <Typography color="black" variant="h2">
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            textAlign: "right",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          <p style={{ fontSize: 17 }}>{info}</p>
        </Box>
      </Box>
    );
  };

  return (
    <Card
      style={{ height: "68vh" }}
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "68vh",
        padding: "2%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: "4%",
        }}
      >
        <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
          Storage Infomation
        </Typography>
      </Box>
      {storage.images === undefined ? null : (
        <img
          src={storage?.images[0]?.url}
          alt="storage"
          width="90%"
          height="160px"
          style={{ marginBottom: "1%", borderRaius: "4px" }}
        />
      )}

      {buildInfoRow("Name", storage.name)}
      {buildInfoRow("Size", storage.size)}
      {buildInfoRow("Address", storage.address)}
      {buildInfoRow("Type", listType[storage.type])}
      {buildInfoRow(
        "Manager",
        storage.managerName === undefined ? "Not yet" : storage.managerName
      )}
    </Card>
  );
}
