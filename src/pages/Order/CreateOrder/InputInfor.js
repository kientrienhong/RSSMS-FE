import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  RadioGroup,
  FormControl,
  Radio,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { findUserByPhone } from "../../../apis/Apis";
import * as action from "../../../redux/action/action";
import { createOrder } from "../../../apis/Apis";
import LoadingPage from "../../../pages/Loading/LoadingPage";
const styleInput = { marginRight: "2.5%", backgroundColor: "white" };

function InputInfor({ order, showSnackbar, showLoading, hideLoading }) {
  const { handleSubmit, reset, control, setValue } = useForm();
  const [returnAddressChoice, setReturnAddressChoice] = useState(0);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();
  const [paymentMethod, setPaymentMethod] = useState(0);

  const handleChangeRadioButton = (e) => {
    setReturnAddressChoice(parseInt(e.target.value));
  };

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(parseInt(e.target.value));
  };

  const onSubmit = async (data) => {
    try {
      showLoading();
      let addressReturn;
      if (returnAddressChoice === 0) {
        addressReturn = data.deliveryAddress;
      } else if (returnAddressChoice === 1) {
        addressReturn = data.returnAddress;
      } else {
        addressReturn = "";
      }

      let listProduct = [];

      Object.keys(order.choosenProduct).forEach((e) => {
        order.choosenProduct[e].forEach((e) => {
          listProduct.push({
            productId: e.id,
            productName: e.name,
            price: e.price,
            type: e.typeInt,
            amount: e.quantity,
          });
        });
      });

      let orderTemp = {
        customerId: user.id,
        deliveryAddress: data.deliveryAddress,
        addressReturn: addressReturn,
        totalPrice: order.totalPrice,
        typeOrder: order.type,
        isPaid: false,
        paymentMethod: paymentMethod,
        isUserDelivery: order.isCustomerDelivery,
        deliveryDate: order.dateDelivery,
        deliveryTime: order.timeDelivery.name,
        duration: order.duration,
        listProduct: listProduct,
      };
      await createOrder(orderTemp);

      showSnackbar("success", "Create order success");
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onClickSearchUser = async () => {
    try {
      showLoading();
      const userTemp = await findUserByPhone(phone);
      setUser(userTemp.data);
      setValue("email", userTemp.data.email);
      setValue("name", userTemp.data.name);
      setValue("phone", userTemp.data.phone);
      setValue("deliveryAddress", userTemp.data.address);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  let ruleOfDeliveryAddress = {
    rule: "Delivery Address required",
  };
  if (order.isCustomerDelivery) {
    ruleOfDeliveryAddress = {};
  }
  return (
    <Box
      sx={{
        height: "auto",
        py: 3,
        display: "flex",
        backgroundColor: "background.default",
        flexDirection: "column",
        paddingLeft: "48px",
      }}
    >
      <LoadingPage />
      <Typography
        color="primary"
        variant="h2"
        style={{ marginTop: "2%", textAlign: "left" }}
      >
        Search user
      </Typography>
      <TextField
        label="Phone"
        sx={{
          width: "80%",
          marginTop: "1%",
        }}
        onChange={onChangePhone}
        InputProps={{
          style: {
            height: "45px",
            backgroundColor: "white",
            width: "200px",
          },
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={() => onClickSearchUser()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        color="primary"
        variant="h2"
        style={{ marginTop: "2%", textAlign: "left" }}
      >
        Customer information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
          <CustomInput
            control={control}
            disabled={true}
            rules={{
              required: "Name required",
            }}
            styles={{ width: "320px" }}
            name="name"
            label={user?.name ? "" : "Name"}
            userInfo={user?.name}
            inlineStyle={styleInput}
          />

          <CustomInput
            control={control}
            disabled={true}
            rules={{
              required: "Email required",
            }}
            styles={{ width: "320px" }}
            name="email"
            label={user?.email ? "" : "Email"}
            userInfo={user?.email}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            disabled={true}
            rules={{
              required: "Phone required",
            }}
            styles={{ width: "120px" }}
            name="phone"
            label={user?.phone ? "" : "Phone"}
            inlineStyle={styleInput}
          />
        </Box>
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Delivery Address
        </Typography>
        <CustomInput
          control={control}
          rules={ruleOfDeliveryAddress}
          styles={{ width: "320px" }}
          name="deliveryAddress"
          label="Delivery Address"
          disabled={false}
          userInfo={""}
          inlineStyle={styleInput}
        />
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Return item address
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="row-radio-buttons-group"
            value={returnAddressChoice}
            onChange={handleChangeRadioButton}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="The same with delivery address"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Difference with delivery address"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Not determine yet"
            />
          </RadioGroup>
        </FormControl>

        {returnAddressChoice === 1 ? (
          <Box>
            <Typography
              color="primary"
              variant="h2"
              style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
            >
              Input return address
            </Typography>
            <CustomInput
              control={control}
              rules={{
                required: "Return address required",
              }}
              styles={{ width: "320px" }}
              name="returnAddress"
              label="Return Address"
              disabled={false}
              userInfo={""}
              inlineStyle={styleInput}
            />
          </Box>
        ) : null}

        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Note
        </Typography>
        <CustomAreaInput
          control={control}
          rules={{ required: "Note is required" }}
          styles={{ width: "560px" }}
          name="note"
          label=""
          inlineStyle={{ ...styleInput }}
        />
        <Typography
          color="primary"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginBottom: "2%" }}
        >
          Payment method
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            value={paymentMethod}
            onChange={handleChangePaymentMethod}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label="Pay on cash"
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Transfer money"
            />
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              display: "block",
              height: "45px",
              paddingLeft: "16px",
              marginTop: "16px",
              paddingRight: "16px",
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  order: state.order.order,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputInfor);
