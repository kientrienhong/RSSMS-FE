import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import NavItem from "./NavItem";
import { connect } from "react-redux";
import {
  LIST_SIDE_BAR_ADMIN,
  LIST_SIDE_BAR_MANAGER,
  LIST_SIDE_BAR_OFFICE_STAFF,
} from "../constant/route";

const DashboardSidebar = ({ onMobileClose, openMobile, user }) => {
  let items = [];
  if (user.roleName === "Admin") {
    items = LIST_SIDE_BAR_ADMIN;
  } else if (user.roleName === "Manager") {
    items = LIST_SIDE_BAR_MANAGER;
  } else if (user.roleName === "Office Staff") {
    if (user?.staffAssignStorages?.length === 0) {
      items = LIST_SIDE_BAR_OFFICE_STAFF(undefined);
    } else {
      items = LIST_SIDE_BAR_OFFICE_STAFF(user.staffAssignStorages[0].storageId);
    }
  }

  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user?.imageUrl}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.roleName}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              customImg={item.img}
              reactIcon={item.reactIcon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 240,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 190,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

const mapStateToProps = (state) => ({
  user: state.information.user,
});

export default connect(mapStateToProps, null)(DashboardSidebar);
