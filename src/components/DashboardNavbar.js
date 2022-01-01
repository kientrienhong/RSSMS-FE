import { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Modal,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import { STYLE_MODAL } from "../constant/style";
const DashboardNavbar = ({
  onMobileNavOpen,
  handleCloseNotification,
  handleOpenNotification,
  openNotification,
  ...rest
}) => {
  const [notifications] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const styleModal = {
    ...STYLE_MODAL,
    width: "20%",
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      elevation={0}
      {...rest}
      color="inherit"
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        overflow: "visible",
      }}
    >
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
            Are you sure?
          </Typography>
          <Box
            sx={{
              width: "60%",
              margin: "40px auto 10px auto",
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
              onClick={async () => {
                try {
                  navigate("/", { replace: true });
                } catch (error) {
                  console.log(error);
                } finally {
                }
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Yes
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
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />

        <Hidden xlDown>
          <IconButton color="primary" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon
                onClick={() => {
                  if (openNotification === true) {
                    handleCloseNotification();
                  } else {
                    handleOpenNotification();
                  }
                }}
              />
            </Badge>
          </IconButton>
          <IconButton color="primary" size="large" onClick={handleOpen}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="primary" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
