import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Card,
} from "@material-ui/core";
import { BsBoxSeam } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import SelfStorageMainTab from "./SelfStorageMainTab";

export default function MakingOrder() {
  const [indexMain, setIndexMain] = useState(0);
  const [currentColor, setCurrentColor] = useState({
    selfStorage: "#04BFFE",
    doorToDoor: "#A19FA8",
  });

  const onClickMainTab = (name) => {
    if (name === "Self-Storage") {
      setIndexMain(0);
      setCurrentColor({ selfStorage: "#04BFFE", doorToDoor: "#A19FA8" });
    } else {
      setIndexMain(1);
      setCurrentColor({ selfStorage: "#A19FA8", doorToDoor: "#04BFFE" });
    }
  };

  const buildMainTab = (icon, name, color) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "16%",
          cursor: "pointer",
        }}
        onClick={() => onClickMainTab(name)}
      >
        {icon}
        <p style={{ color: color }}>{name}</p>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "auto",
        py: 3,
        display: "flex",
        backgroundColor: "background.default",

        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "10%",
          position: "fixed",
          top: "50%",
          left: 0,
          transform: "translate(0, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {buildMainTab(
          <FaWarehouse size={40} color={currentColor.selfStorage} />,
          "Self-Storage",
          currentColor.selfStorage
        )}
        {buildMainTab(
          <BsBoxSeam size={40} color={currentColor.doorToDoor} />,
          "Door to door",
          currentColor.doorToDoor
        )}
      </Box>
      <Box
        sx={{
          width: "10%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "60%",
        }}
      >
        <SelfStorageMainTab />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "30%",
        }}
      ></Box>
    </Box>
  );
}
