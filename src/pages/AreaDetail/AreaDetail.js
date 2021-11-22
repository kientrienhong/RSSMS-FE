import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

import {
  getStorageDetail,
  getListShelves,
  getDetailArea,
  getProduct,
} from "../../apis/Apis";
import {
  AREA_TYPE,
  BOX_TYPE,
  SELF_STORAGE_TYPE,
} from "../../constant/constant";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import AreaDetailView from "./components/AreaDetailView";
import AreaUsage from "./components/AreaUsage";
import SheflModal from "./components/SheflModal";
import ProductButton from "../Order/CreateOrder/components/ProductButton";
import { TYPE_STORAGE, TYPE_SHELF } from "../../constant/constant";
import SelfStorageModal from "./components/SelfStorageModal";
const listHandy = [
  { name: "Bolo", usage: 100 },
  { name: "Size S", usage: 100 },
  { name: "Size M", usage: 100 },
  { name: "Size L", usage: 100 },
  { name: "Size XL", usage: 100 },
];

const listUnwieldy = [
  { name: "0.5m2", usage: 100 },
  { name: "1m2", usage: 100 },
  { name: "2m2", usage: 100 },
  { name: "3m2", usage: 100 },
];
function AreaDetail(props) {
  const { storageId, areaId } = useParams();
  const [storage, setStorage] = useState({});
  const { showLoading, hideLoading, storedOrder, isLoadingShelf } = props;
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentShelf, setCurrentShelf] = useState({});
  const [listShelf, setListShelf] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [isHandy, setIsHandy] = useState(true);
  const [currentArea, setCurrentArea] = useState({});
  const [isModifyShelf, setIsModifyShelf] = useState(false);
  const [listBoxes, setListBoxes] = useState([]);
  const [listAreas, setListAreas] = useState([]);
  const [listSelfStorage, setListSelfStorage] = useState([]);
  const handleOpen = async (isEdit) => {
    try {
      showLoading();
      setIsEdit(isEdit);
      if (storage.type === TYPE_STORAGE["Self-Storage"]) {
        const listSelfStorageTemp = await getProduct(SELF_STORAGE_TYPE);
        setListSelfStorage(
          listSelfStorageTemp.data[SELF_STORAGE_TYPE.toString()]
        );
      } else {
        const listBoxexTemp = await getProduct(BOX_TYPE);
        const listAreasTemp = await getProduct(AREA_TYPE);
        setListBoxes(listBoxexTemp.data[BOX_TYPE.toString()]);
        setListAreas(listAreasTemp.data[AREA_TYPE.toString()]);
      }

      setOpen(true);
      setIsModifyShelf(true);
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const onHandleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentShelf({});
    setIsModifyShelf(false);
  };

  const getData = async (name, page) => {
    try {
      showLoading();
      let response = await getListShelves(name, page, 6, parseInt(areaId));
      let listShelves = response.data.data;
      listShelves = listShelves.map((e) => {
        return { ...e, boxSize: e.boxes[0].sizeType };
      });
      setTotalPage(response.data.metadata.totalPage);
      setListShelf(listShelves);
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        let storageTemp = await getStorageDetail(parseInt(storageId));
        setStorage(storageTemp.data);
        let response = await getListShelves(
          searchName,
          page,
          6,
          parseInt(areaId)
        );
        let listShelves = response.data.data;
        listShelves = listShelves.map((e) => {
          return { ...e, boxSize: e.boxes[0].sizeType };
        });

        let area = await getDetailArea(parseInt(areaId));
        setCurrentArea(area.data);
        setTotalPage(response.data.metadata.totalPage);
        setListShelf(listShelves);
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

  useEffect(() => {
    const process = async () => {
      try {
        showLoading();
        await getData(searchName, page, 6);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    process();
  }, [page, isLoadingShelf]);

  useEffect(() => {
    const searchNameCall = async () => {
      try {
        showLoading();
        await getData(searchName, 1, 6);
        setPage(1);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };

    const timeOut = setTimeout(() => searchNameCall(), 700);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchName]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {storage.type === TYPE_STORAGE["Self-Storage"] ? (
        <SelfStorageModal
          currentShelf={currentShelf}
          open={open}
          setCurrentShelf={setCurrentShelf}
          handleClose={handleClose}
          page={page}
          getData={getData}
          areaId={areaId}
          isEdit={isEdit}
          searchName={searchName}
          isModifyShelf={isModifyShelf}
          listSelfStorage={listSelfStorage}
        />
      ) : (
        <SheflModal
          currentShelf={currentShelf}
          open={open}
          setCurrentShelf={setCurrentShelf}
          handleClose={handleClose}
          page={page}
          getData={getData}
          listBoxes={listBoxes}
          listAreas={listAreas}
          areaId={areaId}
          isEdit={isEdit}
          searchName={searchName}
          setIsHandy={setIsHandy}
          isHandy={isHandy}
          isModifyShelf={isModifyShelf}
        />
      )}

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
          onChange={(e) => onHandleSearch(e)}
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
          getData={getData}
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
          onClick={() => {
            setIsEdit(false);
            setIsHandy(true);
            handleOpen(false);
            storage.type === TYPE_STORAGE["Self-Storage"]
              ? setCurrentShelf({
                  ...currentShelf,
                  boxesInWidth: 1,
                  boxesInHeight: 1,
                  boxes: [{}],
                  type: TYPE_SHELF["Self-storage"],
                })
              : setCurrentShelf({});
          }}
        >
          {storage.type === TYPE_STORAGE["Self-Storage"]
            ? "Create storage"
            : "Create shelf"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <AreaDetailView
          storage={storage}
          listShelf={listShelf}
          setCurrentShelf={setCurrentShelf}
          handleOpen={handleOpen}
          setIsHandy={setIsHandy}
          setPage={setPage}
          currentShelf={currentShelf}
          getData={getData}
          searchName={searchName}
          page={page}
          totalPage={totalPage}
          area={currentArea}
          isModifyShelf={isModifyShelf}
          storageId={storageId}
        />
        <Box
          sx={{
            margin: "2%",
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          <AreaUsage
            list={listHandy}
            name={"Handy Usage"}
            numberInRow={3}
            currentArea={currentArea}
          />
          <AreaUsage
            list={listUnwieldy}
            name={"Unwieldy Usage"}
            numberInRow={2}
            currentArea={currentArea}
          />
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  storedOrder: state.order.storedOrder,
  isLoadingShelf: state.order.isLoadingShelf,
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
export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail);
