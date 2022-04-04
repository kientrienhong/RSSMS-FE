import "./App.css";
import route from "./routing/route";
import {ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import {messaging} from "./firebase/firebase";
import {usePopup, DialogType, ToastPosition} from "react-custom-popup";
import {connect} from "react-redux";
import * as action from "./redux/action/action";

import {useRoutes} from "react-router-dom";
function App(props) {
  const {showToast} = usePopup();

  const content = useRoutes(route);
  messaging.onMessage((payload) => {
    if (!payload?.notification) {
      return;
    }
    props.changeIsLoadOrder();

    props.addNotification({
      createdDate: new Date().toISOString(),
      id: parseInt(payload.data.NotiId),
      description: payload.notification.body,
      isRead: false,
    });
    showToast({
      text: payload.notification.body,
      type: DialogType.INFO,
      position: ToastPosition.TOP_RIGHT,
      timeoutDuration: 1000,
    });

    // const { notification } = payload;
  });

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNotification: (notifcation) =>
      dispatch(action.addNotification(notifcation)),
    changeIsLoadOrder: () => dispatch(action.changeIsLoadOrder()),
  };
};

export default connect(null, mapDispatchToProps)(App);
