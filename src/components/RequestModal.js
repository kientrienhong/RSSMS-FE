import React, {useState, useEffect} from "react";
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
import {FormControl} from "@material-ui/core";
import OrderDetail from "./OrderDetail";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import {updateOrder} from "../apis/Apis";
import {useNavigate} from "react-router";
import {PRODUCT_TYPE, LIST_STATUS, LIST_TIME} from "../constant/constant";
import {Controller} from "react-hook-form";

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
  const [dateReturn, setDateReturn] = useState();
  const [isPaid, setIsPaid] = useState();
  const [isCustomerDelivery, setIsCustomerDelivery] = useState();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const navigate = useNavigate();
  const handleChangePaymentMethod = (e) => {
    if (isView === true) {
      return;
    }
    setPaymentMethod(parseInt(e.target.value));
  };

  const handleChangeCheckBoxIsPaid = (event) => {
    if (isView === true) {
      return;
    }
    setIsPaid(event.target.checked);
  };

  const handleStoreOrder = () => {
    storeOrder(currentOrder);
    showSnackbar("success", "Store order success");
    if (userState.roleName === "Office staff") {
      navigate(`/app/storages/${userState.staffManageStorages[0].storageId}`, {
        replace: true,
      });
    } else {
      navigate("/app/storages", {replace: true});
    }
    handleClose();
  };

  useEffect(() => {
    if (currentOrder) {
      setReturnAddress(currentOrder?.addressReturn);
      setDeliveryAddress(currentOrder?.deliveryAddress);

      setTimeDelivery({
        name: currentOrder?.deliveryTime,
        isAvailable: true,
      });
      setTimeReturn({
        name: currentOrder?.returnTime,
        isAvailable: true,
      });
      if (currentOrder?.typeOrder === 0) {
        setDuration(currentOrder?.durationMonths);
      } else {
        setDuration(currentOrder?.durationDays);
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
          setDateReturn(date.toISOString().split("T")[0]);
        }
      }
    }
  }, [currentOrder]);

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
        {...currentOrder, status: 7},
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

  const mapListTime = (time, setTime, setIsCutomer) =>
    LIST_TIME.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={() => {}}
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
        <p style={{fontSize: "18px"}}>{value}</p>
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

  const onSubmit = async (data) => {
    try {
      showLoading();
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
      showSnackbar("success", "C???p nh???t ????n th??nh c??ng!");
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography color="black" variant="h2">
                M?? ????n h??ng
              </Typography>
              <Typography color="black" variant="h2">
                #{currentOrder?.id}
              </Typography>
            </Box>
            {buildInformation("T??n kh??ch h??ng", currentOrder?.customerName)}
            {buildInformation(
              "S??? ??i???n tho???i kh??ch h??ng",
              currentOrder?.customerPhone
            )}
            {buildInformation(
              "Lo???i ????n",
              currentOrder?.typeOrder === 0 ? "Kho t??? qu???n" : "Gi??? ????? thu??"
            )}
            {buildInformation(
              "Tr???ng th??i",
              LIST_STATUS[currentOrder?.status]?.label
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="isPaid"
                control={
                  <Checkbox
                    checked={isPaid}
                    onChange={handleChangeCheckBoxIsPaid}
                  />
                }
                label="???? thanh to??n"
                labelPlacement="Is paid"
              />
            </Box>
            <Typography
              color="black"
              variant="h3"
              sx={{marginBottom: "2%", marginTop: "4%"}}
            >
              ?????a ch??? l???y h??ng:
            </Typography>
            <CustomInput
              control={control}
              rules={{}}
              styles={{width: "300px"}}
              name="deliveryAddress"
              label="?????a ch??? l???y h??ng"
              disabled={true}
              userInfo={deliveryAddress}
              inlineStyle={{}}
            />
            <Typography
              color="black"
              variant="h3"
              sx={{marginBottom: "2%", marginTop: "4%"}}
            >
              ?????a ch??? tr??? h??ng:
            </Typography>
            <CustomInput
              control={control}
              rules={{}}
              styles={{width: "300px", display: "block"}}
              name="returnAddress"
              label="?????a ch??? tr??? h??ng"
              disabled={true}
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
                sx={{marginBottom: "4%", marginTop: "4%"}}
              >
                Th???i gian
              </Typography>
            </Box>
            <Typography color="black" variant="h3" sx={{marginBottom: "2%"}}>
              {currentOrder?.typeOrder === 0 ? "Ng??y b???t ?????u" : "Ng??y l???y ????n"}
            </Typography>
            <Controller
              name={"dateDelivery"}
              control={control}
              render={({field: {onChange, value}}) => {
                return (
                  <TextField
                    type="date"
                    disabled={isView}
                    defaultValue={value}
                    onChange={onChange}
                    sx={{width: 220, marginBottom: "16px"}}
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
                      onChange={() => {}}
                    />
                  }
                  label="Kh??ch h??ng t??? v???n chuy???n"
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
                <Typography variant="h2" style={{marginBottom: "3%"}}>
                  Th???i h???n (th??ng)
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
              <Typography color="black" variant="h3" sx={{marginBottom: "2%"}}>
                {currentOrder?.typeOrder === 0
                  ? "Ng??y k???t th??c"
                  : "Ng??y tr??? h??ng"}
              </Typography>
              <Typography
                color="primary"
                variant="h3"
                sx={{marginBottom: "2%", textAlign: "right"}}
              >
                {new Date(currentOrder?.returnDate).toLocaleDateString("en-US")}
              </Typography>
            </Box>

            {currentOrder?.typeOrder === 0 ? null : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "2%",
                }}
              >
                <Typography color="black" variant="h3" sx={{marginRight: "2%"}}>
                  Th???i h???n:
                </Typography>
                <Typography color="primary" variant="h3">
                  {duration} {currentOrder?.typeOrder === 0 ? "th??ng" : "ng??y"}
                </Typography>
              </Box>
            )}

            <Typography
              color="black"
              variant="h3"
              sx={{marginBottom: "2%", marginTop: "4%"}}
            >
              Ph????ng th???c thanh to??n
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
                    label="Tr??? ti???n m???t"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Chuy???n kho???n"
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
                  sx={{marginBottom: "2%", marginTop: "4%"}}
                >
                  L?? do
                </Typography>
                <p style={{color: "red"}}>{currentOrder?.rejectedReason}</p>
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
              sx={{marginBottom: "4%", marginTop: "4%"}}
            >
              Chi ti???t ????n h??ng
            </Typography>
            <OrderDetail
              choosenProduct={formatToChosenProduct()}
              duration={duration}
              isOrder={false}
            />

            <Typography color="black" variant="h2" sx={{marginBottom: "4%"}}>
              Ghi ch??
            </Typography>

            <TextField
              disabled={true}
              variant="outlined"
              value={currentOrder?.note}
              multiline
              rows={2}
              rowsMax={4}
              sx={{marginBottom: "4%"}}
            />

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
                  ????ng
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
                  L??u tr??? ????n
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
                    Tr??? ????n
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
                      C???p nh???t
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
                  ????ng
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
