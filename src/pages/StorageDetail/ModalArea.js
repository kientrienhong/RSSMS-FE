import React from "react";
import {
  MenuItem,
  Box,
  Typography,
  Button,
  Modal,
  Grid,
} from "@material-ui/core";
import CustomInput from "../../components/CustomInput";
import CustomAreaInput from "../../components/CustomAreaInput";
import {STYLE_MODAL} from "../../constant/style";
import CustomSelect from "../../components/CustomSelect";
import {connect} from "react-redux";
function ModalArea({
  open,
  handleClose,
  currentArea,
  handleSubmit,
  control,
  onSubmit,
  isEdit,
  errors,
  userState,
}) {
  const styleInput = {marginRight: "2.5%"};

  const styleModal = {
    ...STYLE_MODAL,
    width: "auto",
  };
  const typeList = ["Self-Storage", "Door-to-door"];

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
          flexDirection: "column",
        }}
      >
        <Typography color="black" variant="h2">
          {isEdit === true ? "Cập nhật khu vực" : "Tạo khu vực"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{marginTop: "16px"}}>
            <CustomInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
              }}
              styles={{width: "400px"}}
              name="name"
              label="Tên"
              userInfo={currentArea.name}
              inlineStyle={{...styleInput, marginBottom: "4%"}}
            />
            <CustomAreaInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
              }}
              styles={{width: "400px"}}
              name="description"
              label="Mô tả"
              userInfo={currentArea.description}
              inlineStyle={styleInput}
            />
            <Grid
              container
              spacing={2}
              sx={{
                width: "98%",
                marginTop: "3%",
              }}
            >
              <Grid item xs={4}>
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                    pattern: {
                      value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                      message: "*Vui lòng nhập đúng chiều rộng",
                    },
                  }}
                  name="width"
                  label="Chiều rộng (m)"
                  userInfo={currentArea?.width}
                  inlineStyle={{...styleInput, marginBottom: "4%"}}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                    pattern: {
                      value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                      message: "*Vui lòng nhập đúng chiều dài",
                    },
                  }}
                  name="length"
                  label="Chiều dài (m)"
                  userInfo={currentArea?.length}
                  inlineStyle={{...styleInput, marginBottom: "4%"}}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                    pattern: {
                      value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                      message: "*Vui lòng nhập đúng chiều cao",
                    },
                  }}
                  name="height"
                  label="Chiều cao (m)"
                  userInfo={currentArea?.height}
                  inlineStyle={{...styleInput, marginBottom: "4%"}}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginRight: "4%",
                marginTop: "4%",
              }}
            >
              <Typography
                color="black"
                variant="h2"
                style={{
                  marginTop: "1%",
                  marginLeft: "6%",
                  width: "100%",
                  marginBottom: "16px",
                }}
              >
                Loại khu vực
              </Typography>
              <CustomSelect
                name="type"
                control={control}
                errors={errors}
                errorMsg={"*Vui lòng nhập"}
                defaultValue={typeList[currentArea.type] || ""}
              >
                <MenuItem value={"Self-Storage"}>Kho tự quản</MenuItem>
                <MenuItem value={"Door-to-door"}>Giữ đồ thuê</MenuItem>
              </CustomSelect>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            {userState.roleName !== "Admin" ? (
              <Button color="primary" type="submit" variant="contained">
                Xác nhận
              </Button>
            ) : (
              <></>
            )}
            <Button
              color="error"
              onClick={() => handleClose()}
              variant="outlined"
              style={{
                marginLeft: "2%",
              }}
            >
              Đóng
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

export default connect(mapStateToProps, null)(ModalArea);
