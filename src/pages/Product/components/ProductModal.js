import React, {useRef, useState, useEffect} from "react";
import {Box, Modal, Button, Typography, MenuItem} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import {
  LIST_UNIT,
  ACCESSSORY_TYPE,
  SELF_STORAGE_TYPE,
  SERVICE_TYPE,
} from "../../../constant/constant";
import {connect} from "react-redux";
import * as action from "../../../redux/action/action";
import {createProduct, updateProduct} from "../../../apis/Apis";
import {getBase64} from "../../../utils/convertImage";
import CustomSelect from "../../../components/CustomSelect";
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
const styleInput = {marginRight: "5%"};

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
  errors,
}) {
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const buildDropDown = (listSizeStorage) =>
    listSizeStorage.map((e) => <MenuItem value={e.value}>{e.label}</MenuItem>);
  const inputFile = useRef(null);
  const handleOnclickImage = () => {
    inputFile.current.click();
  };
  useEffect(() => {
    setUnit(currentProduct.unit);
  }, [currentProduct]);

  useEffect(() => {
    setError({});
  }, [open]);

  const onHandleCreateProduct = async (data) => {
    let productTemp = {
      name: data.name,
      price: parseInt(data.price),
      description: data.description,
      type: typeProduct,
      width: data.width ? data.width : "0",
      height: data.height ? data.height : "0",
      length: data.length ? data.length : "0",
      unit: data.unit,
      tooltip: data.tooltip,
      deliveryFee: data.deliveryFee ? data.deliveryFee : "0",
      image: {
        url: null,
      },
    };
    try {
      showLoading();

      if (!currentProduct.avatarFile) {
        setError({
          ...error,
          avatarFile: {message: "Vui lòng thêm hình ảnh!"},
        });
        hideLoading();

        return;
      }
      let base64 = await getBase64(currentProduct.avatarFile);
      productTemp = {
        ...productTemp,
        image: {
          file: base64.split(",")[1],
        },
      };
      const response = await createProduct(productTemp, userState.idToken);
      if (response.status === 200) {
        try {
          showSnackbar("success", "Tạo dịch vụ thành công");
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
      width: data.width ? data.width : "0",
      height: data.height ? data.height : "0",
      length: data.length ? data.length : "0",
      unit: data.unit,
      deliveryFee: data.deliveryFee ? data.deliveryFee : "0",
      tooltip: data.tooltip,
      image: {
        url: currentProduct?.imageUrl,
      },
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
            showSnackbar("success", "Cập nhật dịch vụ thành công");
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
          showSnackbar("success", "Cập nhật dịch vụ thành công");
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
    if (
      event.target.files[0].name.includes(".png") ||
      event.target.files[0].name.includes(".jpg") ||
      event.target.files[0].name.includes(".jpeg")
    ) {
      setCurrentProduct({
        ...currentProduct,
        imageUrl: URL.createObjectURL(event.target.files[0]),
        avatarFile: event.target.files[0],
      });
      setError();
    } else {
      setError({avatarFile: {message: "Vui lòng chọn tập tin hình ảnh!"}});
    }
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
        {currentProduct?.imageUrl === undefined ? (
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
            style={{height: "444px", width: "310px"}}
            src={currentProduct?.imageUrl}
            alt="avatar"
          />
        )}
      </Box>
    );
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...STYLE_MODAL, width: "60%"}}>
        <Box sx={{display: "flex", flexDirection: "row", width: "100%"}}>
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
              style={{marginTop: "1%", marginBottom: "2%"}}
            >
              Thông tin dịch vụ
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <input
                type="file"
                id="file"
                name="fileImage"
                ref={inputFile}
                onChange={(e) => onChangeInputFile(e)}
                style={{display: "none"}}
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
                  rules={{required: "*Vui lòng nhập"}}
                  styles={{width: "475px"}}
                  name="name"
                  label="Tên"
                  userInfo={currentProduct?.name}
                  inlineStyle={{...styleInput}}
                />
              </Box>
              {typeProduct !== ACCESSSORY_TYPE ? (
                <Box
                  sx={{
                    ...styleBoxInput,
                    marginTop: "5%",
                    justifyContent: "flex-start",
                  }}
                >
                  <CustomInput
                    control={control}
                    rules={{
                      required: "*Vui lòng nhập",
                      pattern: {
                        value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                        message: "*Vui lòng nhập đúng chiều rộng",
                      },
                    }}
                    styles={{width: "120px"}}
                    name="width"
                    label="Chiều rộng (m)"
                    userInfo={currentProduct?.width}
                    inlineStyle={styleInput}
                  />
                  <CustomInput
                    control={control}
                    rules={{
                      required: "*Vui lòng nhập",
                      pattern: {
                        value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                        message: "*Vui lòng nhập đúng chiều dài",
                      },
                    }}
                    styles={{width: "120px"}}
                    name="length"
                    label="Chiều dài (m)"
                    userInfo={currentProduct?.length}
                    inlineStyle={styleInput}
                  />
                  <CustomInput
                    control={control}
                    rules={{
                      required: "*Vui lòng nhập",
                      pattern: {
                        value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                        message: "*Vui lòng nhập đúng chiều cao",
                      },
                    }}
                    styles={{width: "120px"}}
                    name="height"
                    label="Chiều cao (m)"
                    userInfo={currentProduct?.height}
                    inlineStyle={styleInput}
                  />
                </Box>
              ) : (
                <></>
              )}

              <CustomAreaInput
                control={control}
                rules={{required: "*Vui lòng nhập"}}
                styles={{width: "500px"}}
                name="description"
                label="Mô tả"
                userInfo={currentProduct?.description}
                inlineStyle={{...styleInput, marginTop: "4%", width: "500px"}}
              />
              <CustomAreaInput
                control={control}
                rules={{required: "*Vui lòng nhập"}}
                styles={{width: "500px"}}
                name="tooltip"
                label="Chú thích"
                userInfo={currentProduct?.tooltip}
                inlineStyle={{...styleInput, marginTop: "4%", width: "500px"}}
              />
              {typeProduct !== SELF_STORAGE_TYPE &&
              typeProduct !== SERVICE_TYPE &&
              typeProduct !== ACCESSSORY_TYPE ? (
                <Box
                  sx={{
                    ...styleBoxInput,
                    marginTop: "3%",
                    justifyContent: "flex-start",
                  }}
                >
                  <CustomInput
                    control={control}
                    rules={{
                      required: "*Vui lòng nhập",

                      pattern: {
                        value: /^\+?([1-9]\d{4,14})$/,
                        message: "*Vui lòng nhập đúng giá tiền",
                      },
                    }}
                    styles={{width: "475px"}}
                    name="deliveryFee"
                    label="Giá tiền vận chuyển"
                    userInfo={currentProduct?.deliveryFee}
                    inlineStyle={{...styleInput}}
                  />
                </Box>
              ) : (
                <></>
              )}

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
                      marginBottom: "4.5%",
                    }}
                  >
                    Giá tiền thuê
                  </Typography>
                  <CustomInput
                    control={control}
                    rules={{
                      required: "*Vui lòng nhập",

                      pattern: {
                        value: /^\+?([1-9]\d{4,14})$/,
                        message: "*Vui lòng nhập đúng giá tiền",
                      },
                    }}
                    styles={{width: "240px"}}
                    name="price"
                    userInfo={currentProduct?.price}
                    inlineStyle={{...styleInput}}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "40%",
                  }}
                >
                  <Typography
                    color="black"
                    variant="h2"
                    style={{
                      marginTop: "1%",
                      marginLeft: "5%",
                      marginBottom: "5%",
                    }}
                  >
                    Đơn vị
                  </Typography>
                  <CustomSelect
                    label="Loại"
                    name="unit"
                    control={control}
                    errors={errors}
                    defaultValue={unit}
                    errorMsg={"*Vui lòng chọn"}
                  >
                    {buildDropDown(LIST_UNIT)}
                  </CustomSelect>
                  {/* <FormControl
                    sx={{ m: 1, minWidth: 120, color: "black" }}
                    name="sizeStorage"
                    error={error?.unit}
                    control={control}
                    errorMsg={"Required unit"}
                  >
                    <Select value={unit} onChange={handleChangeUnit}></Select>
                    <FormHelperText error={error?.unit}>
                      {error?.unit ? error?.unit?.msg : ""}
                    </FormHelperText>
                  </FormControl> */}
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
                  Xác nhận
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
                  Đóng
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
