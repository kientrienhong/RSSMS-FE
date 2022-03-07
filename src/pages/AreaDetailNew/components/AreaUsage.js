import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import CircularProgressWithLabel from "../../AreaDetailNew/components/CircularProgressWithLabel";

export default function AreaUsage({ value }) {
  const buildNameValue = (name, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          alignItems: "center",
        }}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          {name}
        </p>

        <Typography
          color="black"
          variant="h2"
          sx={{ textAlign: "center", marginBottom: "16px" }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const buildProductUsage = (usage) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CircularProgressWithLabel
          value={usage}
          width="80px"
          height="80px"
          sx={{
            diplay: "inline-block",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {buildNameValue("Diện tích đã dùng", "72m2")}
          {buildNameValue("Diện tích trống", "80m2")}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        width: "30%",
        height: "37%",
        overflowY: "scroll",
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
        Usage
      </Typography>
      {buildProductUsage(value)}
    </Card>
  );
}
