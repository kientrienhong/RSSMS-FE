import React, { useState, useEffect } from "react";
import { Alert, Box, Snackbar } from "@material-ui/core";
import { BsBoxSeam } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import SelfStorageMainTab from "./SelfStorageMainTab";
import SelfStorageOrderInfo from "./components/SelfStorageOrderInfo";
import DoorToDoorMainTab from "./DoorToDoorMainTab";
import DoorToDoorOrderInfo from "./components/DoorToDoorOrderInfo";
import InputInforModal from "./InputInforModal";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { getProduct } from "../../../apis/Apis";
import LoadingPage from "../../../pages/Loading/LoadingPage";
function MakingOrder({
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  snackbar,
  typeSnackbar,
  msgSnackbar,
  closeSnackbar,
}) {
  const [listStorages, setListStorages] = useState([]);

  const [listAccessory, setListAccessory] = useState([]);

  const [listBoxes, setListBoxes] = useState([]);

  const [listAreas, setListAreas] = useState([]);

  const [listServices, setListServices] = useState([]);

  const [choosenProduct, setChoosenProduct] = useState({
    product: [],
    accessory: [],
    services: [],
  });
  const [indexMain, setIndexMain] = useState(0);
  const [openInputFormation, setOpenInputFormation] = useState(false);
  const [currentColor, setCurrentColor] = useState({
    selfStorage: "#04BFFE",
    doorToDoor: "#A19FA8",
  });

  const getData = async () => {
    let listProductTemp = await getProduct(undefined, userState.idToken);
    let listStoragesTemp = setResetQuantity(listProductTemp.data[0], "product");
    let listAccessoryTemp = setResetQuantity(
      listProductTemp.data[1],
      "accessory"
    );
    let listBoxesTemp = setResetQuantity(listProductTemp.data[2], "product");
    let listAreasTemp = setResetQuantity(listProductTemp.data[3], "product");
    // let listServicesTemp = setResetQuantity(
    //   listProductTemp.data[3],
    //   "services"
    // );

    setListAccessory(listAccessoryTemp);
    setListStorages(listStoragesTemp);
    // setListServices(listServicesTemp);
    setListBoxes(listBoxesTemp);
    setListAreas(listAreasTemp);
  };

  const setResetQuantity = (list, typeString) => {
    return list?.map((e) => {
      let typeTemp = e.type;
      return { ...e, quantity: 0, type: typeString, typeInt: typeTemp };
    });
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData();
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const onClickMainTab = (name) => {
    if (name === "Kho tự quản") {
      setIndexMain(0);
      setCurrentColor({ selfStorage: "#04BFFE", doorToDoor: "#A19FA8" });
    } else {
      setIndexMain(1);
      setCurrentColor({ selfStorage: "#A19FA8", doorToDoor: "#04BFFE" });
    }
    setChoosenProduct({
      product: [],
      accessory: [],
      services: [],
    });

    let listStoragesTemp = setResetQuantity(listStorages, "product");
    let listAccessoryTemp = setResetQuantity(listAccessory, "accessory");
    let listBoxesTemp = setResetQuantity(listBoxes, "product");
    let listAreasTemp = setResetQuantity(listAreas, "product");
    setListAccessory(listAccessoryTemp);
    setListStorages(listStoragesTemp);
    // setListServices(listServicesTemp);
    setListBoxes(listBoxesTemp);
    setListAreas(listAreasTemp);
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

  const onHandleOpen = () => {
    setOpenInputFormation(true);
  };

  const onHandleClose = () => {
    setOpenInputFormation(false);
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
      <LoadingPage />
      <Snackbar
        sx={{
          zIndex: 9999999999,
        }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={typeSnackbar}
          sx={{ width: "100%" }}
        >
          {msgSnackbar}
        </Alert>
      </Snackbar>
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
        <InputInforModal
          open={openInputFormation}
          handleClose={onHandleClose}
        />

        {buildMainTab(
          <FaWarehouse size={40} color={currentColor.selfStorage} />,
          "Kho tự quản",
          currentColor.selfStorage
        )}
        {buildMainTab(
          <BsBoxSeam size={40} color={currentColor.doorToDoor} />,
          "Giữ đồ thuê",
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
          <SelfStorageOrderInfo
            choosenProduct={choosenProduct}
            onHandleOpen={onHandleOpen}
          />
        ) : (
          <DoorToDoorOrderInfo
            choosenProduct={choosenProduct}
            onHandleOpen={onHandleOpen}
          />
        )}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
  snackbar: state.application.snackbar,
  typeSnackbar: state.application.typeSnackbar,
  msgSnackbar: state.application.msgSnackbar,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    closeSnackbar: () => dispatch(action.hideSnackbar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakingOrder);
