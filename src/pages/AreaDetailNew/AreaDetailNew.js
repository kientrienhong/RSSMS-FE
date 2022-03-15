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
  getListShelves,
  getDetailArea,
  getProduct,
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

function AreaDetailNew({
  storedOrder,
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
}) {
  const { storageId, areaId } = useParams();
  const [storage, setStorage] = useState({});
  const [area, setArea] = useState({});
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentArea, setCurrentArea] = useState({});
  const [openDetailFloor, setOpenDetailFloor] = useState(false);
  const [currentShelf, setCurrentShelf] = useState({});
  const [currentFloor, setCurrentFloor] = useState({});

  const handleOpenDetailFloor = (shelf, floor) => {
    console.log(floor);
    setCurrentFloor(floor);
    setCurrentShelf(shelf);
    setOpenDetailFloor(true);
  };

  const handleCloseDetailFloor = () => {
    setCurrentFloor({});
    setCurrentShelf({});
    setOpenDetailFloor(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        let storageTemp = await getStorageDetail(storageId, userState.idToken);

        setStorage(storageTemp.data);
        let response = await getListShelves(
          searchName,
          page,
          6,
          areaId,
          userState.idToken
        );
        let listShelves = response.data.data;
        listShelves = listShelves.map((e) => {
          return { ...e, boxSize: e?.boxes[0]?.sizeType };
        });
        let area = await getDetailArea(areaId, userState.idToken);
        setArea(area.data);

        setTotalPage(response.data.metadata.totalPage);
      } catch (e) {
        console.log(e);
        hideLoading();
      }
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData();
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      <ModalDetailFloor
        currentFloor={currentFloor}
        open={openDetailFloor}
        handleClose={handleCloseDetailFloor}
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
            marginLeft: "2%",
          }}
          color="primary"
          variant="contained"
          onClick={() => {}}
        >
          {currentArea.type === TYPE_AREA["Self-Storage"]
            ? "Create storage"
            : "Create shelf"}
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

              justifyContent: "flex-start",
            }}
          >
            <ListShelf
              handleOpen={handleOpenDetailFloor}
              listShelf={[
                {
                  name: "Shelf - 1",
                  width: 3,
                  height: 3,
                  length: 3,
                  usage: 6,
                  floors: [
                    {
                      name: "Tầng 1",
                      usage: 30,
                    },
                    {
                      name: "Tầng 2",
                      usage: 40,
                    },
                    {
                      name: "Tầng 3",
                      usage: 50,
                    },
                    {
                      name: "Tầng 4",
                      usage: 60,
                    },
                  ],
                },
                {
                  name: "Shelf - 2",
                  width: 3,
                  height: 3,
                  length: 3,
                  usage: 6,
                  floors: [
                    {
                      name: "Tầng 1",
                      usage: 30,
                    },
                    {
                      name: "Tầng 2",
                      usage: 40,
                    },
                    {
                      name: "Tầng 3",
                      usage: 50,
                    },
                    {
                      name: "Tầng 4",
                      usage: 60,
                    },
                  ],
                },
                {
                  name: "Shelf - 3",
                  width: 3,
                  height: 3,
                  length: 3,
                  usage: 6,
                  floors: [
                    {
                      name: "Tầng 1",
                      usage: 30,
                    },
                    {
                      name: "Tầng 2",
                      usage: 40,
                    },
                    {
                      name: "Tầng 3",
                      usage: 50,
                    },
                    {
                      name: "Tầng 4",
                      usage: 60,
                    },
                  ],
                },
                {
                  name: "Shelf - 4",
                  width: 3,
                  height: 3,
                  length: 3,
                  usage: 6,
                  floors: [
                    {
                      name: "Tầng 1",
                      usage: 30,
                    },
                    {
                      name: "Tầng 2",
                      usage: 40,
                    },
                    {
                      name: "Tầng 3",
                      usage: 50,
                    },
                    {
                      name: "Tầng 4",
                      usage: 60,
                    },
                  ],
                },
                {
                  name: "Shelf - 5",
                  width: 3,
                  height: 3,
                  length: 3,
                  usage: 6,
                  floors: [
                    {
                      name: "Tầng 1",
                      usage: 30,
                    },
                    {
                      name: "Tầng 2",
                      usage: 40,
                    },
                    {
                      name: "Tầng 3",
                      usage: 50,
                    },
                    {
                      name: "Tầng 4",
                      usage: 60,
                    },
                  ],
                },
              ]}
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
