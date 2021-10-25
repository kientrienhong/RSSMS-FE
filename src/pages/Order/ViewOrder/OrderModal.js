import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import TagSelection from "../CreateOrder/components/TagSelection";
import CustomInput from "../../../components/CustomInput";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import OrderDetail from "./components/OrderDetail";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { updateOrder } from "../../../apis/Apis";
const styleModal = {
  position: "absolute",
  top: "0%",
  right: "0",
  width: "40%",
  height: "92vh",
  overflow: "hidden",
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const styleButtonPlus = {
  width: "26px",
  height: "26px",
  borderRadius: "4px",
  padding: "2%",
  backgroundColor: "#04BFFE",
  color: "white",
  marginRight: "6%",
  marginLeft: "6%",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const styleButtonMinus = {
  ...styleButtonPlus,
  color: "#A19FA8",
  backgroundColor: "white",
  border: "1px #A19FA8 solid",
};
const listTime = [
  { name: "8am - 10am", isAvailable: true },
  { name: "10am - 12am", isAvailable: true },
  { name: "12pm - 14pm", isAvailable: true },
  { name: "14am - 16pm", isAvailable: true },
  { name: "18am - 20am", isAvailable: true },
];
const styleInput = {
  border: "1px #A19FA8 solid",
  textAlign: "center",
  borderRadius: "4px",
  height: "32px",
  width: "20%",
};
function OrderModal({
  open,
  handleClose,
  currentOrder,
  handleSubmit,
  control,
  reset,
  hideLoading,
  showLoading,
  showSnackbar,
  getData,
  page,
  searchId,
  storeOrder,
}) {
  const [isCustomerDelivery, setIsCustomerDelivery] = useState();
  const [timeDelivery, setTimeDelivery] = useState();
  const [duration, setDuration] = useState();
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const [statusOrder, setStatusOrder] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(0);

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(parseInt(e.target.value));
  };
  const handleChangeCheckBox = (event) => {
    setIsCustomerDelivery(event.target.checked);
    setTimeDelivery({});
  };

  const handleStoreOrder = () => {
    storeOrder(currentOrder);
    handleClose();
  };

  useEffect(() => {
    setDateDelivery(currentOrder?.deliveryDate?.split("T")[0]);
    setTimeDelivery({
      name: currentOrder?.deliveryTime,
      isAvailable: true,
    });
    let currentDuration;
    if (currentOrder?.typeOrder === 0) {
      setDuration(currentOrder?.durationMonths);
      currentDuration = currentOrder?.durationMonths;
    } else {
      setDuration(currentOrder?.durationDays);
      currentDuration = currentOrder?.durationDays;
    }
    setIsPaid(currentOrder?.isPaid);
    setIsCustomerDelivery(currentOrder?.isUserDelivery);
    setStatusOrder(currentOrder?.status);
    if (currentOrder?.deliveryDate !== undefined) {
      let date = new Date(currentOrder?.deliveryDate);
      if (date) {
        if (currentOrder?.typeOrder === 0) {
          date.setMonth(date.getMonth() + currentDuration);
        } else {
          date.setDate(date.getDate() + currentDuration);
        }
        setDateReturn(new Date(date).toISOString().split("T")[0]);
      }
    }
  }, [currentOrder]);

  const listStatus = [
    { label: "Canceled", value: 0 },
    { label: "Booked", value: 1 },
    { label: "Paid", value: 2 },
    { label: "Delivery", value: 3 },
    { label: "Stored", value: 4 },
    { label: "Expired", value: 5 },
  ];

  const generateSelectOptions = () => {
    return listStatus.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const handleChangeDeliveryDate = (e) => {
    setDateDelivery(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(dateReturn);
      let parseDateDelivery = new Date(e.target.value);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const handleOnClickMinus = (event) => {
    event.preventDefault();

    if (duration > 0) {
      let newDuration = duration - 1;
      setDuration(newDuration);
      let currentDate = new Date(dateReturn);

      let newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      setDateReturn(newDate.toLocaleDateString("en-US"));
    }
  };

  const handleOnClickPlus = (event) => {
    event.preventDefault();

    let newDuration = duration + 1;
    setDuration(newDuration);
    let currentDate = new Date(dateReturn);
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setDateReturn(newDate.toLocaleDateString("en-US"));
  };

  const handleChaneReturnDate = (e) => {
    setDateReturn(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(e.target.value);
      let parseDateDelivery = new Date(dateDelivery);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const mapListTime = (time, setTime) =>
    listTime.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={setTime}
          setIsCustomerDelivery={setIsCustomerDelivery}
        />
      </Grid>
    ));
  const buildInformation = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
        }}
      >
        <Typography color="black" variant="h2">
          {title}
        </Typography>
        <p style={{ fontSize: "18px" }}>{value}</p>
      </Box>
    );
  };

  const formatToChosenProduct = () => {
    let result = {
      product: [],
      services: [],
      accessory: [],
    };

    currentOrder?.orderDetails.forEach((e) => {
      let type;

      if (e.productType === 0 || e.productType === 2 || e.productType === 4) {
        type = "product";
      } else if (e.producType === 1) {
        type = "accessory";
      } else {
        type = "services";
      }

      result[type].push({
        name: e.productName,
        quantity: e.amount,
        price: e.price,
      });
    });

    return result;
  };

  const handleChangeStatus = (e) => {
    setStatusOrder(parseInt(e.target.value));
  };

  const onSubmit = async (data) => {
    try {
      showLoading();
      const orderTemp = {
        id: currentOrder.id,
        isUserDelivery: isCustomerDelivery,
        deliveryDate: new Date(dateDelivery).toISOString(),
        deliveryTime: timeDelivery.name,
        returnDate: new Date(dateReturn).toISOString(),
        deliveryAddress: data.deliveryAddress,
        addressReturn: data.returnAddress,
        status: statusOrder,
        isPaid: isPaid,
      };

      await updateOrder(orderTemp.id, orderTemp);
      await getData(searchId, page, 8);
      handleClose();
      showSnackbar("success", "Update order success");
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          pading: "3%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Typography color="black" variant="h2" sx={{ marginBottom: "4%" }}>
            Order Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography color="black" variant="h2">
              Order id
            </Typography>
            <Typography color="black" variant="h2">
              #{currentOrder?.id}
            </Typography>
          </Box>
          {buildInformation("Customer name", currentOrder?.customerName)}
          {buildInformation("Customer phone", currentOrder?.customerPhone)}
          {buildInformation(
            "Type",
            currentOrder?.typeOrder === 0 ? "Self-Storage" : "Door to door"
          )}
          <Typography
            color="black"
            variant="h2"
            sx={{ marginBottom: "4%", marginTop: "4%" }}
          >
            Time
          </Typography>
          <Typography color="black" variant="h3" sx={{ marginBottom: "2%" }}>
            {currentOrder?.typeOrder === 0
              ? "Start Date"
              : "Delivery Date Time"}
          </Typography>
          <TextField
            id="date"
            type="date"
            defaultValue={dateDelivery}
            onChange={handleChangeDeliveryDate}
            sx={{ width: 220, marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {currentOrder?.typeOrder === 0 ? null : (
            <Box>
              <Grid
                container
                spacing={2}
                sx={{
                  width: "98%",
                  marginBottom: "3%",
                }}
              >
                {mapListTime(timeDelivery, setTimeDelivery)}
              </Grid>
              <FormControlLabel
                value="isCustomerDelivery"
                control={
                  <Checkbox
                    checked={isCustomerDelivery}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Customer delivery by themselves"
                labelPlacement="Customer delivery by themselves"
              />
            </Box>
          )}
          {currentOrder?.typeOrder === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6%",
              }}
            >
              <Typography variant="h2" style={{ marginBottom: "3%" }}>
                Duration (months)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button style={styleButtonMinus} onClick={handleOnClickMinus}>
                  -
                </button>
                <input style={styleInput} value={duration}></input>
                <button style={styleButtonPlus} onClick={handleOnClickPlus}>
                  +
                </button>
              </Box>
            </Box>
          ) : null}
          <Typography color="black" variant="h3" sx={{ marginBottom: "2%" }}>
            {currentOrder?.typeOrder === 0 ? "End Date" : "Return Date Time"}
          </Typography>
          <TextField
            id="date"
            onChange={handleChaneReturnDate}
            type="date"
            defaultValue={dateReturn}
            sx={{ width: 220, marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {currentOrder?.typeOrder === 0 ? null : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "2%",
              }}
            >
              <Typography color="black" variant="h3" sx={{ marginRight: "2%" }}>
                Durations:
              </Typography>
              <Typography color="primary" variant="h3">
                {duration} {currentOrder?.typeOrder === 0 ? "months" : "days"}
              </Typography>
            </Box>
          )}

          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Delivery address:
          </Typography>
          <CustomInput
            control={control}
            rules={{}}
            styles={{ width: "300px" }}
            name="deliveryAddress"
            label="Delivery Address"
            disabled={false}
            userInfo={currentOrder?.deliveryAddress}
            inlineStyle={{}}
          />
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Delivery item address:
          </Typography>
          <CustomInput
            control={control}
            rules={{}}
            styles={{ width: "300px", display: "block" }}
            name="returnAddress"
            label="Return Address"
            disabled={false}
            userInfo={currentOrder?.addressReturn}
            inlineStyle={{}}
          />
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Payment
          </Typography>
          <Box>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                value={paymentMethod}
                onChange={handleChangePaymentMethod}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Not paid yet"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Pay on cash"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Transfer money"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Typography
            color="black"
            variant="h3"
            sx={{ marginBottom: "2%", marginTop: "4%" }}
          >
            Status
          </Typography>
          <FormControl
            sx={{ m: 1, minWidth: 120, color: "black", margin: "0 0 16px 0" }}
            name="status"
          >
            <Select
              displayEmpty
              value={statusOrder}
              sx={{
                marginTop: "11%",
              }}
              onChange={handleChangeStatus}
            >
              {generateSelectOptions()}
            </Select>
          </FormControl>
          <Typography
            color="black"
            variant="h2"
            sx={{ marginBottom: "4%", marginTop: "4%" }}
          >
            Order Detail
          </Typography>
          <OrderDetail
            choosenProduct={formatToChosenProduct()}
            duration={duration}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "4%",
              }}
              color="primary"
              variant="contained"
              onClick={() => handleStoreOrder()}
            >
              Store
            </Button>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "4%",
              }}
              color="success"
              variant="contained"
              type="submit"
            >
              Edit
            </Button>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              color="error"
              onClick={() => handleClose()}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    storeOrder: (order) => dispatch(action.storeOrder(order)),
  };
};
export default connect(null, mapDispatchToProps)(OrderModal);