import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as action from "../redux/action/action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, ListItem} from "@material-ui/core";
const NavItem = ({
  href,
  icon: Icon,
  title,
  reactIcon,
  handleProgressModal,
  setUpCurrentViewOrderId,
  currentPositionViewOrderId,
  ...rest
}) => {
  const navigate = useNavigate();

  const location = useLocation();
  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main",
          }),
          "& svg": {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20" />}
        {reactIcon}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

const mapStateToProps = (state) => ({
  currentPositionViewOrderId: state.order.currentPositionViewOrderId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleProgressModal: (isOpen, title, yesFunction, noFunction) =>
      dispatch(
        action.handleProgressModal(isOpen, title, yesFunction, noFunction)
      ),
    setUpCurrentViewOrderId: (orderId) =>
      dispatch(action.setUpCurrentViewOrderId(orderId)),
  };
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
