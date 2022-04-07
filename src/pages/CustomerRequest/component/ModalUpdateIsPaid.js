import React from "react";
import {Box, Modal, Button, Typography, Checkbox} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import {LIST_STATUS_REQUEST} from "../../../constant/constant";

import {connect} from "react-redux";
import {updateIsPaidRequest} from "../../../apis/Apis";
import * as action from "../../../redux/action/action";
import {formatCurrency} from "../../../utils/FormatCurrency";
import moment from "moment";
const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

function ModalUpdateIsPaid({
  open,
  handleClose,
  currentRequest,
  userState,
  showLoading,
  hideLoading,
  showSnackbar,
  requestDetail,
  getData,
  page,
}) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const buildInformation = (title, value, color) => {
    let localColor;
    let bold;
    if (color) {
      localColor = color;
      bold = "bold";
    } else {
      localColor = "black";
      bold = "normal";
    }
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
        <Typography
          color="black"
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <p style={{fontSize: "18px", color: localColor, fontWeight: bold}}>
          {value}
        </p>
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
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
          }}
        >
          Chi tiết yêu cầu gia hạn đơn
        </Typography>
        <Box
          sx={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginTop: "2%",
              textAlign: "left",
            }}
          >
            Thông tin đơn hàng
          </Typography>
          {buildInformation("Mã yêu cầu:", `#${currentRequest?.id}`)}
          {buildInformation(
            "Tình trạng yêu cầu:",
            LIST_STATUS_REQUEST[currentRequest?.status]?.name,
            LIST_STATUS_REQUEST[currentRequest?.status]?.color
          )}
          {buildInformation("Mã đơn:", `#${currentRequest?.orderId}`)}

          {buildInformation(
            "Ngày kết thúc trước khi gia hạn:",
            `${requestDetail?.oldReturnDate}`
          )}
          {buildInformation(
            "Ngày kết thúc sau khi gia hạn:",
            moment(new Date(requestDetail?.returnDate)).format("DD/MM/YYYY")
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
              marginBottom: "2%",
            }}
          >
            <Typography
              color="black"
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Tổng số tiền:
            </Typography>
            <Typography
              color="primary"
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              {`${formatCurrency(requestDetail?.totalPrice, " đ")}`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              color="black"
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Đã thanh toán:
            </Typography>
            <Checkbox
              checked={checked || currentRequest?.status === 2}
              disabled={currentRequest?.status === 2}
              onChange={handleChange}
              inputProps={{"aria-label": "controlled"}}
            />
          </Box>
        </Box>
        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          onClick={async () => {
            try {
              showLoading();
              await updateIsPaidRequest(
                currentRequest.id,
                checked,
                userState.idToken
              );

              showSnackbar("success", "Update success");
              await getData("", page, 8);
              handleClose();
            } catch (error) {
              console.log(error?.response);
            } finally {
              hideLoading();
            }
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateIsPaid);
