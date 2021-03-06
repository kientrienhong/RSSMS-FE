import React, {useState} from "react";
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
  Modal,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {findUserByPhone} from "../../../apis/Apis";
import * as action from "../../../redux/action/action";
import {createOrder} from "../../../apis/Apis";
import LoadingPage from "../../Loading/LoadingPage";
import {useNavigate} from "react-router";
import {STYLE_MODAL} from "../../../constant/style";

const styleInput = {marginRight: "2.5%", backgroundColor: "white"};
const styleModal = {...STYLE_MODAL, overflow: "hidden", overflowY: "scroll"};

function InputInforModal({
  order,
  showSnackbar,
  showLoading,
  hideLoading,
  open,
  handleClose,
  userState,
}) {
  const navigate = useNavigate();

  const {handleSubmit, control, setValue} = useForm();
  const [returnAddressChoice, setReturnAddressChoice] = useState(0);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();

  const handleChangeRadioButton = (e) => {
    setReturnAddressChoice(parseInt(e.target.value));
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
            serviceId: e.id,
            price: e.price,
            amount: e.quantity,
            note: e.note,
          });
        });
      });
      let orderTemp = {};

      if (order.type === 0) {
        let dateStart = new Date(order.dateStart);

        // Storage order
        let returnDate = new Date(
          dateStart.setMonth(dateStart.getMonth() + order.duration)
        );

        orderTemp = {
          customerId: user.id,
          deliveryAddress: "",
          addressReturn: "",
          totalPrice: order.totalPrice,
          typeOrder: order.type,
          isPaid: false,
          note: data.note,
          paymentMethod: null,
          isCustomerDelivery: true,
          deliveryDate: order.dateStart,
          returnDate: returnDate.toISOString(),
          deliveryTime: null,
          duration: order.duration,
          listProduct: listProduct,
        };
      } else {
        // door - to - door  order
        let returnDate = new Date(order.dateDelivery);
        returnDate = new Date(
          returnDate.setDate(returnDate.getDate() + order.duration)
        );
        // let dateStart = Date.parse(order.dateDelivery);
        orderTemp = {
          customerId: user.id,
          deliveryAddress: data.deliveryAddress,
          addressReturn: addressReturn,
          totalPrice: order.totalPrice,
          typeOrder: order.type,
          note: data.note,
          isPaid: false,
          returnDate: returnDate.toISOString(),
          paymentMethod: null,
          isCustomerDelivery: order.isCustomerDelivery,
          deliveryDate: order.dateDelivery,
          deliveryTime: order.timeDelivery.name,
          duration: order.duration,
          listProduct: listProduct,
        };
      }

      await createOrder(orderTemp, userState.idToken);
      navigate("/app/customer_request", {replace: true});
      showSnackbar("success", "T???o y??u c???u th??nh c??ng!");
    } catch (e) {
      console.log(e);
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
      const userTemp = await findUserByPhone(phone, userState.idToken);
      setUser(userTemp.data);
      setValue("email", userTemp.data.email);
      setValue("name", userTemp.data.name);
      setValue("phone", userTemp.data.phone);
      setValue("deliveryAddress", userTemp.data.address);
    } catch (error) {
      console.log(error?.response);
      console.log(error?.response?.data?.error?.code);
      if (error?.response?.data?.error?.code === 404) {
        showSnackbar("error", "Kh??ng t??m th???y t??i kho???n!");
      } else if (error?.response?.data?.error?.code === 400) {
        showSnackbar("error", "Vui l??ng nh???p v?? t??m ki???m s??? ??i???n tho???i");
      }
    } finally {
      hideLoading();
    }
  };
  let ruleOfDeliveryAddress = {
    rule: "*Vui l??ng nh???p",
  };
  if (order.isCustomerDelivery) {
    ruleOfDeliveryAddress = {};
  }

  let heightModal = order.type === 1 ? "80%" : "auto";
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
          py: 3,
          display: "flex",
          backgroundColor: "background.default",
          flexDirection: "column",
          paddingLeft: "48px",
          height: heightModal,
        }}
      >
        <LoadingPage />
        <Typography
          color="primary"
          variant="h2"
          style={{marginTop: "2%", textAlign: "left"}}
        >
          T??m ki???m t??i kho???n
        </Typography>
        <TextField
          label="S??? ??i???n tho???i"
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
          style={{marginTop: "2%", textAlign: "left"}}
        >
          Th??ng tin kh??ch h??ng
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{display: "flex", flexDirection: "row", marginTop: "2%"}}>
            <CustomInput
              control={control}
              rules={{
                required: "*Vui l??ng nh???p",
              }}
              styles={{width: "320px"}}
              name="name"
              label={user?.name ? "" : "T??n"}
              userInfo={user?.name}
              inlineStyle={styleInput}
              disabled={true}
            />

            <CustomInput
              control={control}
              rules={{
                required: "*Vui l??ng nh???p",
              }}
              styles={{width: "320px"}}
              name="email"
              label={user?.email ? "" : "Email"}
              userInfo={user?.email}
              inlineStyle={styleInput}
              disabled={true}
            />
            <CustomInput
              control={control}
              rules={{
                required: "*Vui l??ng nh???p",
              }}
              styles={{width: "120px"}}
              name="phone"
              label={user?.phone ? "" : "S??? ??i???n tho???i"}
              inlineStyle={styleInput}
              disabled={true}
            />
          </Box>
          {order.type === 0 ? null : (
            <Box>
              <Typography
                color="primary"
                variant="h2"
                style={{
                  marginTop: "2%",
                  textAlign: "left",
                  marginBottom: "2%",
                }}
              >
                ?????a ch??? l???y ?????
              </Typography>
              <CustomInput
                control={control}
                rules={ruleOfDeliveryAddress}
                styles={{width: "320px"}}
                name="deliveryAddress"
                label="?????a ch??? l???y ?????"
                disabled={false}
                userInfo={""}
                inlineStyle={styleInput}
              />
              <Typography
                color="primary"
                variant="h2"
                style={{
                  marginTop: "2%",
                  textAlign: "left",
                  marginBottom: "2%",
                }}
              >
                ?????a ch??? tr??? h??ng
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
                    label="Gi???ng ?????a ch??? l???y ?????"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Kh??c ?????a ch??? l???y ?????"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Ch??a x??c ?????nh"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}

          {returnAddressChoice === 1 ? (
            <Box>
              <Typography
                color="primary"
                variant="h2"
                style={{
                  marginTop: "2%",
                  textAlign: "left",
                  marginBottom: "2%",
                }}
              >
                Nh???p ?????a ch??? tr??? h??ng
              </Typography>
              <CustomInput
                control={control}
                rules={{
                  required: "*Vui l??ng nh???p",
                }}
                styles={{width: "320px"}}
                name="returnAddress"
                label="?????a ch??? tr??? h??ng"
                disabled={false}
                userInfo={""}
                inlineStyle={styleInput}
              />
            </Box>
          ) : null}

          <Typography
            color="primary"
            variant="h2"
            style={{marginTop: "2%", textAlign: "left", marginBottom: "2%"}}
          >
            Ghi ch??
          </Typography>
          <CustomAreaInput
            control={control}
            rules={{required: "*Vui l??ng nh???p"}}
            styles={{width: "560px"}}
            name="note"
            label=""
            inlineStyle={{...styleInput}}
          />
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
              X??c nh???n
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  order: state.order.order,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputInforModal);
