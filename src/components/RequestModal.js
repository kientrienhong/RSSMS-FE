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
import TagSelection from "../pages/Order/CreateOrder/components/TagSelection";
import CustomInput from "./CustomInput";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import OrderDetail from "./OrderDetail";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import ListInfoHistoryExtension from "./ListInfoHistoryExtension";
import { updateOrder } from "../apis/Apis";
import { useNavigate } from "react-router";
import { PRODUCT_TYPE, LIST_STATUS, LIST_TIME } from "../constant/constant";
import ListPositionStored from "./ListPositionStored";
import { Controller } from "react-hook-form";
import CustomSelect from "./CustomSelect";

const styleModal = {
  position: "absolute",
  top: "1%",
  right: "10%",
  width: "80%",
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

const styleInput = {
  border: "1px #A19FA8 solid",
  textAlign: "center",
  borderRadius: "4px",
  height: "32px",
  width: "20%",
};

function RequestModal({
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
  userState,
  isView,
}) {
  const [returnAddress, setReturnAddress] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [timeDelivery, setTimeDelivery] = useState();
  const [timeReturn, setTimeReturn] = useState();
  const [duration, setDuration] = useState();
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const [statusOrder, setStatusOrder] = useState();
  const [isPaid, setIsPaid] = useState();
  const [isCustomerDelivery, setIsCustomerDelivery] = useState();
  const [isCustomerReturn, setIsCustomerReturn] = useState();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const navigate = useNavigate();
  const handleChangePaymentMethod = (e) => {
    if (isView === true) {
      return;
    }
    setPaymentMethod(parseInt(e.target.value));
  };
  const handleChangeCheckBox = (event) => {
    if (isView === true) {
      return;
    }
    setIsCustomerDelivery(event.target.checked);
    setTimeDelivery({});
  };

  const handleChangeCheckBoxIsPaid = (event) => {
    if (isView === true) {
      return;
    }
    setIsPaid(event.target.checked);
  };

  const handleChangeCheckBoxCustomerReturn = (event) => {
    if (isView === true) {
      return;
    }
    setIsCustomerReturn(event.target.checked);
    setTimeReturn({});
  };

  const handleStoreOrder = () => {
    storeOrder(currentOrder);
    showSnackbar("success", "Store order success");
    if (userState.roleName === "Office staff") {
      navigate(`/app/storages/${userState.staffManageStorages[0].storageId}`, {
        replace: true,
      });
    } else {
      navigate("/app/storages", { replace: true });
    }
    handleClose();
  };

  useEffect(() => {
    if (currentOrder) {
      console.log(currentOrder);
      setReturnAddress(currentOrder?.addressReturn);
      setDeliveryAddress(currentOrder?.deliveryAddress);

      setDateDelivery(currentOrder?.deliveryDate?.split("T")[0]);

      setTimeDelivery({
        name: currentOrder?.deliveryTime,
        isAvailable: true,
      });
      setTimeReturn({
        name: currentOrder?.returnTime,
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
      reset({
        deliveryAddress: currentOrder.deliveryAddress,
        returnAddress: currentOrder.returnAddress,
        dateDelivery: currentOrder.deliveryDate?.split("T")[0],
      });
      if (currentOrder?.deliveryDate !== undefined) {
        let date = new Date(currentOrder?.deliveryDate);
        if (date) {
          // if (currentOrder?.typeOrder === 0) {
          //   date.setMonth(date.getMonth() + currentDuration);
          // } else {
          //   date.setDate(date.getDate() + currentDuration);
          // }
          setDateReturn(date.toISOString().split("T")[0]);
        }
      }
    }
  }, [currentOrder]);

  const generateSelectOptions = () => {
    return LIST_STATUS.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const handleChangeDeliveryDate = (e) => {
    if (isView === true) {
      return;
    }
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
    if (isView === true) {
      return;
    }

    if (duration > 0) {
      let newDuration = duration - 1;
      setDuration(newDuration);
      let currentDate = new Date(dateReturn);

      let newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      setDateReturn(newDate.toLocaleDateString("en-US"));
    }
  };

  const handleReturnItem = async () => {
    try {
      showLoading();
      await updateOrder(
        currentOrder.id,
        { ...currentOrder, status: 7 },
        userState.idToken
      );
      await getData(searchId, page, 8, userState.idToken);
      handleClose();
      showSnackbar("success", "Return order success");
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const handleOnClickPlus = (event) => {
    event.preventDefault();
    if (isView === true) {
      return;
    }

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

  const buildPosition = () => {
    return currentOrder?.orderDetails?.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "20%",
          }}
        >
          <Typography color="black" variant="h4" style={{ margin: "4%" }}>
            {e.sizeType}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "80%",
          }}
        >
          <Typography
            color="black"
            variant="h4"
            style={{ margin: "4%", textAlign: "right" }}
          >
            {e.areaName} / {e.shelfName}
          </Typography>
        </Box>
      </Box>
    ));
  };

  const mapListTime = (time, setTime, setIsCutomer) =>
    LIST_TIME.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={setTime}
          setIsCustomerDelivery={setIsCutomer}
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

    if (currentOrder?.orderDetaill) {
      currentOrder?.orderDetails?.forEach((e) => {
        let type = PRODUCT_TYPE[e.serviceType];
        result[type].push({
          name: e.serviceName,
          quantity: e.amount,
          price: e.price,
          imageUrl: e.serviceImageUrl,
          note: e.note,
        });
      });
    } else {
      currentOrder?.requestDetails?.forEach((e) => {
        let type = PRODUCT_TYPE[e.serviceType];
        result[type].push({
          name: e.serviceName,
          quantity: e.amount,
          price: e.price,
          imageUrl: e.serviceImageUrl,
          note: e.note,
        });
      });
    }

    return result;
  };

  const handleChangeStatus = (e) => {
    if (isView) {
      return;
    }

    setStatusOrder(parseInt(e.target.value));
  };

  const onSubmit = async (data) => {
    try {
      showLoading();
      console.log(data);
      const orderTemp = {
        id: currentOrder.id,
        isUserDelivery: isCustomerDelivery,
        deliveryDate: new Date(data.dateDelivery).toISOString(),
        deliveryTime: timeDelivery.name,
        returnTime: timeReturn.name,
        returnDate: new Date(currentOrder.returnDate).toISOString(),
        deliveryAddress: data.deliveryAddress,
        paymentMethod: paymentMethod,
        addressReturn: data.returnAddress,
        status: currentOrder?.status,
        isPaid: isPaid,
      };
      await updateOrder(orderTemp.id, orderTemp, userState.idToken);
      await getData(searchId, page, 8, userState.idToken);
      handleClose();
      showSnackbar("success", "Cập nhật đơn thành công!");
    } catch (error) {
      console.log(error);
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
          flexDirection: "row",
          pading: "3%",
        }}
      >
        <form
          onSubmit={
            handleSubmit === undefined ? () => {} : handleSubmit(onSubmit)
          }
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "44%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography color="black" variant="h2" sx={{ marginBottom: "4%" }}>
              Thông tin hóa đơn
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
                Mã đơn hàng
              </Typography>
              <Typography color="black" variant="h2">
                #{currentOrder?.id}
              </Typography>
            </Box>
            {buildInformation("Tên khách hàng", currentOrder?.customerName)}
            {buildInformation(
              "Số điện thoại khách hàng",
              currentOrder?.customerPhone
            )}
            {buildInformation(
              "Loại đơn",
              currentOrder?.typeOrder === 0 ? "Kho tự quản" : "Giữ đồ thuê"
            )}
            {buildInformation(
              "Trạng thái",
              LIST_STATUS[currentOrder?.status]?.label
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                color="black"
                variant="h2"
                sx={{ marginBottom: "2%", marginTop: "4%" }}
              >
                Đã thanh toán
              </Typography>
              <FormControlLabel
                value="isPaid"
                control={
                  <Checkbox
                    checked={isPaid}
                    onChange={handleChangeCheckBoxIsPaid}
                  />
                }
                label="Is paid"
                labelPlacement="Is paid"
              />
            </Box>
            <Typography
              color="black"
              variant="h3"
              sx={{ marginBottom: "2%", marginTop: "4%" }}
            >
              Địa chỉ lấy hàng:
            </Typography>
            <CustomInput
              control={control}
              rules={{}}
              styles={{ width: "300px" }}
              name="deliveryAddress"
              label="Địa chỉ lấy hàng"
              disabled={isView}
              userInfo={deliveryAddress}
              inlineStyle={{}}
            />
            <Typography
              color="black"
              variant="h3"
              sx={{ marginBottom: "2%", marginTop: "4%" }}
            >
              Địa chỉ trả hàng:
            </Typography>
            <CustomInput
              control={control}
              rules={{}}
              styles={{ width: "300px", display: "block" }}
              name="returnAddress"
              label="Địa chỉ trả hàng"
              disabled={isView}
              userInfo={returnAddress}
              inlineStyle={{}}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-bew",
              }}
            >
              <Typography
                color="black"
                variant="h2"
                sx={{ marginBottom: "4%", marginTop: "4%" }}
              >
                Thời gian
              </Typography>
            </Box>
            <Typography color="black" variant="h3" sx={{ marginBottom: "2%" }}>
              {currentOrder?.typeOrder === 0 ? "Ngày bắt đầu" : "Ngày lấy đơn"}
            </Typography>
            <Controller
              name={"dateDelivery"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    type="date"
                    disabled={isView}
                    defaultValue={value}
                    onChange={onChange}
                    sx={{ width: 220, marginBottom: "16px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                );
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
                  {mapListTime(
                    timeDelivery,
                    setTimeDelivery,
                    setIsCustomerDelivery
                  )}
                </Grid>
                <FormControlLabel
                  value="isCustomerDelivery"
                  control={
                    <Checkbox
                      checked={isCustomerDelivery}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Khách hàng tự vận chuyển"
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
                  Thời hạn (tháng)
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                color="black"
                variant="h3"
                sx={{ marginBottom: "2%" }}
              >
                {currentOrder?.typeOrder === 0
                  ? "Ngày kết thúc"
                  : "Ngày trả hàng"}
              </Typography>
              <Typography
                color="primary"
                variant="h3"
                sx={{ marginBottom: "2%", textAlign: "right" }}
              >
                {new Date(currentOrder?.returnDate).toLocaleDateString("en-US")}
              </Typography>
            </Box>

            {/* <TextField
              id="date"
              onChange={handleChaneReturnDate}
              type="date"
              defaultValue={dateReturn}
              sx={{ width: 220, marginBottom: "16px" }}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            {currentOrder?.typeOrder === 0 ? null : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "2%",
                }}
              >
                <Typography
                  color="black"
                  variant="h3"
                  sx={{ marginRight: "2%" }}
                >
                  Thời hạn:
                </Typography>
                <Typography color="primary" variant="h3">
                  {duration} {currentOrder?.typeOrder === 0 ? "tháng" : "ngày"}
                </Typography>
              </Box>
            )}
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
                  {mapListTime(timeReturn, setTimeReturn, setIsCustomerReturn)}
                </Grid>
                <FormControlLabel
                  value="isCustomerReturn"
                  control={
                    <Checkbox
                      checked={isCustomerReturn}
                      onChange={handleChangeCheckBoxCustomerReturn}
                    />
                  }
                  label="Khách tự vẫn chuyến trả đồ"
                  labelPlacement="Customer return by themselves"
                />
              </Box>
            )}

            <Typography
              color="black"
              variant="h3"
              sx={{ marginBottom: "2%", marginTop: "4%" }}
            >
              Phương thức thanh toán
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
                    label="Trả tiền mặt"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Chuyển khoản"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {currentOrder?.status === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  color="black"
                  variant="h3"
                  sx={{ marginBottom: "2%", marginTop: "4%" }}
                >
                  Lý do
                </Typography>
                <p style={{ color: "red" }}>{currentOrder?.rejectedReason}</p>
              </Box>
            ) : null}
          </Box>

          <Box
            sx={{
              width: "54%",
              marginLeft: "3%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              sx={{ marginBottom: "4%", marginTop: "4%" }}
            >
              Chi tiết đơn hàng
            </Typography>
            <OrderDetail
              choosenProduct={formatToChosenProduct()}
              duration={duration}
            />

            {currentOrder?.orderHistoryExtensions?.length > 0 ? (
              <ListInfoHistoryExtension
                list={currentOrder?.orderHistoryExtensions}
                currentOrder={currentOrder}
              />
            ) : (
              <></>
            )}
            {currentOrder?.orderDetails?.boxDetails != null ? (
              <ListPositionStored currentOrder={currentOrder} />
            ) : (
              <></>
            )}
            {isView === true ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    height: "45px",
                    width: "30%",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  color="error"
                  onClick={() => handleClose()}
                  variant="outlined"
                >
                  Đóng
                </Button>
              </Box>
            ) : (
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
                  Lưu trữ đơn
                </Button>

                {currentOrder?.status === 4 ? (
                  <Button
                    style={{
                      height: "45px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      marginRight: "4%",
                    }}
                    color="primary"
                    variant="contained"
                    onClick={() => handleReturnItem()}
                  >
                    Trả đơn
                  </Button>
                ) : null}

                {currentOrder?.status !== 0 && currentOrder?.status !== 1 ? (
                  userState.roleName !== "Admin" ? (
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
                      Cập nhật
                    </Button>
                  ) : null
                ) : null}

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
                  Đóng
                </Button>
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    storeOrder: (order) => dispatch(action.storeOrder(order)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestModal);