import React, { useState } from "react";
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

export default function Order() {
  const navigate = useNavigate();
  const { handleSubmit, reset, control } = useForm();

  const [currentOrder, setCurrentOrder] = useState();
  const [open, setOpen] = useState(false);
  const [listOrder, setListOrder] = useState([
    {
      id: 1,
      customerName: "Hong Kien Trien",
      addressDelivery: "2 Gia Phu phuong 13, quan 5",
      type: "Keeping item",
      isPaid: true,
      status: "paid",
      customerPhone: "0777457405",
    },
  ]);
  const [page, setPage] = useState(1);
  const [totalOrder, setTotalOrder] = useState(0);
  const [searchId, setSearchId] = useState("");
  const onHandleOpen = () => {
    setOpen(true);
  };

  const onHandleClose = () => {
    setOpen(false);
  };

  const getData = () => {};

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
        handleClose={onHandleClose}
        handleSubmit={handleSubmit}
        control={control}
        currentOrder={currentOrder}
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
