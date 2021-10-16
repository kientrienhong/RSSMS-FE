import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { BsBoxSeam } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import SelfStorageMainTab from "./SelfStorageMainTab";
import SelfStorageOrderInfo from "./components/SelfStorageOrderInfo";
import DoorToDoorMainTab from "./DoorToDoorMainTab";
import DoorToDoorOrderInfo from "./components/DoorToDoorOrderInfo";
export default function MakingOrder() {
  const [indexMain, setIndexMain] = useState(0);
  const [currentColor, setCurrentColor] = useState({
    selfStorage: "#04BFFE",
    doorToDoor: "#A19FA8",
  });

  const [listStorages, setListStorages] = useState([
    {
      name: "Storage 2m2",
      price: 600000,
      image: "/img/storage2m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Storage 4m2",
      price: 1000000,
      image: "/img/storage4m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Storage 8m2",
      price: 1600000,
      image: "/img/storage8m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Storage 16m2",
      price: 2800000,
      image: "/img/storage16m2.png",
      quantity: 0,
      type: "product",
    },
  ]);

  const [listAccessory, setListAccessory] = useState([
    {
      name: "Tape",
      price: 25000,
      image: "/img/tape.png",
      quantity: 0,
      type: "accessory",
    },
    {
      name: "Locker",
      price: 165000,
      image: "/img/locker.png",
      quantity: 0,
      type: "accessory",
    },
    {
      name: "Carton box",
      price: 30000,
      image: "/img/carton.png",
      quantity: 0,
      type: "accessory",
    },
    {
      name: "PE Foam",
      price: 25000,
      image: "/img/peFoam.png",
      quantity: 0,
      type: "accessory",
    },
    {
      name: "Bubble Wrap",
      price: 25000,
      image: "/img/bubbleWrap.png",
      quantity: 0,
      type: "accessory",
    },
    {
      name: "PE strech film",
      price: 150000,
      image: "/img/PEstretchfilm.png",
      quantity: 0,
      type: "accessory",
    },
  ]);

  const [listBoxes, setListBoxes] = useState([
    {
      name: "Bolo",
      price: 100000,
      image: "/img/bolobox.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Size S",
      price: 70000,
      image: "/img/boxSizeS.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Size M",
      price: 100000,
      image: "/img/boxSizeM.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Size L",
      price: 150000,
      image: "/img/boxSizeL.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Size XL",
      price: 200000,
      image: "/img/boxSizeXL.png",
      quantity: 0,
      type: "product",
    },
  ]);

  const [listAreas, setListAreas] = useState([
    {
      name: "Area 0.5m2",
      price: 400000,
      image: "/img/areaSize0.5m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Area 1m2",
      price: 750000,
      image: "/img/areaSize1m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Area 2m2",
      price: 1330000,
      image: "/img/areaSize2m2.png",
      quantity: 0,
      type: "product",
    },
    {
      name: "Area 3m2",
      price: 1835000,
      image: "/img/areaSize3m2.png",
      quantity: 0,
      type: "product",
    },
  ]);

  const [listServices, setListServices] = useState([
    {
      name: "Packaging",
      price: 50000,
      image: "/img/package.png",
      quantity: 0,
      type: "services",
    },
  ]);

  const [choosenProduct, setChoosenProduct] = useState({
    product: [],
    accessory: [],
    services: [],
  });

  const onClickMainTab = (name) => {
    if (name === "Self-Storage") {
      setIndexMain(0);
      setCurrentColor({ selfStorage: "#04BFFE", doorToDoor: "#A19FA8" });
      setChoosenProduct({
        product: [],
        accessory: [],
        services: [],
      });
    } else {
      setIndexMain(1);
      setCurrentColor({ selfStorage: "#A19FA8", doorToDoor: "#04BFFE" });
      setChoosenProduct({
        product: [],
        accessory: [],
        services: [],
      });
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
        {indexMain === 0 ? (
          <SelfStorageMainTab
            listStorages={listStorages}
            listAccessory={listAccessory}
            setListStorages={setListStorages}
            setListAccessory={setListAccessory}
            setChoosenProduct={setChoosenProduct}
            choosenProduct={choosenProduct}
          />
        ) : (
          <DoorToDoorMainTab
            listBoxes={listBoxes}
            listAreas={listAreas}
            listServices={listServices}
            listAccessory={listAccessory}
            setChoosenProduct={setChoosenProduct}
            setListServices={setListServices}
            setListBoxes={setListBoxes}
            setListAreas={setListAreas}
            setListAccessory={setListAccessory}
            choosenProduct={choosenProduct}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "30%",
        }}
      >
        {indexMain === 0 ? (
          <SelfStorageOrderInfo choosenProduct={choosenProduct} />
        ) : (
          <DoorToDoorOrderInfo choosenProduct={choosenProduct} />
        )}
      </Box>
    </Box>
  );
}
