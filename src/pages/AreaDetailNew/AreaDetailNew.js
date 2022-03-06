import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
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
import {
  AREA_TYPE,
  BOX_TYPE,
  SELF_STORAGE_TYPE,
} from "../../constant/constant";
import { TYPE_AREA, TYPE_SHELF } from "../../constant/constant";

function AreaDetailNew({
  storedOrder,
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
}) {
  const { storageId, areaId } = useParams();
  const [storage, setStorage] = useState({});
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [currentArea, setCurrentArea] = useState({});

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
        console.log(listShelves);
        listShelves = listShelves.map((e) => {
          return { ...e, boxSize: e?.boxes[0]?.sizeType };
        });

        let area = await getDetailArea(areaId, userState.idToken);

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
