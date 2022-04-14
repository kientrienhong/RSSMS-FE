import React from "react";
import {Box, Checkbox, Button, Avatar, Typography} from "@material-ui/core";
import {getOrderById, getRequestDetail} from "../../../apis/Apis";
import {connect} from "react-redux";
import {
  STATUS_REQUEST_FINISHED,
  STATUS_REQUEST_DELIVERING,
  STATUS_REQUEST_CUSTOMER_ABSENT,
} from "../../../constant/constant";
import {styled} from "@mui/material/styles";
import {LIST_STATUS_REQUEST} from "../../../constant/constant";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import * as action from "../../../redux/action/action";
import moment from "moment";
const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    zIndex: "99999999999999999999 !important",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function Schedule({
  schedule,
  setCurrentOrder,
  handleOpen,
  onChangeCheckBox,
  listSelectedOrder,
  handleOpenAssignTime,
  userState,
  handleOpenOrderModal,
}) {
  let isFoundInListSelectedOrder = listSelectedOrder?.findIndex((e) => {
    return schedule.id === e.id;
  });
  let foundSameStorage = false;
  let indexFoundSameTime = listSelectedOrder?.findIndex((e) => {
    if (e.storageId === schedule.storageId) {
      foundSameStorage = true;
    }
    return (
      e["deliveryTime"] === schedule["deliveryTime"] && schedule.id !== e.id
    );
  });

  let foundSameListStaff = 0;
  if (listSelectedOrder?.length > 0) {
    listSelectedOrder[0]?.listStaffDelivery?.forEach((e) => {
      if (schedule?.listStaffDelivery) {
        schedule.listStaffDelivery.forEach((ele) => {
          if (e.id === ele.id) {
            foundSameListStaff++;
            return;
          }
        });
      }
    });
  }

  let isSameListStaff = false;
  if (listSelectedOrder?.length > 0) {
    if (listSelectedOrder[0]?.listStaffDelivery) {
      if (
        listSelectedOrder[0]?.listStaffDelivery.length === foundSameListStaff
      ) {
        isSameListStaff = true;
      }
    } else {
      if (!schedule.listStaffDelivery) {
        isSameListStaff = true;
      }
    }
  }

  const buildToolTipStaff = () => {
    if (schedule?.listStaffDelivery) {
      return schedule.listStaffDelivery.map((e, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              marginRight: "8px",
            }}
          >
            <Avatar
              src={e?.imageUrl}
              sx={{
                width: 80,
                height: 80,
              }}
            />
          </Box>
          <Box>
            <Typography color="black" variant="h5">
              Tên: {e.name}
            </Typography>
            <p>SĐT: {e.phone}</p>
            <p>
              Ngày Sinh: {moment(new Date(e.birthdate)).format("DD/MM/YYYY")}
            </p>
          </Box>
        </Box>
      ));
    }
  };

  const buildListAvatar = () => {
    if (schedule?.listStaffDelivery) {
      return schedule.listStaffDelivery.map((e, index) => (
        <Avatar
          sx={{
            width: 28,
            height: 28,
            marginLeft: index === 0 ? "0px" : "-8px",
          }}
          src={e?.imageUrl}
          alt={e}
          key={e?.imageUrl}
        />
      ));
    }
  };

  return (
    <Box
      sx={{
        borderColor:
          schedule.status === 6
            ? "#FF615F"
            : schedule.isDelivery
            ? "#99E5FE"
            : schedule.orderId
            ? "#8099FF"
            : "#04BFFE",
        borderWidth: 4,
        borderStyle: "solid",
        boxShadow: 16,
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "180px",
        width: onChangeCheckBox !== undefined ? "335px" : "320px",
        marginRight: "3%",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <p style={{display: "inline-block", margin: 0}}>
            <p
              style={{
                fontWeight: "bold",
                display: "inline-block",
                margin: "0",
                marginRight: "2px",
                marginBottom: "1%",
              }}
            >
              Tên khách:
            </p>
            {schedule.customerName}
          </p>
          <p style={{display: "inline-block", margin: 0}}>
            <p
              style={{
                fontWeight: "bold",
                display: "inline-block",
                margin: "0",
                marginRight: "2px",
              }}
            >
              Địa chỉ:
            </p>

            {schedule.deliveryAddress}
          </p>
          <p
            style={{
              display: "inline-block",
              margin: 0,
              color: LIST_STATUS_REQUEST[schedule.status].color,
              bold: "bold",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                display: "inline-block",
                margin: "0",
                marginRight: "8px",
                color: "black",
              }}
            >
              Tình trạng:
            </p>

            {LIST_STATUS_REQUEST[schedule.status].name}
          </p>
        </Box>
        {schedule?.listStaffDelivery ? (
          <HtmlTooltip
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {buildToolTipStaff()}
              </Box>
            }
          >
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {buildListAvatar()}
            </Box>
          </HtmlTooltip>
        ) : (
          <></>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <p style={{display: "block", margin: "0"}}>
            <p
              style={{
                fontWeight: "bold",
                display: "inline-block",
                margin: 0,
                marginRight: "2px",
              }}
            >
              Tên kho:
            </p>{" "}
            {schedule?.storageName ? schedule?.storageName : "Chưa được phân"}
          </p>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            justifyContent: "flex-end",
            alignItems: "center !important",
          }}
        >
          <img
            onClick={async () => {
              try {
                if (schedule.type === 4) {
                  const orderDetail = await getOrderById(
                    schedule.orderId,
                    userState.idToken
                  );
                  setCurrentOrder(orderDetail.data);
                  handleOpenOrderModal();
                } else {
                  const orderDetail = await getRequestDetail(
                    schedule.id,
                    userState.idToken
                  );
                  setCurrentOrder(orderDetail.data);
                  handleOpen();
                }
              } catch (error) {
                console.log(error);
              }
            }}
            src="/img/info.png"
            alt="info"
            height={24}
            width={24}
            style={{
              cursor: "pointer",
              // marginRight: "16px",
            }}
          />
          {onChangeCheckBox !== undefined ? (
            <Checkbox
              checked={
                isFoundInListSelectedOrder !== -1 &&
                listSelectedOrder.length > 0
              }
              disabled={
                indexFoundSameTime !== -1 ||
                (!foundSameStorage && listSelectedOrder.length > 0) ||
                (listSelectedOrder.length > 0 && !isSameListStaff) ||
                schedule.status === STATUS_REQUEST_DELIVERING ||
                schedule.status === STATUS_REQUEST_FINISHED ||
                schedule.status === STATUS_REQUEST_CUSTOMER_ABSENT
              }
              onChange={(val) => onChangeCheckBox(schedule, val.target.checked)}
              color="success"
              inputProps={{"aria-label": "controlled"}}
            />
          ) : (
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              onClick={async () => {
                setCurrentOrder(schedule);

                handleOpenAssignTime();
              }}
              color="success"
              variant="contained"
              type="submit"
            >
              Assign
            </Button>
          )}
        </Box>
      </Box>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
