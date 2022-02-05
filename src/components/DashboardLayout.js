import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { Snackbar, Alert, Box, Divider, Typography } from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import LoadingPage from "../pages/Loading/LoadingPage";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import StoredOrderModal from "./StoredOrderModal";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
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
  overflow: "hidden",
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
    if (props.notifcations.length === 0) {
      return (
        <Typography color="black" variant="h2" style={{ margin: "4%" }}>
          No notifcations yets!
        </Typography>
      );
    }

    return props.notifcations.map((e) => {
      return (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <p>{e.description}</p>
          <Divider />
        </Box>
      );
    });
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const {
    storedOrder,
    closeStoredOrderModal,
    isOpenStoredModal,
    isViewStoredModal,
  } = props;

  return (
    <DashboardLayoutRoot>
      <Snackbar
        open={props.snackbar}
        autoHideDuration={3000}
        onClose={props.closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={props.closeSnackbar}
          severity={props.typeSnackbar}
          sx={{ width: "100%" }}
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
  notifcations: state.information.notifcations,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: () => dispatch(action.hideSnackbar()),
    closeStoredOrderModal: () => dispatch(action.closeStoredOrderModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
