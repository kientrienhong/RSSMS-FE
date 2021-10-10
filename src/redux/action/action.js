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

export const showSnackbar = (type, msg) => {
  return {
    type: ActionType.SHOW_SNACKBAR,
    payload: { type, msg },
  };
};

export const hideSnackbar = () => {
  return {
    type: ActionType.HIDE_SNACKBAR,
  };
};

export const setUpUser = (user) => {
  return {
    type: ActionType.SET_UP_USER,
    payload: user,
  };
};
