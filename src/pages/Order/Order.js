import React, {useState, useEffect} from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Card,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router";
import ListOrder from "./ViewOrder/ListOrder";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import {getOrder} from "../../apis/Apis";
import UpdateOrderModal from "../../components/UpdateOrderModal";
import MultipleSelectCheckmarks from "../../components/MultipleSelectCheckmarks";
import {ORDER_STATUS} from "../../constant/constant";
import OrderModal from "../../components/OrderModal";
import {ErrorHandle} from "../../utils/ErrorHandle";
function Order({
  isLoadingOrder,
  showLoading,
  hideLoading,
  storedOrder,
  userState,
  showSnackbar,
  handleExtendSession,
}) {
  const [openUpdateOrder, setOpenUpdateOrder] = React.useState(false);

  const navigate = useNavigate();
  const {handleSubmit, reset, control} = useForm();

  const [currentOrder, setCurrentOrder] = useState();
  const [open, setOpen] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [currentFilter, setCurrentFilter] = useState([]);
  const handleChangeFilter = (event) => {
    const {
      target: {value},
    } = event;
    setCurrentFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleUpdateOrderOpen = () => {
    setOpenUpdateOrder(true);
  };

  const handleUpdateOrderClose = () => {
    setOpenUpdateOrder(false);
  };

  const onHandleOpen = () => {
    setOpen(true);
  };

  const onHandleClose = () => {
    setOpen(false);
  };

  const handleChangeSearchId = (e) => {
    setSearchId(e.target.value);
  };

  const getData = async (id, page, size) => {
    try {
      showLoading();
      let list = await getOrder(
        id,
        page,
        size,
        undefined,
        undefined,
        userState.idToken
      );
      setListOrder(list.data.data);
      setTotalOrder(list.data.metadata.total);
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      if (error?.response?.data?.error) {
        if (
          error?.response?.data?.error?.message === "Unrecognized Guid format."
        ) {
          navigate("/app/not_storage");
        }
      }
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        let currentFilterTemp = undefined;
        if (currentFilter.length > 0) {
          currentFilterTemp = currentFilter.join("&OrderStatuses=");
        }
        const list = await getOrder(
          "",
          page,
          8,
          undefined,
          undefined,
          userState.idToken,
          currentFilterTemp
        );
        setListOrder(list.data.data);
        setTotalOrder(list.data.metadata.total);
      } catch (error) {
        console.log(error.response);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, [currentFilter]);

  useEffect(() => {
    const searchNameCall = async () => {
      try {
        showLoading();
        await getData(searchId, 1, 8);
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
  }, [searchId]);

  useEffect(() => {
    const process = async () => {
      try {
        showLoading();
        await getData(searchId, page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    process();
  }, [page, isLoadingOrder]);

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
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
      <UpdateOrderModal
        open={openUpdateOrder}
        handleClose={handleUpdateOrderClose}
        currentOrder={currentOrder}
        getData={getData}
        page={page}
        searchId={searchId}
      />
      <OrderModal
        open={open}
        reset={reset}
        handleClose={onHandleClose}
        handleSubmit={handleSubmit}
        control={control}
        currentOrder={currentOrder}
        getData={getData}
        page={page}
        searchId={searchId}
        isView={userState.roleName === "Admin"}
      />

      <Box
        sx={{
          marginLeft: "2%",
          marginBottom: "1%",
          display: "flex",
          height: "45px",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextField
          hiddenLabel
          sx={{
            width: "80%",
          }}
          onChange={handleChangeSearchId}
          InputProps={{
            style: {height: "45px", backgroundColor: "white"},
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <MultipleSelectCheckmarks
          handleChange={handleChangeFilter}
          currentData={currentFilter}
          listData={ORDER_STATUS[1]}
          name={"Lọc theo tình trạng"}
        />
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{marginLeft: "2%", marginRight: "2%"}}
      >
        {listOrder.length > 0 ? (
          <ListOrder
            listOrder={listOrder}
            searchId={searchId}
            page={page}
            totalOrder={totalOrder}
            handleOpen={onHandleOpen}
            setOrder={setCurrentOrder}
            getData={getData}
            reset={reset}
            handleUpdateOrderOpen={handleUpdateOrderOpen}
            setListOrder={setListOrder}
            setPage={setPage}
            currentOrder={currentOrder}
          />
        ) : (
          <Typography
            color="black"
            variant="h5"
            style={{
              textAlign: "center",
              margin: "2% 0",
            }}
          >
            Không tìm thấy đơn hàng
          </Typography>
        )}
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  storedOrder: state.order.storedOrder,
  isLoadingOrder: state.order.isLoadingOrder,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
