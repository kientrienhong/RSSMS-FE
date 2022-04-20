import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {styled} from "@material-ui/core/styles";
import {Snackbar, Alert, Box, Divider, Typography} from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import LoadingPage from "../pages/Loading/LoadingPage";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import StoredOrderModal from "./StoredOrderModal";
import ConfirmExtendSessionModal from "./ConfirmExtendSessionModal";
import moment from "moment";
import {updateNotification} from "../apis/Apis";
import {useLocation, useNavigate} from "react-router-dom";

import CurrentStoreOrderModal from "./CurrentStoreOrderModal";
const DashboardLayoutRoot = styled("div")(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({theme}) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 180,
  },
}));

const DashboardLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "scroll",
});

const DashboardLayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
});

const DashboardLayout = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const handleOpenNotification = () => {
    setOpenNotification(true);
  };

  const mapListNotifcation = () => {
    if (props?.notifications?.length === 0) {
      return (
        <Typography color="black" variant="h2" style={{margin: "4%"}}>
          No notifications yets!
        </Typography>
      );
    }

    return props?.notifications?.map((e) => {
      return (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#04BFFE",
                width: "36px",
                height: "36px",
                borderRadius: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/img/newInvoice.png"
                alt="newInvoice"
                width="24"
                height="24"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-between",
                marginLeft: "5%",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "1px",
                  width: "50%",
                }}
              >
                {e.description}
              </p>
              <p
                style={{
                  color: "#AAA",
                  textAlign: "right",
                }}
              >
                {moment(e.createDate, "YYYYMMDD").fromNow()}
              </p>
              {e.isRead === false ? (
                <Box
                  sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "7px",
                    backgroundColor: "#04BFFE",
                  }}
                ></Box>
              ) : (
                <Box></Box>
              )}
            </Box>
          </Box>
          <Divider />
        </Box>
      );
    });
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
    if (props.unReadNoti.length > 0) {
      updateNotification(
        props.unReadNoti.map((e) => e.id),
        props.userState.idToken
      );
      let newNotification = [...props.notifications].map((e) => {
        return {...e, isRead: true};
      });
      props.setUpNotification(newNotification);

      props.setUpIsReadNoti();
    }
  };

  const location = useLocation();
  const navigation = useNavigate();
  useEffect(() => {
    if (!window.location.pathname.includes("storages")) {
      if (
        props.isMoveOrderDetail ||
        storedOrder?.products?.length > 0 ||
        props.placingProducts?.floors?.length > 0
      ) {
        props.handleCurrentStoreOrder(true);
        navigation(-1);
      }
    }
  }, [location.key]);

  const {
    storedOrder,
    closeStoredOrderModal,
    isOpenStoredModal,
    isViewStoredModal,
  } = props;

  return (
    <DashboardLayoutRoot>
      <CurrentStoreOrderModal />
      <Snackbar
        open={props.snackbar}
        autoHideDuration={3000}
        onClose={props.closeSnackbar}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert
          onClose={props.closeSnackbar}
          severity={props.typeSnackbar}
          sx={{width: "100%"}}
        >
          {props.msgSnackbar}
        </Alert>
      </Snackbar>
      <StoredOrderModal
        storedOrder={storedOrder}
        handleClose={closeStoredOrderModal}
        open={isOpenStoredModal}
        isView={isViewStoredModal}
      />
      <ConfirmExtendSessionModal />
      <LoadingPage />
      <DashboardNavbar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        openNotification={openNotification}
        handleOpenNotification={handleOpenNotification}
        handleCloseNotification={handleCloseNotification}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <Box
        sx={{
          display: openNotification === true ? "" : "none",
          position: "absolute",
          top: "9%",
          right: 70,
          height: "50%",
          overflowY: "scroll",
          width: "30%",
          backgroundColor: "#FFF",
          zIndex: "9999999 !important",
        }}
      >
        {mapListNotifcation()}
      </Box>
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

const mapStateToProps = (state) => ({
  snackbar: state.application.snackbar,
  typeSnackbar: state.application.typeSnackbar,
  msgSnackbar: state.application.msgSnackbar,
  isOpenStoredModal: state.application.isOpenStoredModal,
  isViewStoredModal: state.application.isViewStoredModal,
  storedOrder: state.order.storedOrder,
  isMoveOrderDetail: state.order.isMoveOrderDetail,
  placingProducts: state.order.placingProducts,

  notifications: state.information.notifications,
  unReadNoti: state.information.unReadNoti,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleCurrentStoreOrder: (isOpen) =>
      dispatch(action.handleCurrentStoreOrder(isOpen)),
    closeSnackbar: () => dispatch(action.hideSnackbar()),
    closeStoredOrderModal: () => dispatch(action.closeStoredOrderModal()),
    setUpIsReadNoti: () => dispatch(action.setUpIsReadNoti()),
    setUpNotification: (notifcation) =>
      dispatch(action.setUpNotification(notifcation)),
    handleProgressModal: (isOpen, title, doFunction) =>
      dispatch(action.handleProgressModal(isOpen, title, doFunction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
