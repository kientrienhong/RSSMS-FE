import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import SectionProduct from "./components/SectionProduct";
export default function Products() {
  const [listStorages, setListStorages] = useState([
    {
      name: "Storage 2m2",
      price: 600000,
      image: "/img/storage2m2.png",
      type: "product",
      id: 1,
      typeInt: 0,
      description: "Kích thước: 1m x 2m x 2,5m",
    },
    {
      name: "Storage 4m2",
      price: 1000000,
      image: "/img/storage4m2.png",
      type: "product",
      id: 2,
      typeInt: 0,
      description: "Kích thước: 2m x 2m x 2,5m",
    },
    {
      name: "Storage 8m2",
      price: 1600000,
      image: "/img/storage8m2.png",
      type: "product",
      id: 3,
      typeInt: 0,
      description: "Kích thước: 2m x 4m x 2,5m",
    },
    {
      name: "Storage 16m2",
      price: 2800000,
      image: "/img/storage16m2.png",
      type: "product",
      id: 4,
      typeInt: 0,
      description: "Kích thước: 4m x 4m x 2,5m",
    },
  ]);

  const [listAccessory, setListAccessory] = useState([
    {
      name: "Tape",
      price: 25000,
      image: "/img/tape.png",
      type: "accessory",
      id: 5,
      typeInt: 1,
    },
    {
      name: "Locker",
      price: 165000,
      image: "/img/locker.png",
      type: "accessory",
      id: 6,
      typeInt: 1,
    },
    {
      name: "Carton box",
      price: 30000,
      image: "/img/carton.png",
      type: "accessory",
      id: 7,
      typeInt: 1,
    },
    {
      name: "PE Foam",
      price: 25000,
      image: "/img/peFoam.png",
      type: "accessory",
      id: 8,
      typeInt: 1,
    },
    {
      name: "Bubble Wrap",
      price: 25000,
      image: "/img/bubbleWrap.png",
      type: "accessory",
      id: 9,
      typeInt: 1,
    },
    {
      name: "PE strech film",
      price: 150000,
      image: "/img/PEstretchfilm.png",
      type: "accessory",
      id: 10,
      typeInt: 1,
    },
  ]);

  const [listBoxes, setListBoxes] = useState([
    {
      name: "Bolo",
      price: 100000,
      image: "/img/bolobox.png",
      quantity: 0,
      type: "product",
      id: 11,
      typeInt: 2,
    },
    {
      name: "Size S",
      price: 70000,
      image: "/img/boxSizeS.png",
      quantity: 0,
      type: "product",
      id: 12,
      typeInt: 2,
    },
    {
      name: "Size M",
      price: 100000,
      image: "/img/boxSizeM.png",
      quantity: 0,
      type: "product",
      id: 13,
      typeInt: 2,
    },
    {
      name: "Size L",
      price: 150000,
      image: "/img/boxSizeL.png",
      quantity: 0,
      type: "product",
      id: 14,
      typeInt: 2,
    },
    {
      name: "Size XL",
      price: 200000,
      image: "/img/boxSizeXL.png",
      quantity: 0,
      type: "product",
      id: 16,
      typeInt: 2,
    },
  ]);

  const [listAreas, setListAreas] = useState([
    {
      name: "Area 0.5m2",
      price: 400000,
      image: "/img/areaSize0.5m2.png",
      quantity: 0,
      type: "product",
      id: 18,
      typeInt: 4,
    },
    {
      name: "Area 1m2",
      price: 750000,
      image: "/img/areaSize1m2.png",
      quantity: 0,
      type: "product",
      id: 19,
      typeInt: 4,
    },
    {
      name: "Area 2m2",
      price: 1330000,
      image: "/img/areaSize2m2.png",
      quantity: 0,
      type: "product",
      id: 19,
      typeInt: 4,
    },
    {
      name: "Area 3m2",
      price: 1835000,
      image: "/img/areaSize3m2.png",
      quantity: 0,
      type: "product",
      id: 19,
      typeInt: 4,
    },
  ]);

  const [listServices, setListServices] = useState([
    {
      name: "Packaging",
      price: 50000,
      image: "/img/package.png",
      quantity: 0,
      type: "services",
      id: 17,
      typeInt: 3,
    },
  ]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "auto",
        py: 3,
      }}
    >
      <Box
        sx={{
          marginLeft: "2%",
          marginBottom: "1%",
          display: "flex",
          height: "45px",
          flexDirection: "row",
        }}
      >
        <TextField
          sx={{
            width: "80%",
          }}
          InputProps={{
            style: { height: "45px", backgroundColor: "white" },
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <SectionProduct name="Storage" listProduct={listStorages} />
      <SectionProduct name="Boxes" listProduct={listBoxes} />
      <SectionProduct name="Areas" listProduct={listAreas} />
      <SectionProduct name="Services" listProduct={listServices} />
    </Box>
  );
}
