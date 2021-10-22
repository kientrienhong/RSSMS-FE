import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { Snackbar, Alert } from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import LoadingPage from "../pages/Loading/LoadingPage";
import { connect } from "react-redux";
import * as action from "../redux/action/action";

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
    paddingLeft: 256,
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
  // overflow: "auto",
});

const DashboardLayout = (props) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <DashboardLayoutRoot>
      <Snackbar
        open={props.snackbar}
        autoHideDuration={2000}
        onClose={props.closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={props.closeSnackbar}
          severity={props.typeSnackbar}
          sx={{ width: "100%" }}
        >
          {props.msgSnackbar}
        </Alert>
      </Snackbar>
      <LoadingPage />
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: () => dispatch(action.hideSnackbar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
