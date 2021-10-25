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
} from "../../apis/Apis";
import SearchIcon from "@mui/icons-material/Search";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import AreaDetailView from "./components/AreaDetailView";
import AreaUsage from "./components/AreaUsage";
import SheflModal from "./components/SheflModal";
import ProductButton from "../Order/CreateOrder/components/ProductButton";

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
  const { showLoading, hideLoading, storedOrder } = props;
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
  const handleOpen = (isEdit) => {
    setIsEdit(isEdit);
    setOpen(true);
    setIsModifyShelf(true);
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
  }, [page]);

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
      <SheflModal
        currentShelf={currentShelf}
        open={open}
        setCurrentShelf={setCurrentShelf}
        handleClose={handleClose}
        page={page}
        getData={getData}
        areaId={areaId}
        isEdit={isEdit}
        searchName={searchName}
        setIsHandy={setIsHandy}
        isHandy={isHandy}
        isModifyShelf={isModifyShelf}
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
          quantity={storedOrder.totalQuantity}
          isView={false}
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
            setIsHandy(true);
            handleOpen(false);
            setCurrentShelf({});
          }}
        >
          Create shelf
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
