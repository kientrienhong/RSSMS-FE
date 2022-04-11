import React from "react";
import {Box, Card, Typography} from "@material-ui/core";
import CircularProgressWithLabel from "../../AreaDetailNew/components/CircularProgressWithLabel";

export default function AreaUsage({detailFloor}) {
  const buildNameValue = (name, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
          alignItems: "center",
          justifyContent: "flex-start",
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
          sx={{textAlign: "center", marginBottom: "16px"}}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const buildProductUsage = (usage) => {
    return (
      <Box sx={{display: "flex", flexDirection: "column"}}>
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
          {buildNameValue("Thể tích đã dùng", detailFloor?.used + "m3")}
          {buildNameValue("Thể tích trống", detailFloor?.available + "m3")}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        width: "20%",
        height: "40%",
        display: "flex",
        flexDirection: "column",
        marginRight: "3%",
        alignItems: "center",
        justifyAligns: "space-between",
        padding: "2%",
      }}
    >
      <Typography
        color="black"
        variant="h2"
        sx={{textAlign: "left", marginBottom: "16px"}}
      >
        Tình trạng đã sử dụng
      </Typography>
      {buildProductUsage(detailFloor?.usage)}
    </Card>
  );
}
