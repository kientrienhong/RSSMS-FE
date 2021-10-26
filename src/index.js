import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./redux/reducer/rootReducer";

const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    sessionStorage.setItem("information", serializedState);
  } catch (err) {}
};

const initializeState = () => {
  return {
    application: {},
    information: {},
  };
};

const loadState = () => {
  try {
    let serializedState = sessionStorage.getItem("information");

    if (serializedState === null) {
      return initializeState();
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return initializeState();
  }
};

const store = createStore(rootReducer, loadState());

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
