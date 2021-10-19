import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Card,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import OrderModal from "./ViewOrder/OrderModal";
import ListOrder from "./ViewOrder/ListOrder";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { getOrder } from "../../apis/Apis";
function Order({ showLoading, hideLoading, showSnackbar }) {
  const navigate = useNavigate();
  const { handleSubmit, reset, control, setValue } = useForm();

  const [currentOrder, setCurrentOrder] = useState();
  const [open, setOpen] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [searchId, setSearchId] = useState("");
  const onHandleOpen = () => {
    setOpen(true);
  };

  const onHandleClose = () => {
    setOpen(false);
  };

  const getData = async (id, page, size) => {
    try {
      showLoading();
      let list = await getOrder(page, size);
      setListOrder(list.data.data);
      setTotalOrder(list.data.metadata.total);
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

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
          hiddenLabel
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
        <Box sx={{ width: "2%" }} />
        <Button
          style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
          color="primary"
          variant="contained"
          onClick={(e) => {
            navigate("/orders/makingOrder");
          }}
        >
          Create order
        </Button>
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <ListOrder
          listOrder={listOrder}
          searchId={searchId}
          page={page}
          totalOrder={totalOrder}
          handleOpen={onHandleOpen}
          setOrder={setCurrentOrder}
          getData={getData}
          reset={reset}
          setListOrder={setListOrder}
          setPage={setPage}
        />
      </Card>
    </Box>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(null, mapDispatchToProps)(Order);
