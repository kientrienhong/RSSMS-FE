import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { STYLE_MODAL } from "../../../constant/style";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import { LIST_UNIT } from "../../../constant/constant";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { storageFirebase } from "../../../firebase/firebase";
import { createProduct, updateProduct } from "../../../apis/Apis";
import { getBase64 } from "../../../utils/convertImage";
const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "100%",
  marginTop: "6% ",
  marginBottom: "4%",
};
const styleInput = { marginRight: "5%" };
let unitTemp;

function ProductModal({
  open,
  handleClose,
  currentProduct,
  setCurrentProduct,
  isEdit,
  typeProduct,
  showLoading,
  hideLoading,
  showSnackbar,
  getData,
  handleSubmit,
  control,
  userState,
}) {
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const buildDropDown = (listSizeStorage) =>
    listSizeStorage.map((e) => <MenuItem value={e.value}>{e.label}</MenuItem>);
  const inputFile = useRef(null);
  const handleOnclickImage = () => {
    inputFile.current.click();
  };

  const validation = () => {
    if (unit === undefined) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    setUnit(currentProduct.unit);
  }, [currentProduct]);

  useEffect(() => {
    setError({});
  }, [open]);

  const onHandleCreateProduct = async (data) => {
    if (validation() === false) {
      setError({
        unit: {
          msg: "*Required",
        },
      });
      return;
    }

    let productTemp = {
      name: data.name,
      price: parseInt(data.price),
      description: data.description,
      type: typeProduct,
      size: data.size,
      unit: unitTemp,
      tooltip: data.tooltip,
      images: [
        {
          url: null,
        },
      ],
    };
    try {
      showLoading();

      if (!currentProduct.avatarFile) {
        setError({
          ...error,
          avatarFile: { message: "Please provide product image!" },
        });
        hideLoading();

        return;
      }
      let base64 = await getBase64(currentProduct.avatarFile);
      productTemp = {
        ...productTemp,
        images: [
          {
            file: base64.split(",")[1],
          },
        ],
      };
      const response = await createProduct(productTemp, userState.idToken);
      if (response.status === 200) {
        try {
          showSnackbar("success", "Create product successful!");
          await getData();
          handleClose();
          setError({});
        } catch (e) {
          console.log(e.response);
        } finally {
          hideLoading();
        }
      }
    } catch (error) {
      console.log(error.response);
      hideLoading();
    }
  };

  const onHandleEditProduct = async (data) => {
    let productTemp = {
      name: data.name,
      price: parseInt(data.price),
      description: data.description,
      type: typeProduct,
      size: data.size,
      unit: unit,
      tooltip: data.tooltip,
      images: [
        {
          id: currentProduct?.images[0]?.id,
          url: currentProduct?.images[0]?.url,
        },
      ],
    };
    try {
      showLoading();
      let id = currentProduct.id;
      let responseUpdate;
      if (currentProduct.avatarFile !== undefined) {
        let base64 = await getBase64(currentProduct.avatarFile);
        try {
          responseUpdate = await updateProduct(
            productTemp,
            id,
            base64.split(",")[1],
            userState.idToken
          );
          if (responseUpdate.status === 200) {
            showSnackbar("success", "Update storage successful!");
            await getData();
            handleClose();
          }
        } catch (e) {
          console.log(e.response);
        }
      } else {
        responseUpdate = await updateProduct(
          productTemp,
          id,
          "",
          userState.idToken
        );
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Update storage successful!");
          await getData();
          handleClose();
        }
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  const onSubmit = async (data) => {
    if (isEdit === false) {
      await onHandleCreateProduct(data);
    } else {
      await onHandleEditProduct(data);
    }
  };

  const onChangeInputFile = (event) => {
    setCurrentProduct({
      ...currentProduct,
      images: [
        {
          id: currentProduct?.images[0]?.id,
          url: URL.createObjectURL(event.target.files[0]),
        },
      ],
      avatarFile: event.target.files[0],
    });
  };

  const buildInputFileImage = () => {
    return (
      <Box
        onClick={handleOnclickImage}
        sx={{
          marginTop: "16px",
          height: "444px",
          width: "310px",
          position: "relative",
          border: "solid 1px #000",
        }}
      >
        {currentProduct?.images[0]?.url === null ? (
          <img
            src="/img/imageEdit.png"
            width="50px"
            height="50px"
            alt="imagee"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <img
            style={{ height: "444px", width: "310px" }}
            src={currentProduct?.images[0]?.url}
            alt="avatar"
          />
        )}
      </Box>
    );
  };

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
    setError({ ...error, unit: undefined });
    unitTemp = event.target.value;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...STYLE_MODAL, width: "60%" }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {buildInputFileImage()}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              marginTop: "1%",
              marginLeft: "2%",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              style={{ marginTop: "1%", marginBottom: "2%" }}
            >
              Product Information
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="file"
                id="file"
                name="fileImage"
                ref={inputFile}
                onChange={(e) => onChangeInputFile(e)}
                style={{ display: "none" }}
              />
              <Box
                sx={{
                  ...styleBoxInput,
                  marginTop: "3%",
                  justifyContent: "flex-start",
                }}
              >
                <CustomInput
                  control={control}
                  rules={{ required: "Name is required" }}
                  styles={{ width: "400px" }}
                  name="name"
                  label="Name"
                  userInfo={currentProduct?.name}
                  inlineStyle={{ ...styleInput }}
                />
              </Box>
              <Box
                sx={{
                  ...styleBoxInput,
                  marginTop: "3%",
                  justifyContent: "flex-start",
                }}
              >
                <CustomInput
                  control={control}
                  rules={{ required: "Size is required" }}
                  styles={{ width: "400px" }}
                  name="size"
                  label="Size"
                  userInfo={currentProduct?.size}
                  inlineStyle={{ ...styleInput }}
                />
              </Box>
              <CustomAreaInput
                control={control}
                rules={{ required: "Description is required" }}
                styles={{ width: "480px" }}
                name="description"
                label="Description"
                userInfo={currentProduct?.description}
                inlineStyle={{ ...styleInput, marginTop: "4%", width: "480px" }}
              />
              <CustomAreaInput
                control={control}
                rules={{ required: "Tooltip is required" }}
                styles={{ width: "480px" }}
                name="tooltip"
                label="Tooltip"
                userInfo={currentProduct?.tooltip}
                inlineStyle={{ ...styleInput, marginTop: "4%", width: "480px" }}
              />
              <Box
                sx={{
                  ...styleBoxInput,
                  marginTop: "2%",
                  marginBottom: "12%",

                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "50%",
                  }}
                >
                  <Typography
                    color="black"
                    variant="h2"
                    style={{
                      marginTop: "1%",
                      marginBottom: "2.8%",
                    }}
                  >
                    Price
                  </Typography>
                  <CustomInput
                    control={control}
                    rules={{
                      required: "Price is required",

                      pattern: {
                        value: /[^a-zA-Z]+/,
                        message: "Invalid phone number",
                      },
                    }}
                    styles={{ width: "240px" }}
                    name="price"
                    label="Price"
                    userInfo={currentProduct?.price}
                    inlineStyle={{ ...styleInput }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "50%",
                  }}
                >
                  <Typography
                    color="black"
                    variant="h2"
                    style={{ marginTop: "1%", marginLeft: "5%" }}
                  >
                    Unit
                  </Typography>

                  <FormControl
                    sx={{ m: 1, minWidth: 120, color: "black" }}
                    name="sizeStorage"
                    error={error?.unit}
                  >
                    <Select value={unit} onChange={handleChangeUnit}>
                      {buildDropDown(LIST_UNIT)}
                    </Select>
                    <FormHelperText error={error?.unit}>
                      {error?.unit ? error?.unit?.msg : ""}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Box>
              <p
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {error?.avatarFile?.message ? error?.avatarFile?.message : ""}
              </p>
              <Box
                sx={{
                  width: "200px",
                  margin: "0 auto 2% auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  onClick={() => handleClose()}
                  color="error"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
