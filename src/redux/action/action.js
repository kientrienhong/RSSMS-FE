import * as ActionType from "./../constants/ActionType";

export const showLoader = () => {
  return {
    type: ActionType.SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: ActionType.HIDE_LOADER,
  };
};

export const showSnackbar = (msg) => {
  return {
    type: ActionType.SHOW_SNACKBAR,
    payload: msg,
  };
};
export const hideSnackbar = () => {
  return {
    type: ActionType.HIDE_SNACKBAR,
  };
};
