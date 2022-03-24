import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ProductButton from "../Order/CreateOrder/components/ProductButton";

import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { useParams } from "react-router-dom";
import {
  getStorageDetail,
  getListSpace,
  getDetailArea,
  deleteSpace,
} from "../../apis/Apis";
import ModalDetailFloor from "./components/ModalDetailFloor";
import {
  AREA_TYPE,
  BOX_TYPE,
  SELF_STORAGE_TYPE,
} from "../../constant/constant";
import { TYPE_AREA, TYPE_SHELF } from "../../constant/constant";
import AreaUsage from "./components/AreaUsage";
import Shelf from "./components/Shelf";
import ListShelf from "./components/ListShelf";
import ModalSpace from "./components/ModalSpace";
import SelfStorageModal from "./components/SelfStorageModal";
import ConfirmModal from "../../components/ConfirmModal";
import ModalOrderDetail from "./components/ModalOrderDetail";

function AreaDetailNew({
  storedOrder,
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  isLoadingShelf,
}) {
  const { storageId, areaId } = useParams();
  const [storage, setStorage] = useState({});
  const [area, setArea] = useState({});
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentArea, setCurrentArea] = useState({});
  const [openDetailFloor, setOpenDetailFloor] = useState(false);
  const [currentSpace, setCurrentSpace] = useState({});
  const [currentFloor, setCurrentFloor] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenSelfStorage, setIsOpenSelfStorage] = useState(false);
  const [isOpenSpace, setIsOpenSpace] = useState(false);
  const [isHandy, setIsHandy] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [listShelves, setListShelves] = useState([]);
  const [detailFloor, setDetailFloor] = useState({});
  const [currentOrderDetail, setCurrentOrderDetail] = useState({});
  const [openOrderDetail, setOpenOrderDetail] = useState(false);

  const handleOpenOrderDetail = () => {
    setOpenOrderDetail(true);
  };

  const handleCloseOpenOrderDetail = () => {
    setOpenOrderDetail(false);
  };

  const handleOpenConfirm = (space) => {
    setCurrentSpace(space);
    setIsOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setIsOpenConfirm(false);
  };

  const handleOpenSelfStorage = (space, isEdit) => {
    if (isEdit) {
      setCurrentSpace({
        ...space,
        floorWidth: space.floors[0].width,
        floorHeight: space.floors[0].height,
        floorLength: space.floors[0].length,
      });
    } else {
      setCurrentSpace({ type: 0 });
    }
    setCurrentSpace(space);

    setIsOpenSelfStorage(true);
  };

  const handleCloseSelfStorage = (space, isEdit) => {
    setCurrentSpace({});
    setIsEdit(false);
    setIsOpenSelfStorage(false);
  };

  const handleOpenSpace = (space, isEdit) => {
    setIsEdit(isEdit);
    if (isEdit) {
      setCurrentSpace({
        ...space,
        floorWidth: space.floors[0].width,
        floorHeight: space.floors[0].height,
        floorLength: space.floors[0].length,
      });
    } else {
      setCurrentSpace({ type: 0 });
    }
    setIsOpenSpace(true);
  };

  const handleCloseSpace = () => {
    setCurrentSpace({});
    setIsEdit(false);
    setIsOpenSpace(false);
  };

  const handleOpenDetailFloor = (space) => {
    setCurrentSpace(space);
    setOpenDetailFloor(true);
  };

  const handleCloseDetailFloor = () => {
    setCurrentFloor({});
    setCurrentSpace({});
    setOpenDetailFloor(false);
  };

  const handleDeleteSpace = async (id) => {
    console.log(id);
    try {
      await deleteSpace(id, userState.idToken);
      setCurrentSpace({});
      await getData();
      showSnackbar("success", "Xóa không gian thành công!");
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        setListShelves([]);
        showSnackbar("success", "Xóa không gian thành công!");
      } else {
        throw error;
      }
    }
  };
  const getData = async () => {
    try {
      showLoading();
      let storageTemp = await getStorageDetail(storageId, userState.idToken);

      setStorage(storageTemp.data);
      let response = await getListSpace(
        searchName,
        page,
        6,
        areaId,
        userState.idToken
      );
      setListShelves(response.data.data);

      let area = await getDetailArea(areaId, userState.idToken);
      setArea(area.data);
      setTotalPage(response.data.metadata.totalPage);
      hideLoading();
    } catch (e) {
      console.log(e);
      hideLoading();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isLoadingShelf]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      <ModalOrderDetail
        handleClose={handleCloseOpenOrderDetail}
        open={openOrderDetail}
        currentOrderDetail={currentOrderDetail}
      />
      <ConfirmModal
        open={isOpenConfirm}
        handleClose={handleCloseConfirm}
        onHandleYes={handleDeleteSpace}
        id={currentSpace.id}
        msg={"Xóa không gian thành công!"}
      />{" "}
      <ModalDetailFloor
        detailFloor={detailFloor}
        open={openDetailFloor}
        handleClose={handleCloseDetailFloor}
        handleOpenOrderDetail={handleOpenOrderDetail}
        setCurrentOrderDetail={setCurrentOrderDetail}
      />
      <SelfStorageModal
        currentSpace={currentSpace}
        setCurrentSpace={setCurrentSpace}
        open={isOpenSelfStorage}
        handleClose={handleCloseSelfStorage}
      />
      <ModalSpace
        currentSpace={currentSpace}
        getData={getData}
        setCurrentSpace={setCurrentSpace}
        open={isOpenSpace}
        handleClose={handleCloseSpace}
        isEdit={isEdit}
        areaId={area.id}
        searchName={searchName}
        isHandy={isHandy}
        setIsHandy={setIsHandy}
      />
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
          // onChange={(e) => onHandleSearch(e)}
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
        <ProductButton
          imgUrl={"/img/product.png"}
          quantity={storedOrder?.totalQuantity}
          isView={false}
          // getData={getData}
          name={searchName}
          page={page}
        />
        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginLeft: "1%",
          }}
          color="primary"
          variant="contained"
          onClick={() => {
            if (area.type === 1) {
              handleOpenSpace({}, false);
            } else {
              handleOpenSelfStorage({}, false);
            }
          }}
        >
          {area?.type === TYPE_AREA["Kho tự quản"]
            ? "Tạo kho"
            : "Tạo không gian chứa"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "95%",
          height: "80%",
          overflowY: "scroll",
          margin: "1% 2%",
          padding: "1%",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
          }}
        >
          {storage.name} / {area.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AreaUsage value={80} />
          <Box
            sx={{
              width: "2px",
              height: "100%",
              margin: "2% 3%",
              display: "flex",
              backgroundColor: "black",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "70%",
              justifyContent: "flex-start",
            }}
          >
            <ListShelf
              storage={storage}
              area={area}
              setDetailFloor={setDetailFloor}
              handleOpen={handleOpenDetailFloor}
              handleOpenSpace={handleOpenSpace}
              handleOpenSelfStorage={handleOpenSelfStorage}
              listShelf={listShelves}
              handleOpenConfirm={handleOpenConfirm}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  storedOrder: state.order.storedOrder,
  isLoadingShelf: state.order.isLoadingShelf,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    openStoredOrderModal: (isView) =>
      dispatch(action.openStoredOrderModal(isView)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AreaDetailNew);
